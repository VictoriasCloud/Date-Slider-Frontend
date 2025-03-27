import DateSliderContainer from './components/DateSliderContainer'

//Верхний уровень приложения — DateSliderContainer.
// Он управляет состоянием, сохранением в localStorage
// и переключением режима годов/месяцев.
// Внутри DateSliderContainer отрисовывается ModeToggle (переключение года/месяца).
// Если выбраны "Все года", подставляется YearSlider;
// если "Месяцы", подставляется MonthSlider. 
// YearSlider и MonthSlider, в свою очередь, используют общий
// компонент RangeSliderBase для отрисовки двухползункового слайдера. 
// YearSlider ещё выводит YearMarkers под слайдером (годовые метки) 
// Также исп-ся утилиты для работы с датами (generateMonths из dateUtils.ts, 
// formatMonthYearMultiLine из formatDateLabel.tsx)


const App = () => {
  return (
<div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        boxSizing: 'border-box',
      }}
    >
      <DateSliderContainer />
    </div>
)
}
export default App
