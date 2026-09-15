// Decision Intelligence & Policy Rules Engine
class DecisionRulesEngine {
  constructor() {
    this.policies = window.OUTCOME_KB ? window.OUTCOME_KB.policies : [];
  }

  // Analyze Sentiment (-1.0 to +1.0)
  analyzeSentiment(text) {
    const lower = text.toLowerCase();
    let score = 0.0;

    const negativeKeywords = ['broken', 'damaged', 'crack', 'cracked', 'frustrated', 'terrible', 'urgent', 'angry', 'fail', 'failed', 'delay', 'issue', 'complaint'];
    const positiveKeywords = ['thank', 'thanks', 'great', 'awesome', 'fast', 'helpful', 'appreciate', 'perfect', 'aligned', 'fantastic'];

    negativeKeywords.forEach(kw => {
      if (lower.includes(kw)) score -= 0.35;
    });

    positiveKeywords.forEach(kw => {
      if (lower.includes(kw)) score += 0.4;
    });

    return Math.max(-1.0, Math.min(1.0, score));
  }

  // Evaluate BANT Sales Lead Score (0 to 100)
  evaluateBANT(leadData) {
    let score = 0;
    const reasons = [];

    // Budget (max 25)
    if (leadData.budget || (leadData.text && /budget|\$|arr|annual/i.test(leadData.text))) {
      score += 25;
      reasons.push("Budget identified or enterprise scope acknowledged (+25)");
    }

    // Authority (max 25)
    if (leadData.authority || (leadData.text && /vp|director|head of|cto|cio|manager|founder/i.test(leadData.text))) {
      score += 25;
      reasons.push("Decision maker / executive authority confirmed (+25)");
    }

    // Need (max 25)
    if (leadData.need || (leadData.text && /ticket|agent|reps|support|scale|automate|sap|salesforce/i.test(leadData.text))) {
      score += 25;
      reasons.push("High-volume operational pain point identified (+25)");
    }

    // Timeline (max 25)
    if (leadData.timeline || (leadData.text && /thursday|today|asap|urgent|q4|q1|month|next week/i.test(leadData.text))) {
      score += 25;
      reasons.push("Clear near-term buying timeline (+25)");
    }

    return {
      score: Math.min(100, Math.max(20, score)),
      reasons,
      qualified: score >= 75
    };
  }

  // Evaluate Refund / Replacement Eligibility
  evaluateRefundOrReplacement(order, customer, requestedAction = 'replacement') {
    const isEnterprise = customer.tier && customer.tier.includes('Platinum');
    const orderDate = new Date(order.date || '2026-09-08');
    const today = new Date('2026-09-15');
    const daysSinceOrder = Math.floor((today - orderDate) / (1000 * 60 * 60 * 24));

    if (requestedAction === 'replacement') {
      if (daysSinceOrder <= 30 && order.amount <= 1000) {
        return {
          approved: true,
          confidence: isEnterprise ? 98.4 : 92.0,
          rule: "Hardware Warranty & Defect Replacement Policy (§4.2)",
          actionType: "AUTO_APPROVE_REPLACEMENT",
          message: "Express replacement authorized under 24-Month Pro Care warranty."
        };
      }
    }

    if (requestedAction === 'refund') {
      if (daysSinceOrder <= 30 && order.amount <= 150) {
        return {
          approved: true,
          confidence: 94.0,
          rule: "Standard Return & Customer Refund Policy (§2.1)",
          actionType: "AUTO_APPROVE_REFUND",
          message: "Refund auto-approved within 30-day window and under $150 threshold."
        };
      } else {
        return {
          approved: false,
          requiresEscalation: true,
          confidence: 58.2,
          rule: "Standard Return Policy (§2.1)",
          actionType: "ESCALATE_TO_HUMAN",
          message: `Order age (${daysSinceOrder} days) or amount ($${order.amount}) exceeds autonomous threshold.`
        };
      }
    }

    return {
      approved: false,
      requiresEscalation: true,
      confidence: 65.0,
      actionType: "ESCALATE_TO_HUMAN",
      message: "Case complexity requires human oversight."
    };
  }
}

window.decisionRulesEngine = new DecisionRulesEngine();
