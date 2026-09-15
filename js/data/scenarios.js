// Pre-configured Scenarios for OutcomeAI
window.OUTCOME_SCENARIOS = [
  {
    id: "scenario_damaged_product",
    category: "Customer Service",
    title: "Damaged Product Claim (100% Autonomous)",
    icon: "📦",
    customerId: "cust_101",
    channel: "webchat",
    description: "Elena reports a damaged barcode scanner. OutcomeAI verifies order, checks warranty policy, authorizes instant replacement in SAP, updates CRM and Zendesk with zero human involvement.",
    steps: [
      {
        stepIndex: 1,
        sender: "user",
        text: "Hi, I received my order ORD-94281 yesterday, but when we opened the box the scanner glass was cracked and the laser won't calibrate. We need a working replacement urgently for our warehouse shifts.",
        delay: 500
      },
      {
        stepIndex: 2,
        sender: "ai",
        thought: "Intent: 'damaged_product_claim' | Sentiment: -0.62 (Frustrated) | Customer: Elena Rostova (VIP Enterprise LTV $48.5k) | Order: ORD-94281 (Delivered 2026-09-08) | Checking Warranty Policy in RAG Vector DB...",
        text: "I'm very sorry to hear that, Elena. Let me immediately look into order #ORD-94281 for the **Precision Laser Barcode Scanner Pro X4**.",
        delay: 1500,
        actionsTaken: [
          {
            tool: "Salesforce CRM",
            action: "Query Customer 360",
            status: "Success",
            details: "Account: Apex Dynamics | VIP Tier 1 Platinum | Active Contract"
          },
          {
            tool: "SAP / Shopify ERP",
            action: "Verify Order Status",
            status: "Success",
            details: "ORD-94281 confirmed delivered on 2026-09-08 (within 14-day defect warranty window)"
          }
        ]
      },
      {
        stepIndex: 3,
        sender: "user",
        text: "Here is the photo showing the cracked glass front plate. Can you send a replacement today? Serial number is SN-8492-X4.",
        attachment: {
          type: "image",
          url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500&auto=format&fit=crop&q=60",
          name: "scanner_damage_inspection.jpg"
        },
        delay: 1800
      },
      {
        stepIndex: 4,
        sender: "ai",
        thought: "Image analysis: Verified structural crack on lens | Policy: 'Enterprise VIP Express Replacement Rule (§4.2)' -> Order Value $349.99 < $1000 Autonomous Threshold | Decision: AUTO_APPROVE | Dispatching SAP Replacement & Pre-paid Return Label...",
        text: "Thank you for the verification photo and serial number. I have confirmed your active **24-Month Pro Care Warranty** coverage.\n\nI have immediately authorized and dispatched a brand new replacement unit with **Priority Overnight Delivery** at no cost to you.",
        delay: 2200,
        actionsTaken: [
          {
            tool: "Decision Engine",
            action: "Policy Evaluation",
            status: "Approved",
            details: "Confidence Score: 98.4% | Autonomous Rule: §4.2 VIP Express Replacement"
          },
          {
            tool: "SAP ERP",
            action: "Create Replacement Order",
            status: "Success",
            details: "New Order: #ORD-94302-R | Warehouse: Chicago Depot | Tracking: FDX-77401-EXPRESS"
          },
          {
            tool: "Zendesk Support",
            action: "Create & Solve Ticket",
            status: "Success",
            details: "Ticket #TICK-9042 'Damaged Scanner Replacement' -> Status: Solved (0m 42s)"
          },
          {
            tool: "Salesforce CRM",
            action: "Update Contact & CSAT",
            status: "Success",
            details: "Logged express replacement incident. Customer health score stabilized."
          }
        ],
        widgets: [
          {
            type: "replacement_card",
            orderId: "ORD-94302-R",
            item: "Precision Laser Barcode Scanner Pro X4",
            shipping: "FedEx Priority Overnight",
            trackingNumber: "FDX-77401-EXPRESS",
            estimatedDelivery: "Tomorrow by 10:30 AM",
            returnLabelUrl: "https://outcome.ai/labels/RET-94281.pdf"
          }
        ]
      },
      {
        stepIndex: 5,
        sender: "user",
        text: "That was incredibly fast! Tracking received. Thank you so much for taking care of this instantly.",
        delay: 1500
      },
      {
        stepIndex: 6,
        sender: "ai",
        thought: "Customer Sentiment shift: -0.62 -> +0.94 (Delighted) | Outcome: 100% Autonomous Resolution | CSAT: 5/5 | Human Involvement: 0%",
        text: "You're very welcome, Elena! A pre-paid return shipping label has been emailed to `elena.r@apexdynamics.io` so you can return the damaged unit whenever convenient within 30 days. Is there anything else I can help your team with today?",
        delay: 1200
      }
    ]
  },

  {
    id: "scenario_sales_inbound",
    category: "Sales Pipeline",
    title: "Enterprise Lead Nurturing & Proposal (Sales)",
    icon: "💼",
    customerId: "lead_202",
    channel: "email",
    description: "David inquires about deploying OutcomeAI for 45 reps. AI conducts BANT qualification, scores lead at 88/100, generates personalized enterprise proposal ($72k/yr), and books calendar meeting.",
    steps: [
      {
        stepIndex: 1,
        sender: "user",
        text: "Hello, I am VP of IT at CloudScale Systems. We currently run 45 support agents handling ~200,000 tickets monthly on Zendesk & Salesforce. We are looking for an autonomous AI teammate that can resolve Tier 1 & 2 tickets autonomously and connect with SAP. Can you share pricing and implementation timelines?",
        delay: 500
      },
      {
        stepIndex: 2,
        sender: "ai",
        thought: "Intent: 'enterprise_inbound_inquiry' | RAG: Enterprise Tier Matrix | Lead Scoring Engine: Evaluating BANT (Budget: High, Authority: VP, Need: 200k tix/mo, Timeline: Immediate) -> Lead Score: 88/100 (Tier 1 Opportunity) | Generating Custom Enterprise Proposal...",
        text: "Hello David,\n\nThank you for reaching out to OutcomeAI! Based on your team size (**45 support agents**) and volume (**200,000 monthly tickets** across Zendesk, Salesforce & SAP), OutcomeAI typically automates **70%+ of Tier-1/2 workflows** within 14 days of deployment.",
        delay: 1800,
        actionsTaken: [
          {
            tool: "Salesforce CRM",
            action: "Create Qualified Opportunity",
            status: "Success",
            details: "Opportunity: 'CloudScale Systems - 45 Seats' | Value: $72,000 ARR | Stage: Proposal Generated"
          },
          {
            tool: "Decision Intelligence",
            action: "BANT Lead Scoring",
            status: "Score: 88/100",
            details: "Budget: $60k-$80k | Authority: VP IT (Decision Maker) | Need: High | Timeline: Q4 2026"
          },
          {
            tool: "Proposal Generator",
            action: "Draft Custom Enterprise Quote",
            status: "Success",
            details: "Quote #QUO-2026-88 | $6,000/mo ($72k ARR) | SAP & Salesforce Connectors included"
          }
        ],
        widgets: [
          {
            type: "proposal_card",
            quoteId: "QUO-2026-88",
            plan: "OutcomeAI Enterprise Suite (45 Seats)",
            amount: "$72,000 / year",
            monthlyRate: "$6,000 / month",
            features: [
              "Autonomous Resolution for up to 250,000 tickets/mo",
              "Bi-directional SAP ERP & Salesforce Sync",
              "Sub-second RAG Vector Knowledge Base",
              "Dedicated AI Implementation Engineer (14-day SLA)"
            ]
          }
        ]
      },
      {
        stepIndex: 3,
        sender: "user",
        text: "The proposal structure looks aligned with our budget. I'd like to schedule a 30-minute technical architecture review with our lead architect this Thursday afternoon.",
        delay: 1700
      },
      {
        stepIndex: 4,
        sender: "ai",
        thought: "Intent: 'schedule_demo_meeting' | Calendar Tool: Querying Senior Solutions Architect (Sarah Jenkins) availability for Thursday afternoon...",
        text: "Fantastic! I have coordinated our Enterprise Solutions Architect, **Sarah Jenkins**, for this Thursday. Here are the available slots that match your timezone (PST):",
        delay: 1500,
        actionsTaken: [
          {
            tool: "Google / Outlook Calendar",
            action: "Generate Calendar Invite",
            status: "Success",
            details: "Event: 'OutcomeAI x CloudScale: Architecture Review' | Thursday 2:30 PM - 3:00 PM PST"
          },
          {
            tool: "Salesforce CRM",
            action: "Update Deal Stage",
            status: "Success",
            details: "Stage advanced to 'Technical Review Scheduled'. Assigned to Sarah Jenkins."
          },
          {
            tool: "Gmail / Outlook",
            action: "Send Confirmation & Prep Deck",
            status: "Success",
            details: "Email dispatched to david.c@cloudscale.net with calendar ICS & Architecture Whitepaper."
          }
        ],
        widgets: [
          {
            type: "calendar_card",
            title: "OutcomeAI x CloudScale Architecture Review",
            host: "Sarah Jenkins (Lead Solutions Architect)",
            time: "Thursday, Sep 17, 2026 · 2:30 PM - 3:00 PM PST",
            meetLink: "https://meet.outcome.ai/cloudscale-arch-review"
          }
        ]
      }
    ]
  },

  {
    id: "scenario_hitl_escalation",
    category: "Human-in-the-Loop",
    title: "Borderline Out-of-Policy Refund (HITL Escalation)",
    icon: "🛡️",
    customerId: "cust_303",
    channel: "whatsapp",
    description: "Samantha requests an $890 refund on a 45-day-old purchase (exceeding standard 30-day window). Decision engine flags confidence at 58% and routes to Human Approval Queue with full context.",
    steps: [
      {
        stepIndex: 1,
        sender: "user",
        text: "Hi, I purchased the Fleet Tracking Module (Order ORD-77190 for $890) last month. Due to a project cancellation, we haven't opened the box and want a full refund to our credit card.",
        delay: 500
      },
      {
        stepIndex: 2,
        sender: "ai",
        thought: "Policy Check: 'Return Policy §2.1 (30-day limit)' -> Order Age = 45 days (Expired) | Order Amount = $890 (Exceeds $150 auto-override limit) | Confidence Score = 58.2% < 85% Auto Threshold | Triggering Human Collaboration System...",
        text: "Hello Samantha. I can see your purchase of the **Fleet Tracking Module ($890.00)** under order **#ORD-77190**.",
        delay: 1600,
        actionsTaken: [
          {
            tool: "Decision Intelligence",
            action: "Policy Boundary Check",
            status: "Warning",
            details: "Order age 45 days exceeds 30-day return policy. Amount $890 requires Senior Manager authorization."
          },
          {
            tool: "Human Collaboration System",
            action: "Route to Approval Queue",
            status: "Escalated",
            details: "Created Urgent Approval Item #HITL-8821 with context summary & 1-click decision options."
          }
        ],
        widgets: [
          {
            type: "hitl_notification_card",
            itemId: "HITL-8821",
            reason: "Policy Exception: $890 refund requested on 45-day order (30-day policy limit)",
            suggestedAction: "Approve partial refund with 10% restocking fee OR offer store credit + 10% bonus."
          }
        ]
      },
      {
        stepIndex: 3,
        sender: "ai",
        thought: "Escalated to Human Agent. Waiting for agent approval / override in HITL Queue...",
        text: "Because your order was delivered 45 days ago, full automated refunds require supervisor approval. I have transferred your case with priority to our Account Management team with a recommendation to waive the fee. One of our managers is reviewing it right now.",
        delay: 1200
      }
    ]
  },

  {
    id: "scenario_churn_prevention",
    category: "Sales & Retention",
    title: "SaaS Churn Defense & Dynamic Retention Discount",
    icon: "💳",
    customerId: "cust_404",
    channel: "webchat",
    description: "Alex threatens cancellation due to budget constraints. OutcomeAI evaluates account health, calculates LTV impact, applies an authorized 20% discount on Stripe, and retains $11.5k ARR automatically.",
    steps: [
      {
        stepIndex: 1,
        sender: "user",
        text: "Hi, our executive team has mandated a 25% departmental software budget cut for Q4. I love OutcomeAI, but we'll unfortunately need to cancel our $1,200/month subscription before the upcoming renewal on Oct 1st unless there is flexibility.",
        delay: 500
      },
      {
        stepIndex: 2,
        sender: "ai",
        thought: "Intent: 'churn_threat_budget_cut' | Sentiment: -0.45 (Regretful / Cost-conscious) | Customer: Alex Rivera (Nexus Media, $24k LTV, 15 Seats) | Policy: 'Retention Matrix §3.8' -> Max authorized discount for >1yr tenure is 20% ($960/mo) | Calculating Net ARR preservation ($11,520 saved vs $0 churn)...",
        text: "Hello Alex,\n\nWe deeply value Nexus Media's partnership over the past 14 months and want to support your team through this budget restructuring without disrupting your active AI automations.",
        delay: 1700,
        actionsTaken: [
          {
            tool: "Salesforce CRM",
            action: "Flag Churn Risk & Health Score",
            status: "Alert Logged",
            details: "Account: Nexus Media | Health Score: 58 -> Retention Playbook Active"
          },
          {
            tool: "Stripe Billing API",
            action: "Query Subscription SUB-8819",
            status: "Success",
            details: "Current: $1,200/mo ($14,400/yr). Next billing date: Oct 1, 2026."
          },
          {
            tool: "Decision Intelligence",
            action: "Policy §3.8 Retention Eligibility",
            status: "Approved",
            details: "Authorized: 20% Loyalty Retention Discount ($240/mo savings for 12 months)."
          }
        ]
      },
      {
        stepIndex: 3,
        sender: "ai",
        thought: "Generating tailored retention proposal card with 1-click Stripe activation...",
        text: "Under our **Enterprise Growth Loyalty Guarantee**, I am authorized to immediately apply an ongoing **20% Budget Relief Discount**, bringing your monthly plan from **$1,200/mo down to $960/mo ($11,520/yr)** for the next 12 months with all 15 seats and premium support fully intact.",
        delay: 1500,
        widgets: [
          {
            type: "retention_card",
            plan: "OutcomeAI 15-Seat Pro Plan (Loyalty Tier)",
            originalPrice: "$1,200 / mo",
            discountedPrice: "$960 / mo",
            annualSavings: "$2,880 saved / yr",
            effectiveDate: "Immediate (Applies to Oct 1st Renewal)",
            stripeSubId: "sub_1N82xL902"
          }
        ]
      },
      {
        stepIndex: 4,
        sender: "user",
        text: "That exactly meets our CFO's 20% reduction target! If you can apply that discount to our account today, we will happily renew for the full year.",
        delay: 1600
      },
      {
        stepIndex: 5,
        sender: "ai",
        thought: "Action: stripe.subscriptions.update(coupon='LOYALTY_20_SAVE') | Salesforce: Opportunity -> 'Renewal Closed-Won ($11,520 ARR)' | Slack: #sales-wins notified | Outcome: 100% Autonomous Churn Prevention",
        text: "Done! I have applied coupon `LOYALTY_20_SAVE` to your Stripe subscription `sub_1N82xL902`. Your next invoice on Oct 1 will reflect **$960.00**.\n\nA confirmation receipt has been emailed to `alex.rivera@nexusmedia.com`. We're thrilled to continue powering Nexus Media!",
        delay: 1400,
        actionsTaken: [
          {
            tool: "Stripe Billing API",
            action: "Apply 20% Coupon Code",
            status: "Success",
            details: "Coupon LOYALTY_20_SAVE applied. Invoice adjusted to $960.00/mo."
          },
          {
            tool: "Salesforce CRM",
            action: "Close-Won Contract Renewal",
            status: "Success",
            details: "Opportunity: 'Nexus Media 2026-2027 Renewal' -> Closed-Won ($11,520 ARR). Churn risk cleared."
          },
          {
            tool: "Slack / Notifications",
            action: "Broadcast Revenue Win",
            status: "Success",
            details: "Posted to #revenue-wins: 'OutcomeAI saved $11.5k ARR on Nexus Media autonomously.'"
          }
        ]
      }
    ]
  },

  {
    id: "scenario_logistics_reroute",
    category: "ERP & Customer Operations",
    title: "Supply Chain Delay Reroute & SLA Compensation",
    icon: "🚚",
    customerId: "cust_505",
    channel: "whatsapp",
    description: "Dr. Zhang needs urgent clinical lab equipment held up by courier weather delays. OutcomeAI detects tracking anomaly, reroutes reserve stock from Dallas depot via Priority Courier, and issues $100 SLA credit autonomously.",
    steps: [
      {
        stepIndex: 1,
        sender: "user",
        text: "Urgent: Our Automated Clinical Centrifuge Kit (ORD-55201) was supposed to arrive today for our new hospital wing opening tomorrow, but tracking shows it is stuck at the Memphis FedEx hub with no update!",
        delay: 500
      },
      {
        stepIndex: 2,
        sender: "ai",
        thought: "Intent: 'critical_shipment_delay' | Customer: Dr. Sophia Zhang (BioHealth Diagnostics, Tier 1 VIP, $68k LTV) | Fetching FedEx Telemetry & SAP Global Logistics Inventory...",
        text: "Dr. Zhang, I understand the critical importance of this equipment for your hospital wing opening tomorrow morning. Let me instantly inspect live telemetry across FedEx and our SAP logistics grid.",
        delay: 1600,
        actionsTaken: [
          {
            tool: "FedEx Telemetry API",
            action: "Live Tracking Diagnostics",
            status: "Delayed",
            details: "Flight grounded at Memphis hub due to severe weather. Expected delay: 36 hours."
          },
          {
            tool: "SAP ERP Inventory",
            action: "Multi-Depot Stock Query",
            status: "Success",
            details: "2 units available at Dallas Rapid Hub (within same-day direct courier radius to Boston)."
          }
        ]
      },
      {
        stepIndex: 3,
        sender: "ai",
        thought: "Policy: 'Healthcare Mission-Critical SLA §7.2' -> Auto-authorize Emergency Courier Reroute up to $500 + $100 SLA Courtesy Credit | Executing SAP Emergency Dispatch & Dispatching Same-Day Flight Courier...",
        text: "Because Memphis flights are grounded, waiting will cause a 36-hour delay. As a Tier-1 Healthcare partner, I have **automatically dispatched a backup sterile unit directly from our Dallas Rapid Hub via Medical Courier Same-Day Jet Service**, scheduled to land at Boston Logan by 9:00 PM tonight.",
        delay: 2000,
        actionsTaken: [
          {
            tool: "SAP ERP",
            action: "Emergency Stock Reservation & Dispatch",
            status: "Success",
            details: "Reserved SKU CENT-v4-99 from Dallas Depot. Waybill #JET-8820-EMERGENCY created."
          },
          {
            tool: "Stripe Billing API",
            action: "Issue $100 SLA Compliance Credit",
            status: "Success",
            details: "Credit of $100.00 applied to BioHealth Diagnostics ledger for delivery disruption."
          },
          {
            tool: "Twilio Telephony",
            action: "Dispatch Real-Time SMS Alert",
            status: "Success",
            details: "Sent live courier GPS tracking link to +1 (617) 492-7711."
          }
        ],
        widgets: [
          {
            type: "reroute_card",
            trackingId: "JET-8820-EMERGENCY",
            carrier: "Global Med-Express Jet Direct",
            origin: "Dallas Logistics Depot (DFW)",
            destination: "BioHealth Diagnostics, Lab Wing 3, Boston",
            estimatedArrival: "Tonight by 8:45 PM EST",
            slaCredit: "$100.00 SLA Compensation Applied"
          }
        ]
      },
      {
        stepIndex: 4,
        sender: "user",
        text: "Incredible! You just saved our entire lab launch. Thank you for resolving this proactively without putting us on hold!",
        delay: 1400
      },
      {
        stepIndex: 5,
        sender: "ai",
        thought: "Customer Sentiment: +0.98 (Relieved / Loyal) | Resolution Time: 6.2s | Outcome: 100% Autonomous SLA Remediation | Zero Human Intervention",
        text: "It is our absolute pleasure, Dr. Zhang. You can monitor the live temperature-controlled courier aircraft at the link sent to your phone. Best of luck with tomorrow's launch!",
        delay: 1200
      }
    ]
  }
];

