// Human-in-the-Loop (HITL) Queue Component
class HitlQueueView {
  constructor() {
    this.selectedItemId = "HITL-8821";
  }

  init() {
    this.container = document.getElementById('hitl-view-container');
    if (!this.container) return;
    this.render();
    this.bindEvents();
    this.selectItem(this.selectedItemId);

    window.addEventListener('outcome:hitl-updated', () => {
      this.render();
      this.bindEvents();
      this.selectItem(this.selectedItemId);
    });
  }

  render() {
    const queue = window.toolIntegrationsHub.hitlQueue;

    this.container.innerHTML = `
      <div class="hitl-inbox-viewport">
        <!-- Left Side: Queue Items List -->
        <div class="hitl-queue-list">
          <div style="padding: 16px 18px; border-bottom: 1px solid var(--border-subtle); display: flex; justify-content: space-between; align-items: center;">
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">Human Approval Inbox</div>
            <span class="badge badge-amber">${queue.filter(i => i.status === 'Pending Review').length} Pending</span>
          </div>

          <div id="hitl-items-wrapper">
            ${queue.map(item => `
              <div class="hitl-item-card ${item.id === this.selectedItemId ? 'active' : ''}" data-id="${item.id}" onclick="window.hitlQueueView.selectItem('${item.id}')">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="badge ${item.status === 'Pending Review' ? 'badge-amber' : 'badge-emerald'}">${item.status}</span>
                  <span style="font-size: 0.7rem; color: var(--text-muted);">${item.time}</span>
                </div>
                <div style="font-weight: 700; font-size: 0.88rem; color: var(--text-primary); margin-top: 2px;">
                  ${item.customerName} (${item.company})
                </div>
                <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.35;">
                  ${item.reason}
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; font-size: 0.72rem;">
                  <span class="badge badge-neutral">${item.tier}</span>
                  <span class="badge ${item.aiConfidence < 65 ? 'badge-rose' : 'badge-amber'}">${item.aiConfidence}% Confidence</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Right Side: Item Decision Center -->
        <div class="hitl-detail-pane" id="hitl-detail-pane">
          <!-- Injected dynamically -->
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Dynamic binding handled by inline onclick & element queries
  }

  selectItem(itemId) {
    this.selectedItemId = itemId;
    const item = window.toolIntegrationsHub.hitlQueue.find(i => i.id === itemId);
    if (!item) return;

    // Update list selection
    this.container.querySelectorAll('.hitl-item-card').forEach(c => {
      c.classList.toggle('active', c.getAttribute('data-id') === itemId);
    });

    const pane = this.container.querySelector('#hitl-detail-pane');
    if (!pane) return;

    const isResolved = item.status !== 'Pending Review';

    pane.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 16px;">
        <div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <h2 style="font-size: 1.3rem;">Escalation Review: ${item.id}</h2>
            <span class="badge ${isResolved ? 'badge-emerald' : 'badge-amber'}">${item.status}</span>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-secondary); margin-top: 4px;">
            Requester: <strong>${item.customerName}</strong> · Account: <strong>${item.company}</strong> (${item.tier})
          </div>
        </div>

        <div style="display: flex; gap: 8px;">
          ${!isResolved ? `
            <button class="btn btn-success" onclick="window.hitlQueueView.handleApprove('${item.id}')">
              ✓ Approve AI Recommendation
            </button>
            <button class="btn btn-danger" onclick="window.hitlQueueView.handleReject('${item.id}')">
              ✕ Deny Exception
            </button>
          ` : `
            <div class="badge badge-emerald" style="padding: 8px 14px; font-size: 0.85rem;">
              ✓ Case Resolved (${item.status})
            </div>
          `}
        </div>
      </div>

      <!-- AI Analysis Card -->
      <div class="glass-panel" style="padding: 20px; border-left: 4px solid var(--primary);">
        <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: #a5b4fc; margin-bottom: 6px;">
          🧠 OutcomeAI Case Synthesis & Rationale
        </div>
        <div style="font-size: 0.9rem; color: var(--text-primary); line-height: 1.5; margin-bottom: 12px;">
          ${item.reason}
        </div>
        <div style="background: rgba(99, 102, 241, 0.1); border: 1px solid rgba(99, 102, 241, 0.25); border-radius: 8px; padding: 12px 16px;">
          <div style="font-size: 0.78rem; font-weight: 700; color: #cbd5e1; margin-bottom: 4px;">
            Recommended Agent Action:
          </div>
          <div style="font-size: 0.85rem; color: #93c5fd; font-weight: 600;">
            ${item.recommendedAction}
          </div>
        </div>
      </div>

      <!-- System Actions Already Taken -->
      <div class="glass-panel" style="padding: 20px;">
        <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px;">
          ⚡ Actions Automatically Executed Prior to Escalation
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${item.actionsTakenSoFar.map((act, i) => `
            <div style="display: flex; align-items: center; gap: 10px; font-size: 0.82rem; color: var(--text-secondary); background: rgba(0,0,0,0.25); padding: 8px 12px; border-radius: 6px;">
              <span class="badge badge-cyan" style="font-size: 0.65rem;">Step ${i+1}</span>
              <span>${act}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Copilot Response Composer -->
      ${!isResolved ? `
        <div class="glass-panel" style="padding: 20px;">
          <div style="font-size: 0.78rem; font-weight: 700; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px;">
            ✍️ Agent Override & Response Editor
          </div>
          <textarea id="hitl-agent-override-notes" class="input-control" rows="3" style="resize: none; font-size: 0.82rem; margin-bottom: 12px;" placeholder="Optional custom note to customer or supervisor approval log...">Authorized as a one-time customer satisfaction goodwill gesture.</textarea>
          <div style="display: flex; justify-content: flex-end; gap: 10px;">
            <button class="btn btn-secondary btn-sm" onclick="alert('Offer 50% Store Credit sent to ${item.customerName}')">Offer $445 Store Credit + Bonus</button>
            <button class="btn btn-primary btn-sm" onclick="window.hitlQueueView.handleApprove('${item.id}')">Submit Manager Sign-off ⚡</button>
          </div>
        </div>
      ` : ''}
    `;

    if (window.soundFX) window.soundFX.click();
  }

  handleApprove(itemId) {
    const textarea = this.container.querySelector('#hitl-agent-override-notes');
    const notes = textarea ? textarea.value : "Approved by Human Supervisor";
    window.toolIntegrationsHub.approveHitlItem(itemId, notes);
    this.selectItem(itemId);
  }

  handleReject(itemId) {
    const reason = prompt("Enter denial reason to record in Salesforce CRM:", "Exceeded 30-day return policy");
    if (reason) {
      window.toolIntegrationsHub.rejectHitlItem(itemId, reason);
      this.selectItem(itemId);
    }
  }
}

window.hitlQueueView = new HitlQueueView();
