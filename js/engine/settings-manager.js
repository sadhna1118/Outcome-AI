// Live Real AI & API Configuration Manager
class SettingsManager {
  constructor() {
    this.storageKey = 'outcome_ai_settings_v3';
    this.config = this.loadConfig();
  }

  loadConfig() {
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return {
      provider: 'autonomous', // 'autonomous' | 'gemini' | 'openai' | 'groq' | 'ollama'
      apiKey: '',
      model: 'gemini-1.5-flash',
      ollamaUrl: 'http://localhost:11434'
    };
  }

  saveConfig(newConfig) {
    this.config = { ...this.config, ...newConfig };
    localStorage.setItem(this.storageKey, JSON.stringify(this.config));
    window.outcomeApp.showToast("Settings Saved", `Active Provider: ${this.config.provider.toUpperCase()}`);
    this.updateUIBadge();
  }

  updateUIBadge() {
    const badge = document.getElementById('topbar-ai-provider-badge');
    if (badge) {
      if (this.config.provider === 'autonomous') {
        badge.innerHTML = `<span class="dot-live" style="color: #10b981;"></span> Engine: Autonomous Local`;
        badge.className = 'badge badge-emerald';
      } else if (this.config.provider === 'gemini') {
        badge.innerHTML = `<span class="dot-live" style="color: #60a5fa;"></span> Live: Gemini 1.5 Flash`;
        badge.className = 'badge badge-cyan';
      } else if (this.config.provider === 'openai') {
        badge.innerHTML = `<span class="dot-live" style="color: #34d399;"></span> Live: OpenAI GPT-4o`;
        badge.className = 'badge badge-emerald';
      } else if (this.config.provider === 'groq') {
        badge.innerHTML = `<span class="dot-live" style="color: #f59e0b;"></span> Live: Groq Llama-3.3`;
        badge.className = 'badge badge-amber';
      }
    }
  }

  async testConnection(provider, apiKey, model) {
    if (provider === 'autonomous') {
      return { success: true, message: "Autonomous Built-in Engine Ready (0ms latency, zero API costs)." };
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: provider,
          apiKey: apiKey,
          model: model,
          systemPrompt: "You are OutcomeAI. Respond in one word: ONLINE.",
          message: "Ping"
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        return { success: true, message: `Connected! Response: "${data.result.text.trim()}"` };
      } else {
        return { success: false, message: data.error || "Connection failed" };
      }
    } catch (e) {
      return { success: false, message: e.message };
    }
  }

  async callLLM(systemPrompt, userMessage) {
    if (this.config.provider === 'autonomous' || !this.config.apiKey) {
      return null; // Signals engine to use autonomous decision matrix
    }

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider: this.config.provider,
          apiKey: this.config.apiKey,
          model: this.config.model,
          systemPrompt: systemPrompt,
          message: userMessage
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        return data.result.text;
      }
      return null;
    } catch (e) {
      console.warn("LLM API Call failed, falling back to Autonomous Engine:", e.message);
      return null;
    }
  }
}

window.settingsManager = new SettingsManager();
