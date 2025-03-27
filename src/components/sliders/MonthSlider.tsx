import React from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import RangeSliderBase from './RangeSliderBase'
import { MonthItem } from '../../utils/dateUtils'
import { formatMonthYearMultiLine } from '../../utils/formatDateLabel'

type Props = {
  yearRange: [number, number]
  value: [number, number]
  onChange: (range: [number, number]) => void
  labels: string[]
  mode: 'year' | 'month'
}

const MonthSlider: React.FC<Props> = ({ yearRange, value, onChange, mode }) => {
  const getDateLabel = (index: number): React.ReactNode => {
    const year = yearRange[0] + Math.floor(index / 12)
    const month = index % 12
    const dateObj = new Date(year, month, 1)
    return formatMonthYearMultiLine(dateObj)
  }

  const allMonths: MonthItem[] = React.useMemo(() => {
    const months: MonthItem[] = []
    let index = 0
    for (let year = yearRange[0]; year <= yearRange[1]; year++) {
      for (let month = 0; month < 12; month++) {
        const label = month === 0 
          ? year.toString() // Вместо января отображаем год
          : dayjs(`${year}-${month + 1}-01`)
              .locale('ru')
              .format('MMM')
        months.push({
          label,
          year,
          month,
          index: index++,
          isYearStart: month === 0,
        })
      }
    }
    return months
  }, [yearRange])

  const visibleLabels = React.useMemo(() => {
    const totalYears = yearRange[1] - yearRange[0] + 1

    if (mode === 'year') {
      return allMonths.filter((m) => m.month === 0).map((m) => m.year.toString())
    }

    if (totalYears > 4) {
      // Если диапазон больше 4 лет, отображаем только январь и июль
      return allMonths
        .filter((m) => m.month === 0 || m.month === 6) // январь и июль соот-но
        .map((m) => (m.month === 0 ? m.year.toString() : m.label))
    }

    // Показываем при больших диапазонах только январь(год) и шаг через 3 месяца
    return allMonths
      .filter((m) => m.month === 0 || m.month % 3 === 2)
      .map((m) => (m.month === 0 ? m.year.toString() : m.label))
  }, [allMonths, mode, yearRange])

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        {formatMonthYearMultiLine(new Date(allMonths[value[0]].year, allMonths[value[0]].month, 1))}
      </div>

      <RangeSliderBase
        title={`Месяцы от ${getDateLabel(value[0])} до ${getDateLabel(value[1])}`}
        value={value}
        onChange={onChange}
        min={0}
        max={allMonths.length - 1}
        step={1}
        formatValueLabel={getDateLabel}
        labels={visibleLabels} // Передаем только ключевые месяцы для отображения
      />
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        {formatMonthYearMultiLine(new Date(allMonths[value[1]].year, allMonths[value[1]].month, 1))}
      </div>
    </div>
  )
}

export default MonthSlider