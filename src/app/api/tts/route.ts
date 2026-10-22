import { NextResponse } from 'next/server';

// Server-side in-memory audio cache to prevent redundant upstream requests and 429 rate-limiting
const audioCache = new Map<string, ArrayBuffer>();
const MAX_CACHE_ITEMS = 150;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawText = searchParams.get('text');

  if (!rawText) {
    return NextResponse.json({ error: 'Text query parameter is required' }, { status: 400 });
  }

  // 1. Sanitize text: remove emojis, special symbols, and HTML tags for clean Indonesian TTS
  const sanitizedText = rawText
    .replace(/<[^>]*>/g, ' ')
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}]/gu, '')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 180);

  if (!sanitizedText) {
    return NextResponse.json({ fallback: 'use_client_web_speech' }, { status: 200 });
  }

  // 2. Check in-memory cache
  const cacheKey = sanitizedText.toLowerCase();
  if (audioCache.has(cacheKey)) {
    const cachedBuffer = audioCache.get(cacheKey)!;
    return new Response(cachedBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=604800, s-maxage=604800',
        'X-Cache': 'HIT',
      },
    });
  }

  try {
    const encodedText = encodeURIComponent(sanitizedText);
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=id&client=tw-ob`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const audioResponse = await fetch(googleTtsUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'audio/mpeg,audio/*;q=0.9',
      },
    });

    clearTimeout(timeoutId);

    if (!audioResponse.ok) {
      // Gracefully signal client to use WebSpeech without throwing 500 error
      return NextResponse.json({
        fallback: 'use_client_web_speech',
        status: audioResponse.status
      }, { status: 200 });
    }

    const arrayBuffer = await audioResponse.arrayBuffer();

    // Cache the successful audio
    if (audioCache.size >= MAX_CACHE_ITEMS) {
      const firstKey = audioCache.keys().next().value;
      if (firstKey) audioCache.delete(firstKey);
    }
    audioCache.set(cacheKey, arrayBuffer);

    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=604800, s-maxage=604800',
        'Access-Control-Allow-Origin': '*',
        'X-Cache': 'MISS',
      },
    });
  } catch (error: any) {
    // Return clean 200 with fallback instruction so the browser doesn't log red 500 network errors
    return NextResponse.json({
      fallback: 'use_client_web_speech',
      reason: error.name === 'AbortError' ? 'timeout' : 'upstream_unavailable'
    }, { status: 200 });
  }
}
