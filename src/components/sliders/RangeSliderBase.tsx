import React from 'react'
import { Box, Slider, Typography } from '@mui/material'
import { valueLabelProps } from '../../styles/valueLabelStyles'

type Props = {
  title: string
  value: [number, number]
  onChange: (range: [number, number]) => void
  min: number
  max: number
  step?: number
  formatValueLabel: (val: number) => string
  labels?: string[]
}

const RangeSliderBase: React.FC<Props> = ({
  title,
  value,
  onChange,
  min,
  max,
  step = 1,
  formatValueLabel,
  labels,
}) => {
  const handleChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      onChange([newValue[0], newValue[1]])
    }
  }

  return (
    <Box>
      <Typography mb={2}>{title}</Typography>

      <Slider
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        disableSwap={false}
        valueLabelDisplay="on"
        valueLabelFormat={formatValueLabel}
        sx={{
          color: '#1677ff',
          height: 8,
          '& .MuiSlider-thumb': {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '4px solid #1677ff',
            '&:hover': {
              boxShadow: '0 0 0 8px rgba(22, 119, 255, 0.16)',
            },
          },
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-rail': {
            opacity: 0.3,
            backgroundColor: '#ddd',
          },
        }}
        slotProps={{
          valueLabel: valueLabelProps,
        }}
      />

      {labels && (
        <Box mt={2} display="flex" justifyContent="space-between">
          {labels.map((label, i) => (
            <Typography key={i} variant="caption" color="textSecondary">
              {label}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  )
}

export default RangeSliderBase
