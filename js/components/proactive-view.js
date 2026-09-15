// Proactive "Pre-Cognitive" Autonomous Action Engine
class ProactiveView {
  constructor() {
    this.activeSimulations = [];
  }

  init() {
    this.container = document.getElementById('proactive-view-container');
    if (!this.container) return;
    this.render();
    this.bindEvents();
  }

  render() {
    this.container.innerHTML = `
      <div style="padding: 24px; height: 100%; overflow-y: auto; display: flex; flex-direction: column; gap: 20px;">
        <!-- Banner -->
        <div style="background: linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 182, 212, 0.12) 100%); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: var(--radius-md); padding: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
          <div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.5rem;">🔮</span>
              <h2 style="font-size: 1.25rem; font-weight: 800; color: #fff; margin: 0;">Proactive Pre-Cognitive Action Engine</h2>
              <span class="badge badge-emerald">ZERO-TOUCH MITIGATION</span>
            </div>
            <div style="font-size: 0.8rem; color: #cbd5e1; margin-top: 6px; max-width: 720px;">
              Traditional AI waits for customers to complain. <strong>OutcomeAI monitors enterprise telemetry (SAP, FedEx, Stripe) in real-time</strong>, anticipates disruptions, reroutes logistics, and resolves issues <em>before</em> the customer even contacts support.
            </div>
          </div>
        </div>

        <!-- Proactive Scenarios Grid -->
        <div class="nav-section-title" style="padding: 0; color: #94a3b8;">Simulate Live Enterprise Anomalies</div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 14px;">
          <!-- Card 1: Logistics Storm Delay -->
          <div class="card" style="padding: 18px; border-color: rgba(59, 130, 246, 0.3);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <span style="font-size: 1.8rem;">⛈️</span>
              <span class="badge badge-cyan">Supply Chain Anomaly</span>
            </div>
            <div style="font-weight: 700; font-size: 0.95rem; color: #f8fafc; margin-top: 10px;">
              FedEx Memphis Grounding (Medical Equipment)
            </div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.4;">
              Severe weather grounds flight carrying Dr. Zhang's centrifuge (ORD-55201). AI autonomously reserves backup stock in Dallas and dispatches Same-Day Jet Courier with $100 SLA credit.
            </div>
            <button id="btn-trigger-proactive-logistics" class="btn btn-primary btn-sm" style="margin-top: 14px; width: 100%;">
              ⚡ Trigger Proactive Logistics Mitigation
            </button>
          </div>

          <!-- Card 2: Stripe Payment Failed & Churn Risk -->
          <div class="card" style="padding: 18px; border-color: rgba(245, 158, 11, 0.3);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <span style="font-size: 1.8rem;">💳</span>
              <span class="badge badge-amber">Billing & Churn Anomaly</span>
            </div>
            <div style="font-weight: 700; font-size: 0.95rem; color: #f8fafc; margin-top: 10px;">
              Stripe Dunning Failure (Nexus Media $1.2k/mo)
            </div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.4;">
              Corporate card expired on $14.4k account. AI proactively routes an encrypted 1-click update link via WhatsApp, grants a 7-day grace period, and prevents involuntary churn.
            </div>
            <button id="btn-trigger-proactive-billing" class="btn btn-secondary btn-sm" style="margin-top: 14px; width: 100%; border-color: rgba(245, 158, 11, 0.4); color: #fbbf24;">
              ⚡ Trigger Proactive Dunning Rescue
            </button>
          </div>

          <!-- Card 3: Enterprise Cloud Usage Spike -->
          <div class="card" style="padding: 18px; border-color: rgba(139, 92, 246, 0.3);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <span style="font-size: 1.8rem;">📈</span>
              <span class="badge badge-violet">Sales Expansion Anomaly</span>
            </div>
            <div style="font-weight: 700; font-size: 0.95rem; color: #f8fafc; margin-top: 10px;">
              API Quota 95% Cap (Apex Dynamics)
            </div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 6px; line-height: 1.4;">
              Customer hits 95% API tier limit. AI auto-extends a 10% emergency buffer to prevent outage, generates an enterprise tier upgrade proposal, and alerts the account executive.
            </div>
            <button id="btn-trigger-proactive-sales" class="btn btn-secondary btn-sm" style="margin-top: 14px; width: 100%; border-color: rgba(139, 92, 246, 0.4); color: #c4b5fd;">
              ⚡ Trigger Proactive Upsell Opportunity
            </button>
          </div>
        </div>

        <!-- Live Autonomous Execution Stage -->
        <div class="card" style="flex: 1; display: flex; flex-direction: column; overflow: hidden;" id="proactive-execution-container">
          <div class="card-header" style="background: rgba(13, 18, 28, 0.8); display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 700; font-size: 0.9rem; color: #f8fafc; display: flex; align-items: center; gap: 8px;">
              <span>⚡ Proactive Autonomous Action Waterfall</span>
            </div>
            <span class="badge badge-emerald" id="proactive-status-tag">Standing by for Cloud Telemetry</span>
          </div>

          <div style="padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 14px;" id="proactive-waterfall-steps">
            <div style="color: #64748b; font-size: 0.82rem; text-align: center; padding: 30px;">
              Click any of the <strong>"Trigger Proactive Mitigation"</strong> buttons above to watch OutcomeAI execute cross-system decisions in real-time.
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const btnLogistics = this.container.querySelector('#btn-trigger-proactive-logistics');
    const btnBilling = this.container.querySelector('#btn-trigger-proactive-billing');
    const btnSales = this.container.querySelector('#btn-trigger-proactive-sales');

    if (btnLogistics) {
      btnLogistics.addEventListener('click', () => {
        this.runLogisticsSimulation();
      });
    }

    if (btnBilling) {
      btnBilling.addEventListener('click', () => {
        this.runBillingSimulation();
      });
    }

    if (btnSales) {
      btnSales.addEventListener('click', () => {
        this.runSalesSimulation();
      });
    }
  }

  async runLogisticsSimulation() {
    const waterfall = this.container.querySelector('#proactive-waterfall-steps');
    const tag = this.container.querySelector('#proactive-status-tag');
    if (!waterfall) return;

    if (tag) {
      tag.className = 'badge badge-cyan';
      tag.innerText = '⚡ Executing Proactive Logistics Workflow...';
    }

    waterfall.innerHTML = '';
    if (window.soundFX) window.soundFX.messageSent();

    const steps = [
      {
        icon: '📡',
        title: 'Step 1: Ingest Cloud Anomaly (FedEx API Telemetry)',
        desc: 'Flight MEM-99214 grounded due to blizzard. Package ORD-55201 delayed by +36h.',
        system: 'FedEx Webhook Gateway',
        status: 'Anomaly Flagged'
      },
      {
        icon: '🧠',
        title: 'Step 2: Customer 360 Impact Assessment',
        desc: 'Recipient: Dr. Sophia Zhang (BioHealth Diagnostics, Tier 1 VIP). Hospital wing launch at risk.',
        system: 'Salesforce CRM Graph',
        status: 'Criticality: High'
      },
      {
        icon: '⚖️',
        title: 'Step 3: Autonomous Policy Reasoning & Decision',
        desc: 'Policy §7.2 (Healthcare Mission-Critical) authorizes instant backup re-route and $100 SLA credit.',
        system: 'Policy Decision Engine',
        status: 'Auto-Approved (Confidence: 99.2%)'
      },
      {
        icon: '📦',
        title: 'Step 4: Cross-System Inventory Reservation & Jet Dispatch',
        desc: 'Reserved reserve unit CENT-v4-99 at Dallas Depot. Scheduled Med-Express Same-Day Flight to Boston Logan.',
        system: 'SAP ERP Logistics',
        status: 'Waybill JET-8820 Dispatched'
      },
      {
        icon: '💳',
        title: 'Step 5: Apply Compensation Credit',
        desc: 'Issued $100.00 SLA credit to customer balance ledger.',
        system: 'Stripe Billing API',
        status: 'Credit Applied'
      },
      {
        icon: '💬',
        title: 'Step 6: Proactive Omnichannel Outreach',
        desc: 'Sent WhatsApp update & live flight tracking link to Dr. Zhang before customer noticed the delay.',
        system: 'Twilio WhatsApp API',
        status: 'Delivered (CSAT Protected)'
      }
    ];

    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      await new Promise(r => setTimeout(r, 650));

      const stepCard = document.createElement('div');
      stepCard.className = 'card animate-fade-in';
      stepCard.style.padding = '14px 18px';
      stepCard.style.background = 'rgba(15, 23, 42, 0.7)';
      stepCard.style.borderLeft = '4px solid var(--accent-emerald)';
      stepCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-weight: 700; font-size: 0.88rem; color: #f8fafc; display: flex; align-items: center; gap: 8px;">
            <span>${s.icon}</span>
            <span>${s.title}</span>
          </div>
          <span class="badge badge-emerald" style="font-size: 0.68rem;">${s.status}</span>
        </div>
        <div style="font-size: 0.78rem; color: #cbd5e1; margin-top: 6px;">${s.desc}</div>
        <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px;">Connected System: <code>${s.system}</code></div>
      `;

      waterfall.appendChild(stepCard);
      if (window.soundFX) window.soundFX.messageReceived();
    }

    if (tag) {
      tag.className = 'badge badge-emerald';
      tag.innerText = '✅ 100% Proactive Mitigation Completed in 3.9s';
    }
  }

  async runBillingSimulation() {
    const waterfall = this.container.querySelector('#proactive-waterfall-steps');
    const tag = this.container.querySelector('#proactive-status-tag');
    if (!waterfall) return;

    if (tag) {
      tag.className = 'badge badge-amber';
      tag.innerText = '⚡ Executing Proactive Dunning Rescue...';
    }

    waterfall.innerHTML = '';
    const steps = [
      { icon: '💳', title: 'Step 1: Stripe Webhook Ingestion', desc: 'Invoice #INV-8819 ($1,200/mo) charge failed: `card_expired`.', system: 'Stripe Billing Webhook', status: 'Payment Failed' },
      { icon: '🧠', title: 'Step 2: Churn & LTV Assessment', desc: 'Account: Nexus Media ($24k LTV). Risk of involuntary churn.', system: 'Salesforce CRM', status: 'Risk Level: High' },
      { icon: '⚡', title: 'Step 3: Auto-Extend 7-Day Grace Period', desc: 'Subscribed API access protected from immediate cutoff to prevent client downtime.', system: 'OutcomeAI Auth Engine', status: 'Grace Active' },
      { icon: '📱', title: 'Step 4: Proactive Secure Payment Recovery', desc: 'Dispatched 1-click tokenized payment update link directly to Alex Rivera via WhatsApp & SMS.', system: 'Twilio Telephony', status: 'Link Dispatched' }
    ];

    for (let s of steps) {
      await new Promise(r => setTimeout(r, 600));
      const stepCard = document.createElement('div');
      stepCard.className = 'card animate-fade-in';
      stepCard.style.padding = '14px 18px';
      stepCard.style.background = 'rgba(15, 23, 42, 0.7)';
      stepCard.style.borderLeft = '4px solid var(--accent-amber)';
      stepCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-weight: 700; font-size: 0.88rem; color: #f8fafc; display: flex; align-items: center; gap: 8px;">
            <span>${s.icon}</span>
            <span>${s.title}</span>
          </div>
          <span class="badge badge-amber" style="font-size: 0.68rem;">${s.status}</span>
        </div>
        <div style="font-size: 0.78rem; color: #cbd5e1; margin-top: 6px;">${s.desc}</div>
        <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px;">Connected System: <code>${s.system}</code></div>
      `;
      waterfall.appendChild(stepCard);
    }
  }

  async runSalesSimulation() {
    const waterfall = this.container.querySelector('#proactive-waterfall-steps');
    const tag = this.container.querySelector('#proactive-status-tag');
    if (!waterfall) return;

    if (tag) {
      tag.className = 'badge badge-violet';
      tag.innerText = '⚡ Executing Proactive Expansion Upsell...';
    }

    waterfall.innerHTML = '';
    const steps = [
      { icon: '📈', title: 'Step 1: Usage Telemetry Threshold Breached', desc: 'Apex Dynamics reached 95,400 / 100,000 monthly API calls.', system: 'AWS CloudWatch Metrics', status: 'Threshold 95%' },
      { icon: '🛡️', title: 'Step 2: Autonomous 10% Surge Buffer Granted', desc: 'Prevented API throttling by granting temporary 10,000 call buffer free of charge.', system: 'Gateway Rate Limiter', status: 'Buffer Activated' },
      { icon: '💼', title: 'Step 3: Auto-Draft Enterprise Tier Upgrade Quote', desc: 'Generated customized proposal: Upgrade from Pro ($1.2k/mo) to Enterprise Unlimited ($2.4k/mo).', system: 'Salesforce & Stripe', status: 'Opportunity Created' }
    ];

    for (let s of steps) {
      await new Promise(r => setTimeout(r, 600));
      const stepCard = document.createElement('div');
      stepCard.className = 'card animate-fade-in';
      stepCard.style.padding = '14px 18px';
      stepCard.style.background = 'rgba(15, 23, 42, 0.7)';
      stepCard.style.borderLeft = '4px solid var(--accent-violet)';
      stepCard.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div style="font-weight: 700; font-size: 0.88rem; color: #f8fafc; display: flex; align-items: center; gap: 8px;">
            <span>${s.icon}</span>
            <span>${s.title}</span>
          </div>
          <span class="badge badge-violet" style="font-size: 0.68rem;">${s.status}</span>
        </div>
        <div style="font-size: 0.78rem; color: #cbd5e1; margin-top: 6px;">${s.desc}</div>
        <div style="font-size: 0.7rem; color: var(--text-muted); margin-top: 4px;">Connected System: <code>${s.system}</code></div>
      `;
      waterfall.appendChild(stepCard);
    }
  }
}

window.proactiveView = new ProactiveView();
