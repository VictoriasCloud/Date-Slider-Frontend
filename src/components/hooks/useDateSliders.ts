import { useState, useEffect, useRef, useMemo } from 'react'
import { generateMonths, MonthItem } from '../../utils/dateUtils'
// этот компонент  управляет состоянием слайдеров для выбора диапазона дат
export function useDateSliders() {

  // 1 храним глобальный диапазон лет в LocalStorage

  const [globalMinYear, setGlobalMinYear] = useState<number>(() => {
    const saved = localStorage.getItem('globalMinYear')
    return saved ? Number(saved) : 2014
  })

  const [globalMaxYear, setGlobalMaxYear] = useState<number>(() => {
    const saved = localStorage.getItem('globalMaxYear')
    return saved ? Number(saved) : 2021
  })

  // также есть временные поля ввода для min/max годов чтобы не менять глобальные
  const [tempMinYear, setTempMinYear] = useState<number>(globalMinYear)
  const [tempMaxYear, setTempMaxYear] = useState<number>(globalMaxYear)

  const [message, setMessage] = useState<string>('')

  //Если есть какие то изменения глоб перменных храним в localStorage
  useEffect(() => {
    localStorage.setItem('globalMinYear', String(globalMinYear))
  }, [globalMinYear])

  useEffect(() => {
    localStorage.setItem('globalMaxYear', String(globalMaxYear))
  }, [globalMaxYear])

  // Логика кнопки "Рассчитать"
  // (Если min>max, меняем местами и показываем смс)
  function applyGlobalYearRange() {
    if (tempMinYear > tempMaxYear) {
      // Меняем местами
      setTempMinYear(tempMaxYear)
      setTempMaxYear(tempMinYear)

      setGlobalMinYear(tempMaxYear)
      setGlobalMaxYear(tempMinYear)

      setMessage('Попався!')
      setTimeout(() => setMessage(''), 1000)
    } else {
      setGlobalMinYear(tempMinYear)
      setGlobalMaxYear(tempMaxYear)
      setMessage('')
    }
  }

  // 2 Выбранный диапазон (selectedRange) тоже храним в LocalStorage
  const [selectedRange, setSelectedRange] = useState<[Date, Date]>(() => {
    const stored = localStorage.getItem('selectedRange')
    if (stored) {
      const [start, end] = JSON.parse(stored)
      return [new Date(start), new Date(end)]
    }
    // Если не хранится, то берем дефолтные
    return [new Date(2015, 0, 1), new Date(2017, 0, 1)]
  })

  useEffect(() => {
    localStorage.setItem(
      'selectedRange',
      JSON.stringify(selectedRange.map(d => d.toISOString()))
    )
  }, [selectedRange])

  // Подрезаем selectedRange, если вышли за пределы [globalMinYear..globalMaxYear]
  useEffect(() => {
    const [startDate, endDate] = selectedRange
    const startY = startDate.getFullYear()
    const endY = endDate.getFullYear()

    // Если выбранные годы < globalMinYear, то меняем
    let clampedStart = Math.max(startY, globalMinYear)
    let clampedEnd = Math.min(endY, globalMaxYear)

    if (clampedStart > clampedEnd) {
      // Если вышло так, что start> end, ставим их равными
      clampedStart = clampedEnd
    }

    // Если что-то изменилось - обновляем
    if (clampedStart !== startY || clampedEnd !== endY) {
      setSelectedRange([
        new Date(clampedStart, startDate.getMonth(), 1),
        new Date(clampedEnd, endDate.getMonth(), 1),
      ])
    }
  }, [globalMinYear, globalMaxYear, selectedRange])

  // 3 также у нас есть возможность переключение туглера колёсиком
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [mode, setMode] = useState<'year' | 'month'>('year')

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) return
      setMode(e.deltaY > 0 ? 'month' : 'year')
    }
    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  // 4. зависимость месяцев от выбранного диапазона selectedRange
  function getYearRange(): [number, number] {
    return [
      selectedRange[0].getFullYear(),
      selectedRange[1].getFullYear(),
    ]
  }

  // генерация месяцев между годами выбранного диапазона
  const months: MonthItem[] = useMemo(() => {
    const [startY, endY] = getYearRange()
    return generateMonths(startY, endY)
  }, [selectedRange])

  const labels = months.map(m => m.label)

  // Находим индексы в months под текущий selectedRange
  function getMonthIndexes(): [number, number] {
    const startIndex = months.findIndex(
      m =>
        m.month === selectedRange[0].getMonth() &&
        m.year === selectedRange[0].getFullYear()
    )
    const endIndex = months.findIndex(
      m =>
        m.month === selectedRange[1].getMonth() &&
        m.year === selectedRange[1].getFullYear()
    )
    return [
      startIndex !== -1 ? startIndex : 0,
      endIndex !== -1 ? endIndex : months.length - 1,
    ]
  }

  // 5. Колбеки для годового и месячного слайдеров

  // Годовой слайдер: обновляем selectedRange (сохраняя месяцы)
  function setFromYearRange(years: [number, number]) {
    setSelectedRange([
      new Date(years[0], selectedRange[0].getMonth(), 1),
      new Date(years[1], selectedRange[1].getMonth(), 1),
    ])
  }

  // Месячный слайдер: обновляем selectedRange из индексов
  function setFromMonthIndexes(indexes: [number, number]) {
    setSelectedRange([
      new Date(months[indexes[0]].year, months[indexes[0]].month, 1),
      new Date(months[indexes[1]].year, months[indexes[1]].month, 1),
    ])
  }

  return {
    containerRef,
    mode,
    setMode,
    // глобальные годы + логика ввода
    globalMinYear,
    globalMaxYear,
    tempMinYear,
    tempMaxYear,
    setTempMinYear,
    setTempMaxYear,
    applyGlobalYearRange,
    message,
    // выбранный диапазон
    selectedRange,
    setSelectedRange,
    // др вспомогательные функции
    getYearRange,
    months,
    labels,
    getMonthIndexes,
    setFromMonthIndexes,
    setFromYearRange,
  }
}
