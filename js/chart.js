// Renders the monthly funnel bar chart into a container element. No dependencies.
const LeadPredictorChart = (function () {

  function formatNumber(value) {
    return Math.round(value);
  }

  // Rounds a raw axis step up to a "nice" 1/2/5-times-a-power-of-10 number,
  // so tick labels read like 20/40/60 instead of 23/47/70.
  function niceStep(rawStep) {
    const exponent = Math.floor(Math.log10(rawStep));
    const fraction = rawStep / Math.pow(10, exponent);
    let niceFraction;
    if (fraction < 1.5) niceFraction = 1;
    else if (fraction < 3) niceFraction = 2;
    else if (fraction < 7) niceFraction = 5;
    else niceFraction = 10;
    return niceFraction * Math.pow(10, exponent);
  }

  function niceMax(value, tickCount) {
    if (value <= 0) return 20;
    const step = niceStep(value / tickCount);
    return { axisMax: Math.ceil(value / step) * step, step };
  }

  function renderChart(container, result) {
    container.innerHTML = '';

    const { monthsCount, monthly } = result;
    const lastProspects = monthly.prospects[monthly.prospects.length - 1] || 0;
    const axisTickCount = 6;
    const { axisMax: maxValue, step: axisStep } = niceMax(lastProspects, axisTickCount);

    const chart = document.createElement('div');
    chart.className = 'chart';

    const body = document.createElement('div');
    body.className = 'chart-body';

    const yTitle = document.createElement('div');
    yTitle.className = 'chart-y-title';
    yTitle.textContent = 'Months';

    const plot = document.createElement('div');
    plot.className = 'chart-plot';

    const rows = document.createElement('div');
    rows.className = 'chart-rows';

    const grid = document.createElement('div');
    grid.className = 'chart-grid';
    for (let value = axisStep; value <= maxValue; value += axisStep) {
      const line = document.createElement('span');
      line.className = 'chart-grid-line';
      line.style.left = `${(value / maxValue) * 100}%`;
      grid.appendChild(line);
    }
    rows.appendChild(grid);

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
    for (let value = 0; value <= maxValue; value += axisStep) {
      const tick = document.createElement('span');
      tick.textContent = `${value} people`;
      axis.appendChild(tick);
    }

    plot.append(rows, axis);
    body.append(yTitle, plot);
    chart.append(body, tooltip);
    container.appendChild(chart);
  }

  return { renderChart };
})();
