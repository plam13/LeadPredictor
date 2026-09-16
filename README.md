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

## Функционалност

- Живо преизчисление на Prospects/Leads/Customers при промяна на Total Revenue, Avg. Order Value, датите на кампанията или двата slider-а (Lead/Prospect Response Rate)
- Месечна bar графика с hover tooltip, показващ точните стойности за месеца
- Смяна на език на етикетите (EN/BG/ES/DE) и на валутния символ, без презареждане на страницата

## Стартиране

Отворете `index.html` директно в браузър — не изисква сървър или зависимости.

## Структура

- `index.html` — разметка
- `css/styles.css` — стилове (тъмна тема)
- `js/calculations.js` — чисти функции за изчисленията
- `js/chart.js` — рендиране на месечната графика
- `js/i18n.js` — превод на етикети (EN/BG/ES/DE) и валутни символи
- `js/main.js` — свързва UI контролите с изчисленията
