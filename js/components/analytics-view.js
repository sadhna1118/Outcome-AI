// Executive Analytics & Dynamic ROI Dashboard Component 2.0
class AnalyticsView {
  constructor() {
    this.ticketVolume = 50000;
    this.repCount = 30;
    this.repSalary = 55000;
    this.autoResolutionRate = 0.724;
  }

  init() {
    this.container = document.getElementById('analytics-view-container');
    if (!this.container) return;
    this.render();
    this.bindEvents();
    this.calculateRoi();
  }

  render() {
    this.container.innerHTML = `
      <div class="dashboard-viewport">
        <!-- Top Executive KPI Summary Cards -->
        <div class="kpi-grid">
          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-title">Autonomous Resolution</span>
              <div class="kpi-icon-badge">🤖</div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">72.4%</span>
              <span class="kpi-delta positive">▲ +4.2%</span>
            </div>
            <div class="kpi-footer-note">Resolved with 0% human agent touch</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-title">Avg Response & Action Time</span>
              <div class="kpi-icon-badge">⚡</div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">42s</span>
              <span class="kpi-delta positive">▼ 98.6%</span>
            </div>
            <div class="kpi-footer-note">vs. 4.2 hours human baseline</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-title">Cost per Resolution</span>
              <div class="kpi-icon-badge">💵</div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">$0.42</span>
              <span class="kpi-delta positive">▼ -$6.38</span>
            </div>
            <div class="kpi-footer-note">Reduced from $6.80 per human ticket</div>
          </div>

          <div class="kpi-card">
            <div class="kpi-header">
              <span class="kpi-title">B2B Lead-to-Meeting</span>
              <div class="kpi-icon-badge">📈</div>
            </div>
            <div class="kpi-value-row">
              <span class="kpi-value">34.2%</span>
              <span class="kpi-delta positive">▲ +11.8%</span>
            </div>
            <div class="kpi-footer-note">Instant BANT qualification & booking</div>
          </div>
        </div>

        <!-- 2-Column Section: Resolution Distribution Chart & Dynamic ROI Calculator -->
        <div class="dashboard-row-2">
          <!-- Resolution Performance & Chart -->
          <div class="glass-panel" style="padding: 24px; display: flex; flex-direction: column; gap: 18px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h3 style="font-size: 1.1rem;">Autonomous Workload Distribution</h3>
                <div style="font-size: 0.78rem; color: var(--text-muted);">Real-time breakdown of ticket routing & outcomes</div>
              </div>
              <button class="btn btn-secondary btn-sm" onclick="window.analyticsView.exportBoardReport()">
                📄 Export Board Deck
              </button>
            </div>

            <!-- SVG Visual Donut / Bar Chart -->
            <div style="display: flex; align-items: center; justify-content: space-around; padding: 20px 0; background: rgba(0,0,0,0.2); border-radius: var(--radius-md);">
              <svg width="180" height="180" viewBox="0 0 36 36">
                <!-- Background Circle -->
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#1e293b" stroke-width="3.8" />
                <!-- Autonomous (72.4%) -->
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#6366f1" stroke-width="3.8" stroke-dasharray="72.4, 100" stroke-linecap="round" />
                <!-- HITL Escalated (18.6%) -->
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#f59e0b" stroke-width="3.8" stroke-dasharray="18.6, 100" stroke-dashoffset="-72.4" stroke-linecap="round" />
                <!-- Complex (9.0%) -->
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#06b6d4" stroke-width="3.8" stroke-dasharray="9.0, 100" stroke-dashoffset="-91.0" stroke-linecap="round" />
                <text x="18" y="20.5" font-family="'Outfit', sans-serif" font-size="7" font-weight="bold" fill="#ffffff" text-anchor="middle">72.4%</text>
              </svg>

              <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 8px; font-size: 0.82rem;">
                  <span style="width: 12px; height: 12px; background: #6366f1; border-radius: 3px;"></span>
                  <span><strong>100% Autonomous:</strong> 72.4% (36,200 tix)</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; font-size: 0.82rem;">
                  <span style="width: 12px; height: 12px; background: #f59e0b; border-radius: 3px;"></span>
                  <span><strong>HITL Copilot Approval:</strong> 18.6% (9,300 tix)</span>
                </div>
                <div style="display: flex; align-items: center; gap: 8px; font-size: 0.82rem;">
                  <span style="width: 12px; height: 12px; background: #06b6d4; border-radius: 3px;"></span>
                  <span><strong>Complex Tier-3 Routing:</strong> 9.0% (4,500 tix)</span>
                </div>
              </div>
            </div>

            <!-- Resolution Categories -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.8rem;">
              <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 12px; border-radius: 8px;">
                <div style="color: var(--text-muted); font-size: 0.72rem; margin-bottom: 2px;">TOP AUTONOMOUS CATEGORY</div>
                <div style="font-weight: 700; color: #f8fafc;">Order Status & Replacements</div>
                <div style="color: #34d399; font-weight: 600; font-size: 0.75rem; margin-top: 4px;">91.2% success rate</div>
              </div>
              <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); padding: 12px; border-radius: 8px;">
                <div style="color: var(--text-muted); font-size: 0.72rem; margin-bottom: 2px;">TOP SALES AUTOMATION</div>
                <div style="font-weight: 700; color: #f8fafc;">BANT & Calendar Booking</div>
                <div style="color: #60a5fa; font-weight: 600; font-size: 0.75rem; margin-top: 4px;">3.4x faster pipeline velocity</div>
              </div>
            </div>
          </div>

          <!-- Dynamic ROI Calculator -->
          <div class="roi-calculator-card">
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h3 style="font-size: 1.15rem; color: #f8fafc;">Executive ROI Calculator</h3>
                <span class="badge badge-cyan">Interactive</span>
              </div>
              <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 2px;">
                Simulate business cost reductions and agent hours reclaimed.
              </div>
            </div>

            <div class="roi-slider-group">
              <div class="roi-slider-header">
                <span style="color: var(--text-secondary);">Monthly Customer Ticket Volume</span>
                <span id="display-tickets-val" style="color: #a5b4fc; font-weight: 700;">50,000 / mo</span>
              </div>
              <input type="range" id="slider-tickets" class="roi-range-input" min="5000" max="250000" step="5000" value="50000" />
            </div>

            <div class="roi-slider-group">
              <div class="roi-slider-header">
                <span style="color: var(--text-secondary);">Human Support / Sales Reps</span>
                <span id="display-reps-val" style="color: #a5b4fc; font-weight: 700;">30 agents</span>
              </div>
              <input type="range" id="slider-reps" class="roi-range-input" min="5" max="150" step="1" value="30" />
            </div>

            <div class="roi-slider-group">
              <div class="roi-slider-header">
                <span style="color: var(--text-secondary);">Avg Rep Annual Salary ($)</span>
                <span id="display-salary-val" style="color: #a5b4fc; font-weight: 700;">$55,000 / yr</span>
              </div>
              <input type="range" id="slider-salary" class="roi-range-input" min="35000" max="120000" step="5000" value="55000" />
            </div>

            <!-- Savings Banner -->
            <div class="roi-result-banner">
              <div>
                <div style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: #94a3b8; letter-spacing: 0.05em;">Estimated Annual Savings</div>
                <div class="roi-savings-number" id="roi-annual-savings">$1,188,000</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 0.72rem; color: #94a3b8;">Payback Period</div>
                <div style="font-size: 1.15rem; font-weight: 700; color: #34d399;" id="roi-payback-days">18 Days</div>
                <div style="font-size: 0.7rem; color: var(--text-muted);" id="roi-hours-saved">41,200 hrs saved/yr</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const sliderTix = this.container.querySelector('#slider-tickets');
    const sliderReps = this.container.querySelector('#slider-reps');
    const sliderSal = this.container.querySelector('#slider-salary');

    if (sliderTix) {
      sliderTix.addEventListener('input', (e) => {
        this.ticketVolume = parseInt(e.target.value);
        this.container.querySelector('#display-tickets-val').innerText = `${this.ticketVolume.toLocaleString()} / mo`;
        this.calculateRoi();
      });
    }

    if (sliderReps) {
      sliderReps.addEventListener('input', (e) => {
        this.repCount = parseInt(e.target.value);
        this.container.querySelector('#display-reps-val').innerText = `${this.repCount} agents`;
        this.calculateRoi();
      });
    }

    if (sliderSal) {
      sliderSal.addEventListener('input', (e) => {
        this.repSalary = parseInt(e.target.value);
        this.container.querySelector('#display-salary-val').innerText = `$${this.repSalary.toLocaleString()} / yr`;
        this.calculateRoi();
      });
    }
  }

  calculateRoi() {
    const humanCostPerTicket = 6.80;
    const aiCostPerTicket = 0.42;

    const monthlyTixAutonomous = this.ticketVolume * this.autoResolutionRate;
    const monthlySavings = monthlyTixAutonomous * (humanCostPerTicket - aiCostPerTicket);
    const annualSavings = Math.round(monthlySavings * 12);

    const hoursSavedPerYear = Math.round((monthlyTixAutonomous * 12 * 14) / 60);
    const paybackDays = Math.max(12, Math.round((this.repCount * 1200) / (monthlySavings / 30)));

    const savingsEl = this.container.querySelector('#roi-annual-savings');
    const paybackEl = this.container.querySelector('#roi-payback-days');
    const hoursEl = this.container.querySelector('#roi-hours-saved');

    if (savingsEl) savingsEl.innerText = OutcomeFormatters.formatCurrency(annualSavings);
    if (paybackEl) paybackEl.innerText = `${paybackDays} Days`;
    if (hoursEl) hoursEl.innerText = `${hoursSavedPerYear.toLocaleString()} hrs saved/yr`;
  }

  exportBoardReport() {
    window.outcomeApp.showToast("Board Report Generated", "Executive summary with ROI calculations is ready for presentation.");
    alert(`📊 OUTCOMEAI EXECUTIVE BOARD BRIEFING\n\n- Autonomous Resolution Rate: 72.4%\n- Cost per Resolution: $0.42 (vs $6.80 Human)\n- Annual Projected Net Savings: $1,188,000\n- Pipeline Acceleration: +34.2% Lead-to-Meeting\n- SLA Adherence: 99.98%\n\nOutcomeAI transforms digital support & sales into zero-touch autonomous revenue drivers.`);
  }
}

window.analyticsView = new AnalyticsView();
