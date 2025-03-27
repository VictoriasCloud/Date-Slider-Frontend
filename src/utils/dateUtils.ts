export type MonthItem = {
    label: string
    year: number
    month: number
    index: number
    isYearStart: boolean
  }
  
  export const generateMonths = (startYear: number, endYear: number): MonthItem[] => {
    const months: MonthItem[] = []
    let index = 0
  
    for (let year = startYear; year <= endYear; year++) {
      for (let month = 0; month < 12; month++) {
        const date = new Date(year, month, 1)
        let label = date.toLocaleString('ru-RU', {
          month: 'short',
        })
  
        //(не убираются точки, разобраться с этим)
        label = label.replace(/\./g, '')

  
        months.push({
          label: `${label}`,
          year,
          month,
          index: index++,
          isYearStart: month === 0,
        })
      }
    }
  
    return months
  }