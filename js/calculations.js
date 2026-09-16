// Pure funnel-math functions, no DOM access. Wired into the UI in a later change.
const LeadPredictor = (function () {

  // Formula 01: Customers = Total Revenue / Avg. Order Value
  function calcCustomers(totalRevenue, avgOrderValue) {
    if (!avgOrderValue) return 0;
    return totalRevenue / avgOrderValue;
  }

  // Formula 02: Leads = Customers * 100 / Lead Response Rate%
  function calcLeads(customers, leadResponseRate) {
    if (!leadResponseRate) return 0;
    return (customers * 100) / leadResponseRate;
  }

  // Formula 03: Prospects = Leads * 100 / Prospect Response Rate%
  function calcProspects(leads, prospectResponseRate) {
    if (!prospectResponseRate) return 0;
    return (leads * 100) / prospectResponseRate;
  }

  // Whole number of calendar months between two dates, at least 1.
  function monthsBetween(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    return Math.max(1, months);
  }

  // Cumulative linear ramp from total/monthsCount up to total, one value per month.
  function monthlySeries(total, monthsCount) {
    const series = [];
    for (let i = 1; i <= monthsCount; i++) {
      series.push((total * i) / monthsCount);
    }
    return series;
  }

  function calculateFunnel(inputs) {
    const customers = calcCustomers(inputs.totalRevenue, inputs.avgOrderValue);
    const leads = calcLeads(customers, inputs.leadResponseRate);
    const prospects = calcProspects(leads, inputs.prospectResponseRate);
    const monthsCount = monthsBetween(inputs.campaignStart, inputs.campaignEnd);

    return {
      customers,
      leads,
      prospects,
      monthsCount,
      monthly: {
        prospects: monthlySeries(prospects, monthsCount),
        leads: monthlySeries(leads, monthsCount),
        customers: monthlySeries(customers, monthsCount),
      },
    };
  }

  return {
    calcCustomers,
    calcLeads,
    calcProspects,
    monthsBetween,
    monthlySeries,
    calculateFunnel,
  };
})();
