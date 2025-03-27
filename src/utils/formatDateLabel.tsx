import React from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'

/*Возвращает React-элемент из двух строк:
  Название месяца (с заглавной буквы),
  год
 */
export function formatMonthYearMultiLine(date: Date): React.ReactNode {
  const day = dayjs(date).locale('ru')
  const monthStr = day.format('MMMM')
  const capitalMonth = monthStr.charAt(0).toUpperCase() + monthStr.slice(1)
  const yearStr = day.format('YYYY')

  return (
    <span style={{ display: 'inline-block', textAlign: 'center' }}>
      {capitalMonth}
      <br />
      {yearStr}
    </span>
  )
}
