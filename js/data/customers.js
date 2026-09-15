// Customer 360 Database
window.OUTCOME_CUSTOMERS = {
  "cust_101": {
    id: "cust_101",
    name: "Elena Rostova",
    company: "Apex Dynamics Corp",
    email: "elena.r@apexdynamics.io",
    phone: "+1 (555) 389-4421",
    channel: "webchat",
    segment: "Enterprise VIP",
    ltv: "$48,500",
    tier: "Tier 1 Platinum",
    sentimentBaseline: "Frustrated",
    crm: {
      accountOwner: "Marcus Vance",
      dealStage: "Active Customer",
      contractRenewal: "2026-11-30",
      npsScore: 9,
      healthScore: 84
    },
    orders: [
      {
        orderId: "ORD-94281",
        date: "2026-09-08",
        product: "Precision Laser Barcode Scanner Pro X4",
        amount: 349.99,
        status: "Delivered",
        warrantyStatus: "Active (24-Month Pro Care)",
        trackingNumber: "TRK-98214-FDX"
      }
    ],
    supportHistory: [
      {
        ticketId: "TICK-4029",
        subject: "Firmware upgrade inquiry",
        status: "Resolved",
        date: "2026-07-14",
        agent: "OutcomeAI (Autonomous)"
      }
    ],
    activeIssue: {
      type: "damaged_product",
      product: "Precision Laser Barcode Scanner Pro X4",
      orderId: "ORD-94281",
      serialNumber: "SN-8492-X4"
    }
  },

  "lead_202": {
    id: "lead_202",
    name: "David Chen",
    company: "CloudScale Systems",
    email: "david.c@cloudscale.net",
    phone: "+1 (415) 782-9014",
    channel: "email",
    segment: "Inbound Enterprise Lead",
    ltv: "$0 (Pipeline: $72,000)",
    tier: "High-Priority Inbound",
    sentimentBaseline: "Interested",
    crm: {
      accountOwner: "Unassigned -> Sarah Jenkins",
      dealStage: "New Inbound Inquiry",
      annualRevenue: "$25M+",
      employeeCount: "250-500",
      buyingAuthority: "VP of IT & Customer Experience",
      leadScore: 88
    },
    orders: [],
    supportHistory: [],
    salesIntent: {
      inquiry: "Looking to deploy autonomous customer service teammate across 45 support reps and 200k monthly tickets. Need custom integration with SAP and Salesforce.",
      budgetEstimated: "$60,000 - $80,000/yr",
      timeline: "Q4 2026",
      seats: 45
    }
  },

  "cust_303": {
    id: "cust_303",
    name: "Samantha Miller",
    company: "Northwest Logistics",
    email: "s.miller@nwlogistics.com",
    phone: "+1 (206) 912-3344",
    channel: "whatsapp",
    segment: "SMB Standard",
    ltv: "$3,200",
    tier: "Standard",
    sentimentBaseline: "Neutral / Urgent",
    crm: {
      accountOwner: "Self-Service Tier",
      dealStage: "Active Customer",
      contractRenewal: "Monthly Sub",
      npsScore: 7,
      healthScore: 71
    },
    orders: [
      {
        orderId: "ORD-77190",
        date: "2026-08-01",
        product: "Fleet Tracking Module Base Kit",
        amount: 890.00,
        status: "Delivered",
        warrantyStatus: "Expired (30-Day Window Exceeded)",
        trackingNumber: "TRK-33910-UPS"
      }
    ],
    supportHistory: [
      {
        ticketId: "TICK-3118",
        subject: "Refund request for out-of-policy unit",
        status: "Requires Escalation",
        date: "2026-09-14",
        agent: "Pending Human Review"
      }
    ],
    activeIssue: {
      type: "out_of_policy_refund",
      amount: 890.00,
      orderId: "ORD-77190"
    }
  },

  "cust_404": {
    id: "cust_404",
    name: "Alex Rivera",
    company: "Nexus Media Global",
    email: "alex.rivera@nexusmedia.com",
    phone: "+1 (312) 880-1920",
    channel: "webchat",
    segment: "Mid-Market Growth",
    ltv: "$24,000",
    tier: "Enterprise Pro SaaS",
    sentimentBaseline: "At-Risk (Churn Warning)",
    crm: {
      accountOwner: "Jessica Taylor",
      dealStage: "Active Subscription ($1,200/mo)",
      contractRenewal: "2026-10-01",
      npsScore: 6,
      healthScore: 58
    },
    orders: [
      {
        orderId: "SUB-8819",
        date: "2026-09-01",
        product: "OutcomeAI 15-Seat Pro Annual Plan",
        amount: 14400.00,
        status: "Active (Billed Monthly)",
        warrantyStatus: "SLA Guaranteed",
        trackingNumber: "N/A"
      }
    ],
    supportHistory: [
      {
        ticketId: "TICK-5102",
        subject: "Budget cut review / cancellation inquiry",
        status: "In Progress",
        date: "2026-09-15",
        agent: "OutcomeAI (Autonomous)"
      }
    ],
    activeIssue: {
      type: "churn_prevention",
      currentPlan: "$1,200/mo ($14.4k/yr)",
      authorizedDiscountLimit: "20% ($960/mo)"
    }
  },

  "cust_505": {
    id: "cust_505",
    name: "Dr. Sophia Zhang",
    company: "BioHealth Diagnostics",
    email: "sophia.zhang@biohealth-diag.org",
    phone: "+1 (617) 492-7711",
    channel: "whatsapp",
    segment: "Healthcare Platinum VIP",
    ltv: "$68,000",
    tier: "Tier 1 Platinum",
    sentimentBaseline: "High Urgency",
    crm: {
      accountOwner: "Marcus Vance",
      dealStage: "Active Enterprise Account",
      contractRenewal: "2027-04-15",
      npsScore: 10,
      healthScore: 92
    },
    orders: [
      {
        orderId: "ORD-55201",
        date: "2026-09-13",
        product: "Automated Clinical Centrifuge Kit v4",
        amount: 1850.00,
        status: "In Transit (Memphis Weather Delay)",
        warrantyStatus: "VIP Expedited Replacement Protected",
        trackingNumber: "FDX-MEM-99214"
      }
    ],
    supportHistory: [],
    activeIssue: {
      type: "logistics_delay",
      orderId: "ORD-55201",
      criticality: "Hospital Lab Launch Blocked"
    }
  }
};

