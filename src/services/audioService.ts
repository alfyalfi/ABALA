// Audio Engine: Natural Neural AI TTS + Real Authentic Sound Playback
class AudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentAudioElement: HTMLAudioElement | null = null;
  private isCurrentlySpeaking: boolean = false;

  constructor() {}

  public getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
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
    this.isCurrentlySpeaking = false;
    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
      } catch (e) {}
      this.currentAudioElement = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }

  // Synthesized UI Sounds (Instant zero latency)
  public playFeedback(type: 'correct' | 'wrong' | 'timeout' | 'victory' | 'step') {
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
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'step') {
        // Pleasant intermediate success note
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(880.00, now + 0.12);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
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

  // Play Real Authentic Sound Clip (From public/sounds/) - Returns Promise that resolves when audio finishes
  public playSoundFile(soundPath: string): Promise<boolean> {
    if (this.isMuted || !soundPath) return Promise.resolve(false);

    this.stopAllAudio();
    this.getContext(); // Ensure AudioContext is active

    return new Promise((resolve) => {
      let settled = false;
      const finish = (result: boolean) => {
        if (!settled) {
          settled = true;
          this.currentAudioElement = null;
          resolve(result);
        }
      };

      // Maximum sound duration guard (e.g. 5 seconds max)
      const guard = setTimeout(() => finish(true), 5000);

      try {
        const audio = new Audio(soundPath);
        this.currentAudioElement = audio;
        audio.volume = 1.0;

        audio.onended = () => {
          clearTimeout(guard);
          finish(true);
        };

        audio.onerror = (e) => {
          clearTimeout(guard);
          console.warn('Error loading sound file:', soundPath, e);
          // Play synthetic acoustic backup if file fails
          this.playSyntheticBackup(soundPath);
          finish(false);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn('Audio autoplay blocked or failed:', err);
            clearTimeout(guard);
            this.playSyntheticBackup(soundPath);
            finish(false);
          });
        }
      } catch (e) {
        clearTimeout(guard);
        this.playSyntheticBackup(soundPath);
        finish(false);
      }
    });
  }

  // Natural Neural AI TTS - Awaits until speech completely finishes playing
  public speakText(text: string): Promise<void> {
    if (this.isMuted || !text) return Promise.resolve();
    this.stopAllAudio();
    this.isCurrentlySpeaking = true;

    return new Promise((resolve) => {
      let isSettled = false;
      const done = () => {
        if (!isSettled) {
          isSettled = true;
          this.isCurrentlySpeaking = false;
          resolve();
        }
      };

      // Safety timeout: never hang longer than 5 seconds
      const maxTimer = setTimeout(done, 5000);

      // 1. Try free Neural backend API
      const apiUrl = `/api/tts?text=${encodeURIComponent(text)}`;
      try {
        const audio = new Audio(apiUrl);
        this.currentAudioElement = audio;
        audio.volume = 1.0;

        audio.onended = () => {
          clearTimeout(maxTimer);
          done();
        };

        audio.onerror = () => {
          clearTimeout(maxTimer);
          this.fallbackWebSpeech(text, done);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            clearTimeout(maxTimer);
            this.fallbackWebSpeech(text, done);
          });
        }
      } catch (err) {
        clearTimeout(maxTimer);
        this.fallbackWebSpeech(text, done);
      }
    });
  }

  // Fallback to Web Speech API with onend completion callback
  private fallbackWebSpeech(text: string, onDone: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onDone();
      return;
    }
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.94;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const idVoice = voices.find(v => v.lang.includes('id') || v.lang.includes('ID'));
    if (idVoice) {
      utterance.voice = idVoice;
    }

    utterance.onend = () => onDone();
    utterance.onerror = () => onDone();

    window.speechSynthesis.speak(utterance);
  }

  // Synthetic backup generator for zero-failure audio
  private playSyntheticBackup(soundPath: string) {
    const ctx = this.getContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    try {
      if (soundPath.includes('thunder')) {
        // Deep rumbling white noise
        const bufferSize = ctx.sampleRate * 1.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.4));
        }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 160;
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start(now);
      } else if (soundPath.includes('bee') || soundPath.includes('cricket')) {
        // Buzzing oscillation
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(soundPath.includes('cricket') ? 4500 : 220, now);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.2);
      }
    } catch (e) {}
  }
}

export const audioService = new AudioService();
