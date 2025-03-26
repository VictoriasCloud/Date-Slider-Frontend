import React from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import RangeSliderBase from './RangeSliderBase'
import { MonthItem } from '../../utils/dateUtils'

type Props = {
  yearRange: [number, number]
  value: [number, number]
  onChange: (range: [number, number]) => void
  labels: string[]
  mode: 'year' | 'month'
}

const MonthSlider: React.FC<Props> = ({ yearRange, value, onChange, labels, mode }) => {
  const getDateLabel = (index: number): string => {
    const year = yearRange[0] + Math.floor(index / 12)
    const month = index % 12
    return dayjs(`${year}-${month + 1}-01`).locale('ru').format('MMMM YYYY')
  }

  const allMonths: MonthItem[] = React.useMemo(() => {
    const months: MonthItem[] = []
    let index = 0
    for (let year = yearRange[0]; year <= yearRange[1]; year++) {
      for (let month = 0; month < 12; month++) {
        const label = dayjs(`${year}-${month + 1}-01`)
          .locale('ru')
          .format('MMM')
        months.push({
          label,
          year,
          month,
          index: index++,
          isYearStart: month === 0
        })
      }
    }
    return months
  }, [yearRange])
  

  const visibleLabels = mode === 'month'
    ? allMonths.map((m) => m.label)
    : allMonths.filter((m) => m.month === 0).map((m) => m.year.toString())

  return (
    <RangeSliderBase
      title={`Месяцы от ${getDateLabel(value[0])} до ${getDateLabel(value[1])}`}
      value={value}
      onChange={onChange}
      min={0}
      max={labels.length - 1}
      step={1}
      formatValueLabel={getDateLabel}
      labels={visibleLabels}
    />
  )
}

export default MonthSlider
