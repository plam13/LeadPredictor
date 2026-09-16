(function () {
  function round(value) {
    return Math.round(value);
  }

  function getInputs() {
    return {
      totalRevenue: parseFloat(document.getElementById('total-revenue').value) || 0,
      avgOrderValue: parseFloat(document.getElementById('avg-order-value').value) || 0,
      leadResponseRate: parseFloat(document.getElementById('lead-response-rate').value) || 0,
      prospectResponseRate: parseFloat(document.getElementById('prospect-response-rate').value) || 0,
      campaignStart: document.getElementById('campaign-start').value,
      campaignEnd: document.getElementById('campaign-end').value,
    };
  }

  function updateSliderLabels() {
    ['lead-response-rate', 'prospect-response-rate'].forEach((id) => {
      const value = parseFloat(document.getElementById(id).value) || 0;
      document.getElementById(`${id}-value`).textContent = `${value.toFixed(2)}%`;
    });
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
    updateSliderLabels();
    const inputs = getInputs();
    const result = LeadPredictor.calculateFunnel(inputs);
    updateStatCards(result);
    LeadPredictorChart.renderChart(document.getElementById('chart-container'), result);
  }

  function init() {
    [
      'total-revenue',
      'avg-order-value',
      'campaign-start',
      'campaign-end',
      'lead-response-rate',
      'prospect-response-rate',
    ].forEach((id) => {
      document.getElementById(id).addEventListener('input', recalculate);
    });

    const languageSelect = document.getElementById('language-select');
    languageSelect.addEventListener('change', () => {
      LeadPredictorI18n.applyLanguage(languageSelect.value);
    });

    const currencySelect = document.getElementById('currency-select');
    currencySelect.addEventListener('change', () => {
      LeadPredictorI18n.applyCurrency(currencySelect.value);
    });

    LeadPredictorI18n.applyLanguage(languageSelect.value);
    LeadPredictorI18n.applyCurrency(currencySelect.value);
    recalculate();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
