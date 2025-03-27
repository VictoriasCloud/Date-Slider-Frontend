import React from 'react'
import { Box } from '@mui/material'
import ModeToggle from './ModeToggle'
import MinMaxYearInput from './inputs/MinMaxYearInput'
import YearSlider from './sliders/YearSlider'
import MonthSlider from './sliders/MonthSlider'
import { useDateSliders } from './hooks/useDateSliders'

//данный файл(DateSliderContainer) хранит состояние выбранного диапазона дат. показывает переключатель "Все года" и "Месяца".
//Содержит логику прокрутки колесиком мыши(мб стоит убрать), которая тоже переключает режим (если прокручиваем вниз — переходим на месяц, если наверх» — возвращаемся на год).
//Сохраняет выбранный диапазон selectedRange в localStorage, чтобы при перезагрузке страницы состояние оставалось.

const DateSliderContainer: React.FC = () => {
  const {
    containerRef,
    mode,
    setMode,
    globalMinYear,
    globalMaxYear,
    tempMinYear,
    tempMaxYear,
    setTempMinYear,
    setTempMaxYear,
    applyGlobalYearRange,
    message,
    selectedRange,
    getYearRange,
    labels,
    getMonthIndexes,
    setFromMonthIndexes,
    setFromYearRange,
  } = useDateSliders()

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
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <ModeToggle value={mode} onChange={setMode} />

        <MinMaxYearInput
          tempMinYear={tempMinYear}
          setTempMinYear={setTempMinYear}
          tempMaxYear={tempMaxYear}
          setTempMaxYear={setTempMaxYear}
          onApply={applyGlobalYearRange}
          message={message}
        />
      </Box>
      <Box
        sx={{
          // Этот блок растягивается, и если содержимое шире, появляется scroll
          flexGrow: 1,
          overflowX: 'auto',     
          whiteSpace: 'nowrap',
          padding: '1rem 0',
          width: '100%',
          paddingLeft: '2rem',
          paddingRight: '4rem',
          paddingTop: '3rem',
          paddingBottom: '1rem',
          '&::-webkit-scrollbar': {
            height: '25px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#fff',
            borderRadius: '5px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f0f0f0',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexGrow: 1,
            width: '100%',
          }}
        >
          {mode === 'year' ? (
            <YearSlider
              // Ограничения для годового слайдера:
              minYear={globalMinYear}
              maxYear={globalMaxYear}
              //поддиапазон из годов
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
    </Box>
  )
}

export default DateSliderContainer
