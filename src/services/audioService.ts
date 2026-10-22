// Audio Engine: Natural Neural AI TTS + Real Authentic Sound Playback
class AudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private currentAudioElement: HTMLAudioElement | null = null;
  private isCurrentlySpeaking: boolean = false;
  private currentAbortController: AbortController | null = null;
  private activeSpeechSessionId: number = 0;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Warm up voices on client
      window.speechSynthesis.getVoices();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = () => {
          window.speechSynthesis.getVoices();
        };
      }
    }
  }

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
    this.activeSpeechSessionId++;

    if (this.currentAbortController) {
      try {
        this.currentAbortController.abort();
      } catch (e) {}
      this.currentAbortController = null;
    }

    if (this.currentAudioElement) {
      const el = this.currentAudioElement;
      this.currentAudioElement = null;
      try {
        el.onended = null;
        el.onerror = null;
        el.pause();
        el.currentTime = 0;
        if (el.src && el.src.startsWith('blob:')) {
          URL.revokeObjectURL(el.src);
        }
      } catch (e) {}
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  // Specifically cancel active speech preview immediately without resetting other states
  public stopSpeechPreview() {
    this.stopAllAudio();
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

  // Musical Count Note (C5, D5, E5, F5, G5, A5, B5, C6)
  public playCountNote(count: number) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;
    const scale = [523.25, 587.33, 659.25, 698.46, 783.99, 880.00, 987.77, 1046.50, 1174.66, 1318.51];
    const freq = scale[Math.min(count - 1, scale.length - 1)] || 523.25;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
  }

  // Crisp Letter Pop Sound for Word Builder
  public playLetterPop() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  // Superhero Whoosh on Question Transition
  public playWhoosh() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.08);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.18);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch (e) {}
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

      // Maximum sound duration guard (4.5 seconds max)
      const guard = setTimeout(() => finish(true), 4500);

      try {
        const audio = new Audio(soundPath);
        this.currentAudioElement = audio;
        audio.volume = 1.0;

        audio.onended = () => {
          clearTimeout(guard);
          finish(true);
        };

        audio.onerror = () => {
          clearTimeout(guard);
          this.playSyntheticBackup(soundPath);
          finish(false);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
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

  // Natural Neural AI TTS - Awaits until speech completely finishes playing or is cancelled
  public async speakText(text: string): Promise<void> {
    if (this.isMuted || !text) return;
    this.stopAllAudio();
    this.isCurrentlySpeaking = true;

    const speechSession = ++this.activeSpeechSessionId;
    const abortCtrl = new AbortController();
    this.currentAbortController = abortCtrl;

    return new Promise<void>((resolve) => {
      let isSettled = false;
      const done = () => {
        if (!isSettled) {
          isSettled = true;
          if (this.activeSpeechSessionId === speechSession) {
            this.isCurrentlySpeaking = false;
            this.currentAbortController = null;
          }
          resolve();
        }
      };

      // Safety timeout: never lock audio state longer than 3.5s
      const maxTimer = setTimeout(() => {
        if (this.activeSpeechSessionId === speechSession) {
          done();
        }
      }, 3500);

      const run = async () => {
        try {
          const apiUrl = `/api/tts?text=${encodeURIComponent(text)}`;
          const res = await fetch(apiUrl, { signal: abortCtrl.signal });

          if (this.activeSpeechSessionId !== speechSession) {
            clearTimeout(maxTimer);
            done();
            return;
          }

          if (!res.ok) {
            this.fallbackWebSpeech(text, () => {
              clearTimeout(maxTimer);
              done();
            });
            return;
          }

          const contentType = res.headers.get('content-type') || '';
          if (contentType.includes('audio')) {
            const blob = await res.blob();
            if (this.activeSpeechSessionId !== speechSession) {
              clearTimeout(maxTimer);
              done();
              return;
            }

            const blobUrl = URL.createObjectURL(blob);
            const audio = new Audio(blobUrl);
            this.currentAudioElement = audio;

            audio.onended = () => {
              URL.revokeObjectURL(blobUrl);
              clearTimeout(maxTimer);
              done();
            };

            audio.onerror = () => {
              URL.revokeObjectURL(blobUrl);
              this.fallbackWebSpeech(text, () => {
                clearTimeout(maxTimer);
                done();
              });
            };

            const playPromise = audio.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                URL.revokeObjectURL(blobUrl);
                this.fallbackWebSpeech(text, () => {
                  clearTimeout(maxTimer);
                  done();
                });
              });
            }
          } else {
            // It returned JSON fallback instruction
            this.fallbackWebSpeech(text, () => {
              clearTimeout(maxTimer);
              done();
            });
          }
        } catch (e: any) {
          if (this.activeSpeechSessionId === speechSession && e.name !== 'AbortError') {
            this.fallbackWebSpeech(text, () => {
              clearTimeout(maxTimer);
              done();
            });
          } else {
            clearTimeout(maxTimer);
            done();
          }
        }
      };

      run();
    });
  }

  // Fallback to Web Speech API with clean error handling and timeout
  private fallbackWebSpeech(text: string, onDone: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      onDone();
      return;
    }

    try {
      // Clean emojis and special symbols so speech synthesis sounds natural
      const cleanText = text
        .replace(/<[^>]*>/g, ' ')
        .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}]/gu, '')
        .replace(/[\u200B-\u200D\uFEFF]/g, '')
        .replace(/\s+/g, ' ')
        .trim();

      if (!cleanText) {
        onDone();
        return;
      }

      // Resume if browser speech is in suspended/paused state
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'id-ID';
      utterance.rate = 0.96;
      utterance.pitch = 1.05;

      const voices = window.speechSynthesis.getVoices();
      const idVoice = voices.find(v => v.lang.toLowerCase().includes('id'));
      if (idVoice) {
        utterance.voice = idVoice;
      }

      let isFinished = false;
      const finish = () => {
        if (!isFinished) {
          isFinished = true;
          onDone();
        }
      };

      utterance.onend = finish;
      utterance.onerror = finish;

      // Safety timeout: 3 seconds max for speech utterance
      setTimeout(finish, 3000);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      onDone();
    }
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
