// Voice Engine (Text-to-Speech & Speech-to-Text)
class VoiceEngine {
  constructor() {
    this.ttsEnabled = false;
    this.isListening = false;
    this.recognition = null;
    this.synth = window.speechSynthesis || null;
    this.currentUtterance = null;
    this.initSTT();
  }

  initSTT() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';

      this.recognition.onstart = () => {
        this.isListening = true;
        window.dispatchEvent(new CustomEvent('outcome:voice-listen-started'));
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        window.dispatchEvent(new CustomEvent('outcome:voice-transcript', { detail: { transcript } }));
      };

      this.recognition.onerror = () => {
        this.isListening = false;
        window.dispatchEvent(new CustomEvent('outcome:voice-listen-ended'));
      };

      this.recognition.onend = () => {
        this.isListening = false;
        window.dispatchEvent(new CustomEvent('outcome:voice-listen-ended'));
      };
    }
  }

  toggleTTS() {
    this.ttsEnabled = !this.ttsEnabled;
    if (!this.ttsEnabled && this.synth) {
      this.synth.cancel();
    }
    return this.ttsEnabled;
  }

  speak(text) {
    if (!this.ttsEnabled || !this.synth) return;
    try {
      this.synth.cancel();
      // Clean markdown tags for natural speech
      const cleanText = text
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/#+/g, '')
        .replace(/https?:\/\/\S+/g, 'link');

      this.currentUtterance = new SpeechSynthesisUtterance(cleanText);
      this.currentUtterance.rate = 1.05;
      this.currentUtterance.pitch = 1.0;

      // Select natural voice if available
      const voices = this.synth.getVoices();
      const naturalVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Jenny')));
      if (naturalVoice) this.currentUtterance.voice = naturalVoice;

      this.currentUtterance.onstart = () => {
        window.dispatchEvent(new CustomEvent('outcome:tts-speaking-started'));
      };

      this.currentUtterance.onend = () => {
        window.dispatchEvent(new CustomEvent('outcome:tts-speaking-ended'));
      };

      this.synth.speak(this.currentUtterance);
    } catch (e) {
      console.warn("Speech synthesis error", e);
    }
  }

  startListening() {
    if (this.recognition && !this.isListening) {
      try {
        this.recognition.start();
      } catch (e) {
        console.warn("Speech recognition error", e);
      }
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }
}

window.voiceEngine = new VoiceEngine();
