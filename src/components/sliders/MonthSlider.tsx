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
  // Здесь генерим список всех месяцев внутри [yearRange[0]..yearRange[1]]
  const allMonths: MonthItem[] = React.useMemo(() => {
    const months: MonthItem[] = []
    let index = 0
    for (let year = yearRange[0]; year <= yearRange[1]; year++) {
      for (let month = 0; month < 12; month++) {
        const label =
          month === 0
            ? year.toString()
            : dayjs(`${year}-${month + 1}-01`).locale('ru').format('MMM')
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

  const getDateLabel = (monthIndex: number): React.ReactNode => {
    const year = yearRange[0] + Math.floor(monthIndex / 12)
    const month = monthIndex % 12
    const dateObj = new Date(year, month, 1)
    return formatMonthYearMultiLine(dateObj)
  }

  // Логика выбора, какие подписи снизу показывать
  const visibleLabels = React.useMemo(() => {
    const totalYears = yearRange[1] - yearRange[0] + 1

    if (mode === 'year') {
      return allMonths.filter((m) => m.month === 0).map((m) => m.year.toString())
    }
    if (totalYears > 4) {
      // Если диапазон больше 4 лет, показываем только январь и июль
      return allMonths
        .filter((m) => m.month === 0 || m.month === 6)
        .map((m) => (m.month === 0 ? m.year.toString() : m.label))
    }

    // Иначе (небольшой диапазон) показываем январь (год) + каждые 3 месяца
    return allMonths
      .filter((m) => m.month === 0 || m.month % 3 === 2)
      .map((m) => (m.month === 0 ? m.year.toString() : m.label))
  }, [allMonths, mode, yearRange])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        {getDateLabel(value[0])}
      </div>

      <RangeSliderBase
        title={``}
        value={value}
        onChange={onChange}
        min={0}
        max={allMonths.length - 1}
        step={1}
        formatValueLabel={(val) => getDateLabel(val as number)}
        labels={visibleLabels}
      />

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        {getDateLabel(value[1])}
      </div>
    </div>
  )
}

export default MonthSlider
