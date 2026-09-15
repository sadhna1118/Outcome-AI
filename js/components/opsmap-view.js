// Global Logistics & Autonomous Operations Map Component
class OpsMapView {
  constructor() {
    this.selectedNode = null;
    this.nodes = [
      { id: "chicago", name: "Chicago Central Depot", type: "warehouse", x: 230, y: 160, status: "Active Dispatch", items: "12,400 units in stock", activeCourier: "FedEx Priority FDX-77401 -> Apex Dynamics" },
      { id: "sf", name: "San Francisco HQ Hub", type: "customer", x: 160, y: 180, status: "Connected", items: "CloudScale Systems ($72k ARR)", activeCourier: "Architecture Review Call Booked" },
      { id: "london", name: "London EMEA Gateway", type: "warehouse", x: 480, y: 130, status: "Active", items: "8,900 units", activeCourier: "Royal Mail Tracked 24" },
      { id: "frankfurt", name: "Frankfurt SAP Datacenter", type: "datacenter", x: 520, y: 145, status: "99.99% Uptime", items: "Sub-second ERP API Latency (42ms)", activeCourier: "Bi-directional ERP Sync Active" },
      { id: "tokyo", name: "Tokyo APAC Node", type: "warehouse", x: 820, y: 190, status: "Active", items: "15,200 units", activeCourier: "Yamato Express Autonomous Sync" }
    ];
  }

  init() {
    this.container = document.getElementById('opsmap-view-container');
    if (!this.container) return;
    this.render();
    this.bindEvents();
    this.selectNode('chicago');
  }

  render() {
    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; height: 100%; width: 100%; overflow-y: auto; padding: 24px; gap: 20px;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <div style="display: flex; align-items: center; gap: 10px;">
              <h2 style="font-size: 1.4rem;">Global Autonomous Operations & Logistics Telemetry</h2>
              <span class="badge badge-emerald"><span class="dot-live"></span> 5 Global Nodes Active</span>
            </div>
            <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
              OutcomeAI monitors warehouse inventory, shipping couriers, and enterprise customer nodes globally in real-time.
            </div>
          </div>

          <button class="btn btn-secondary btn-sm" onclick="alert('All 5 global nodes reporting healthy with 0 dispatch delays!')">
            📡 Ping Global Hubs
          </button>
        </div>

        <!-- Global Map SVG Canvas -->
        <div class="ops-map-wrapper">
          <svg class="map-svg" viewBox="0 0 1000 450">
            <!-- Simplified World Map Background Outlines -->
            <path d="M 120,100 Q 180,90 280,110 Q 300,160 260,240 Q 200,280 140,200 Z" fill="#0f172a" stroke="#1e293b" stroke-width="1.5" />
            <path d="M 450,90 Q 580,80 620,130 Q 560,220 480,200 Z" fill="#0f172a" stroke="#1e293b" stroke-width="1.5" />
            <path d="M 620,90 Q 880,80 920,180 Q 800,280 680,240 Z" fill="#0f172a" stroke="#1e293b" stroke-width="1.5" />
            <path d="M 220,270 Q 280,260 290,380 Q 230,420 200,340 Z" fill="#0f172a" stroke="#1e293b" stroke-width="1.5" />
            <path d="M 480,210 Q 560,200 580,350 Q 500,390 460,300 Z" fill="#0f172a" stroke="#1e293b" stroke-width="1.5" />
            <path d="M 780,280 Q 880,270 890,380 Q 800,410 760,340 Z" fill="#0f172a" stroke="#1e293b" stroke-width="1.5" />

            <!-- Animated Courier Transit Lines -->
            <path d="M 230,160 Q 200,140 160,180" fill="none" stroke="#6366f1" stroke-width="2" stroke-dasharray="4,4" class="map-line-pulse" />
            <path d="M 230,160 Q 360,80 480,130" fill="none" stroke="#10b981" stroke-width="2" stroke-dasharray="4,4" />
            <path d="M 480,130 Q 660,110 820,190" fill="none" stroke="#06b6d4" stroke-width="2" stroke-dasharray="4,4" />

            <!-- Node Pins -->
            ${this.nodes.map(n => `
              <g class="map-pin" data-id="${n.id}" onclick="window.opsMapView.selectNode('${n.id}')">
                <circle cx="${n.x}" cy="${n.y}" r="12" fill="${n.type === 'warehouse' ? 'rgba(16,185,129,0.2)' : 'rgba(99,102,241,0.2)'}" stroke="${n.type === 'warehouse' ? '#10b981' : '#6366f1'}" stroke-width="2" />
                <circle cx="${n.x}" cy="${n.y}" r="5" fill="${n.type === 'warehouse' ? '#34d399' : '#818cf8'}" />
                <text x="${n.x + 16}" y="${n.y + 4}" fill="#e2e8f0" font-size="11" font-weight="bold" font-family="'Plus Jakarta Sans', sans-serif">${n.name}</text>
              </g>
            `).join('')}
          </svg>
        </div>

        <!-- Node Details Card -->
        <div class="glass-panel" id="ops-node-details-card" style="padding: 20px;">
          <!-- Injected via selectNode -->
        </div>
      </div>
    `;
  }

  bindEvents() {
    // Handled by inline onclick
  }

  selectNode(nodeId) {
    this.selectedNode = nodeId;
    const n = this.nodes.find(item => item.id === nodeId);
    const card = this.container.querySelector('#ops-node-details-card');
    if (!n || !card) return;

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 12px;">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="font-size: 1.5rem;">${n.type === 'warehouse' ? '📦' : (n.type === 'datacenter' ? '⚡' : '🏢')}</div>
          <div>
            <div style="font-weight: 700; font-size: 1.1rem; color: #f8fafc;">${n.name}</div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Node Type: ${n.type}</div>
          </div>
        </div>
        <span class="badge badge-emerald">${n.status}</span>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px; font-size: 0.85rem;">
        <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); padding: 12px; border-radius: 8px;">
          <div style="color: var(--text-muted); font-size: 0.72rem; margin-bottom: 2px;">INVENTORY / ACCOUNT CONTEXT</div>
          <div style="font-weight: 700; color: #f8fafc;">${n.items}</div>
        </div>
        <div style="background: rgba(0,0,0,0.25); border: 1px solid var(--border-subtle); padding: 12px; border-radius: 8px;">
          <div style="color: var(--text-muted); font-size: 0.72rem; margin-bottom: 2px;">LIVE AUTONOMOUS ACTION IN TRANSIT</div>
          <div style="font-weight: 700; color: #34d399;">${n.activeCourier}</div>
        </div>
      </div>
    `;

    if (window.soundFX) window.soundFX.click();
  }
}

window.opsMapView = new OpsMapView();
