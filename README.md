## Описание проекта

Это React-приложение на TypeScript для выбора диапазонов дат с помощью двух слайдеров: "Все года" и "Месяца". При выборе диапазона лет в режиме «Все года» (YearSlider) внутри выбранных границ (minYear..maxYear) пользователь может уточнять месяцы в режиме «Месяца» (MonthSlider), который отображает ровно те месяцы, которые входят в выбранный годовой диапазон.

## Интерфейс на больших экранах с переключением на "Все года"

![Интерфейс на больших экранах "Все года"](src/assets/years.png)

## Интерфейс на больших экранах c переключением на "Месяца"

![Интерфейс на больших экранах "Месяца"](./src/assets/months.png)

## Интерфейс на узких экранах c переключением на "Месяца"

![Интерфейс на маленьких экранах](./src/assets/monthUzkiy.png)

## Структура файлов

### 1. `App.tsx`
- Точка входа в приложение.

### 2. `DateSliderContainer.tsx`
- Данный файл это главный контейнер. Он отвечает за управление состоянием и отображением основного интерфейса выбора диапазона дат. 
  - Использует хук `useDateSliders` для работы с состоянием (режим, диапазоны годов и месяцев, выбранные даты).
  - Включает переключатель режимов (`ModeToggle`) между "Все года" и "Месяцы".
  - Отображает поля ввода минимального и максимального года.
  - Использует горизонтальную прокрутку для слайдеров, если контент слишком большой или слишком узкий эеран.


### 3. `ModeToggle.tsx`
- Это переключатель ToggleButtonGroup из @mui/material.Он позволяет переключать режим: «Все года» или «Месяца». 

### 4. `MinMaxYearInput.tsx`
- Это компонент ввода минимального и максимального года. Содержит также кнопку «Рассчитать». При нажатии на «Рассчитать» вызывает колбек, который проверяет `tempMinYear` , `tempMaxYear` и при необходимости показывает короткое сообщение.

### 5. `YearSlider.tsx`
- данный файл YearSlider.tsx это слайдер для выбора диапазона по годам. внешне внутри себя использует RangeSliderBase, передавая нужные пропсы (мин-ый год, макс-ый год, текущий [startYear, endYear], callback при изменении). Параллельно выводит снизу годовые метки (компонент YearMarkers),

### 6. `MonthSlider.tsx`
- Слайдер, отвечающий за слайдер по месяцам. Рисует метки и дорожку ТОЛЬКО между годами, которые выбраны на годовом слайдере. Также наследует стили от `RangeSliderBase`.

### 7. `RangeSliderBase.tsx`
- Это Базовый слайдер (компонент обёртка над MUI Slider) для работы с двумя значениями.Здесь описан общий стиль (толщина дорожки, размеры кружочков и тд).

### 8. `utils/`  
- Утилитные функции, например `generateMonths(startYear, endYear)` — генерирует массив объектов месяцев (MonthItem) для заданного диапазона лет. Форматирование дат, преобразование индексов месяцев, и т.п. Содержит также вспомогательные сущности по типу `formatDateLabel`.

### 9. `styles/`
- Стили и темы @mui/material и тд.

## Адаптивность

- Когда контент слишком велик, либо ширина экрана становится узкой для отображения, тогда появляется горизонтальный скроллинг.

## Используемые инструменты

- **React**
- **TypeScript**
- **Material-UI (MUI)**: Для стилизации компонентов.
- **Day.js**: Для работы с датами.
- **ESLint**: Для проверки качества кода.

## Команды для запуска проекта

### Установка зависимостей
Перед запуском проекта необходимо установить все зависимости. Выполните команду:

```bash
npm install
```

Для запуска проекта:

```bash
npm run dev
```
После этого приложение должно быть доступно по адресу http://localhost:5173.
