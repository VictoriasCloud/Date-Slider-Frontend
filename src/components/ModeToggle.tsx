import React from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'

type Mode = 'year' | 'month'

type Props = {
  value: Mode
  onChange: (mode: Mode) => void
}

const ModeToggle: React.FC<Props> = ({ value, onChange }) => {
  const handleChange = (_: any, newMode: Mode | null) => {
    if (newMode !== null) {
      onChange(newMode)
    }
  }

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      orientation="vertical"
      sx={{
        border: 'none',
        outline: 'none',
        '& .MuiToggleButton-root': {
            outline: 'none',
          border: 'none',
          textTransform: 'none',
          fontSize: '1rem',
          color: '#90a4ae',
          '&.Mui-selected': {
            color: '#1677ff',
            fontWeight: 'bold',
            borderBottom: '1px solid #1677ff',
          },
        },
      }}
    >
      <ToggleButton value="year">Все года</ToggleButton>
      <ToggleButton value="month">Месяца</ToggleButton>
    </ToggleButtonGroup>
  )
}

export default ModeToggle
