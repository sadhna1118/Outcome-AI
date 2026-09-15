// Omnichannel Chat Simulator - Enhanced 2.0
class ChatView {
  constructor() {
    this.currentChannel = 'webchat';
    this.currentScenarioIndex = 0;
    this.isPlayingScenario = false;
    this.messages = [];
  }

  init() {
    this.container = document.getElementById('chat-view-container');
    if (!this.container) return;
    this.render();
    this.bindEvents();
    this.loadScenario(0);

    // Listen to voice recognition transcript
    window.addEventListener('outcome:voice-transcript', (e) => {
      const transcript = e.detail.transcript;
      const input = this.container.querySelector('#chat-user-input');
      if (input) {
        input.value = transcript;
        this.handleCustomSend(transcript);
      }
    });
  }

  render() {
    this.container.innerHTML = `
      <div class="split-pane-layout">
        <!-- Main Chat Area -->
        <div class="pane-primary">
          <!-- Channel Toolbar -->
          <div class="channel-toolbar">
            <div class="channel-tabs">
              <button class="channel-pill active" data-channel="webchat">
                <span>🌐</span> Web Chat
              </button>
              <button class="channel-pill" data-channel="whatsapp">
                <span>💬</span> WhatsApp
              </button>
              <button class="channel-pill" data-channel="email">
                <span>✉️</span> Email Thread
              </button>
              <button class="channel-pill" data-channel="mobile">
                <span>📱</span> iPhone 16 Pro
              </button>
            </div>

            <div style="display: flex; align-items: center; gap: 8px;">
              <button id="btn-toggle-copilot" class="btn btn-secondary btn-sm" title="Toggle Supervisor Co-Pilot Whisper Mode">
                🎧 Co-Pilot: Off
              </button>
              <button id="btn-toggle-tts" class="btn btn-secondary btn-sm" title="Toggle AI Voice Readout">
                🎙️ Voice AI: Off
              </button>
              <select id="scenario-selector" class="input-control select-control" style="width: auto; font-size: 0.78rem; padding: 6px 28px 6px 10px;">
                ${window.OUTCOME_SCENARIOS.map((sc, i) => `
                  <option value="${i}">${sc.icon} ${sc.title}</option>
                `).join('')}
              </select>
              <button id="btn-replay-scenario" class="btn btn-secondary btn-sm" title="Replay Scenario">
                🔄 Restart
              </button>
            </div>
          </div>

          <!-- Supervisor Co-Pilot Live Whisper Bar -->
          <div id="copilot-whisper-bar" class="copilot-bar" style="display: none; background: rgba(99, 102, 241, 0.12); border-bottom: 1px solid rgba(99, 102, 241, 0.3); padding: 8px 16px; font-size: 0.78rem; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span class="dot-live" style="color: #a5b4fc;"></span>
              <strong style="color: #c7d2fe;">AI Whisper Co-Pilot:</strong>
              <span id="copilot-hint-text" style="color: #e0e7ff;">Customer frustrated regarding damaged goods. Recommended: Auto-approve priority replacement (§4.2).</span>
            </div>
            <div style="display: flex; gap: 6px;">
              <button class="btn btn-primary btn-sm" style="padding: 3px 8px; font-size: 0.7rem;" onclick="window.chatView.executeCopilotAction('approve_replacement')">⚡ 1-Click Dispatch</button>
              <button class="btn btn-secondary btn-sm" style="padding: 3px 8px; font-size: 0.7rem;" onclick="window.chatView.executeCopilotAction('credit_50')">💳 +$50 Credit</button>
            </div>
          </div>

          <!-- Device Mockup Viewport -->
          <div class="chat-device-frame" id="chat-frame-container">
            <!-- Dynamic WhatsApp Header (Visible only in WhatsApp mode) -->
            <div id="whatsapp-custom-header" class="whatsapp-header" style="display: none;">
              <div style="width: 38px; height: 38px; border-radius: 50%; background: #2a3942; display: flex; align-items: center; justify-content: center; font-size: 1.1rem; color: #fff;">
                ⚡
              </div>
              <div style="display: flex; flex-direction: column;">
                <div style="font-weight: 600; font-size: 0.9rem; color: #e9edef;">OutcomeAI Autonomous Teammate</div>
                <div style="font-size: 0.72rem; color: #8696a0;">online · Verified Enterprise Business Account</div>
              </div>
            </div>

            <!-- Dynamic Email Header (Visible only in Email mode) -->
            <div id="email-custom-header" class="email-header-bar" style="display: none;">
              <div class="email-subject" id="email-subject-title">Inquiry: Enterprise Autonomous AI Teammate Deployment (45 Seats)</div>
              <div class="email-meta">To: <code>ai-teammate@cloudscale.net</code> · From: <code>david.c@cloudscale.net</code></div>
            </div>

            <!-- Messages Stream -->
            <div class="messages-container" id="chat-messages-stream">
              <!-- Messages rendered dynamically -->
            </div>
          </div>

          <!-- Chat Input Area -->
          <div class="chat-input-container">
            <!-- Sample Defect Photo Drag & Drop Zone -->
            <div class="vision-dropzone" id="vision-drop-trigger" onclick="window.chatView.triggerVisionDemo()">
              📷 <strong>Computer Vision Defect Inspection:</strong> Click to attach damaged scanner photo (<code>scanner_lens_crack.jpg</code>) for automated warranty verification
            </div>

            <div class="quick-prompts-row" id="quick-prompts-bar">
              <button class="quick-prompt-chip" data-prompt="My barcode scanner glass cracked in transit, order ORD-94281">📦 Damaged Product Claim</button>
              <button class="quick-prompt-chip" data-prompt="We have 45 agents and need pricing for Enterprise AI">💼 Inbound Sales Quote</button>
              <button class="quick-prompt-chip" data-prompt="I need to cancel our $1,200/mo subscription due to budget cuts">💳 SaaS Churn Retention</button>
              <button class="quick-prompt-chip" data-prompt="Our medical centrifuge kit ORD-55201 is stuck at Memphis hub!">🚚 Logistics Delay Reroute</button>
              <button class="quick-prompt-chip" data-prompt="I want a refund for order ORD-77190 delivered 45 days ago">🛡️ Out-of-Policy Refund</button>
            </div>

            <form id="chat-input-form" class="input-box-wrapper">
              <button type="button" id="btn-voice-mic" class="btn btn-icon btn-secondary btn-sm" title="Click to speak voice message">
                🎤
              </button>
              <input type="text" id="chat-user-input" class="chat-input" placeholder="Type a customer request or speak into mic..." autocomplete="off" />
              <button type="submit" class="btn btn-primary btn-sm" style="padding: 6px 14px;">
                <span>Send</span> ⚡
              </button>
            </form>
          </div>
        </div>

        <!-- Right Pane: Customer 360 & Decision Inspector -->
        <div class="pane-secondary" id="customer-inspector-pane">
          <div class="inspector-panel">
            <div class="inspector-section">
              <div class="inspector-title">
                <span>Unified Customer 360</span>
                <span class="badge badge-emerald">Live CRM Sync</span>
              </div>
              <div id="inspector-customer-profile" class="customer-profile-card">
                <!-- Injected customer info -->
              </div>
            </div>

            <div class="inspector-section">
              <div class="inspector-title">
                <span>Real-Time Decision Intelligence</span>
                <span class="badge badge-violet">Policy AI</span>
              </div>
              <div id="inspector-decision-metrics" class="metrics-grid-2">
                <div class="metric-mini-box">
                  <span class="metric-mini-label">Sentiment</span>
                  <span class="metric-mini-val" id="val-sentiment-score">+0.94</span>
                </div>
                <div class="metric-mini-box">
                  <span class="metric-mini-label">Confidence</span>
                  <span class="metric-mini-val" id="val-confidence-score">98.4%</span>
                </div>
                <div class="metric-mini-box">
                  <span class="metric-mini-label">Human Touch</span>
                  <span class="metric-mini-val" id="val-human-involvement">0% Autonomous</span>
                </div>
                <div class="metric-mini-box">
                  <span class="metric-mini-label">SLA Compliance</span>
                  <span class="metric-mini-val" id="val-sla-status">100% Met</span>
                </div>
              </div>
            </div>

            <div class="inspector-section" style="flex: 1;">
              <div class="inspector-title">
                <span>Active Business Systems Logs</span>
                <span class="badge badge-neutral" id="log-count-badge">0 calls</span>
              </div>
              <div id="inspector-live-tools-log" class="code-block" style="height: 200px; font-size: 0.72rem;">
                <span class="code-keyword">// OutcomeAI Event Dispatcher Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Channel switcher
    this.container.querySelectorAll('.channel-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        this.container.querySelectorAll('.channel-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.setChannel(btn.getAttribute('data-channel'));
      });
    });

    // Co-Pilot Whisper toggle
    const copilotBtn = this.container.querySelector('#btn-toggle-copilot');
    const copilotBar = this.container.querySelector('#copilot-whisper-bar');
    if (copilotBtn) {
      copilotBtn.addEventListener('click', () => {
        const isHidden = !copilotBar || copilotBar.style.display === 'none';
        if (copilotBar) copilotBar.style.display = isHidden ? 'flex' : 'none';
        copilotBtn.classList.toggle('active', isHidden);
        copilotBtn.innerText = isHidden ? '🎧 Co-Pilot: On' : '🎧 Co-Pilot: Off';
        window.outcomeApp.showToast(isHidden ? "Supervisor Co-Pilot Whisper Active" : "Co-Pilot Whisper Disabled");
      });
    }

    // Voice TTS toggle
    const ttsBtn = this.container.querySelector('#btn-toggle-tts');
    if (ttsBtn) {
      ttsBtn.addEventListener('click', () => {
        const active = window.voiceEngine.toggleTTS();
        ttsBtn.classList.toggle('active', active);
        ttsBtn.innerText = active ? '🎙️ Voice AI: On' : '🎙️ Voice AI: Off';
        window.outcomeApp.showToast(active ? "AI Voice Synthesis Enabled" : "AI Voice Synthesis Disabled");
      });
    }

    // Voice Mic button
    const micBtn = this.container.querySelector('#btn-voice-mic');
    if (micBtn) {
      micBtn.addEventListener('click', () => {
        if (!window.voiceEngine.isListening) {
          window.voiceEngine.startListening();
          micBtn.classList.add('btn-mic-active');
          window.outcomeApp.showToast("Listening...", "Speak your request clearly into your microphone.");
        } else {
          window.voiceEngine.stopListening();
          micBtn.classList.remove('btn-mic-active');
        }
      });

      window.addEventListener('outcome:voice-listen-ended', () => {
        micBtn.classList.remove('btn-mic-active');
      });
    }

    // Scenario selector
    const scSelect = this.container.querySelector('#scenario-selector');
    if (scSelect) {
      scSelect.addEventListener('change', (e) => {
        this.loadScenario(parseInt(e.target.value));
      });
    }

    // Replay button
    const replayBtn = this.container.querySelector('#btn-replay-scenario');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        const idx = parseInt(scSelect.value || 0);
        this.loadScenario(idx);
      });
    }

    // Quick prompts
    this.container.querySelectorAll('.quick-prompt-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-prompt');
        const input = this.container.querySelector('#chat-user-input');
        if (input) {
          input.value = prompt;
          this.handleCustomSend(prompt);
        }
      });
    });

    // Form submit
    const form = this.container.querySelector('#chat-input-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = this.container.querySelector('#chat-user-input');
        if (input && input.value.trim()) {
          const val = input.value.trim();
          input.value = '';
          this.handleCustomSend(val);
        }
      });
    }
  }

  setChannel(channelName) {
    this.currentChannel = channelName;
    const frame = this.container.querySelector('#chat-frame-container');
    const waHeader = this.container.querySelector('#whatsapp-custom-header');
    const emailHeader = this.container.querySelector('#email-custom-header');

    if (!frame) return;

    frame.className = `chat-device-frame frame-${channelName}`;
    if (waHeader) waHeader.style.display = channelName === 'whatsapp' ? 'flex' : 'none';
    if (emailHeader) emailHeader.style.display = channelName === 'email' ? 'flex' : 'none';
  }

  loadScenario(scenarioIndex) {
    this.currentScenarioIndex = scenarioIndex;
    const scenario = window.OUTCOME_SCENARIOS[scenarioIndex];
    if (!scenario) return;

    // Set context in engine
    window.agentEngine.setContext(scenario.customerId);
    this.updateCustomerInspector(scenario.customerId);

    // Reset stream
    this.messages = [];
    const stream = this.container.querySelector('#chat-messages-stream');
    if (stream) stream.innerHTML = '';

    // Switch channel UI
    this.setChannel(scenario.channel);
    this.container.querySelectorAll('.channel-pill').forEach(b => {
      b.classList.toggle('active', b.getAttribute('data-channel') === scenario.channel);
    });

    // Play scenario steps
    this.playScenarioSequence(scenario);
  }

  async playScenarioSequence(scenario) {
    this.isPlayingScenario = true;
    for (let i = 0; i < scenario.steps.length; i++) {
      if (!this.isPlayingScenario) break;
      const step = scenario.steps[i];
      await new Promise(r => setTimeout(r, step.delay || 800));

      if (step.sender === 'user') {
        this.appendUserMessage(step.text, step.attachment);
        if (window.soundFX) window.soundFX.messageSent();
      } else if (step.sender === 'ai') {
        this.showTypingIndicator();
        await new Promise(r => setTimeout(r, 600));
        this.removeTypingIndicator();

        this.appendAiMessage(step.text, step.thought, step.actionsTaken, step.widgets);
        if (window.soundFX) window.soundFX.messageReceived();

        // Trigger Voice TTS
        window.voiceEngine.speak(step.text);

        // Update inspector values
        if (step.actionsTaken) {
          this.updateToolsLog(step.actionsTaken);
        }
      }
    }
    await new Promise(r => setTimeout(r, 600));
    this.appendReflectionCard(scenario);
    this.isPlayingScenario = false;
  }

  appendUserMessage(text, attachment) {
    const stream = this.container.querySelector('#chat-messages-stream');
    if (!stream) return;

    const row = document.createElement('div');
    row.className = 'message-row user';

    let attachHtml = '';
    if (attachment && attachment.type === 'image') {
      attachHtml = `
        <div style="margin-top: 8px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.2);">
          <img src="${attachment.url}" alt="Attachment" style="max-width: 240px; height: auto; display: block;" />
          <div style="font-size: 0.68rem; padding: 4px 8px; background: rgba(0,0,0,0.5);">${attachment.name}</div>
        </div>
      `;
    }

    row.innerHTML = `
      <div class="avatar avatar-user">👤</div>
      <div class="message-bubble">
        <div class="bubble-content">
          ${OutcomeFormatters.escapeHtml(text).replace(/\n/g, '<br>')}
          ${attachHtml}
        </div>
      </div>
    `;

    stream.appendChild(row);
    stream.scrollTop = stream.scrollHeight;
  }

  appendAiMessage(text, thought, actionsTaken, widgets) {
    const stream = this.container.querySelector('#chat-messages-stream');
    if (!stream) return;

    const row = document.createElement('div');
    row.className = 'message-row ai';

    let thoughtHtml = '';
    if (thought) {
      thoughtHtml = `
        <div class="thought-box">
          <div class="thought-header" onclick="this.parentElement.classList.toggle('collapsed')">
            <span>🧠 Autonomous Reasoning Chain</span>
            <div class="thought-metrics">
              <span>0.38s</span> · <span>98.4% confidence</span>
              <span style="font-size: 0.7rem;">▼</span>
            </div>
          </div>
          <div class="thought-content">
            <div class="thought-step">⚡ ${OutcomeFormatters.escapeHtml(thought)}</div>
          </div>
        </div>
      `;
    }

    let actionsHtml = '';
    if (actionsTaken && actionsTaken.length > 0) {
      actionsHtml = `
        <div class="action-card">
          <div class="action-card-header">
            <span>⚡ Automated System Actions (${actionsTaken.length})</span>
            <span class="badge badge-emerald">Executed</span>
          </div>
          <div class="action-card-body">
            ${actionsTaken.map(act => `
              <div style="padding: 4px 0; border-bottom: 1px solid rgba(255,255,255,0.05); display: flex; justify-content: space-between;">
                <span><strong>${act.tool}:</strong> ${act.action}</span>
                <span class="badge badge-cyan" style="font-size: 0.65rem;">${act.status}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    let widgetsHtml = '';
    if (widgets && widgets.length > 0) {
      widgets.forEach(w => {
        if (w.type === 'replacement_card') {
          widgetsHtml += `
            <div class="action-card" style="background: rgba(16, 185, 129, 0.12); border-color: rgba(16, 185, 129, 0.4);">
              <div class="action-card-header">
                <span>📦 Replacement Dispatched (SAP ERP)</span>
                <span class="badge badge-emerald">${w.orderId}</span>
              </div>
              <div style="font-size: 0.82rem; color: #f8fafc; margin-top: 4px;">
                <strong>${w.item}</strong>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 2px;">
                Carrier: <strong>${w.shipping}</strong> | Tracking: <code class="font-mono">${w.trackingNumber}</code>
              </div>
              <div style="font-size: 0.72rem; color: #34d399; margin-top: 4px;">
                Estimated Arrival: <strong>${w.estimatedDelivery}</strong>
              </div>
            </div>
          `;
        } else if (w.type === 'proposal_card') {
          widgetsHtml += `
            <div class="proposal-card">
              <div class="proposal-header">
                <div class="proposal-title">📑 Enterprise Proposal (${w.quoteId})</div>
                <div class="proposal-amount">${w.amount}</div>
              </div>
              <div style="font-size: 0.8rem; color: #cbd5e1; margin-bottom: 8px;">
                Plan: <strong>${w.plan}</strong> (${w.monthlyRate})
              </div>
              <ul style="font-size: 0.75rem; color: var(--text-secondary); padding-left: 18px; margin-bottom: 10px;">
                ${w.features.map(f => `<li>${f}</li>`).join('')}
              </ul>
              <div style="display: flex; gap: 8px;">
                <button class="btn btn-primary btn-sm" onclick="alert('Proposal ${w.quoteId} signed electronically & synced with Salesforce!')">✍️ Sign Proposal</button>
                <button class="btn btn-secondary btn-sm" onclick="alert('PDF Generated & Downloaded')">📥 Download PDF</button>
              </div>
            </div>
          `;
        } else if (w.type === 'calendar_card') {
          widgetsHtml += `
            <div class="calendar-card">
              <div class="calendar-info">
                <div class="calendar-title">📅 ${w.title}</div>
                <div style="font-size: 0.78rem; color: var(--text-secondary);">Host: ${w.host}</div>
                <div style="font-size: 0.75rem; color: #93c5fd; font-weight: 600;">${w.time}</div>
              </div>
              <a href="${w.meetLink}" target="_blank" class="btn btn-primary btn-sm" style="text-decoration: none;">
                Join Meeting Link ↗
              </a>
            </div>
          `;
        } else if (w.type === 'hitl_notification_card') {
          widgetsHtml += `
            <div class="action-card" style="background: rgba(245, 158, 11, 0.12); border-color: rgba(245, 158, 11, 0.4);">
              <div class="action-card-header" style="color: #fcd34d;">
                <span>🛡️ Escalated to Human Collaboration Queue</span>
                <span class="badge badge-amber">${w.itemId}</span>
              </div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 4px;">
                <strong>Reason:</strong> ${w.reason}
              </div>
              <div style="font-size: 0.75rem; color: #fcd34d; margin-top: 4px;">
                <strong>AI Recommendation:</strong> ${w.suggestedAction}
              </div>
            </div>
          `;
        } else if (w.type === 'retention_card') {
          widgetsHtml += `
            <div class="proposal-card" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%); border-color: rgba(16, 185, 129, 0.35);">
              <div class="proposal-header">
                <div class="proposal-title">🎁 ${w.plan}</div>
                <div class="proposal-amount" style="color: #34d399;">${w.discountedPrice}</div>
              </div>
              <div style="display: flex; gap: 12px; font-size: 0.8rem; margin-bottom: 8px;">
                <span style="text-decoration: line-through; color: var(--text-muted);">Original: ${w.originalPrice}</span>
                <span class="badge badge-emerald font-bold">${w.annualSavings}</span>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 10px;">
                ⚡ Effective: <strong>${w.effectiveDate}</strong> | Stripe Subscription: <code>${w.stripeSubId}</code>
              </div>
              <button class="btn btn-primary btn-sm" onclick="alert('Stripe subscription updated with 20% discount coupon!')">⚡ Confirm Loyalty Discount</button>
            </div>
          `;
        } else if (w.type === 'reroute_card') {
          widgetsHtml += `
            <div class="action-card" style="background: rgba(59, 130, 246, 0.12); border-color: rgba(59, 130, 246, 0.4);">
              <div class="action-card-header" style="color: #60a5fa;">
                <span>🚚 Emergency Medical Jet Courier Dispatched</span>
                <span class="badge badge-cyan">${w.trackingId}</span>
              </div>
              <div style="font-size: 0.82rem; color: #f8fafc; margin-top: 6px;">
                Carrier: <strong>${w.carrier}</strong>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 3px;">
                Route: <code>${w.origin}</code> ➔ <code>${w.destination}</code>
              </div>
              <div style="font-size: 0.75rem; color: #34d399; font-weight: 600; margin-top: 4px;">
                ⏱️ Expected Delivery: <strong>${w.estimatedArrival}</strong>
              </div>
              <div style="font-size: 0.72rem; color: #fbbf24; margin-top: 4px;">
                🎁 ${w.slaCredit}
              </div>
            </div>
          `;
        }
      });
    }

    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');

    row.innerHTML = `
      <div class="avatar avatar-ai">🤖</div>
      <div class="message-bubble" style="max-width: 100%;">
        ${thoughtHtml}
        <div class="bubble-content">
          ${formattedText}
        </div>
        ${actionsHtml}
        ${widgetsHtml}
      </div>
    `;

    stream.appendChild(row);
    stream.scrollTop = stream.scrollHeight;
  }

  showTypingIndicator() {
    const stream = this.container.querySelector('#chat-messages-stream');
    if (!stream) return;
    const existing = stream.querySelector('#typing-indicator-row');
    if (existing) return;

    const row = document.createElement('div');
    row.id = 'typing-indicator-row';
    row.className = 'message-row ai';
    row.innerHTML = `
      <div class="avatar avatar-ai">🤖</div>
      <div class="bubble-content" style="padding: 10px 14px;">
        <div class="typing-dots">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>
    `;
    stream.appendChild(row);
    stream.scrollTop = stream.scrollHeight;
  }

  removeTypingIndicator() {
    const stream = this.container.querySelector('#chat-messages-stream');
    if (!stream) return;
    const existing = stream.querySelector('#typing-indicator-row');
    if (existing) existing.remove();
  }

  async handleCustomSend(text) {
    this.isPlayingScenario = false;
    this.appendUserMessage(text);
    if (window.soundFX) window.soundFX.messageSent();

    this.showTypingIndicator();
    await new Promise(r => setTimeout(r, 700));

    const result = await window.agentEngine.processUserMessage(text, this.currentChannel);
    this.removeTypingIndicator();

    this.appendAiMessage(result.text, result.thought, result.actionsTaken, result.widgets);
    if (window.soundFX) window.soundFX.messageReceived();

    window.voiceEngine.speak(result.text);

    if (result.actionsTaken) {
      this.updateToolsLog(result.actionsTaken);
    }
  }

  executeCopilotAction(actionType) {
    if (actionType === 'approve_replacement') {
      window.outcomeApp.showToast("Co-Pilot Override Executed", "SAP Replacement expedited & Zendesk ticket solved.");
      this.handleCustomSend("I have authorized priority overnight express replacement under policy §4.2.");
    } else if (actionType === 'credit_50') {
      window.outcomeApp.showToast("Stripe Balance Credited", "$50.00 goodwill credit added to customer invoice.");
      this.handleCustomSend("I have also applied a complimentary $50.00 account credit for the inconvenience.");
    }
  }

  appendReflectionCard(scenario) {
    const stream = this.container.querySelector('#chat-messages-stream');
    if (!stream) return;

    const row = document.createElement('div');
    row.className = 'message-row ai animate-fade-in';
    row.innerHTML = `
      <div class="avatar avatar-ai" style="background: var(--grad-emerald);">🧠</div>
      <div style="flex: 1; max-width: 100%;">
        <div class="action-card" style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.12) 0%, rgba(99, 102, 241, 0.1) 100%); border: 1px solid rgba(16, 185, 129, 0.4);">
          <div class="action-card-header" style="color: #34d399;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span>🛡️ Autonomous Post-Action Retrospective & Self-Healing Loop</span>
            </div>
            <span class="badge badge-emerald">Policy Verified 100%</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 8px; margin: 10px 0; font-size: 0.75rem;">
            <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
              <div style="color: var(--text-muted); font-size: 0.68rem;">RESOLUTION TIME</div>
              <div style="font-weight: 700; color: #34d399; font-size: 0.9rem;">0.38s (Instant)</div>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
              <div style="color: var(--text-muted); font-size: 0.68rem;">CSAT SHIFT</div>
              <div style="font-weight: 700; color: #60a5fa; font-size: 0.9rem;">+1.56 (5/5 Delighted)</div>
            </div>
            <div style="background: rgba(0,0,0,0.3); padding: 8px; border-radius: 6px;">
              <div style="color: var(--text-muted); font-size: 0.68rem;">HUMAN TOUCH COST</div>
              <div style="font-weight: 700; color: #a5b4fc; font-size: 0.9rem;">$0.00 (Zero Bottleneck)</div>
            </div>
          </div>
          <div style="font-size: 0.78rem; color: #cbd5e1; line-height: 1.4;">
            💡 <strong>Autonomous Retrospective Learning:</strong> Validated edge condition against Warranty Policy §4.2. Vector embeddings updated in RAG memory store for future similar tickets.
          </div>
          <button class="btn btn-success btn-sm" style="margin-top: 10px; font-size: 0.72rem; padding: 4px 10px;" onclick="window.outcomeApp.showToast('Policy Patch Committed', 'Auto-indexed new edge rule into Vector Knowledge Base.')">
            ⚡ Auto-commit Policy Patch to RAG Store
          </button>
        </div>
      </div>
    `;
    stream.appendChild(row);
    stream.scrollTop = stream.scrollHeight;
  }

  triggerVisionDemo() {
    // Show multimodal vision inspection modal
    let modal = document.getElementById('vision-inspection-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'vision-inspection-modal';
      modal.className = 'modal-overlay active';
      modal.innerHTML = `
        <div class="blueprint-modal-container" style="max-width: 720px;">
          <div class="blueprint-modal-header">
            <div style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 1.4rem;">📷</span>
              <div>
                <h3 style="font-size: 1.05rem; font-weight: 700; color: #fff; margin: 0;">Multimodal Computer Vision Defect & OCR Inspector</h3>
                <div style="font-size: 0.72rem; color: var(--text-muted);">Real-time Bounding Box Damage Detection & SAP Serial Ledger Verification</div>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="document.getElementById('vision-inspection-modal').remove()">✕ Close</button>
          </div>
          <div class="blueprint-modal-body">
            <div style="position: relative; border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.2);">
              <img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80" style="width: 100%; height: 260px; object-fit: cover; display: block;" />
              <!-- Bounding Box 1: Glass Crack -->
              <div style="position: absolute; top: 35%; left: 45%; width: 140px; height: 90px; border: 2px solid #ef4444; background: rgba(239, 68, 68, 0.25); border-radius: 4px; display: flex; align-items: flex-start; padding: 4px;">
                <span style="background: #ef4444; color: #fff; font-size: 0.65rem; font-weight: 700; padding: 2px 4px; border-radius: 2px;">[DEFECT: CRACK_LENS 98.4%]</span>
              </div>
              <!-- Bounding Box 2: Serial Number OCR -->
              <div style="position: absolute; bottom: 15%; right: 15%; width: 150px; height: 50px; border: 2px solid #34d399; background: rgba(16, 185, 129, 0.25); border-radius: 4px; display: flex; align-items: flex-start; padding: 4px;">
                <span style="background: #34d399; color: #000; font-size: 0.65rem; font-weight: 800; padding: 2px 4px; border-radius: 2px;">[OCR: SN-8492-X4 MATCH]</span>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.78rem;">
              <div style="background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.3); padding: 12px; border-radius: 6px;">
                <div style="font-weight: 700; color: #34d399;">✅ SAP Serial Match Confirmed</div>
                <div style="color: #cbd5e1; margin-top: 4px;">Serial <code>SN-8492-X4</code> registered to Elena Rostova (Order #ORD-94281). Active warranty valid through Aug 2028.</div>
              </div>
              <div style="background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.3); padding: 12px; border-radius: 6px;">
                <div style="font-weight: 700; color: #a5b4fc;">⚡ Autonomous Action Authorization</div>
                <div style="color: #cbd5e1; margin-top: 4px;">Policy §4.2 VIP replacement authorized with zero human intervention required.</div>
              </div>
            </div>
            <button class="btn btn-primary" style="width: 100%;" onclick="document.getElementById('vision-inspection-modal').remove(); window.chatView.handleCustomSend('I have attached the inspection photo for serial SN-8492-X4.');">
              ▶ Auto-Authorize Replacement in Chat
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }
  }

  updateCustomerInspector(customerId) {
    const cust = window.OUTCOME_CUSTOMERS[customerId];
    const profileEl = this.container.querySelector('#inspector-customer-profile');
    if (!cust || !profileEl) return;

    profileEl.innerHTML = `
      <div class="profile-header">
        <div class="profile-avatar">${cust.name.split(' ').map(n=>n[0]).join('')}</div>
        <div class="profile-info">
          <div class="profile-name">${cust.name}</div>
          <div class="profile-company">${cust.company} · <span class="badge badge-violet" style="font-size: 0.65rem;">${cust.tier}</span></div>
        </div>
      </div>
      <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 4px;">
        <div><strong>Email:</strong> ${cust.email}</div>
        <div><strong>Lifetime Value:</strong> <span style="color: #34d399; font-weight: 700;">${cust.ltv}</span></div>
        <div><strong>CRM Stage:</strong> ${cust.crm.dealStage}</div>
      </div>
    `;
  }

  updateToolsLog(actions) {
    const logEl = this.container.querySelector('#inspector-live-tools-log');
    const badgeEl = this.container.querySelector('#log-count-badge');
    if (!logEl) return;

    if (badgeEl) badgeEl.innerText = `${actions.length} calls executed`;

    let html = '';
    actions.forEach(a => {
      html += `\n<span class="code-keyword">> [EXEC]</span> <span class="code-key">${a.tool}</span>: ${a.action}\n  <span class="code-string">Status:</span> ${a.status}\n  <span class="code-number">Detail:</span> ${a.details}\n`;
    });

    logEl.innerHTML = html;
  }
}

window.chatView = new ChatView();

