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

  // Fixed, hardcoded rates relative to USD - used to auto-convert Revenue/AOV
  // when the user switches currency.
  const exchangeRatesFromUSD = {
    USD: 1,
    EUR: 0.92,
    BGN: 1.8,
    GBP: 0.79,
  };

  function convertAmount(amount, fromCode, toCode) {
    const fromRate = exchangeRatesFromUSD[fromCode] || 1;
    const toRate = exchangeRatesFromUSD[toCode] || 1;
    return (amount / fromRate) * toRate;
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

  return { applyLanguage, applyCurrency, currencySymbols, convertAmount, exchangeRatesFromUSD };
})();
