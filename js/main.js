(function () {
  // Replaced by the real slider values once the response-rate sliders are wired in.
  const DEFAULT_LEAD_RESPONSE_RATE = 40;
  const DEFAULT_PROSPECT_RESPONSE_RATE = 20;

  function round(value) {
    return Math.round(value);
  }

  function getInputs() {
    return {
      totalRevenue: parseFloat(document.getElementById('total-revenue').value) || 0,
      avgOrderValue: parseFloat(document.getElementById('avg-order-value').value) || 0,
      leadResponseRate: DEFAULT_LEAD_RESPONSE_RATE,
      prospectResponseRate: DEFAULT_PROSPECT_RESPONSE_RATE,
      campaignStart: document.getElementById('campaign-start').value,
      campaignEnd: document.getElementById('campaign-end').value,
    };
  }

  function setCard(name, value, percent) {
    document.getElementById(`${name}-value`).textContent = round(value);
    document.getElementById(`${name}-percent`).textContent = `${round(percent)}%`;
    document.getElementById(`${name}-progress`).style.width = `${Math.min(100, Math.max(0, percent))}%`;
  }

  function updateStatCards(result) {
    const { prospects, leads, customers } = result;
    const leadsPercent = prospects ? (leads / prospects) * 100 : 0;
    const customersPercent = prospects ? (customers / prospects) * 100 : 0;

    setCard('prospects', prospects, 100);
    setCard('leads', leads, leadsPercent);
    setCard('customers', customers, customersPercent);
  }

  function recalculate() {
    const inputs = getInputs();
    const result = LeadPredictor.calculateFunnel(inputs);
    updateStatCards(result);
  }

  function init() {
    ['total-revenue', 'avg-order-value', 'campaign-start', 'campaign-end'].forEach((id) => {
      document.getElementById(id).addEventListener('input', recalculate);
    });
    recalculate();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
