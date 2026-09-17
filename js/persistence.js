// Persists the visitor's last-used campaign inputs to localStorage and
// restores them on the next visit, so a returning user doesn't have to
// re-type their scenario every time the page reloads.
const LeadPredictorPersistence = (function () {
  const STORAGE_KEY = 'leadPredictorScenario';
  const FIELD_IDS = [
    'total-revenue',
    'avg-order-value',
    'campaign-start',
    'campaign-end',
    'lead-response-rate',
    'prospect-response-rate',
    'currency-select',
  ];

  function save() {
    const data = {};
    FIELD_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) data[id] = el.value;
    });
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      // localStorage unavailable (private browsing, quota exceeded, etc.) - skip silently.
    }
  }

  function load() {
    let data;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      data = JSON.parse(raw);
    } catch (e) {
      return;
    }
    FIELD_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el && data[id] !== undefined) el.value = data[id];
    });
  }

  return { save, load };
})();
