// Voice Calling & Telephony AI Teammate Component
class PhoneView {
  constructor() {
    this.inCall = false;
    this.callTimer = null;
    this.seconds = 0;
    this.animFrame = null;
    this.selectedContact = 'elena';

    this.callScripts = {
      elena: {
        name: "Elena Rostova",
        company: "Apex Dynamics Corp",
        tier: "Enterprise VIP (Tier 1)",
        avatar: "ER",
        phone: "+1 (555) 389-4421",
        dialogue: [
          { speaker: "Customer", text: "Hello! I'm calling about our laser barcode scanner order ORD-94281 that arrived today. The lens is damaged and we have shifts starting tonight in Chicago.", delay: 800 },
          { speaker: "OutcomeAI", text: "Hello Elena, thank you for calling. I have your Apex Dynamics account and order #ORD-94281 open in front of me right now.", delay: 2500, action: "Salesforce CRM: Identified Elena Rostova (VIP Tier 1)" },
          { speaker: "Customer", text: "Can you get a replacement to our Chicago warehouse before tomorrow morning?", delay: 1800 },
          { speaker: "OutcomeAI", text: "Absolutely, Elena. Under your 24-Month Pro Care warranty, I have just dispatched an express replacement unit from our Chicago Central Depot via FedEx Priority Overnight. Your tracking number is FDX-77401-EXPRESS, arriving tomorrow by 10:30 AM.", delay: 3200, action: "SAP ERP: Created Replacement #ORD-94302-R (Tracking: FDX-77401-EXPRESS)" },
          { speaker: "Customer", text: "That is phenomenal service. Thank you so much!", delay: 1500 },
          { speaker: "OutcomeAI", text: "You're very welcome! I've sent the return shipping label and tracking confirmation directly to your email. Have a wonderful day!", delay: 2500, action: "Zendesk: Call Logged & Ticket #TICK-9042 Auto-Resolved (CSAT 5/5)" }
        ]
      },
      david: {
        name: "David Chen",
        company: "CloudScale Systems",
        tier: "Inbound Enterprise Lead ($72k ARR)",
        avatar: "DC",
        phone: "+1 (415) 782-9014",
        dialogue: [
          { speaker: "Customer", text: "Hi, I'm VP of IT at CloudScale. We have 45 agents and want to know how fast OutcomeAI can connect with our SAP and Salesforce systems.", delay: 800 },
          { speaker: "OutcomeAI", text: "Hello David! OutcomeAI features native pre-built bi-directional connectors for SAP S/4HANA and Salesforce. Average enterprise deployment takes under 14 days with zero downtime.", delay: 2800, action: "Decision Engine: BANT Lead Score 88/100" },
          { speaker: "Customer", text: "Can we schedule a 30-minute technical architecture walk-through for our team this Thursday afternoon?", delay: 1800 },
          { speaker: "OutcomeAI", text: "I have coordinated our Lead Solutions Architect, Sarah Jenkins. I've placed a confirmed hold on Thursday at 2:30 PM PST and sent calendar invites with a Google Meet link to your inbox.", delay: 3000, action: "Google Calendar: Booked Technical Architecture Review (Host: Sarah Jenkins)" }
        ]
      }
    };
  }

  init() {
    this.container = document.getElementById('phone-view-container');
    if (!this.container) return;
    this.render();
    this.bindEvents();
    this.initWaveform();
  }

  render() {
    const contact = this.callScripts[this.selectedContact];

    this.container.innerHTML = `
      <div class="phone-viewport">
        <!-- Left Side: Phone Dialer & Caller ID Card -->
        <div class="phone-left-panel">
          <div style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
            📞 AI Telephony & Voice Agent
          </div>

          <div class="phone-dialer-card">
            <div class="caller-avatar-circle ${this.inCall ? 'in-call' : ''}" id="phone-avatar-circle">
              ${contact.avatar}
            </div>
            <div style="text-align: center;">
              <h3 style="font-size: 1.15rem; color: #f8fafc;" id="phone-caller-name">${contact.name}</h3>
              <div style="font-size: 0.78rem; color: #94a3b8;" id="phone-caller-company">${contact.company}</div>
              <div style="font-size: 0.72rem; color: #67e8f9; margin-top: 2px;" id="phone-caller-tier">${contact.tier}</div>
            </div>

            <div class="call-timer-badge" id="phone-call-timer">00:00</div>

            <div style="display: flex; gap: 12px; width: 100%;">
              ${!this.inCall ? `
                <button id="btn-start-call" class="btn btn-success" style="flex: 1; padding: 12px; font-size: 0.95rem;">
                  📞 Start Autonomous Call
                </button>
              ` : `
                <button id="btn-end-call" class="btn btn-danger" style="flex: 1; padding: 12px; font-size: 0.95rem;">
                  🔴 End Call
                </button>
              `}
            </div>
          </div>

          <div class="glass-panel" style="padding: 14px;">
            <label style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted);">Simulate Caller:</label>
            <select id="phone-contact-select" class="input-control select-control" style="margin-top: 6px; font-size: 0.8rem;">
              <option value="elena" ${this.selectedContact === 'elena' ? 'selected' : ''}>Elena Rostova (Damaged Scanner Support)</option>
              <option value="david" ${this.selectedContact === 'david' ? 'selected' : ''}>David Chen (Enterprise Sales Inquiry)</option>
            </select>
          </div>
        </div>

        <!-- Center / Right Panel: Live Oscilloscope & Audio Transcription -->
        <div class="phone-center-panel">
          <!-- Audio Oscilloscope Visualizer -->
          <div class="waveform-container">
            <div style="display: flex; justify-content: space-between; align-items: center; z-index: 2;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span class="dot-live" style="color: ${this.inCall ? '#10b981' : '#64748b'};"></span>
                <span style="font-size: 0.78rem; font-weight: 700; color: #e2e8f0;">Voice Stream Oscilloscope</span>
              </div>
              <span class="badge ${this.inCall ? 'badge-emerald' : 'badge-neutral'}" id="phone-stream-status">
                ${this.inCall ? '🎙️ 48kHz HD Audio Live' : 'Idle'}
              </span>
            </div>
            <canvas id="audio-waveform-canvas" class="waveform-canvas"></canvas>
          </div>

          <!-- Live Mid-Call Execution Log & Transcripts -->
          <div class="glass-panel" style="flex: 1; padding: 20px; display: flex; flex-direction: column; gap: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px;">
              <div style="font-weight: 700; font-size: 0.95rem; color: #f8fafc;">
                Real-Time Voice Call Transcription & Mid-Call Tool Execution
              </div>
              <span class="badge badge-violet">Live NLP Stream</span>
            </div>

            <div id="phone-transcripts-container" style="flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; max-height: 280px;">
              <div style="text-align: center; color: var(--text-muted); font-size: 0.82rem; padding: 40px 0;">
                Click <strong>"📞 Start Autonomous Call"</strong> to simulate a real-time incoming AI phone call with live audio synthesis and automated system actions.
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const startBtn = this.container.querySelector('#btn-start-call');
    const endBtn = this.container.querySelector('#btn-end-call');
    const select = this.container.querySelector('#phone-contact-select');

    if (startBtn) startBtn.addEventListener('click', () => this.startCall());
    if (endBtn) endBtn.addEventListener('click', () => this.endCall());

    if (select) {
      select.addEventListener('change', (e) => {
        this.selectedContact = e.target.value;
        this.render();
        this.bindEvents();
        this.initWaveform();
      });
    }
  }

  initWaveform() {
    const canvas = this.container.querySelector('#audio-waveform-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let offset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = this.inCall ? '#10b981' : '#334155';
      ctx.beginPath();

      const sliceWidth = canvas.width / 60;
      let x = 0;

      for (let i = 0; i < 60; i++) {
        const amp = this.inCall ? (Math.sin(i * 0.2 + offset) * 25 * Math.random() + 5) : 0;
        const y = canvas.height / 2 + amp;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);

        x += sliceWidth;
      }

      ctx.stroke();
      offset += 0.15;
      this.animFrame = requestAnimationFrame(draw);
    };

    draw();
  }

  async startCall() {
    this.inCall = true;
    this.seconds = 0;
    this.render();
    this.bindEvents();
    this.initWaveform();

    if (window.soundFX) window.soundFX.actionExecuted();

    // Start timer
    this.callTimer = setInterval(() => {
      this.seconds++;
      const mins = String(Math.floor(this.seconds / 60)).padStart(2, '0');
      const secs = String(this.seconds % 60).padStart(2, '0');
      const timerEl = this.container.querySelector('#phone-call-timer');
      if (timerEl) timerEl.innerText = `${mins}:${secs}`;
    }, 1000);

    // Stream transcript lines
    const script = this.callScripts[this.selectedContact];
    const transContainer = this.container.querySelector('#phone-transcripts-container');
    if (transContainer) transContainer.innerHTML = '';

    for (const step of script.dialogue) {
      if (!this.inCall) break;
      await new Promise(r => setTimeout(r, step.delay || 1500));

      const row = document.createElement('div');
      row.className = 'transcript-bubble-row';
      const isAi = step.speaker === 'OutcomeAI';

      row.innerHTML = `
        <span class="transcript-tag ${isAi ? 'ai' : 'customer'}">${step.speaker}</span>
        <div style="flex: 1; background: ${isAi ? 'rgba(16,185,129,0.08)' : 'rgba(59,130,246,0.08)'}; border: 1px solid ${isAi ? 'rgba(16,185,129,0.25)' : 'rgba(59,130,246,0.25)'}; padding: 10px 14px; border-radius: 8px; font-size: 0.85rem; color: #f8fafc;">
          ${step.text}
          ${step.action ? `
            <div style="margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255,255,255,0.06); font-size: 0.74rem; color: #34d399; font-weight: 600;">
              ⚡ Action Executed: ${step.action}
            </div>
          ` : ''}
        </div>
      `;

      if (transContainer) {
        transContainer.appendChild(row);
        transContainer.scrollTop = transContainer.scrollHeight;
      }

      if (isAi) {
        window.voiceEngine.speak(step.text);
      }
    }
  }

  endCall() {
    this.inCall = false;
    clearInterval(this.callTimer);
    if (window.speechSynthesis) window.speechSynthesis.cancel();
    this.render();
    this.bindEvents();
    this.initWaveform();
    window.outcomeApp.showToast("Call Concluded", "Call transcript and automated actions synced to Salesforce.");
  }
}

window.phoneView = new PhoneView();
