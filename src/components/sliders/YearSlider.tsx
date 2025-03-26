import React from 'react'
import 'dayjs/locale/ru'
import RangeSliderBase from './RangeSliderBase'
import YearMarkers from '../YearMarkers'
import { formatMonthYearMultiLine } from '../../utils/formatDateLabel'

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
