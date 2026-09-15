// Multi-Agent Swarm Collaboration Room (CrewAI / LangGraph Architecture)
class SwarmView {
  constructor() {
    this.agents = [
      { id: "triage", name: "Triage & NLP Agent", role: "Extracts intent, sentiment & entity slots", icon: "🧠", color: "#6366f1" },
      { id: "policy", name: "Policy Guardrail Agent", role: "Validates SLAs, warranties & compliance", icon: "⚖️", color: "#f59e0b" },
      { id: "action", name: "Enterprise Action Agent", role: "Executes SAP, Salesforce & Stripe APIs", icon: "🛠️", color: "#10b981" },
      { id: "qa", name: "QA & Safety Verifier", role: "Sanitizes output & checks customer safety", icon: "🛡️", color: "#06b6d4" }
    ];

    this.swarmSteps = [
      { agent: "triage", msg: "INGEST: Detected incoming customer ticket for order #ORD-94281. Intent: 'hardware_replacement_claim'. Sentiment: -0.62 (Frustrated). Customer LTV: $48,500 (VIP Tier 1)." },
      { agent: "policy", msg: "POLICY CHECK: Evaluating Warranty §4.2 (VIP Express Policy). Order delivered within 14 days. Value $349.99 < $1000 limit. Policy check: PASSED (Confidence: 98.4%). Authorizing auto-replacement." },
      { agent: "action", msg: "EXECUTING: Generated replacement order #ORD-94302-R in SAP S/4HANA. Warehouse: Chicago Central Depot. Carrier: FedEx Overnight. Tracking: FDX-77401-EXPRESS. Updated Salesforce CRM record." },
      { agent: "qa", msg: "QA VERIFICATION: Checked tracking validity with FedEx API. Validated pre-paid return label PDF. Cleaned PII from outbound message. Verified 0% human touch SLA. Ready for delivery." },
      { agent: "triage", msg: "DELIVERY: Customer notified across Webchat & Email with live tracking and return instructions. Ticket #TICK-9042 resolved in 42 seconds." }
    ];
  }

  init() {
    this.container = document.getElementById('swarm-view-container');
    if (!this.container) return;
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; height: 100%; width: 100%; overflow-y: auto; padding: 24px; gap: 20px;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2 style="font-size: 1.4rem;">Multi-Agent Swarm Orchestration (LangGraph / CrewAI)</h2>
              <span class="badge badge-emerald">4 Specialized Sub-Agents Active</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
              OutcomeAI divides complex enterprise workflows into specialized autonomous sub-agents that collaborate, debate, and verify actions before execution.
            </div>
          </div>

          <button id="btn-run-swarm" class="btn btn-primary" style="padding: 10px 20px;">
            ⚡ Trigger Swarm Collaboration
          </button>
        </div>

        <!-- 4 Specialized Agents Grid -->
        <div class="swarm-grid">
          ${this.agents.map(ag => `
            <div class="agent-node-card" id="swarm-agent-${ag.id}">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 1.5rem;">${ag.icon}</div>
                <span class="badge badge-neutral" style="font-size: 0.65rem;">Worker Node</span>
              </div>
              <div>
                <div style="font-weight: 700; font-size: 0.95rem; color: #f8fafc;">${ag.name}</div>
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 2px;">${ag.role}</div>
              </div>
              <div style="font-size: 0.72rem; color: #34d399; font-family: monospace; margin-top: 4px;">
                Status: <span class="swarm-status-text">Standby</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Live Inter-Agent Chat & State Passing Log -->
        <div class="glass-panel" style="padding: 20px; display: flex; flex-direction: column; gap: 14px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 10px;">
            <div style="font-weight: 700; font-size: 0.95rem; color: #f8fafc;">
              Inter-Agent Message Bus & Shared State Vector Stream
            </div>
            <span class="badge badge-cyan">Sub-Second Agent Bus</span>
          </div>

          <div id="swarm-chat-log-box" class="swarm-chat-log">
            <span style="color: var(--text-muted); text-align: center; padding: 20px 0;">
              Click <strong>"⚡ Trigger Swarm Collaboration"</strong> to see how 4 sub-agents coordinate in real-time.
            </span>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const btn = this.container.querySelector('#btn-run-swarm');
    if (btn) {
      btn.addEventListener('click', () => {
        this.runSwarmSimulation();
      });
    }
  }

  async runSwarmSimulation() {
    const logBox = this.container.querySelector('#swarm-chat-log-box');
    if (!logBox) return;
    logBox.innerHTML = '';

    if (window.soundFX) window.soundFX.actionExecuted();

    for (let i = 0; i < this.swarmSteps.length; i++) {
      const step = this.swarmSteps[i];
      const ag = this.agents.find(a => a.id === step.agent);

      // Highlight active agent card
      this.container.querySelectorAll('.agent-node-card').forEach(c => c.classList.remove('speaking', 'active'));
      const card = this.container.querySelector(`#swarm-agent-${step.agent}`);
      if (card) {
        card.classList.add('speaking');
        card.querySelector('.swarm-status-text').innerText = 'Processing...';
      }

      await new Promise(r => setTimeout(r, 900));

      const msgDiv = document.createElement('div');
      msgDiv.className = 'swarm-message animate-fade-in';
      msgDiv.style.borderLeftColor = ag.color;
      msgDiv.innerHTML = `
        <span style="font-size: 1.2rem;">${ag.icon}</span>
        <div style="flex: 1;">
          <div style="font-weight: 700; color: ${ag.color}; font-size: 0.82rem; margin-bottom: 2px;">
            ${ag.name} · <span style="color: var(--text-muted); font-size: 0.7rem;">${new Date().toLocaleTimeString()}</span>
          </div>
          <div style="color: #cbd5e1; line-height: 1.4;">${step.msg}</div>
        </div>
      `;

      logBox.appendChild(msgDiv);
      logBox.scrollTop = logBox.scrollHeight;

      if (window.soundFX) window.soundFX.messageReceived();
    }

    // Reset status
    this.container.querySelectorAll('.agent-node-card').forEach(c => {
      c.classList.remove('speaking');
      c.querySelector('.swarm-status-text').innerText = 'Task Completed';
    });

    window.outcomeApp.showToast("Swarm Consensus Achieved", "All 4 sub-agents verified and executed the autonomous resolution.");
  }
}

window.swarmView = new SwarmView();
