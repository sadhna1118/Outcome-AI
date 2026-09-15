// Interactive Guided Pitch & Storyboard Presentation Engine
class PitchPresentationController {
  constructor() {
    this.currentSlide = 0;
    this.timerSeconds = 180; // 3 Minutes
    this.timerInterval = null;
    this.timerRunning = false;

    this.slides = [
      {
        act: "ACT 1: THE CORE PROBLEM",
        title: "Why 95% of AI Chatbots Fail in Enterprise",
        subtitle: "Chatbots answer questions with FAQ links; they don't solve the customer's actual problem.",
        icon: "❌",
        keyPoints: [
          "<strong>The Disconnect:</strong> Traditional chatbots are passive text-generators with no access to business systems.",
          "<strong>The Human Bottleneck:</strong> When a customer needs a replacement, refund, or custom enterprise quote, the bot creates a ticket and asks them to wait 48 hours for a human.",
          "<strong>The OutcomeAI Mission:</strong> <em>Build AI teammates that don't just respond; they get the job done.</em>"
        ],
        liveActionBtn: {
          label: "⚔️ Open Battle Arena (Side-by-Side Proof)",
          viewId: "battle",
          action: () => { if (window.battleView) window.battleView.startBattle(); }
        }
      },
      {
        act: "ACT 2: SYSTEM ARCHITECTURE",
        title: "The 5-Pillar Autonomous Teammate Architecture",
        subtitle: "Context Graph + Multi-Agent Consensus + Cross-System Tools + HITL Safety Guardrails.",
        icon: "🏛️",
        keyPoints: [
          "<strong>1. Unified Context Graph:</strong> Ingests Customer 360 data (LTV, Tier, Sentiment, Purchase History) from Salesforce & SAP.",
          "<strong>2. Multi-Agent Swarm (CrewAI/LangGraph):</strong> 4 specialized sub-agents (Triage, Policy, Execution, QA) collaborate and reach consensus.",
          "<strong>3. Cross-System Hands:</strong> Direct bi-directional API execution across Stripe, Salesforce, SAP ERP, Zendesk, and Twilio.",
          "<strong>4. Human-in-the-Loop (HITL):</strong> Confidence scoring (0-100%) routes policy exceptions to supervisor queue for 1-click approvals."
        ],
        liveActionBtn: {
          label: "🤖 Open Multi-Agent Swarm View",
          viewId: "swarm",
          action: () => {}
        }
      },
      {
        act: "ACT 3: 100% AUTONOMOUS CUSTOMER SERVICE",
        title: "Damaged Hardware Claim Resolved in 0.38 Seconds",
        subtitle: "Computer Vision Defect Inspection ➔ SAP ERP Replacement ➔ Zendesk Auto-Resolved.",
        icon: "📦",
        keyPoints: [
          "<strong>Vision Defect OCR:</strong> Analyzes Elena's cracked scanner photo, matches serial `SN-8492-X4` against SAP warranty ledger.",
          "<strong>Cross-System Execution:</strong> Dispatches FedEx Priority Overnight replacement order `#ORD-94302-R` from Chicago Depot.",
          "<strong>Zero Human Touch:</strong> Closes Zendesk ticket `#TICK-9042` with 5/5 CSAT in 0.38 seconds."
        ],
        liveActionBtn: {
          label: "📦 Launch Live Damaged Claim Demo",
          viewId: "chat",
          action: () => { if (window.chatView) window.chatView.loadScenario(0); }
        }
      },
      {
        act: "ACT 4: PROACTIVE MITIGATION",
        title: "Pre-Cognitive Action: Fixing Issues Before Customers Call",
        subtitle: "Cloud Telemetry Monitoring ➔ Automated Emergency Courier Reroute ➔ Proactive Outreach.",
        icon: "🔮",
        keyPoints: [
          "<strong>Anomaly Detection:</strong> FedEx weather grounding at Memphis hub delays mission-critical hospital centrifuge (ORD-55201).",
          "<strong>Pre-Cognitive Reasoning:</strong> Policy §7.2 auto-authorizes emergency Dallas stock reservation and Same-Day Jet Courier.",
          "<strong>Proactive Outreach:</strong> Dispatches WhatsApp notification with live flight GPS tracker before Dr. Zhang even notices the delay!"
        ],
        liveActionBtn: {
          label: "🔮 Trigger Live Proactive Logistics Demo",
          viewId: "proactive",
          action: () => { if (window.proactiveView) window.proactiveView.runLogisticsSimulation(); }
        }
      },
      {
        act: "ACT 5: ENTERPRISE STRESS TEST",
        title: "Chaos Arena: 100 Requests/Sec & Prompt Injection Defense",
        subtitle: "Adversarial high-load simulation proving multi-tenant scalability and guardrail safety.",
        icon: "🎮",
        keyPoints: [
          "<strong>2,400 Req/Min Peak Load:</strong> Processes concurrent customer claims, sales RFPs, and logistics reroutes with zero degradation.",
          "<strong>100% Guardrail Intercept:</strong> Neutralizes prompt injections, jailbreaks, and unauthorized refund attempts in < 12ms.",
          "<strong>Live Value Ticker:</strong> Dollars saved counter rises continuously as actions execute autonomously."
        ],
        liveActionBtn: {
          label: "🔥 Launch Chaos Test (100 Req/s)",
          viewId: "chaos",
          action: () => { if (window.chaosView) window.chaosView.startChaos(); }
        }
      },
      {
        act: "ACT 6: MEASURABLE BUSINESS ROI",
        title: "Delivering Measurable Outcomes & Executive Value",
        subtitle: "72.4% Autonomous Resolution ➔ $1.18M Annual Net Savings ➔ 18-Day Payback Period.",
        icon: "💰",
        keyPoints: [
          "<strong>Cost Reduction:</strong> Cost per resolved outcome drops from $6.80 (human rep) to $0.42 (OutcomeAI).",
          "<strong>Speed:</strong> Average issue resolution drops from 4.2 hours to 42 seconds (98.6% faster).",
          "<strong>Sales Acceleration:</strong> B2B lead qualification (BANT 88/100) and instant proposal generation boosts meeting velocity by 34%."
        ],
        liveActionBtn: {
          label: "📊 Open Interactive ROI Calculator",
          viewId: "analytics",
          action: () => {}
        }
      }
    ];
  }

  init() {
    this.createModalDOM();
    this.bindEvents();
  }

  createModalDOM() {
    let modal = document.getElementById('pitch-presentation-modal');
    if (modal) return;

    modal = document.createElement('div');
    modal.id = 'pitch-presentation-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = `
      <div class="pitch-modal-box">
        <!-- Pitch Header -->
        <div class="pitch-header">
          <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 38px; height: 38px; border-radius: 10px; background: var(--grad-primary); display: flex; align-items: center; justify-content: center; font-size: 1.3rem;">🎬</div>
            <div>
              <div style="font-weight: 800; font-size: 1.1rem; color: #fff;">OutcomeAI 3.0 · Interactive Pitch & Demo Storyboard</div>
              <div style="font-size: 0.72rem; color: var(--text-muted);">Step-by-step guided presentation for judges, executives, and investors</div>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 14px;">
            <!-- Pitch Timer -->
            <div class="pitch-timer-pill" id="pitch-timer-badge">
              <span>⏱️ Pitch Clock:</span>
              <strong id="pitch-timer-digits" style="color: #38bdf8;">03:00</strong>
            </div>
            <button id="btn-toggle-pitch-timer" class="btn btn-secondary btn-sm" style="padding: 4px 10px; font-size: 0.72rem;">▶ Start Timer</button>
            <button id="btn-close-pitch-modal" class="btn btn-secondary btn-sm" style="padding: 6px 12px;">✕ Close</button>
          </div>
        </div>

        <!-- Slide Progress Bar -->
        <div style="height: 4px; background: rgba(255,255,255,0.08); display: flex;">
          ${this.slides.map((_, i) => `
            <div id="pitch-step-bar-${i}" style="flex: 1; height: 100%; background: ${i === 0 ? 'var(--primary)' : 'transparent'}; transition: all 0.3s ease;"></div>
          `).join('')}
        </div>

        <!-- Slide Content Body -->
        <div class="pitch-body" id="pitch-slide-content">
          <!-- Dynamically Injected -->
        </div>

        <!-- Slide Navigation Footer -->
        <div class="pitch-footer">
          <div style="font-size: 0.8rem; color: var(--text-muted);" id="pitch-slide-counter">
            Slide 1 of 6
          </div>

          <div style="display: flex; gap: 10px;">
            <button id="btn-prev-slide" class="btn btn-secondary btn-sm" style="padding: 8px 16px;">
              ◀ Previous
            </button>
            <button id="btn-jump-live-screen" class="btn btn-primary btn-sm" style="padding: 8px 18px; background: var(--grad-emerald);">
              🚀 Jump to Live Demo
            </button>
            <button id="btn-next-slide" class="btn btn-primary btn-sm" style="padding: 8px 18px;">
              Next Slide ▶
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
  }

  bindEvents() {
    const modal = document.getElementById('pitch-presentation-modal');
    const closeBtn = document.getElementById('btn-close-pitch-modal');
    const prevBtn = document.getElementById('btn-prev-slide');
    const nextBtn = document.getElementById('btn-next-slide');
    const jumpBtn = document.getElementById('btn-jump-live-screen');
    const timerToggleBtn = document.getElementById('btn-toggle-pitch-timer');

    if (closeBtn && modal) {
      closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        if (window.soundFX) window.soundFX.click();
      });
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (this.currentSlide > 0) {
          this.currentSlide--;
          this.renderSlide();
          if (window.soundFX) window.soundFX.click();
        }
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (this.currentSlide < this.slides.length - 1) {
          this.currentSlide++;
          this.renderSlide();
          if (window.soundFX) window.soundFX.click();
        }
      });
    }

    if (jumpBtn) {
      jumpBtn.addEventListener('click', () => {
        const slide = this.slides[this.currentSlide];
        if (slide && slide.liveActionBtn) {
          if (modal) modal.classList.remove('active');
          window.outcomeApp.switchView(slide.liveActionBtn.viewId);
          setTimeout(() => {
            slide.liveActionBtn.action();
          }, 300);
          window.outcomeApp.showToast(`Navigated to ${slide.liveActionBtn.viewId.toUpperCase()}`, "Live action triggered autonomously.");
        }
      });
    }

    if (timerToggleBtn) {
      timerToggleBtn.addEventListener('click', () => {
        if (!this.timerRunning) {
          this.startTimer();
          timerToggleBtn.innerText = '⏸️ Pause';
        } else {
          this.pauseTimer();
          timerToggleBtn.innerText = '▶ Resume';
        }
      });
    }
  }

  open() {
    const modal = document.getElementById('pitch-presentation-modal');
    if (modal) {
      modal.classList.add('active');
      this.currentSlide = 0;
      this.renderSlide();
      if (window.soundFX) window.soundFX.success();
    }
  }

  renderSlide() {
    const slide = this.slides[this.currentSlide];
    const container = document.getElementById('pitch-slide-content');
    const counter = document.getElementById('pitch-slide-counter');
    const jumpBtn = document.getElementById('btn-jump-live-screen');
    const prevBtn = document.getElementById('btn-prev-slide');
    const nextBtn = document.getElementById('btn-next-slide');

    if (!slide || !container) return;

    if (counter) counter.innerText = `Slide ${this.currentSlide + 1} of ${this.slides.length}`;
    if (prevBtn) prevBtn.disabled = this.currentSlide === 0;
    if (nextBtn) {
      nextBtn.innerText = this.currentSlide === this.slides.length - 1 ? '🎉 Finish Pitch' : 'Next Slide ▶';
    }

    if (jumpBtn && slide.liveActionBtn) {
      jumpBtn.innerHTML = `🚀 ${slide.liveActionBtn.label}`;
    }

    // Update progress bars
    for (let i = 0; i < this.slides.length; i++) {
      const bar = document.getElementById(`pitch-step-bar-${i}`);
      if (bar) {
        bar.style.background = i <= this.currentSlide ? 'var(--primary)' : 'transparent';
      }
    }

    container.innerHTML = `
      <div class="pitch-slide-card animate-fade-in">
        <div class="pitch-act-badge">${slide.act}</div>
        <div style="display: flex; align-items: center; gap: 12px; margin-top: 8px;">
          <span style="font-size: 2.2rem;">${slide.icon}</span>
          <div>
            <h2 style="font-size: 1.45rem; font-weight: 800; color: #fff; margin: 0;">${slide.title}</h2>
            <div style="font-size: 0.85rem; color: #38bdf8; margin-top: 4px;">${slide.subtitle}</div>
          </div>
        </div>

        <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 12px;">
          ${slide.keyPoints.map(pt => `
            <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid rgba(255,255,255,0.08); border-left: 4px solid var(--primary); border-radius: 8px; padding: 12px 16px; font-size: 0.88rem; color: #e2e8f0; line-height: 1.5;">
              ${pt}
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  startTimer() {
    this.timerRunning = true;
    this.timerInterval = setInterval(() => {
      if (this.timerSeconds > 0) {
        this.timerSeconds--;
        const mins = String(Math.floor(this.timerSeconds / 60)).padStart(2, '0');
        const secs = String(this.timerSeconds % 60).padStart(2, '0');
        const el = document.getElementById('pitch-timer-digits');
        if (el) el.innerText = `${mins}:${secs}`;
      } else {
        this.pauseTimer();
      }
    }, 1000);
  }

  pauseTimer() {
    this.timerRunning = false;
    clearInterval(this.timerInterval);
  }
}

window.pitchPresentation = new PitchPresentationController();
