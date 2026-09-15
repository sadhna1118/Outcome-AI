// Policy & Knowledge Base (RAG) View Component
class KnowledgeView {
  constructor() {
    this.searchQuery = "";
  }

  init() {
    this.container = document.getElementById('knowledge-view-container');
    if (!this.container) return;
    this.render();
    this.bindEvents();
  }

  render() {
    const kb = window.OUTCOME_KB;

    this.container.innerHTML = `
      <div style="display: flex; flex-direction: column; height: 100%; width: 100%; overflow-y: auto; padding: 24px; gap: 24px;">
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div>
            <h2 style="font-size: 1.4rem;">Policy Rules & RAG Knowledge Engine</h2>
            <div style="font-size: 0.8rem; color: var(--text-muted);">
              OutcomeAI uses continuous Retrieval-Augmented Generation (RAG) and deterministic policy guardrails to make confident business decisions.
            </div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="alert('Policy saved & vectorized into Pinecone database!')">
            + Add New Policy Rule
          </button>
        </div>

        <!-- Interactive Vector Search Simulator -->
        <div class="glass-panel" style="padding: 20px;">
          <div style="font-size: 0.85rem; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">
            🔍 Vector Semantic Search & RAG Chunk Retriever
          </div>
          <div style="display: flex; gap: 10px; margin-bottom: 14px;">
            <input type="text" id="rag-search-input" class="input-control" placeholder="Test semantic retrieval e.g. 'Can we auto-replace broken scanner?' or 'Annual discount matrix'..." value="Can we auto-replace broken scanner under warranty?" />
            <button id="btn-run-rag-search" class="btn btn-primary btn-sm" style="padding: 8px 18px;">
              Search Vectors ⚡
            </button>
          </div>
          <div id="rag-search-results" style="display: flex; flex-direction: column; gap: 8px;">
            <div style="background: rgba(0,0,0,0.3); border: 1px solid rgba(99,102,241,0.25); border-radius: 8px; padding: 12px 14px; font-size: 0.82rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <span style="font-weight: 700; color: #a5b4fc;">Hardware Warranty & Defect Replacement Policy (§4.2)</span>
                <span class="badge badge-emerald" style="font-size: 0.68rem;">Cosine Sim: 0.942 (Exact Match)</span>
              </div>
              <div style="color: var(--text-secondary);">
                "Defective or transit-damaged items reported within 30 days are eligible for instant 100% autonomous replacement. Enterprise VIP accounts have priority overnight shipping auto-approved up to $1,000 unit cost."
              </div>
            </div>
          </div>
        </div>

        <!-- Active Enterprise Policy Rules -->
        <div>
          <h3 style="font-size: 1.1rem; margin-bottom: 14px;">Active Decision Intelligence Policies</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 16px;">
            ${kb.policies.map(p => `
              <div class="glass-panel" style="padding: 20px; display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                  <div>
                    <span class="badge badge-violet" style="font-size: 0.68rem; margin-bottom: 6px;">${p.category}</span>
                    <h4 style="font-size: 0.95rem; color: var(--text-primary);">${p.title}</h4>
                  </div>
                  <span class="badge badge-emerald">Active</span>
                </div>

                <ul style="font-size: 0.78rem; color: var(--text-secondary); padding-left: 18px; display: flex; flex-direction: column; gap: 4px;">
                  ${p.rules.map(r => `<li>${r}</li>`).join('')}
                </ul>

                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-subtle); padding-top: 10px; font-size: 0.75rem;">
                  <span style="color: var(--text-muted);">Threshold: <strong>${p.autoApproveThreshold}</strong></span>
                  <span class="badge badge-cyan">${p.confidenceRequired}% Min Confidence</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const searchBtn = this.container.querySelector('#btn-run-rag-search');
    const searchInput = this.container.querySelector('#rag-search-input');

    if (searchBtn && searchInput) {
      searchBtn.addEventListener('click', () => {
        this.runRagSearch(searchInput.value.trim());
      });
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') this.runRagSearch(searchInput.value.trim());
      });
    }
  }

  runRagSearch(query) {
    const resultsEl = this.container.querySelector('#rag-search-results');
    if (!resultsEl || !query) return;

    const lower = query.toLowerCase();
    let matchedPolicy = window.OUTCOME_KB.policies[0];
    let sim = 0.935;

    if (lower.includes('refund') || lower.includes('return') || lower.includes('money')) {
      matchedPolicy = window.OUTCOME_KB.policies[1];
      sim = 0.912;
    } else if (lower.includes('discount') || lower.includes('pricing') || lower.includes('sales') || lower.includes('lead')) {
      matchedPolicy = window.OUTCOME_KB.policies[2];
      sim = 0.954;
    } else if (lower.includes('delay') || lower.includes('credit') || lower.includes('sla')) {
      matchedPolicy = window.OUTCOME_KB.policies[3];
      sim = 0.898;
    }

    resultsEl.innerHTML = `
      <div class="animate-fade-in" style="background: rgba(0,0,0,0.3); border: 1px solid rgba(99,102,241,0.35); border-radius: 8px; padding: 14px 16px; font-size: 0.82rem;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span style="font-weight: 700; color: #a5b4fc;">${matchedPolicy.title}</span>
          <span class="badge badge-emerald" style="font-size: 0.68rem;">Cosine Sim: ${sim.toFixed(3)}</span>
        </div>
        <div style="color: #e2e8f0; line-height: 1.45; margin-bottom: 8px;">
          ${matchedPolicy.rules[0]}
        </div>
        <div style="font-size: 0.72rem; color: #94a3b8;">
          Vector Source: Pinecone Namespace <code>enterprise-rag-v2</code> · Embedded with text-embedding-ada-002
        </div>
      </div>
    `;

    if (window.soundFX) window.soundFX.actionExecuted();
  }
}

window.knowledgeView = new KnowledgeView();
