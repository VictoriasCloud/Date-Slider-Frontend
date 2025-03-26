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
  formatValueLabel: (val: number, index: number) => string | React.ReactNode
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
        valueLabelFormat={(val, i) => formatValueLabel(val as number, i)}
        
        sx={{
          color: '#5cadea',
          height: 8,
          '& .MuiSlider-thumb': {
            height: 22,
            width: 22,
            backgroundColor: '#fff',
            border: '5.5px solid #5cadea',
            '&:hover': {
              boxShadow: '0 0 0 8px rgba(164, 192, 232, 0.16)',
            },
          },
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-rail': {
            opacity: 0.3,
            backgroundColor: '#fff',
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
