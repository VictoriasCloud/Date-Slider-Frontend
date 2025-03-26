import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Box } from '@mui/material'
import ModeToggle from './ModeToggle'
import YearSlider from './sliders/YearSlider'
import MonthSlider from './sliders/MonthSlider'
import { generateMonths, MonthItem } from '../utils/dateUtils'

const DateSliderContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [mode, setMode] = useState<'year' | 'month'>('year')

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

  const getYearRange = (): [number, number] => [
    selectedRange[0].getFullYear(),
    selectedRange[1].getFullYear(),
  ]

  const months: MonthItem[] = useMemo(() => {
    const [startYear, endYear] = getYearRange()
    return generateMonths(startYear, endYear)
  }, [selectedRange])

  const labels = months.map((m) => m.label)

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
    return [startIndex, endIndex]
  }

  const setFromMonthIndexes = (indexes: [number, number]) => {
    setSelectedRange([
      new Date(months[indexes[0]].year, months[indexes[0]].month, 1),
      new Date(months[indexes[1]].year, months[indexes[1]].month, 1),
    ])
  }

  const setFromYearRange = (years: [number, number]) => {
    setSelectedRange([
      new Date(years[0], 0, 1),
      new Date(years[1], 0, 1),
    ])
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) return
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
        alignItems: 'center',
        width: '100%',
        gap: 4,
      }}
    >
      <ModeToggle value={mode} onChange={setMode} />

      <Box sx={{ flexGrow: 1 }}>
        {mode === 'year' ? (
          <YearSlider
            minYear={2014}
            maxYear={2021}
            value={getYearRange()}
            onChange={setFromYearRange}
            selectedDates={selectedRange}
          />

        ) : (
          <MonthSlider
            mode={mode}
            yearRange={getYearRange()}
            value={getMonthIndexes()}
            onChange={setFromMonthIndexes}
            labels={labels}
          />

        )}
      </Box>
    </Box>
  )
}

export default DateSliderContainer
