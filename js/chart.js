// Renders the monthly funnel bar chart into a container element. No dependencies.
const LeadPredictorChart = (function () {

  function formatNumber(value) {
    return Math.round(value);
  }

  function niceMax(value) {
    if (value <= 0) return 20;
    const step = 20;
    return Math.ceil(value / step) * step;
  }

  function renderChart(container, result) {
    container.innerHTML = '';

    const { monthsCount, monthly } = result;
    const lastProspects = monthly.prospects[monthly.prospects.length - 1] || 0;
    const maxValue = niceMax(lastProspects);

    const chart = document.createElement('div');
    chart.className = 'chart';

    const rows = document.createElement('div');
    rows.className = 'chart-rows';

    const tooltip = document.createElement('div');
    tooltip.className = 'chart-tooltip';
    tooltip.hidden = true;

    for (let i = 1; i <= monthsCount; i++) {
      const idx = i - 1;
      const prospects = monthly.prospects[idx];
      const leads = monthly.leads[idx];
      const customers = monthly.customers[idx];

      const row = document.createElement('div');
      row.className = 'chart-row';

      const label = document.createElement('span');
      label.className = 'chart-row-label';
      label.textContent = i;

      const track = document.createElement('div');
      track.className = 'chart-bar-track';

      const barProspects = document.createElement('div');
      barProspects.className = 'chart-bar chart-bar-prospects';
      barProspects.style.width = `${Math.min(100, (prospects / maxValue) * 100)}%`;

      const barLeads = document.createElement('div');
      barLeads.className = 'chart-bar chart-bar-leads';
      barLeads.style.width = `${Math.min(100, (leads / maxValue) * 100)}%`;

      const barCustomers = document.createElement('div');
      barCustomers.className = 'chart-bar chart-bar-customers';
      barCustomers.style.width = `${Math.min(100, (customers / maxValue) * 100)}%`;

      track.append(barProspects, barLeads, barCustomers);
      row.append(label, track);

      row.addEventListener('mouseenter', () => {
        tooltip.innerHTML =
          `Month #${i}<br>Prospects: ${formatNumber(prospects)}<br>` +
          `Leads: ${formatNumber(leads)}<br>Customers: ${formatNumber(customers)}`;
        tooltip.hidden = false;
      });
      row.addEventListener('mousemove', (event) => {
        const rect = container.getBoundingClientRect();
        tooltip.style.left = `${event.clientX - rect.left + 14}px`;
        tooltip.style.top = `${event.clientY - rect.top - 10}px`;
      });
      row.addEventListener('mouseleave', () => {
        tooltip.hidden = true;
      });

      rows.appendChild(row);
    }

    const axis = document.createElement('div');
    axis.className = 'chart-axis';
    const axisSteps = 6;
    for (let s = 0; s <= axisSteps; s++) {
      const value = Math.round((maxValue / axisSteps) * s);
      const tick = document.createElement('span');
      tick.textContent = `${value} people`;
      axis.appendChild(tick);
    }

    chart.append(rows, axis, tooltip);
    container.appendChild(chart);
  }

  return { renderChart };
})();
