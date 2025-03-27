import React from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
/*
Компонент рендерит два поля ввода (мин/макс год) и кнопку "Рассчитать"., 
и сообщение об ошибке (если пользователь гад).
 */

type MinMaxYearInputProps = {
  tempMinYear: number
  setTempMinYear: (value: number) => void
  tempMaxYear: number
  setTempMaxYear: (value: number) => void
  onApply: () => void
  message: string
}


const MinMaxYearInput: React.FC<MinMaxYearInputProps> = ({
  tempMinYear,
  setTempMinYear,
  tempMaxYear,
  setTempMaxYear,
  onApply,
  message,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 2 }}>
      <TextField
        label="Минимальный год"
        type="number"
        value={tempMinYear}
        onChange={(e) => setTempMinYear(Number(e.target.value))}
        size="small"
        sx={{ width: '130px' }}
      />
      <TextField
        label="Максимальный год"
        type="number"
        value={tempMaxYear}
        onChange={(e) => setTempMaxYear(Number(e.target.value))}
        size="small"
        sx={{ width: '130px' }}
      />

      <Button variant="contained" onClick={onApply}>
        Рассчитать
      </Button>

      {message && (
        <Typography variant="body2" color="error" sx={{ marginTop: '0.5rem' }}>
          {message}
        </Typography>
      )}
    </Box>
  )
}

export default MinMaxYearInput
