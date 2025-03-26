import React from 'react'
import { Box, Typography } from '@mui/material'

type Props = {
  minYear: number
  maxYear: number
}

const YearMarkers: React.FC<Props> = ({ minYear, maxYear }) => {
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i)

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        px: '12px',
        mt: 1,
      }}
    >
      {years.map((year) => (
        <Typography key={year} variant="caption" sx={{ color: '#90a4ae' }}>
          {year}
        </Typography>
      ))}
    </Box>
  )
}

export default YearMarkers
