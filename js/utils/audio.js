// Web Audio API Sound Effects Synthesizer
class SoundFX {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playTone(freq, type, duration, gainVal = 0.08) {
    if (!this.enabled) return;
    try {
      this.init();
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Futuristic Chimes
  messageSent() {
    this.playTone(520, 'sine', 0.1, 0.05);
  }

  messageReceived() {
    this.playTone(680, 'triangle', 0.15, 0.06);
    setTimeout(() => this.playTone(880, 'sine', 0.2, 0.05), 80);
  }

  actionExecuted() {
    this.playTone(440, 'sine', 0.08, 0.06);
    setTimeout(() => this.playTone(660, 'sine', 0.1, 0.07), 60);
    setTimeout(() => this.playTone(880, 'sine', 0.18, 0.08), 120);
  }

  escalated() {
    this.playTone(350, 'sawtooth', 0.15, 0.06);
    setTimeout(() => this.playTone(300, 'sawtooth', 0.25, 0.07), 100);
  }

  click() {
    this.playTone(800, 'sine', 0.03, 0.02);
  }
}

window.soundFX = new SoundFX();
