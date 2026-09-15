// Visual Workflow Studio Component
class WorkflowView {
  constructor() {
    this.currentWorkflow = 'customer_service';
    this.activeStep = 0;
    this.isPlaying = false;
    this.playTimer = null;
    this.speed = 1200;

    this.workflows = {
      customer_service: {
        title: "Customer Service: Damaged Product Autonomous Flow",
        description: "Zero-human touch replacement pipeline with SAP inventory reservation & Zendesk sync.",
        steps: [
          { id: 1, title: "1. Inbound Complaint & Intent Extraction", desc: "Customer reports broken scanner via Webchat. NLP extracts serial # & defect symptoms.", tool: "NLP & Sentiment", status: "idle" },
          { id: 2, title: "2. Customer 360 & Order History Retrieval", desc: "Query Salesforce CRM & SAP ERP for purchase date and warranty entitlement.", tool: "Salesforce CRM + SAP", status: "idle" },
          { id: 3, title: "3. Image Proof Inspection & Defect Verification", desc: "Computer Vision verifies physical crack pattern on barcode scanner lens plate.", tool: "Vision AI Inspector", status: "idle" },
          { id: 4, title: "4. Policy & Warranty Rule Engine Evaluation", desc: "Evaluate §4.2 VIP Express Rule. Order value $349.99 < $1000 limit. Auto-approved.", tool: "Decision Intelligence", status: "idle" },
          { id: 5, title: "5. SAP ERP Replacement Order Dispatch", desc: "Generate new replacement order #ORD-94302-R with FedEx Priority Overnight tracking.", tool: "SAP S/4HANA ERP", status: "idle" },
          { id: 6, title: "6. Zendesk & Salesforce Auto-Resolution", desc: "Resolve ticket #TICK-9042 with resolution notes and attach return label PDF.", tool: "Zendesk + Salesforce", status: "idle" },
          { id: 7, title: "7. Customer Notification & Outcome Verification", desc: "Send confirmation with live tracking link and return label instructions. Human touch = 0%.", tool: "Omnichannel Delivery", status: "idle" }
        ]
      },
      sales_pipeline: {
        title: "Sales Pipeline: Inbound Lead to Proposal & Meeting Close",
        description: "BANT automated qualification, enterprise proposal calculation, and calendar booking.",
        steps: [
          { id: 1, title: "1. Inbound Enterprise Inquiry Ingestion", desc: "VP of IT submits request for 45 agent AI deployment via Email.", tool: "Email Gateway", status: "idle" },
          { id: 2, title: "2. Multi-Dimensional BANT Lead Scoring", desc: "Evaluate Budget ($72k), Authority (VP), Need (200k tix/mo), Timeline (Q4). Score: 88/100.", tool: "Decision Intelligence", status: "idle" },
          { id: 3, title: "3. Salesforce CRM Qualified Opportunity Creation", desc: "Create high-priority deal ($72,000 ARR) and assign to Enterprise AE.", tool: "Salesforce CRM", status: "idle" },
          { id: 4, title: "4. Dynamic Enterprise Quotation & Proposal Draft", desc: "Compute custom pricing matrix: 45 seats + SAP & Salesforce connectors at $6,000/mo.", tool: "Proposal Generator", status: "idle" },
          { id: 5, title: "5. Calendar Availability Sync & Invite Dispatch", desc: "Query Lead Solutions Architect calendar and generate confirmed meeting invite.", tool: "Google / Outlook Cal", status: "idle" },
          { id: 6, title: "6. AE Notification & Briefing Pack Delivery", desc: "Deliver executive briefing summary and conversation transcript to Sales AE.", tool: "Slack / Email Alert", status: "idle" }
        ]
      }
    };
  }

  init() {
    this.container = document.getElementById('workflow-view-container');
    if (!this.container) return;
    this.render();
    this.bindEvents();
    this.renderGraph();
  }

  render() {
    this.container.innerHTML = `
      <div class="split-pane-layout">
        <div class="pane-primary">
          <!-- Workflow Controls Bar -->
          <div class="workflow-controls-bar">
            <div class="workflow-preset-select">
              <label style="font-size: 0.78rem; font-weight: 600; color: var(--text-muted);">Workflow:</label>
              <select id="workflow-selector" class="input-control select-control" style="width: 280px; font-size: 0.82rem; padding: 6px 28px 6px 12px;">
                <option value="customer_service">📦 Damaged Product Replacement (Support)</option>
                <option value="sales_pipeline">💼 Enterprise Inbound Lead to Close (Sales)</option>
              </select>
            </div>

            <div class="playback-controls">
              <button id="btn-play-workflow" class="btn btn-primary btn-sm">
                <span>▶ Run Flow</span>
              </button>
              <button id="btn-step-workflow" class="btn btn-secondary btn-sm">
                <span>⏭ Step Next</span>
              </button>
              <button id="btn-reset-workflow" class="btn btn-secondary btn-sm">
                <span>↺ Reset</span>
              </button>
            </div>
          </div>

          <!-- Visual DAG Graph Canvas -->
          <div class="graph-canvas-container" id="dag-graph-canvas">
            <!-- Rendered Nodes -->
          </div>
        </div>

        <!-- Right Side: Step Payload & Tool Inspector -->
        <div class="pane-secondary">
          <div class="inspector-panel">
            <div class="inspector-section">
              <div class="inspector-title">
                <span>Workflow Step Inspector</span>
                <span class="badge badge-cyan" id="step-tool-badge">Tool Name</span>
              </div>
              <div id="workflow-step-details">
                <div style="color: var(--text-muted); font-size: 0.82rem; text-align: center; padding: 30px 10px;">
                  Click on any workflow node or click <strong>▶ Run Flow</strong> to inspect live payload data.
                </div>
              </div>
            </div>

            <div class="inspector-section" style="flex: 1;">
              <div class="inspector-title">
                <span>Live State Machine Execution Log</span>
                <span class="badge badge-emerald">Real-time DAG</span>
              </div>
              <div id="workflow-execution-log" class="code-block" style="height: 250px; font-size: 0.72rem;">
                <span class="code-keyword">// Ready to orchestrate multi-agent workflow</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const sel = this.container.querySelector('#workflow-selector');
    if (sel) {
      sel.addEventListener('change', (e) => {
        this.currentWorkflow = e.target.value;
        this.reset();
      });
    }

    const playBtn = this.container.querySelector('#btn-play-workflow');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        this.togglePlay();
      });
    }

    const stepBtn = this.container.querySelector('#btn-step-workflow');
    if (stepBtn) {
      stepBtn.addEventListener('click', () => {
        this.stepForward();
      });
    }

    const resetBtn = this.container.querySelector('#btn-reset-workflow');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        this.reset();
      });
    }
  }

  renderGraph() {
    const canvas = this.container.querySelector('#dag-graph-canvas');
    if (!canvas) return;

    const wf = this.workflows[this.currentWorkflow];
    let html = `<div class="workflow-dag">`;

    wf.steps.forEach((step, idx) => {
      const isCompleted = idx < this.activeStep;
      const isActive = idx === this.activeStep && this.isPlaying;
      let statusClass = 'status-idle';
      let statusBadge = '<span class="badge badge-neutral">Pending</span>';

      if (isCompleted) {
        statusClass = 'status-completed';
        statusBadge = '<span class="badge badge-emerald">✓ Completed</span>';
      } else if (isActive) {
        statusClass = 'status-active animate-pulse-glow';
        statusBadge = '<span class="badge badge-violet"><span class="dot-live"></span> Executing</span>';
      }

      html += `
        <div class="workflow-node ${statusClass}" data-step="${idx}" onclick="window.workflowView.selectStep(${idx})">
          <div class="node-left">
            <div class="node-step-number">${step.id}</div>
            <div class="node-info">
              <div class="node-title">${step.title}</div>
              <div class="node-desc">${step.desc}</div>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="badge badge-neutral" style="font-size: 0.68rem;">${step.tool}</span>
            ${statusBadge}
          </div>
        </div>
      `;

      if (idx < wf.steps.length - 1) {
        const lineClass = isCompleted ? 'completed' : (isActive ? 'active' : '');
        html += `<div class="node-connector-line ${lineClass}"></div>`;
      }
    });

    html += `</div>`;
    canvas.innerHTML = html;
  }

  selectStep(idx) {
    const wf = this.workflows[this.currentWorkflow];
    const step = wf.steps[idx];
    if (!step) return;

    const toolBadge = this.container.querySelector('#step-tool-badge');
    if (toolBadge) toolBadge.innerText = step.tool;

    const detailsEl = this.container.querySelector('#workflow-step-details');
    if (detailsEl) {
      detailsEl.innerHTML = `
        <div class="workflow-detail-box">
          <div class="detail-row">
            <span class="detail-label">Step Name:</span>
            <span class="detail-value"><strong>${step.title}</strong></span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Orchestrated Tool:</span>
            <span class="detail-value"><span class="badge badge-cyan">${step.tool}</span></span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Autonomous Action:</span>
            <span class="detail-value">${step.desc}</span>
          </div>
          <div class="detail-row">
            <span class="detail-label">Status:</span>
            <span class="detail-value">${idx < this.activeStep ? '<span class="badge badge-emerald">Executed & Verified</span>' : '<span class="badge badge-neutral">Ready to Execute</span>'}</span>
          </div>
        </div>
      `;
    }

    if (window.soundFX) window.soundFX.click();
  }

  togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  play() {
    this.isPlaying = true;
    const playBtn = this.container.querySelector('#btn-play-workflow');
    if (playBtn) playBtn.innerHTML = `<span>⏸ Pause</span>`;

    this.playNextStep();
  }

  pause() {
    this.isPlaying = false;
    clearTimeout(this.playTimer);
    const playBtn = this.container.querySelector('#btn-play-workflow');
    if (playBtn) playBtn.innerHTML = `<span>▶ Run Flow</span>`;
    this.renderGraph();
  }

  reset() {
    this.pause();
    this.activeStep = 0;
    this.renderGraph();
    const log = this.container.querySelector('#workflow-execution-log');
    if (log) log.innerHTML = `<span class="code-keyword">// Workflow reset to Step 1</span>`;
  }

  stepForward() {
    const wf = this.workflows[this.currentWorkflow];
    if (this.activeStep < wf.steps.length) {
      this.executeStep(this.activeStep);
      this.activeStep++;
      this.renderGraph();
    }
  }

  playNextStep() {
    const wf = this.workflows[this.currentWorkflow];
    if (!this.isPlaying) return;

    if (this.activeStep < wf.steps.length) {
      this.executeStep(this.activeStep);
      this.activeStep++;
      this.renderGraph();
      this.playTimer = setTimeout(() => this.playNextStep(), this.speed);
    } else {
      this.pause();
      if (window.soundFX) window.soundFX.actionExecuted();
    }
  }

  executeStep(idx) {
    const wf = this.workflows[this.currentWorkflow];
    const step = wf.steps[idx];
    if (!step) return;

    this.selectStep(idx);

    const log = this.container.querySelector('#workflow-execution-log');
    if (log) {
      const time = new Date().toLocaleTimeString();
      log.innerHTML += `\n<span class="code-string">[${time}]</span> <span class="code-keyword">STEP ${step.id}:</span> <span class="code-key">${step.tool}</span> -> <span class="code-bool">OK</span>\n  ${step.desc}\n`;
      log.scrollTop = log.scrollHeight;
    }

    if (window.soundFX) window.soundFX.actionExecuted();
  }
}

window.workflowView = new WorkflowView();
