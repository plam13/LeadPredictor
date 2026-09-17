// Label translations and currency symbols. No DOM wiring here beyond applying to [data-i18n]
// and [data-currency-symbol] elements - hooking up the selects happens in main.js.
const LeadPredictorI18n = (function () {

  const dictionaries = {
    en: {
      language: 'Language',
      currency: 'Currency',
      campaignStart: 'Campaign Start',
      campaignEnd: 'Campaign End',
      totalRevenue: 'Total Revenue',
      avgOrderValue: 'Avg. Order Value',
      prospects: 'Prospects',
      leads: 'Leads',
      customers: 'Customers',
      leadResponseRate: 'Lead Response Rate',
      prospectResponseRate: 'Prospect Response Rate',
    },
    bg: {
      language: 'Език',
      currency: 'Валута',
      campaignStart: 'Начало на кампанията',
      campaignEnd: 'Край на кампанията',
      totalRevenue: 'Общ оборот',
      avgOrderValue: 'Средна стойност на поръчка',
      prospects: 'Контакти',
      leads: 'Потенциални клиенти',
      customers: 'Клиенти',
      leadResponseRate: 'Отговорили потенциални клиенти',
      prospectResponseRate: 'Отговорили контакти',
    },
    es: {
      language: 'Idioma',
      currency: 'Moneda',
      campaignStart: 'Inicio de la campaña',
      campaignEnd: 'Fin de la campaña',
      totalRevenue: 'Ingresos totales',
      avgOrderValue: 'Valor medio del pedido',
      prospects: 'Contactos',
      leads: 'Clientes potenciales',
      customers: 'Clientes',
      leadResponseRate: 'Tasa de respuesta de leads',
      prospectResponseRate: 'Tasa de respuesta de contactos',
    },
    de: {
      language: 'Sprache',
      currency: 'Währung',
      campaignStart: 'Kampagnenbeginn',
      campaignEnd: 'Kampagnenende',
      totalRevenue: 'Gesamtumsatz',
      avgOrderValue: 'Durchschn. Bestellwert',
      prospects: 'Kontakte',
      leads: 'Leads',
      customers: 'Kunden',
      leadResponseRate: 'Lead-Antwortrate',
      prospectResponseRate: 'Kontakt-Antwortrate',
    },
  };

  const currencySymbols = {
    USD: '$',
    EUR: '€',
    BGN: 'лв',
    GBP: '£',
  };

  // Simple, geometrically-accurate flag SVGs (stripes/blocks only) so the
  // language dropdown doesn't rely on emoji flags, which Windows renders as
  // plain two-letter codes instead of pictures.
  const flagSvgs = {
    us:
      '<svg viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="20" height="14" fill="#fff"/>' +
      '<rect y="0" width="20" height="2" fill="#B22234"/>' +
      '<rect y="4" width="20" height="2" fill="#B22234"/>' +
      '<rect y="8" width="20" height="2" fill="#B22234"/>' +
      '<rect y="12" width="20" height="2" fill="#B22234"/>' +
      '<rect width="9" height="8" fill="#3C3B6E"/>' +
      '</svg>',
    bg:
      '<svg viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="20" height="4.67" fill="#fff"/>' +
      '<rect y="4.67" width="20" height="4.67" fill="#00966E"/>' +
      '<rect y="9.33" width="20" height="4.67" fill="#D62612"/>' +
      '</svg>',
    es:
      '<svg viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="20" height="14" fill="#AA151B"/>' +
      '<rect y="3.5" width="20" height="7" fill="#F1BF00"/>' +
      '</svg>',
    de:
      '<svg viewBox="0 0 20 14" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="20" height="4.67" fill="#000"/>' +
      '<rect y="4.67" width="20" height="4.67" fill="#DD0000"/>' +
      '<rect y="9.33" width="20" height="4.67" fill="#FFCE00"/>' +
      '</svg>',
  };

  const languages = [
    { code: 'en', label: 'English', flag: 'us' },
    { code: 'bg', label: 'Български', flag: 'bg' },
    { code: 'es', label: 'Español', flag: 'es' },
    { code: 'de', label: 'Deutsch', flag: 'de' },
  ];

  function flagSvg(flag) {
    return flagSvgs[flag] || '';
  }

  function applyLanguage(lang) {
    const dict = dictionaries[lang] || dictionaries.en;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) el.textContent = dict[key];
    });
  }

  function applyCurrency(code) {
    const symbol = currencySymbols[code] || '$';
    document.querySelectorAll('[data-currency-symbol]').forEach((el) => {
      el.textContent = symbol;
    });
  }

  return { applyLanguage, applyCurrency, currencySymbols, languages, flagSvg };
})();
