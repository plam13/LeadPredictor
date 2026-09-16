# LeadPredictor

Статично уеб приложение (само HTML, CSS и vanilla JavaScript — без frameworks и build tools), което изчислява колко контакти (prospects), потенциални клиенти (leads) и клиенти (customers) са нужни за постигане на зададен оборот, и разпределя прогнозата по месеци на кампанията.

## Формули

```
Customers = Total Revenue / Avg. Order Value
Leads     = Customers * 100 / Lead Response Rate%
Prospects = Leads * 100 / Prospect Response Rate%
```

Месечната графика разпределя всяка от трите стойности линейно кумулативно между началото и края на кампанията:

```
value(month i) = total * i / N   // i = 1..N, N = брой месеци между Campaign Start и Campaign End
```

## Стартиране

Отворете `index.html` директно в браузър — не изисква сървър или зависимости.

## Структура

- `index.html` — разметка
- `css/styles.css` — стилове (тъмна тема)
- `js/calculations.js` — чисти функции за изчисленията
- `js/chart.js` — рендиране на месечната графика
- `js/i18n.js` — превод на етикети (EN/BG) и валутни символи
- `js/main.js` — свързва UI контролите с изчисленията
