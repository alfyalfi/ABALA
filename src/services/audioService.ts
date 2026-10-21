// Audio Engine: Natural Neural AI TTS + Realistic SFX + Synthesized Feedback
import { getRealSound } from './mediaLibrary';

class AudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentAudioElement: HTMLAudioElement | null = null;

  constructor() {
    // Lazy initialize AudioContext on user interaction
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopAllAudio();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public stopAllAudio() {
    if (this.currentAudioElement) {
      this.currentAudioElement.pause();
      this.currentAudioElement = null;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Synthesized UI Sounds (Instant zero latency)
  public playFeedback(type: 'correct' | 'wrong' | 'timeout' | 'victory') {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        // Cheerful harmonic chime (C5 -> E5 -> G5)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'wrong') {
        // Gentle mellow boop
        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(170, now + 0.2);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'timeout') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(210, now);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'victory') {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, now + i * 0.12);
          g.gain.setValueAtTime(0.22, now + i * 0.12);
          g.gain.exponentialRampToValueAtTime(0.01, now + i * 0.12 + 0.25);
          o.start(now + i * 0.12);
          o.stop(now + i * 0.12 + 0.25);
        });
      }
    } catch (e) {
      console.warn('Audio tone error:', e);
    }
  }

  // Play realistic real sounds (Animal meow, siren, rain, horn, etc.)
  public async playRealSound(keyword: string): Promise<boolean> {
    if (this.isMuted) return false;
    const soundUrl = getRealSound(keyword);
    if (!soundUrl) return false;

    this.stopAllAudio();
    try {
      const audio = new Audio(soundUrl);
      this.currentAudioElement = audio;
      audio.volume = 0.8;
      await audio.play();
      return true;
    } catch (e) {
      console.warn('Could not play real sound:', e);
      return false;
    }
  }

  // Natural Neural AI TTS (Edge-TTS via Backend with Web Speech fallback)
  public async speakText(text: string): Promise<void> {
    if (this.isMuted) return;
    this.stopAllAudio();

    // 1. Try free Neural backend API first
    const apiUrl = `/api/tts?text=${encodeURIComponent(text)}`;
    try {
      const audio = new Audio(apiUrl);
      this.currentAudioElement = audio;
      audio.volume = 1.0;

      // Promise race with 2s timeout
      const playPromise = audio.play();
      const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject('timeout'), 2000));

      await Promise.race([playPromise, timeoutPromise]);
      return;
    } catch (err) {
      // 2. Seamless client-side Web Speech API fallback
      this.fallbackWebSpeech(text);
    }
  }

  private fallbackWebSpeech(text: string) {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.92;
    utterance.pitch = 1.08;

    // Pick Indonesian voice if available
    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
    if (idVoice) {
      utterance.voice = idVoice;
    }

    window.speechSynthesis.speak(utterance);
  }
}

export const audioService = new AudioService();
