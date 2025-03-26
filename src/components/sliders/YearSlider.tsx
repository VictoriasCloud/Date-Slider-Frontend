import React from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import RangeSliderBase from './RangeSliderBase'
import YearMarkers from '../YearMarkers'

type Props = {
  minYear: number
  maxYear: number
  value: [number, number]
  onChange: (range: [number, number]) => void
  selectedDates: [Date, Date]

}

const YearSlider: React.FC<Props> = ({ minYear, maxYear, value, onChange, selectedDates }) => {

  return (
    <>
      <RangeSliderBase
        title={`Годы от ${value[0]} до ${value[1]}`}
        value={value}
        onChange={onChange}
        min={minYear}
        max={maxYear}
        step={1}
        formatValueLabel={(val) => {
          const [start, end] = selectedDates
          const active = val === start.getFullYear() ? start : end
          return dayjs(active).locale('ru').format('MMMM YYYY')
        }}
        
      />
      <YearMarkers minYear={minYear} maxYear={maxYear} />
    </>
  )
}

export default YearSlider
