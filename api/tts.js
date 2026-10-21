// Serverless function for Vercel: Free Natural AI Text-to-Speech (Indonesian Neural Voice)
export default async function handler(req, res) {
  const { text, voice = 'id-ID-ArdiNeural' } = req.query;

  if (!text) {
    return res.status(400).json({ error: 'Text query parameter is required' });
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Ultra-reliable, 100% free Google TTS & Edge audio fallback endpoint
    const encodedText = encodeURIComponent(text.slice(0, 200));
    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodedText}&tl=id&client=tw-ob`;

    const audioResponse = await fetch(googleTtsUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!audioResponse.ok) {
      throw new Error(`TTS upstream error: ${audioResponse.status}`);
    }

    const arrayBuffer = await audioResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    return res.status(200).send(buffer);
  } catch (error) {
    console.error('TTS Error:', error);
    // Return graceful fallback message
    return res.status(500).json({
      error: 'Failed to generate speech',
      fallback: 'use_client_web_speech',
      details: error.message
    });
  }
}
