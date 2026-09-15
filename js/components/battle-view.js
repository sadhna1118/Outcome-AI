// Battle Arena: OutcomeAI vs Traditional Chatbot
class BattleView {
  constructor() {
    this.selectedScenarioIndex = 0;
    this.isRunning = false;

    this.scenarios = [
      {
        id: "battle_1",
        title: "Damaged Hardware Replacement (Urgent)",
        customerPrompt: "Our $350 laser scanner Pro X4 arrived with a cracked glass lens. We have warehouse shifts starting tonight and need an express replacement sent to our Chicago depot immediately.",
        traditional: {
          reply: "Thank you for contacting Support. We are sorry to hear your item was damaged. Please fill out our Return Form (link: support.company.com/rma-form) and email high-resolution photos along with your purchase invoice to claims@company.com. Our tier-1 review team will respond within 3 to 5 business days.",
          time: "4.5 Days",
          cost: "$18.50",
          actions: 0,
          csat: "⭐☆☆☆☆ (1/5 - Frustrated)",
          humanEffort: "100% (Manual verification, manual SAP entry, manual email)"
        },
        outcomeAi: {
          reply: "I verified your **24-Month Pro Care Warranty** for order **#ORD-94281**. A replacement unit has been auto-dispatched from our **Chicago Central Depot** via **FedEx Priority Overnight** (Tracking: `FDX-77401-EXPRESS`). Arrival: Tomorrow 10:30 AM. Pre-paid return label emailed to `elena.r@apexdynamics.io`.",
          time: "42 Seconds",
          cost: "$0.42",
          actions: 4,
          csat: "⭐⭐⭐⭐⭐ (5/5 - Delighted)",
          humanEffort: "0% Autonomous",
          actionsList: [
            "Query Salesforce CRM Customer 360",
            "Validate Warranty §4.2 Policy",
            "Dispatch SAP S/4HANA Replacement Order",
            "Create & Auto-Solve Zendesk Ticket #9042"
          ]
        }
      },
      {
        id: "battle_2",
        title: "High-Value Enterprise Inbound Lead ($72k ARR)",
        customerPrompt: "We have 45 support agents and 200,000 monthly tickets on Zendesk & Salesforce. We need custom pricing for enterprise autonomous AI and want to book a technical architecture call this Thursday.",
        traditional: {
          reply: "Thanks for your interest in our product! Our standard plans start at $29/user. For enterprise quotes, please fill out our contact sales form and a sales representative will reach out within 24-48 business hours to schedule a discovery call.",
          time: "48 Hours",
          cost: "$45.00 (SDR labor)",
          actions: 0,
          csat: "⭐⭐☆☆☆ (Delayed Lead)",
          humanEffort: "100% (Manual SDR qualification, manual quote, manual scheduling)"
        },
        outcomeAi: {
          reply: "Hello David! Based on your 45 agents and 200k monthly volume, OutcomeAI automates 70%+ of Tier-1/2 tickets. I generated **Custom Enterprise Quote #QUO-2026-88 ($6,000/mo / $72k ARR)** and booked a Technical Architecture Session with Lead Architect **Sarah Jenkins** for Thursday 2:30 PM PST.",
          time: "38 Seconds",
          cost: "$0.38",
          actions: 4,
          csat: "⭐⭐⭐⭐⭐ (Instant VIP Lead)",
          humanEffort: "0% Autonomous",
          actionsList: [
            "BANT Lead Scoring: 88/100 (VP IT Authority)",
            "Create Salesforce Opportunity ($72,000 ARR)",
            "Generate Custom PDF Enterprise Quote",
            "Book Google Calendar Architecture Review Call"
          ]
        }
      }
    ];
  }

  init() {
    this.container = document.getElementById('battle-view-container');
    if (!this.container) return;
    this.render();
    this.bindEvents();
  }

  render() {
    const sc = this.scenarios[this.selectedScenarioIndex];

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; height: 100%; width: 100%; overflow-y: auto; padding: 24px; gap: 20px;">
        <!-- Header Banner -->
        <div style="display: flex; justify-content: space-between; align-items: center; background: linear-gradient(135deg, rgba(99,102,241,0.15) 0%, rgba(236,72,153,0.1) 100%); border: 1px solid rgba(99,102,241,0.3); border-radius: var(--radius-lg); padding: 20px 24px;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2 style="font-size: 1.5rem; background: var(--grad-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
                ⚡ Battle Arena: OutcomeAI vs Traditional Chatbot
              </h2>
              <span class="badge badge-emerald">Head-to-Head Benchmark</span>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 4px;">
              See the direct difference between a basic Q&A chatbot and an autonomous digital teammate that executes business actions.
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 12px;">
            <select id="battle-scenario-select" class="input-control select-control" style="width: auto; font-size: 0.85rem;">
              ${this.scenarios.map((s, i) => `
                <option value="${i}" ${i === this.selectedScenarioIndex ? 'selected' : ''}>${s.title}</option>
              `).join('')}
            </select>
            <button id="btn-run-battle" class="btn btn-primary" style="padding: 10px 20px; font-size: 0.9rem;">
              ⚔️ Run Battle Comparison
            </button>
          </div>
        </div>

        <!-- Customer Inbound Request Card -->
        <div class="glass-panel" style="padding: 16px 20px; border-left: 4px solid #38bdf8;">
          <div style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: #38bdf8; margin-bottom: 4px;">
            Incoming Customer Request (Shared Prompt)
          </div>
          <div style="font-size: 0.95rem; font-weight: 500; color: #f8fafc; font-style: italic;">
            "${sc.customerPrompt}"
          </div>
        </div>

        <!-- Side-by-Side Comparison Arena -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <!-- Left Side: Traditional Chatbot -->
          <div class="glass-panel" style="padding: 22px; display: flex; flex-direction: column; gap: 16px; border-color: rgba(239, 68, 68, 0.3); background: rgba(20, 10, 15, 0.6);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: rgba(239,68,68,0.2); display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                  🤖
                </div>
                <div>
                  <div style="font-weight: 700; font-size: 1rem; color: #fca5a5;">Traditional Chatbot</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted);">Question → Canned Answer Only</div>
                </div>
              </div>
              <span class="badge badge-rose">Legacy LLM / FAQ Bot</span>
            </div>

            <!-- Bot Response -->
            <div id="battle-trad-response" style="background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.06); border-radius: 8px; padding: 16px; font-size: 0.85rem; color: #cbd5e1; min-height: 140px; line-height: 1.5;">
              ${sc.traditional.reply}
            </div>

            <!-- Metrics Table -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.8rem;">
              <div class="metric-mini-box">
                <span class="metric-mini-label">Resolution Time</span>
                <span class="metric-mini-val" style="color: #f87171;">${sc.traditional.time}</span>
              </div>
              <div class="metric-mini-box">
                <span class="metric-mini-label">Support Cost</span>
                <span class="metric-mini-val" style="color: #f87171;">${sc.traditional.cost}</span>
              </div>
              <div class="metric-mini-box">
                <span class="metric-mini-label">System Actions</span>
                <span class="metric-mini-val" style="color: #f87171;">0 Executed</span>
              </div>
              <div class="metric-mini-box">
                <span class="metric-mini-label">Human Involvement</span>
                <span class="metric-mini-val" style="color: #f87171;">100% Required</span>
              </div>
            </div>

            <div style="background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25); border-radius: 8px; padding: 10px 14px; font-size: 0.78rem; color: #fca5a5;">
              <strong>Outcome:</strong> Ticket stuck in human agent queue. Customer left waiting.
            </div>
          </div>

          <!-- Right Side: OutcomeAI Teammate -->
          <div class="glass-panel" style="padding: 22px; display: flex; flex-direction: column; gap: 16px; border-color: rgba(16, 185, 129, 0.4); background: rgba(6, 25, 20, 0.6); box-shadow: 0 0 30px rgba(16,185,129,0.15);">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 12px;">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div style="width: 36px; height: 36px; border-radius: 8px; background: var(--grad-emerald); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; color: white;">
                  ⚡
                </div>
                <div>
                  <div style="font-weight: 700; font-size: 1rem; color: #34d399;">OutcomeAI Teammate</div>
                  <div style="font-size: 0.72rem; color: var(--text-muted);">Understand → Decide → Act → Outcome</div>
                </div>
              </div>
              <span class="badge badge-emerald">Autonomous Execution</span>
            </div>

            <!-- OutcomeAI Response -->
            <div id="battle-outcome-response" style="background: rgba(0,0,0,0.3); border: 1px solid rgba(16,185,129,0.3); border-radius: 8px; padding: 16px; font-size: 0.85rem; color: #f8fafc; min-height: 140px; line-height: 1.5;">
              ${sc.outcomeAi.reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code class="font-mono">$1</code>')}
            </div>

            <!-- Metrics Table -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: 0.8rem;">
              <div class="metric-mini-box">
                <span class="metric-mini-label">Resolution Time</span>
                <span class="metric-mini-val" style="color: #34d399;">${sc.outcomeAi.time}</span>
              </div>
              <div class="metric-mini-box">
                <span class="metric-mini-label">Support Cost</span>
                <span class="metric-mini-val" style="color: #34d399;">${sc.outcomeAi.cost}</span>
              </div>
              <div class="metric-mini-box">
                <span class="metric-mini-label">System Actions</span>
                <span class="metric-mini-val" style="color: #34d399;">4 Completed</span>
              </div>
              <div class="metric-mini-box">
                <span class="metric-mini-label">Human Involvement</span>
                <span class="metric-mini-val" style="color: #34d399;">0% (Zero Touch)</span>
              </div>
            </div>

            <div style="background: rgba(16,185,129,0.12); border: 1px solid rgba(16,185,129,0.35); border-radius: 8px; padding: 10px 14px; font-size: 0.78rem; color: #34d399;">
              <strong>Outcome:</strong> 100% Resolved & Executed in live CRM, ERP & Tickets. Customer delighted.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const sel = this.container.querySelector('#battle-scenario-select');
    if (sel) {
      sel.addEventListener('change', (e) => {
        this.selectedScenarioIndex = parseInt(e.target.value);
        this.render();
        this.bindEvents();
      });
    }

    const btn = this.container.querySelector('#btn-run-battle');
    if (btn) {
      btn.addEventListener('click', () => {
        this.runBattleSimulation();
      });
    }
  }

  async runBattleSimulation() {
    if (window.soundFX) window.soundFX.actionExecuted();

    const leftBox = this.container.querySelector('#battle-trad-response');
    const rightBox = this.container.querySelector('#battle-outcome-response');
    const sc = this.scenarios[this.selectedScenarioIndex];

    if (leftBox && rightBox) {
      leftBox.innerHTML = `<span style="color: var(--text-muted);">Generating canned FAQ response...</span>`;
      rightBox.innerHTML = `<span style="color: #a5b4fc;"><span class="dot-live"></span> Understanding context, evaluating policies, and executing tools in SAP & Salesforce...</span>`;

      await new Promise(r => setTimeout(r, 600));
      leftBox.innerHTML = `<span class="animate-fade-in">${sc.traditional.reply}</span>`;

      await new Promise(r => setTimeout(r, 800));
      rightBox.innerHTML = `<span class="animate-fade-in">${sc.outcomeAi.reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code class="font-mono">$1</code>')}</span>`;

      if (window.soundFX) window.soundFX.actionExecuted();
    }
  }
}

window.battleView = new BattleView();
