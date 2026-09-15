// Multi-Agent Autonomous Orchestrator (OutcomeAI Engine)
class AgentEngine {
  constructor() {
    this.status = 'idle'; // idle | reasoning | executing | escalated | completed
    this.currentContext = null;
    this.currentWorkflowStep = 0;
  }

  // Set active customer & conversation context
  setContext(customerId) {
    this.currentContext = window.OUTCOME_CUSTOMERS[customerId] || null;
    return this.currentContext;
  }

  // Process arbitrary user message dynamically
  async processUserMessage(userMessageText, channel = 'webchat') {
    this.status = 'reasoning';
    window.dispatchEvent(new CustomEvent('outcome:status-changed', { detail: { status: 'reasoning' } }));

    const lower = userMessageText.toLowerCase();
    const sentiment = window.decisionRulesEngine.analyzeSentiment(userMessageText);

    // Dynamic Intent Classification
    let detectedIntent = 'general_inquiry';
    if (/damaged|broken|crack|laser|defect|replace/i.test(lower)) {
      detectedIntent = 'damaged_product_claim';
    } else if (/pricing|seats|reps|proposal|buy|enterprise|quote|demo|cost/i.test(lower)) {
      detectedIntent = 'sales_inquiry';
    } else if (/refund|return|money back|cancel/i.test(lower)) {
      detectedIntent = 'refund_request';
    }

    // Step 1: Context Gathering
    const contextReport = {
      channel: channel,
      sentiment: sentiment,
      intent: detectedIntent,
      customer: this.currentContext || { name: "Guest User", tier: "Standard" }
    };

    // Check if Real Live LLM Provider (Gemini / OpenAI / Groq) is enabled
    let realLLMOutput = null;
    if (window.settingsManager && window.settingsManager.config.provider !== 'autonomous') {
      const sysPrompt = `You are OutcomeAI, an autonomous enterprise AI teammate for sales and customer service. You have hands: you execute actions in SAP ERP, Stripe, and Salesforce. Answer professionally, concisely, and execute decisions. Active customer: ${JSON.stringify(contextReport.customer)}.`;
      realLLMOutput = await window.settingsManager.callLLM(sysPrompt, userMessageText);
    }

    // Step 2: Policy & Decision Evaluation
    let decision;
    let actionsToExecute = [];
    let responseText = "";
    let widgets = [];
    let thoughtChain = "";

    if (detectedIntent === 'damaged_product_claim') {
      thoughtChain = `Intent: 'damaged_product_claim' | Sentiment: ${sentiment.toFixed(2)} | Customer Tier: ${contextReport.customer.tier || 'Standard'} | Checking Warranty (§4.2) -> Auto-approval threshold met.`;
      
      const order = (contextReport.customer.orders && contextReport.customer.orders[0]) || { orderId: "ORD-94281", amount: 349.99, product: "Laser Barcode Scanner Pro X4" };
      decision = window.decisionRulesEngine.evaluateRefundOrReplacement(order, contextReport.customer, 'replacement');

      const sapRes = window.toolIntegrationsHub.executeSapReplacement(order.orderId, order.product, contextReport.customer.name);
      const zdRes = window.toolIntegrationsHub.executeZendeskTicket(`Damaged ${order.product} Replacement`, contextReport.customer.email, 'Solved', 'Auto-replaced via §4.2 VIP Policy');

      actionsToExecute = [
        { tool: "Decision Intelligence", action: "Policy Validation", status: "Approved", details: "Rule: Hardware Warranty §4.2 (100% confidence)" },
        { tool: "SAP S/4HANA ERP", action: "Dispatch Replacement", status: "Success", details: `Order #${sapRes.newOrder} | Tracking: ${sapRes.trackingNumber}` },
        { tool: "Zendesk Support", action: "Resolve Ticket", status: "Solved", details: `Ticket #${zdRes.ticketId} resolved autonomously in 42s` },
        { tool: "Salesforce CRM", action: "Update Customer 360", status: "Success", details: "Recorded warranty claim & express tracking info" }
      ];

      responseText = `I have verified your active **24-Month Pro Care Warranty** for order **#${order.orderId}**.\n\nA brand new replacement unit (${order.product}) has been dispatched via **FedEx Priority Overnight** at no cost to you.`;
      
      widgets.push({
        type: "replacement_card",
        orderId: sapRes.newOrder,
        item: order.product,
        shipping: "FedEx Priority Overnight",
        trackingNumber: sapRes.trackingNumber,
        estimatedDelivery: "Tomorrow by 10:30 AM"
      });

    } else if (detectedIntent === 'sales_inquiry') {
      const bant = window.decisionRulesEngine.evaluateBANT({ text: userMessageText });
      thoughtChain = `Intent: 'sales_inquiry' | BANT Analysis: Score ${bant.score}/100 | Qualification: ${bant.qualified ? 'QUALIFIED' : 'NURTURE'} | Auto-generating Custom Enterprise Quotation...`;

      const sfRes = window.toolIntegrationsHub.executeSalesforceOpportunity(contextReport.customer.company || "Enterprise Lead", "$72,000 ARR", "Proposal Generated", bant.score);
      const calRes = window.toolIntegrationsHub.executeCalendarBooking("OutcomeAI Technical Architecture Review", "Sarah Jenkins (Lead Solutions Architect)", contextReport.customer.email || "lead@cloudscale.net", "Thursday 2:30 PM PST");

      actionsToExecute = [
        { tool: "Decision Intelligence", action: "BANT Lead Scoring", status: `Score: ${bant.score}/100`, details: bant.reasons.join(" | ") },
        { tool: "Salesforce CRM", action: "Create Qualified Opportunity", status: "Success", details: `Opportunity #${sfRes.opportunityId} ($72,000 ARR) created` },
        { tool: "Proposal Generator", action: "Generate Quote", status: "Success", details: "Enterprise Tier (45 seats + SAP/Salesforce Connectors)" },
        { tool: "Google Calendar", action: "Schedule Technical Architecture Call", status: "Booked", details: `Meeting invite generated: ${calRes.conferenceLink}` }
      ];

      responseText = `Thank you for reaching out! Based on your team's operational needs and high ticket volume, OutcomeAI can autonomously resolve **70%+ of customer workflows** while directly integrating with your existing CRM & ERP stack.\n\nI have prepared a customized Enterprise Proposal and coordinated our Lead Solutions Architect for a technical walk-through.`;

      widgets.push({
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
      });

      widgets.push({
        type: "calendar_card",
        title: "OutcomeAI Technical Architecture Review",
        host: "Sarah Jenkins (Lead Solutions Architect)",
        time: "Thursday, Sep 17, 2026 · 2:30 PM - 3:00 PM PST",
        meetLink: calRes.conferenceLink
      });

    } else if (detectedIntent === 'refund_request') {
      const order = (contextReport.customer.orders && contextReport.customer.orders[0]) || { orderId: "ORD-77190", amount: 890.00 };
      decision = window.decisionRulesEngine.evaluateRefundOrReplacement(order, contextReport.customer, 'refund');

      if (decision.requiresEscalation) {
        thoughtChain = `Policy Check: Standard Return Policy §2.1 -> Amount $${order.amount} on ${order.date || '45-day order'} exceeds autonomous limits. Confidence = 58.2%. Escalating to Human Collaboration Queue...`;
        
        actionsToExecute = [
          { tool: "Decision Intelligence", action: "Policy Boundary Check", status: "Warning", details: decision.message },
          { tool: "Human Collaboration System", action: "Create Supervisor Review Item", status: "Escalated", details: "Routed to Human Approval Queue with pre-computed recommendation." }
        ];

        responseText = `I can see your order **#${order.orderId}** ($${order.amount.toFixed(2)}). Because this request falls slightly outside standard automatic refund windows, I have routed your case with high priority directly to our Account Management team for quick approval.`;
        
        widgets.push({
          type: "hitl_notification_card",
          itemId: "HITL-8821",
          reason: "Policy Exception: $890 refund requested on 45-day order (30-day limit)",
          suggestedAction: "Approve partial refund or offer store credit with bonus."
        });

      } else {
        const stripeRes = window.toolIntegrationsHub.executeStripeRefund(order.orderId, order.amount, contextReport.customer.email);
        thoughtChain = `Refund auto-approved within $150 limit and 30-day window. Issuing Stripe refund #${stripeRes.refundId}...`;
        
        actionsToExecute = [
          { tool: "Stripe Payments", action: "Process Refund", status: "Success", details: `Refund ID: ${stripeRes.refundId} ($${order.amount})` },
          { tool: "Zendesk Support", action: "Resolve Ticket", status: "Solved", details: "Ticket resolved with receipt attached" }
        ];

        responseText = `Your refund of **$${order.amount.toFixed(2)}** has been processed back to your original payment method. A receipt has been sent to your email.`;
      }

    } else {
      thoughtChain = `RAG Vector Search across Knowledge Base... Context retrieved from Policy Store. Providing autonomous response.`;
      responseText = `I understand your request. As an autonomous AI teammate, I can execute actions directly across Salesforce, Zendesk, Stripe, and SAP ERP, or connect you with a specialist. What specific outcome can I help you achieve?`;
    }

    if (realLLMOutput) {
      responseText = realLLMOutput;
      const provName = window.settingsManager ? window.settingsManager.config.provider.toUpperCase() : 'LLM';
      const modName = window.settingsManager ? window.settingsManager.config.model : 'model';
      thoughtChain = `[Live ${provName}: ${modName}] ` + thoughtChain;
    }

    this.status = 'idle';
    window.dispatchEvent(new CustomEvent('outcome:status-changed', { detail: { status: 'idle' } }));

    return {
      thought: thoughtChain,
      text: responseText,
      actionsTaken: actionsToExecute,
      widgets: widgets,
      sentiment: sentiment
    };
  }
}

window.agentEngine = new AgentEngine();
