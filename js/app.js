// OutcomeAI Master Application Controller - Enterprise Edition 3.0
class OutcomeApp {
  constructor() {
    this.currentView = 'chat';
    this.views = ['chat', 'phone', 'proactive', 'chaos', 'battle', 'swarm', 'workflow', 'hitl', 'integrations', 'opsmap', 'webhook', 'policystudio', 'knowledge', 'analytics'];
  }

  init() {
    console.log("⚡ OutcomeAI 3.0 Enterprise Engine Initializing...");

    // Initialize all modular view components
    if (window.chatView) window.chatView.init();
    if (window.phoneView) window.phoneView.init();
    if (window.proactiveView) window.proactiveView.init();
    if (window.chaosView) window.chaosView.init();
    if (window.battleView) window.battleView.init();
    if (window.swarmView) window.swarmView.init();
    if (window.workflowView) window.workflowView.init();
    if (window.hitlQueueView) window.hitlQueueView.init();
    if (window.integrationsView) window.integrationsView.init();
    if (window.opsMapView) window.opsMapView.init();
    if (window.webhookView) window.webhookView.init();
    if (window.policyStudioView) window.policyStudioView.init();
    if (window.knowledgeView) window.knowledgeView.init();
    if (window.analyticsView) window.analyticsView.init();
    if (window.pitchPresentation) window.pitchPresentation.init();

    this.bindNavigation();
    this.bindTopBarEvents();
    this.switchView('chat');

    // Welcome notification
    setTimeout(() => {
      this.showToast("⚡ OutcomeAI Enterprise 3.0 Online", "Multi-Agent System & Telephony ready across 6 enterprise connectors.");
    }, 600);
  }

  bindNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const viewId = item.getAttribute('data-view');
        if (viewId) {
          this.switchView(viewId);
        }
      });
    });
  }

  bindTopBarEvents() {
    const audioBtn = document.getElementById('btn-toggle-sound');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const isEnabled = window.soundFX.toggle();
        audioBtn.classList.toggle('active', isEnabled);
        audioBtn.innerHTML = isEnabled ? '🔊 SFX On' : '🔇 SFX Off';
        this.showToast(isEnabled ? "Sound Effects Enabled" : "Sound Effects Muted");
      });
    }

    // Pitch Mode button
    const pitchBtn = document.getElementById('btn-open-pitch-mode');
    if (pitchBtn) {
      pitchBtn.addEventListener('click', () => {
        if (window.pitchPresentation) window.pitchPresentation.open();
      });
    }

    // Settings modal open/close
    const settingsBtn = document.getElementById('btn-open-settings');
    const settingsModal = document.getElementById('ai-settings-modal');
    const settingsCloseBtn = document.getElementById('btn-close-settings');
    const providerSelect = document.getElementById('settings-provider-select');
    const keyContainer = document.getElementById('settings-key-container');
    const modelContainer = document.getElementById('settings-model-container');
    const apiKeyInput = document.getElementById('settings-api-key');
    const modelInput = document.getElementById('settings-model-name');
    const testBtn = document.getElementById('btn-test-connection');
    const saveSettingsBtn = document.getElementById('btn-save-settings');
    const testResultEl = document.getElementById('settings-test-result');

    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => this.openSettings());
    }

    if (settingsCloseBtn && settingsModal) {
      settingsCloseBtn.addEventListener('click', () => settingsModal.classList.remove('active'));
    }

    if (providerSelect) {
      providerSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        const isExternal = val !== 'autonomous';
        if (keyContainer) keyContainer.style.display = isExternal ? 'block' : 'none';
        if (modelContainer) modelContainer.style.display = isExternal ? 'block' : 'none';
        if (modelInput) {
          if (val === 'gemini') modelInput.value = 'gemini-1.5-flash';
          else if (val === 'openai') modelInput.value = 'gpt-4o-mini';
          else if (val === 'groq') modelInput.value = 'llama-3.3-70b-versatile';
        }
      });
    }

    if (testBtn) {
      testBtn.addEventListener('click', async () => {
        testBtn.innerText = 'Testing...';
        const res = await window.settingsManager.testConnection(providerSelect.value, apiKeyInput.value.trim(), modelInput.value.trim());
        testBtn.innerText = '🔍 Test Connection';
        if (testResultEl) {
          testResultEl.style.display = 'block';
          testResultEl.style.background = res.success ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)';
          testResultEl.style.border = res.success ? '1px solid #10b981' : '1px solid #ef4444';
          testResultEl.style.color = res.success ? '#34d399' : '#f87171';
          testResultEl.innerText = res.message;
        }
      });
    }

    if (saveSettingsBtn) {
      saveSettingsBtn.addEventListener('click', () => {
        window.settingsManager.saveConfig({
          provider: providerSelect.value,
          apiKey: apiKeyInput.value.trim(),
          model: modelInput.value.trim()
        });
        if (settingsModal) settingsModal.classList.remove('active');
      });
    }

    // Blueprint modal open/close
    const blueprintBtn = document.getElementById('btn-open-blueprint');
    const blueprintModal = document.getElementById('blueprint-modal-overlay');
    const blueprintCloseBtn = document.getElementById('btn-close-blueprint');

    if (blueprintBtn && blueprintModal) {
      blueprintBtn.addEventListener('click', () => {
        blueprintModal.classList.add('active');
        if (window.soundFX) window.soundFX.click();
      });
    }

    if (blueprintCloseBtn && blueprintModal) {
      blueprintCloseBtn.addEventListener('click', () => {
        blueprintModal.classList.remove('active');
        if (window.soundFX) window.soundFX.click();
      });
    }

    if (blueprintModal) {
      blueprintModal.addEventListener('click', (e) => {
        if (e.target === blueprintModal) {
          blueprintModal.classList.remove('active');
        }
      });
    }

    if (window.settingsManager) window.settingsManager.updateUIBadge();

    // Listen for status changes
    window.addEventListener('outcome:status-changed', (e) => {
      const st = e.detail.status;
      const statusTitle = document.getElementById('agent-status-label');
      const statusIndicator = document.getElementById('agent-status-dot');

      if (statusTitle && statusIndicator) {
        if (st === 'reasoning') {
          statusTitle.innerText = "Reasoning & Policy Eval...";
          statusIndicator.style.background = "var(--primary)";
        } else {
          statusTitle.innerText = "OutcomeAI Engine: Online";
          statusIndicator.style.background = "var(--accent-emerald)";
        }
      }
    });
  }

  openSettings() {
    const modal = document.getElementById('ai-settings-modal');
    const providerSelect = document.getElementById('settings-provider-select');
    const apiKeyInput = document.getElementById('settings-api-key');
    const modelInput = document.getElementById('settings-model-name');
    const keyContainer = document.getElementById('settings-key-container');
    const modelContainer = document.getElementById('settings-model-container');

    if (modal && window.settingsManager) {
      const cfg = window.settingsManager.config;
      if (providerSelect) providerSelect.value = cfg.provider;
      if (apiKeyInput) apiKeyInput.value = cfg.apiKey || '';
      if (modelInput) modelInput.value = cfg.model || 'gemini-1.5-flash';

      const isExternal = cfg.provider !== 'autonomous';
      if (keyContainer) keyContainer.style.display = isExternal ? 'block' : 'none';
      if (modelContainer) modelContainer.style.display = isExternal ? 'block' : 'none';

      modal.classList.add('active');
    }
  }

  launchPresetScenario(scenarioIndex) {
    const blueprintModal = document.getElementById('blueprint-modal-overlay');
    if (blueprintModal) blueprintModal.classList.remove('active');

    this.switchView('chat');
    if (window.chatView) {
      const selector = document.getElementById('scenario-selector');
      if (selector) selector.value = scenarioIndex;
      window.chatView.loadScenario(scenarioIndex);
    }
  }

  switchView(viewId) {
    if (!this.views.includes(viewId)) return;
    this.currentView = viewId;

    // Update nav active styles
    document.querySelectorAll('.nav-item').forEach(item => {
      item.classList.toggle('active', item.getAttribute('data-view') === viewId);
    });

    // Update containers
    document.querySelectorAll('.view-container').forEach(container => {
      container.classList.remove('active');
    });

    const target = document.getElementById(`${viewId}-view-container`);
    if (target) {
      target.classList.add('active');
    }

    // Update Topbar Title
    const titleEl = document.getElementById('topbar-page-title');
    const subEl = document.getElementById('topbar-page-subtitle');

    const titles = {
      chat: { title: "Omnichannel AI Teammate", sub: "Interactive live agent simulator across Webchat, WhatsApp, Email, & iPhone 16 Pro" },
      phone: { title: "📞 AI Voice Calling & Telephony Teammate", sub: "Real-time incoming & outgoing phone call simulator with live audio waveforms and action execution" },
      proactive: { title: "🔮 Proactive Pre-Cognitive Action Engine", sub: "Zero-touch autonomous cloud anomaly mitigation across FedEx, SAP ERP, and Stripe" },
      chaos: { title: "🎮 Enterprise Stress Test & Chaos Arena", sub: "High-velocity simulation injecting 100 requests/sec with live guardrail interception" },
      battle: { title: "⚔️ Battle Arena: OutcomeAI vs Traditional Chatbot", sub: "Live head-to-head benchmark comparing Legacy FAQ bots with Autonomous Action Teammates" },
      swarm: { title: "🤖 Multi-Agent Swarm Collaboration (CrewAI / LangGraph)", sub: "Watch 4 specialized sub-agents collaborate and reach consensus on complex cases" },
      workflow: { title: "Autonomous Workflow Studio", sub: "Visual Directed Acyclic Graph (DAG) state machine with tool execution tracing" },
      hitl: { title: "Human Collaboration Queue", sub: "Supervisor review & 1-click approvals for low-confidence or sensitive cases" },
      integrations: { title: "Business Systems & Live Enterprise Sandbox", sub: "Interactive Salesforce Kanban, Zendesk queues, Stripe billing, and SAP ERP" },
      opsmap: { title: "🌐 Global Autonomous Operations & Logistics Map", sub: "Real-time warehouse inventory, shipping couriers, and international node telemetry" },
      webhook: { title: "⚡ Enterprise Event Bus & Webhook Gateway", sub: "Asynchronous cloud event ingestion (Stripe, SAP, FedEx) with instant mitigation" },
      policystudio: { title: "🛠️ No-Code Policy Studio & Rule Builder", sub: "Deterministic business guardrails and company decision matrices" },
      knowledge: { title: "Decision Policies & RAG Store", sub: "Vectorized company guidelines, warranty boundaries, and pricing matrices" },
      analytics: { title: "Executive ROI & Outcome Analytics", sub: "Real-time autonomous resolution metrics, SLA adherence, and cost savings calculator" }
    };

    if (titleEl && titles[viewId]) titleEl.innerText = titles[viewId].title;
    if (subEl && titles[viewId]) subEl.innerText = titles[viewId].sub;

    if (window.soundFX) window.soundFX.click();
  }

  showToast(title, body = "") {
    let container = document.getElementById('app-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'app-toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast animate-fade-in';
    toast.innerHTML = `
      <div style="font-size: 1.25rem;">⚡</div>
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 0.85rem; color: #f8fafc;">${title}</div>
        ${body ? `<div style="font-size: 0.75rem; color: #94a3b8; margin-top: 2px;">${body}</div>` : ''}
      </div>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.outcomeApp = new OutcomeApp();
  window.outcomeApp.init();
});
