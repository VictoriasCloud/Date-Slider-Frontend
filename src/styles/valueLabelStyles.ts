export const valueLabelProps: any = {
    sx: {
      background: '#fff',
      color: '#1677ff',
      fontWeight: 'bold',
      borderRadius: 2,
      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
      padding: '4px 8px',
      fontSize: '0.85rem',
      position: 'relative',
      textAlign: 'center',
      whiteSpace: 'normal',
      '&::after': {
        content: '""',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        border: '6px solid transparent',
      },
      '&:before': {
        display: 'none',
      },
      '.MuiSlider-thumb[data-index="0"] &': {
        transform: 'translateY(-120%)',
        '&::after': {
          top: '100%',
          borderTopColor: '#fff',
        },
      },
      '.MuiSlider-thumb[data-index="1"] &': {
        transform: 'translateY(56px)',
        '&::after': {
          top: '-12px',
          borderTopColor: '#fff',
          transform: 'translateX(-50%) rotate(180deg)',
        },
      },
    },
  }
  