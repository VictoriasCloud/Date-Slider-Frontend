import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Box, TextField } from '@mui/material'
import ModeToggle from './ModeToggle'
import YearSlider from './sliders/YearSlider'
import MonthSlider from './sliders/MonthSlider'
import { generateMonths, MonthItem } from '../utils/dateUtils'

//данный файл(DateSliderContainer) хранит состояние выбранного диапазона дат. показывает переключатель "Все года" и "Месяца".
//Содержит логику прокрутки колесиком мыши(мб стоит убрать), которая тоже переключает режим (если прокручиваем вниз — переходим на месяц, если наверх» — возвращаемся на год).
//Сохраняет выбранный диапазон selectedRange в localStorage, чтобы при перезагрузке страницы состояние оставалось.

const DateSliderContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [mode, setMode] = useState<'year' | 'month'>('year')

  const [minYearState, setMinYearState] = useState<number>(2014)
  const [maxYearState, setMaxYearState] = useState<number>(2021)

  const [selectedRange, setSelectedRange] = useState<[Date, Date]>(() => {
    const stored = localStorage.getItem('selectedRange')
    if (stored) {
      const [start, end] = JSON.parse(stored)
      return [new Date(start), new Date(end)]
    }
    return [new Date(2015, 0, 1), new Date(2017, 0, 1)]
  })

  useEffect(() => {
    localStorage.setItem(
      'selectedRange',
      JSON.stringify(selectedRange.map((d) => d.toISOString()))
    )
  }, [selectedRange])

  useEffect(() => {
    const [start, end] = selectedRange
    const startYear = start.getFullYear()
    const endYear = end.getFullYear()

    // если новый minYearState > startYear, сместим startRange 
    let clampedStartYear = Math.max(startYear, minYearState)
    let clampedEndYear = Math.min(endYear, maxYearState)

    // Если пользователь ввёл границы так, что minYearState > maxYearState, 
    if (clampedStartYear > clampedEndYear) {
      // Можем их выровнять:
      clampedStartYear = clampedEndYear
    }

    // Если что-то реально изменилось, обновляем state:
    if (clampedStartYear !== startYear || clampedEndYear !== endYear) {
      setSelectedRange([
        new Date(clampedStartYear, start.getMonth(), 1),
        new Date(clampedEndYear, end.getMonth(), 1),
      ])
    }
  }, [minYearState, maxYearState, selectedRange])

  // Получаем текущие года (startYear, endYear) из selectedRange
  const getYearRange = (): [number, number] => [
    selectedRange[0].getFullYear(),
    selectedRange[1].getFullYear(),
  ]

  const months: MonthItem[] = useMemo(() => {
    const startY = minYearState
    const endY = maxYearState
    return generateMonths(startY, endY)
  }, [minYearState, maxYearState])

  const labels = months.map((m) => m.label)

  // Поиск индексов месяцев в массиве months
  const getMonthIndexes = (): [number, number] => {
    const startIndex = months.findIndex(
      (m) =>
        m.month === selectedRange[0].getMonth() &&
        m.year === selectedRange[0].getFullYear()
    )
    const endIndex = months.findIndex(
      (m) =>
        m.month === selectedRange[1].getMonth() &&
        m.year === selectedRange[1].getFullYear()
    )

    return [
      startIndex !== -1 ? startIndex : 0,
      endIndex !== -1 ? endIndex : months.length - 1,
    ]
  }

  // Обновляем Date из индексов месяцев
  const setFromMonthIndexes = (indexes: [number, number]) => {
    setSelectedRange([
      new Date(months[indexes[0]].year, months[indexes[0]].month, 1),
      new Date(months[indexes[1]].year, months[indexes[1]].month, 1),
    ])
  }

  // Обновляем Date из выбранных лет (сохраняем месяц)
  const setFromYearRange = (years: [number, number]) => {
    setSelectedRange([
      new Date(years[0], selectedRange[0].getMonth(), 1),
      new Date(years[1], selectedRange[1].getMonth(), 1),
    ])
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) return
      // e.deltaY > 0 => крутим вниз => month
      setMode(e.deltaY > 0 ? 'month' : 'year')
    }

    window.addEventListener('wheel', handleWheel)
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <Box
      ref={containerRef}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TextField
          label="Минимальный год"
          type="number"
          value={minYearState}
          onChange={(e) => setMinYearState(Number(e.target.value))}
          sx={{ width: '150px' }}
        />
        <TextField
          label="Максимальный год"
          type="number"
          value={maxYearState}
          onChange={(e) => setMaxYearState(Number(e.target.value))}
          sx={{ width: '150px' }}
        />
      </Box>

      <ModeToggle value={mode} onChange={setMode} />

      <Box
        sx={{
          flexGrow: 1,
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          paddingTop: '2rem',
          paddingBottom: '1rem',
          '&::-webkit-scrollbar': {
            height: '10px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '5px',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            width: '100%',
            ml: '3rem',
            mr: 'rem',

          }}
        >
          {mode === 'year' ? (
            <YearSlider
              minYear={minYearState}
              maxYear={maxYearState}
              value={getYearRange()}
              onChange={setFromYearRange}
              selectedDates={selectedRange}
            />
          ) : (
            <MonthSlider
              mode={mode}
              yearRange={[minYearState, maxYearState]}
              value={getMonthIndexes()}
              onChange={setFromMonthIndexes}
              labels={labels}
            />
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default DateSliderContainer
