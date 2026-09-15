// Enterprise Event Bus & Webhook Playground Component
class WebhookView {
  constructor() {
    this.selectedEvent = 'stripe_dispute';

    this.sampleEvents = {
      stripe_dispute: {
        topic: "stripe.charge.dispute.created",
        source: "Stripe Billing Webhook",
        payload: {
          event: "charge.dispute.created",
          chargeId: "ch_984210924",
          amount: 349.99,
          customerEmail: "elena.r@apexdynamics.io",
          reason: "unrecognized_charge"
        },
        aiAction: "Verify Customer 360 in Salesforce -> Match with active replacement ticket #TICK-9042 -> Auto-submit proof of express replacement delivery -> Prevent chargeback loss."
      },
      sap_stock_low: {
        topic: "sap.inventory.stock_level.critical",
        source: "SAP S/4HANA ERP Webhook",
        payload: {
          event: "stock_threshold_breached",
          sku: "SCAN-PRO-X4",
          warehouse: "Chicago Central Depot",
          remainingUnits: 14,
          reorderPoint: 50
        },
        aiAction: "Detect high replacement velocity -> Auto-trigger ERP Purchase Order PO-88190 for 250 units from primary manufacturer -> Notify Operations Lead."
      },
      delivery_delay: {
        topic: "fedex.tracking.shipment.exception",
        source: "FedEx Delivery Webhook",
        payload: {
          event: "weather_delay_alert",
          trackingNumber: "FDX-77401-EXPRESS",
          destination: "Chicago, IL",
          delayHours: 4
        },
        aiAction: "Proactively send SMS update to Elena Rostova with new ETA -> Issue $50 VIP courtesy credit under SLA §7.0 -> Keep customer sentiment positive (+0.95)."
      }
    };
  }

  init() {
    this.container = document.getElementById('webhook-view-container');
    if (!this.container) return;
    this.render();
    this.bindEvents();
  }

  render() {
    const ev = this.sampleEvents[this.selectedEvent];

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; height: 100%; width: 100%; overflow-y: auto; padding: 24px; gap: 20px;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2 style="font-size: 1.4rem;">Enterprise Event Bus & Webhook Gateway (n8n / Kafka / Zapier)</h2>
              <span class="badge badge-cyan">Sub-Second Event Ingestion</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
              OutcomeAI listens for asynchronous cloud webhooks and executes instant mitigation decisions autonomously.
            </div>
          </div>

          <button id="btn-emit-webhook" class="btn btn-primary" style="padding: 10px 20px;">
            ⚡ Emit Cloud Webhook Event
          </button>
        </div>

        <!-- Event Selector & Payload Viewer -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <!-- Left: Inbound Webhook Payload -->
          <div class="glass-panel" style="padding: 20px; display: flex; flex-direction: column; gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 700; font-size: 0.95rem; color: #f8fafc;">Select Inbound Cloud Event:</span>
              <select id="webhook-event-select" class="input-control select-control" style="width: auto; font-size: 0.8rem;">
                <option value="stripe_dispute" ${this.selectedEvent === 'stripe_dispute' ? 'selected' : ''}>Stripe Chargeback Alert</option>
                <option value="sap_stock_low" ${this.selectedEvent === 'sap_stock_low' ? 'selected' : ''}>SAP Critical Inventory Alert</option>
                <option value="delivery_delay" ${this.selectedEvent === 'delivery_delay' ? 'selected' : ''}>FedEx Weather Delay Alert</option>
              </select>
            </div>

            <div style="font-size: 0.75rem; color: var(--text-muted);">
              Topic: <code class="font-mono" style="color: #38bdf8;">${ev.topic}</code> · Source: <strong>${ev.source}</strong>
            </div>

            <div class="code-block" style="height: 240px;">
              ${OutcomeFormatters.highlightJson(ev.payload)}
            </div>
          </div>

          <!-- Right: Autonomous Decision & System Mitigation -->
          <div class="glass-panel" style="padding: 20px; display: flex; flex-direction: column; gap: 14px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 700; font-size: 0.95rem; color: #34d399;">⚡ Autonomous Event Mitigation</span>
              <span class="badge badge-emerald" id="webhook-exec-badge">Standby</span>
            </div>

            <div style="background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.3); border-radius: 8px; padding: 14px; font-size: 0.85rem; color: #cbd5e1; line-height: 1.5;" id="webhook-mitigation-box">
              ${ev.aiAction}
            </div>

            <div style="font-size: 0.78rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">
              Webhook Output Response (200 OK)
            </div>
            <div class="code-block" style="flex: 1; min-height: 120px;" id="webhook-response-json">
              <span class="code-keyword">// Ready to ingest event</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const sel = this.container.querySelector('#webhook-event-select');
    if (sel) {
      sel.addEventListener('change', (e) => {
        this.selectedEvent = e.target.value;
        this.render();
        this.bindEvents();
      });
    }

    const btn = this.container.querySelector('#btn-emit-webhook');
    if (btn) {
      btn.addEventListener('click', () => {
        this.emitWebhook();
      });
    }
  }

  async emitWebhook() {
    const ev = this.sampleEvents[this.selectedEvent];
    const badge = this.container.querySelector('#webhook-exec-badge');
    const respBox = this.container.querySelector('#webhook-response-json');

    if (badge) badge.innerHTML = `<span class="dot-live"></span> Ingesting...`;
    if (window.soundFX) window.soundFX.actionExecuted();

    await new Promise(r => setTimeout(r, 600));

    const responsePayload = {
      status: 200,
      eventReceived: ev.topic,
      eventId: "EVT-" + Math.floor(100000 + Math.random() * 900000),
      outcomeAiDecision: "AUTO_MITIGATED",
      latencyMs: 38,
      timestamp: new Date().toISOString()
    };

    if (badge) {
      badge.className = "badge badge-emerald";
      badge.innerText = "✓ Mitigated (200 OK)";
    }

    if (respBox) {
      respBox.innerHTML = OutcomeFormatters.highlightJson(responsePayload);
    }

    window.toolIntegrationsHub.logAction("Cloud Event Bus", `INGEST ${ev.topic}`, responsePayload);
    window.outcomeApp.showToast("Webhook Processed", `Autonomous mitigation executed for ${ev.topic} in 38ms.`);
  }
}

window.webhookView = new WebhookView();
