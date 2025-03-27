import { useState } from 'react'
//Этот компонент управляет диапазоном лет для слайдера
export const useYearRange = () => {
  const [minYear, setMinYear] = useState(2000)
  const [maxYear, setMaxYear] = useState(2023)
  const [tempMinYear, setTempMinYear] = useState(minYear)
  const [tempMaxYear, setTempMaxYear] = useState(maxYear)
  const [message, setMessage] = useState('')

  const applyYearRange = () => {
    if (tempMinYear > tempMaxYear) {
      setMessage('Min year cannot be greater than max year.')
      return
    }
    setMinYear(tempMinYear)
    setMaxYear(tempMaxYear)
    setMessage('Year range applied successfully.')
  }

  return {
    minYear,
    maxYear,
    tempMinYear,
    tempMaxYear,
    setTempMinYear,
    setTempMaxYear,
    message,
    applyYearRange,
  }
}