// Policy & RAG Knowledge Base Store
window.OUTCOME_KB = {
  policies: [
    {
      id: "pol_warranty",
      title: "Hardware Warranty & Defect Replacement Policy (§4.2)",
      category: "Warranty & Returns",
      updatedAt: "2026-09-01",
      rules: [
        "Defective or transit-damaged items reported within 30 days are eligible for instant 100% autonomous replacement.",
        "Enterprise VIP (Tier 1) accounts have priority overnight shipping auto-approved up to $1,000 unit cost.",
        "Pre-paid return labels must be issued automatically upon replacement dispatch.",
        "Serial numbers must be recorded in SAP inventory & Salesforce CRM."
      ],
      autoApproveThreshold: "$1,000.00",
      confidenceRequired: 80
    },
    {
      id: "pol_refunds",
      title: "Standard Return & Customer Refund Policy (§2.1)",
      category: "Billing & Finance",
      updatedAt: "2026-08-15",
      rules: [
        "Unopened products returned within 30 days qualify for 100% refund to original payment method.",
        "Autonomous refund limit for standard tier customers is capped at $150.00 without human approval.",
        "Requests between 31 - 60 days require Human-in-the-Loop manager sign-off.",
        "Orders beyond 60 days are non-refundable; store credit up to 50% may be offered by human agent."
      ],
      autoApproveThreshold: "$150.00",
      confidenceRequired: 85
    },
    {
      id: "pol_sales_bant",
      title: "B2B Sales Qualification & Pricing Matrix (§1.4)",
      category: "Sales & Quoting",
      updatedAt: "2026-09-10",
      rules: [
        "Leads with score >= 80 (Budget confirmed, VP+ authority, >20 reps) qualify for immediate calendar booking.",
        "Enterprise Tier: $120/rep/mo (Billed annually). Auto-generate quote with SAP connector included.",
        "Mid-Market Tier: $90/rep/mo (Billed annually) for 10-25 reps.",
        "AI is authorized to grant up to 10% promotional discount for annual pre-payment."
      ],
      autoApproveThreshold: "Score >= 80",
      confidenceRequired: 75
    },
    {
      id: "pol_sla_credits",
      title: "Service Level Agreement (SLA) & Incident Compensation (§7.0)",
      category: "Customer Retention",
      updatedAt: "2026-09-05",
      rules: [
        "Delivery delay > 48 hours for Enterprise VIP generates an automatic $50 service retention credit.",
        "System uptime SLA is 99.95%. Breaches automatically issue 5% billing credit on the next invoice.",
        "Customer sentiment <= -0.7 triggers instant priority flag on Zendesk ticket."
      ],
      autoApproveThreshold: "$100.00",
      confidenceRequired: 90
    }
  ],

  ragDocuments: [
    {
      id: "doc_1",
      title: "OutcomeAI System Architecture & Tool Registry Whitepaper",
      chunks: 24,
      vectorEmbedding: "ada-002 (1536 dim)",
      lastIndexed: "2026-09-15 08:30 UTC"
    },
    {
      id: "doc_2",
      title: "Enterprise SAP ERP Connector & Stock Ledger Mapping",
      chunks: 18,
      vectorEmbedding: "ada-002 (1536 dim)",
      lastIndexed: "2026-09-14 14:12 UTC"
    },
    {
      id: "doc_3",
      title: "Salesforce CRM Lead Routing & Opportunity Stage Standard",
      chunks: 12,
      vectorEmbedding: "ada-002 (1536 dim)",
      lastIndexed: "2026-09-12 11:05 UTC"
    }
  ]
};
