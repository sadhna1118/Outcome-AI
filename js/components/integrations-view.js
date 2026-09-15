// Business Integrations & Interactive Enterprise Sandbox 2.0
class IntegrationsView {
  constructor() {
    this.activeTab = 'kanban';

    this.crmLeads = [
      { id: "OPP-9021", account: "CloudScale Systems", value: "$72,000 ARR", stage: "proposal", rep: "Sarah Jenkins", score: 88 },
      { id: "OPP-9014", account: "Nexus Hyperlogistics", value: "$120,000 ARR", stage: "closed_won", rep: "Marcus Vance", score: 94 },
      { id: "OPP-8980", account: "Apex Dynamics", value: "$48,500 ARR", stage: "closed_won", rep: "Elena Rostova", score: 96 },
      { id: "OPP-9045", account: "Veritas AI Labs", value: "$36,000 ARR", stage: "qualified", rep: "Sarah Jenkins", score: 82 },
      { id: "OPP-9060", account: "Global Retail Co", value: "$150,000 ARR", stage: "new", rep: "Unassigned", score: 79 }
    ];

    this.supportTickets = [
      { id: "TICK-9042", subject: "Damaged Scanner Replacement", customer: "Elena Rostova", priority: "Urgent", status: "Solved by AI (42s)", sla: "100% Met" },
      { id: "TICK-9039", subject: "Enterprise SAP Sync Webhook Issue", customer: "Marcus Vance", priority: "High", status: "Solved by AI (1m 12s)", sla: "100% Met" },
      { id: "TICK-8821", subject: "Out-of-Policy Refund Review", customer: "Samantha Miller", priority: "Medium", status: "Escalated to Human", sla: "Within SLA" }
    ];
  }

  init() {
    this.container = document.getElementById('integrations-view-container');
    if (!this.container) return;
    this.render();
    this.bindEvents();

    window.addEventListener('outcome:action-logged', () => {
      this.updateAuditTrail();
    });
  }

  render() {
    const integrations = window.toolIntegrationsHub.integrations;

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; height: 100%; width: 100%; overflow-y: auto; padding: 24px; gap: 24px;">
        <!-- Header & Controls -->
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2 style="font-size: 1.4rem;">Business Systems & Live Enterprise Sandbox</h2>
              <span class="badge badge-emerald">6/6 Systems Connected</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
              OutcomeAI executes bidirectional actions across your enterprise systems in real-time.
            </div>
          </div>
          <div style="display: flex; gap: 8px;">
            <button class="btn btn-primary btn-sm" onclick="window.integrationsView.addSimulatedOpportunity()">
              + Simulate Inbound Deal
            </button>
          </div>
        </div>

        <!-- System Connector Health Cards -->
        <div class="integrations-grid" style="padding: 0;">
          ${Object.entries(integrations).map(([key, sys]) => `
            <div class="integration-card">
              <div class="integration-header">
                <div class="integration-icon-title">
                  <div class="integration-icon" style="background: rgba(255, 255, 255, 0.05);">${sys.icon}</div>
                  <div>
                    <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">${sys.name}</div>
                    <div style="font-size: 0.72rem; color: var(--text-muted);">Status: <span class="badge badge-emerald" style="font-size: 0.65rem;">${sys.status}</span></div>
                  </div>
                </div>
                <div style="font-size: 0.72rem; color: var(--text-muted); font-family: monospace;">${sys.latency}</div>
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 10px; font-size: 0.75rem;">
                <span style="color: var(--text-muted);">Sync: <strong>Active 2-Way</strong></span>
                <button class="btn btn-secondary btn-sm" style="font-size: 0.7rem; padding: 4px 8px;" onclick="window.integrationsView.testSystem('${key}')">
                  Trigger Test API ⚡
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Interactive Sandbox: Salesforce Live Kanban & Zendesk Desk -->
        <div class="glass-panel" style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="font-size: 1.1rem;">☁️</span>
              <h3 style="font-size: 1.05rem;">Salesforce CRM Live Pipeline (Interactive Kanban)</h3>
            </div>
            <div style="font-size: 0.75rem; color: #34d399; font-weight: 600;">
              Total Pipeline Value: $426,500 ARR
            </div>
          </div>

          <!-- Kanban Board -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; min-height: 180px;">
            <!-- New Leads -->
            <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 0.75rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
                1. Inbound Inquiries (${this.crmLeads.filter(l => l.stage === 'new').length})
              </div>
              <div id="kanban-new-col" style="display: flex; flex-direction: column; gap: 8px;">
                ${this.renderKanbanCards('new')}
              </div>
            </div>

            <!-- BANT Qualified -->
            <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 0.75rem; font-weight: 700; color: #93c5fd; text-transform: uppercase;">
                2. BANT Qualified (${this.crmLeads.filter(l => l.stage === 'qualified').length})
              </div>
              <div id="kanban-qualified-col" style="display: flex; flex-direction: column; gap: 8px;">
                ${this.renderKanbanCards('qualified')}
              </div>
            </div>

            <!-- Proposal Sent -->
            <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 0.75rem; font-weight: 700; color: #c4b5fd; text-transform: uppercase;">
                3. Proposal & Demo (${this.crmLeads.filter(l => l.stage === 'proposal').length})
              </div>
              <div id="kanban-proposal-col" style="display: flex; flex-direction: column; gap: 8px;">
                ${this.renderKanbanCards('proposal')}
              </div>
            </div>

            <!-- Closed Won -->
            <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); border-radius: 8px; padding: 12px; display: flex; flex-direction: column; gap: 8px;">
              <div style="font-size: 0.75rem; font-weight: 700; color: #34d399; text-transform: uppercase;">
                4. Closed Won (${this.crmLeads.filter(l => l.stage === 'closed_won').length})
              </div>
              <div id="kanban-won-col" style="display: flex; flex-direction: column; gap: 8px;">
                ${this.renderKanbanCards('closed_won')}
              </div>
            </div>
          </div>
        </div>

        <!-- Real-Time Audit Log Stream -->
        <div class="glass-panel" style="padding: 20px; display: flex; flex-direction: column; gap: 16px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <h3 style="font-size: 1.05rem;">Live System Action Audit Trail</h3>
              <span class="badge badge-cyan" id="audit-total-badge">${window.toolIntegrationsHub.auditLogs.length} events logged</span>
            </div>
            <button class="btn btn-secondary btn-sm" onclick="window.integrationsView.clearLogs()">
              Clear Audit Log
            </button>
          </div>

          <div id="live-audit-table-wrapper" style="overflow-x: auto;">
            <!-- Injected table -->
          </div>
        </div>
      </div>
    `;

    this.updateAuditTrail();
  }

  bindEvents() {
    // Event listeners
  }

  renderKanbanCards(stage) {
    const cards = this.crmLeads.filter(l => l.stage === stage);
    if (cards.length === 0) return `<div style="font-size: 0.72rem; color: var(--text-muted); text-align: center; padding: 10px;">No deals</div>`;

    return cards.map(c => `
      <div class="animate-fade-in" style="background: var(--bg-tertiary); border: 1px solid var(--border-light); border-radius: 6px; padding: 10px; display: flex; flex-direction: column; gap: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 700; font-size: 0.82rem; color: #f8fafc;">${c.account}</span>
          <span class="badge badge-violet" style="font-size: 0.65rem;">Score: ${c.score}</span>
        </div>
        <div style="font-size: 0.78rem; font-weight: 700; color: #38bdf8;">${c.value}</div>
        <div style="font-size: 0.7rem; color: var(--text-muted); display: flex; justify-content: space-between; margin-top: 2px;">
          <span>Rep: ${c.rep}</span>
          <span>${c.id}</span>
        </div>
      </div>
    `).join('');
  }

  addSimulatedOpportunity() {
    const names = ["AeroSpace Next", "FinTech Global", "BioHealth Cloud", "Quantum Logix", "OmniCommerce Group"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomArr = "$" + (Math.floor(Math.random() * 80) + 40) + ",000 ARR";

    const newDeal = {
      id: "OPP-" + Math.floor(9100 + Math.random() * 800),
      account: randomName,
      value: randomArr,
      stage: "new",
      rep: "OutcomeAI SDR",
      score: 85
    };

    this.crmLeads.unshift(newDeal);
    this.render();
    window.toolIntegrationsHub.logAction("Salesforce CRM", "POST /api/v2/leads/inbound", newDeal);
    window.outcomeApp.showToast("Inbound Lead Ingested", `${randomName} (${randomArr}) synced with Salesforce.`);
  }

  updateAuditTrail() {
    const wrapper = this.container.querySelector('#live-audit-table-wrapper');
    const badge = this.container.querySelector('#audit-total-badge');
    const logs = window.toolIntegrationsHub.auditLogs;

    if (badge) badge.innerText = `${logs.length} events logged`;
    if (!wrapper) return;

    if (logs.length === 0) {
      wrapper.innerHTML = `
        <div style="text-align: center; padding: 30px; color: var(--text-muted); font-size: 0.85rem;">
          No automated actions executed yet. Switch to the <strong>Omnichannel Simulator</strong> or <strong>Workflow Studio</strong> to trigger actions.
        </div>
      `;
      return;
    }

    wrapper.innerHTML = `
      <table style="width: 100%; border-collapse: collapse; font-size: 0.8rem; text-align: left;">
        <thead>
          <tr style="border-bottom: 1px solid var(--border-subtle); color: var(--text-muted); font-size: 0.72rem; text-transform: uppercase;">
            <th style="padding: 10px 12px;">Event ID</th>
            <th style="padding: 10px 12px;">Timestamp</th>
            <th style="padding: 10px 12px;">Target System</th>
            <th style="padding: 10px 12px;">Action / Endpoint</th>
            <th style="padding: 10px 12px;">Result</th>
            <th style="padding: 10px 12px;">Payload Preview</th>
          </tr>
        </thead>
        <tbody>
          ${logs.map(log => `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.04); font-family: 'Plus Jakarta Sans', sans-serif;">
              <td style="padding: 10px 12px; font-family: monospace; color: #a5b4fc;">${log.id}</td>
              <td style="padding: 10px 12px; color: var(--text-muted); font-size: 0.75rem;">${log.timestamp}</td>
              <td style="padding: 10px 12px; font-weight: 600;">${log.system}</td>
              <td style="padding: 10px 12px; color: #67e8f9; font-family: monospace; font-size: 0.75rem;">${log.action}</td>
              <td style="padding: 10px 12px;"><span class="badge badge-emerald" style="font-size: 0.65rem;">${log.result}</span></td>
              <td style="padding: 10px 12px; font-family: monospace; font-size: 0.72rem; color: var(--text-secondary); max-width: 320px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                ${JSON.stringify(log.payload)}
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  testSystem(systemKey) {
    if (systemKey === 'salesforce') {
      window.toolIntegrationsHub.executeSalesforceOpportunity("Test Account Inc", "$45,000 ARR", "Discovery Call", 90);
    } else if (systemKey === 'zendesk') {
      window.toolIntegrationsHub.executeZendeskTicket("Automated System Health Check", "admin@outcome.ai", "Solved", "Test resolution complete");
    } else if (systemKey === 'sap') {
      window.toolIntegrationsHub.executeSapReplacement("ORD-TEST-101", "Precision Laser Barcode Scanner Pro X4", "Elena Rostova");
    } else if (systemKey === 'stripe') {
      window.toolIntegrationsHub.executeStripeRefund("ORD-TEST-99", 50.00, "elena.r@apexdynamics.io");
    } else if (systemKey === 'calendar') {
      window.toolIntegrationsHub.executeCalendarBooking("OutcomeAI Product Architecture Walkthrough", "Sarah Jenkins", "customer@enterprise.io", "Tomorrow 3:00 PM PST");
    } else {
      window.toolIntegrationsHub.logAction("Pinecone Vector DB", "POST /query/vectors", { query: "Warranty replacement limit §4.2", topK: 3 });
    }
  }

  clearLogs() {
    window.toolIntegrationsHub.auditLogs = [];
    this.updateAuditTrail();
  }
}

window.integrationsView = new IntegrationsView();
