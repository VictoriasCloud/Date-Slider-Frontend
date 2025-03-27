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
// (То есть на всплывающем лейбле/облачке слайдера будет строка вида "Март 2017" в 2 строки






type Props = {
  minYear: number
  maxYear: number
  value: [number, number]          // [startYear, endYear]
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
    <>
      <RangeSliderBase
        title={`Годы от ${value[0]} до ${value[1]}`}
        value={value}
        onChange={onChange}
        min={minYear}
        max={maxYear}
        step={1}
        //для левого (index=0) показываем selectedDates[0], 
        //для правого (index=1) — selectedDates[1].
        //_val -  чтобы реакт не ругался 
        formatValueLabel={(_val: number, index: number) => {
          const date = index === 0 ? selectedDates[0] : selectedDates[1]
          return formatMonthYearMultiLine(date)
        }}

      />
      <YearMarkers minYear={minYear} maxYear={maxYear} />
    </>
  )
}

export default YearSlider
