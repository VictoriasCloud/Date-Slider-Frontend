import React from 'react'
import 'dayjs/locale/ru'
import RangeSliderBase from './RangeSliderBase'
import YearMarkers from '../YearMarkers'
import { formatMonthYearMultiLine } from '../../utils/formatDateLabel'


//данный файл(YearSlider.tsx) это слайдер для выбора диапазона по годам.
//внешне внутри себя использует RangeSliderBase, 
// передавая нужные пропсы (мин-ый год, макс-ый год, 
// текущий [startYear, endYear], callback при изменении).
// Параллельно выводит снизу годовые метки (компонент YearMarkers),
// чтобы наглядно видеть «шкалу» годов.
// formatValueLabel тут подменяется на собственную логику: 
// показывает либо начальную, либо конечную дату, 
// которая вычисляется по selectedDates. 
// (Также на всплывающем лейбле/облачке слайдера будет строка вида "Март 2017" в 2 строки






type Props = {
  minYear: number
  maxYear: number
  value: [number, number] // [startYear, endYear]
  onChange: (range: [number, number]) => void
  selectedDates: [Date, Date]
}

const YearSlider: React.FC<Props> = ({
  minYear,
  maxYear,
  value,
  onChange,
  selectedDates,
}) => {
  return (
    <div
      style={{
        // используем flex чтобы RangeSliderBase мог растянуться внутри
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        // можем здесь ограничить minWidth / maxWidth теперь это ограничивает RangeSliderBase
        marginBottom: '3rem',
      }}
    >
      <RangeSliderBase
        title={``}
        value={value}
        onChange={onChange}
        min={minYear}
        max={maxYear}
        step={1}
        formatValueLabel={(_val: number, index: number) => {

          const date = index === 0 ? selectedDates[0] : selectedDates[1]
          return (
            <span style={{ display: 'inline-block', textAlign: 'center' }}>
              {formatMonthYearMultiLine(date)}
            </span>
          )
        }}
        sx={{
          marginTop: '3rem',
          marginBottom: '1rem',
        }}
      />

      <div style={{ marginTop: '-0.5rem', marginBottom: '1rem', width: '100%' }}>
        <YearMarkers minYear={minYear} maxYear={maxYear} />
      </div>
    </div>
  )
}

export default YearSlider
