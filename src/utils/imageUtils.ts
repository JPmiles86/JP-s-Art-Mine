
    interface ParsedSeriesInfo {
    seriesCode: string;
    seriesName: string;
  }
  
  export const parseSeriesInfo = (series: string): ParsedSeriesInfo => {
    const [seriesCode, seriesName] = series.split(' - ');
    
    return {
      seriesCode,
      seriesName,
    };
  };
  