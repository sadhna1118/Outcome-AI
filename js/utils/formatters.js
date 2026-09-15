// Utility Formatters
window.OutcomeFormatters = {
  formatCurrency(num) {
    if (typeof num !== 'number') return num;
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);
  },

  formatSentimentBadge(sentiment) {
    let text = 'Neutral';
    let cls = 'badge-cyan';

    if (sentiment > 0.3) {
      text = `Positive (+${(sentiment * 100).toFixed(0)}%)`;
      cls = 'badge-emerald';
    } else if (sentiment < -0.3) {
      text = `Frustrated (${(sentiment * 100).toFixed(0)}%)`;
      cls = 'badge-rose';
    } else {
      text = `Neutral (${(sentiment * 100).toFixed(0)}%)`;
      cls = 'badge-amber';
    }

    return `<span class="badge ${cls}"><span class="dot-live"></span>${text}</span>`;
  },

  formatConfidence(score) {
    let cls = 'badge-emerald';
    if (score < 70) cls = 'badge-rose';
    else if (score < 85) cls = 'badge-amber';

    return `<span class="badge ${cls}">${score.toFixed(1)}% Confidence</span>`;
  },

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  },

  highlightJson(obj) {
    const jsonStr = typeof obj === 'string' ? obj : JSON.stringify(obj, null, 2);
    return jsonStr.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
      let cls = 'code-number';
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = 'code-key';
        } else {
          cls = 'code-string';
        }
      } else if (/true|false/.test(match)) {
        cls = 'code-bool';
      } else if (/null/.test(match)) {
        cls = 'code-keyword';
      }
      return '<span class="' + cls + '">' + match + '</span>';
    });
  }
};
