
import { VitalsDataPoint, Vital } from './vitalsData';
import { format } from 'date-fns';

// Calculate average values
export const calculateAverage = (data: number[]): number => {
  if (data.length === 0) return 0;
  const sum = data.reduce((a, b) => a + b, 0);
  return Math.round((sum / data.length) * 10) / 10;
};

// Find minimum value
export const findMinValue = (data: number[]): number => {
  if (data.length === 0) return 0;
  return Math.min(...data);
};

// Find maximum value
export const findMaxValue = (data: number[]): number => {
  if (data.length === 0) return 0;
  return Math.max(...data);
};

// Group data points by day for charts
export const groupByDay = (data: VitalsDataPoint[]): { [key: string]: VitalsDataPoint[] } => {
  return data.reduce((groups, dataPoint) => {
    const date = format(dataPoint.timestamp, 'yyyy-MM-dd');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(dataPoint);
    return groups;
  }, {} as { [key: string]: VitalsDataPoint[] });
};

// Get daily averages for a specific vital
export const getDailyAverages = (
  data: VitalsDataPoint[], 
  vitalType: 'heartRate' | 'temperature' | 'oxygenLevel'
): { date: string; value: number }[] => {
  const groups = groupByDay(data);
  
  return Object.entries(groups).map(([date, points]) => {
    const values = points.map(point => point[vitalType].value);
    return {
      date,
      value: calculateAverage(values)
    };
  });
};

// Generate a textual analysis of vital signs
export const generateVitalAnalysis = (data: VitalsDataPoint[]): string => {
  if (data.length === 0) return "No data available for analysis.";
  
  // Extract vital values
  const heartRates = data.map(point => point.heartRate.value);
  const temperatures = data.map(point => point.temperature.value);
  const oxygenLevels = data.map(point => point.oxygenLevel.value);
  
  // Calculate statistics
  const avgHeartRate = calculateAverage(heartRates);
  const minHeartRate = findMinValue(heartRates);
  const maxHeartRate = findMaxValue(heartRates);
  
  const avgTemperature = calculateAverage(temperatures);
  const minTemperature = findMinValue(temperatures);
  const maxTemperature = findMaxValue(temperatures);
  
  const avgOxygenLevel = calculateAverage(oxygenLevels);
  const minOxygenLevel = findMinValue(oxygenLevels);
  const maxOxygenLevel = findMaxValue(oxygenLevels);
  
  // Analyze heart rate
  let heartRateAnalysis = "";
  if (avgHeartRate < 60) {
    heartRateAnalysis = "Your average heart rate is below normal range, indicating possible bradycardia.";
  } else if (avgHeartRate > 100) {
    heartRateAnalysis = "Your average heart rate is above normal range, indicating possible tachycardia.";
  } else {
    heartRateAnalysis = "Your average heart rate is within normal range.";
  }
  
  // Analyze temperature
  let temperatureAnalysis = "";
  if (avgTemperature < 36) {
    temperatureAnalysis = "Your average body temperature is below normal range.";
  } else if (avgTemperature > 37.8) {
    temperatureAnalysis = "Your average body temperature is above normal range, indicating possible fever.";
  } else {
    temperatureAnalysis = "Your average body temperature is within normal range.";
  }
  
  // Analyze oxygen level
  let oxygenLevelAnalysis = "";
  if (avgOxygenLevel < 95) {
    oxygenLevelAnalysis = "Your average oxygen level is below normal range, which may indicate respiratory issues.";
  } else {
    oxygenLevelAnalysis = "Your average oxygen level is within normal range.";
  }
  
  // Combine analyses
  return `
    Based on the data collected, here's an analysis of your vital signs:
    
    Heart Rate:
    - Average: ${avgHeartRate} bpm
    - Range: ${minHeartRate} - ${maxHeartRate} bpm
    - ${heartRateAnalysis}
    
    Body Temperature:
    - Average: ${avgTemperature}°C
    - Range: ${minTemperature} - ${maxTemperature}°C
    - ${temperatureAnalysis}
    
    Blood Oxygen Level:
    - Average: ${avgOxygenLevel}%
    - Range: ${minOxygenLevel} - ${maxOxygenLevel}%
    - ${oxygenLevelAnalysis}
    
    Recommendations:
    ${generateRecommendations(avgHeartRate, avgTemperature, avgOxygenLevel)}
  `;
};

// Generate recommendations based on vital signs
const generateRecommendations = (
  heartRate: number,
  temperature: number,
  oxygenLevel: number
): string => {
  const recommendations: string[] = [];
  
  // Heart rate recommendations
  if (heartRate < 60) {
    recommendations.push("Consider consulting with a healthcare provider about your low heart rate.");
  } else if (heartRate > 100) {
    recommendations.push("Monitor your heart rate closely and consult with a healthcare provider if it remains elevated.");
    recommendations.push("Try relaxation techniques to help lower your heart rate.");
  }
  
  // Temperature recommendations
  if (temperature > 37.8) {
    recommendations.push("Rest and stay hydrated to help manage your elevated temperature.");
    recommendations.push("Consider taking appropriate medication to reduce fever if needed.");
    recommendations.push("Consult with a healthcare provider if your temperature remains elevated for more than 24 hours.");
  }
  
  // Oxygen level recommendations
  if (oxygenLevel < 95) {
    recommendations.push("Monitor your oxygen levels closely.");
    recommendations.push("Practice deep breathing exercises to help improve oxygen saturation.");
    if (oxygenLevel < 92) {
      recommendations.push("Seek immediate medical attention for low oxygen levels.");
    }
  }
  
  // General recommendations
  if (recommendations.length === 0) {
    recommendations.push("Your vital signs are within normal ranges. Continue with your current health practices.");
    recommendations.push("Maintain regular physical activity and a balanced diet.");
    recommendations.push("Ensure you're getting adequate sleep.");
  }
  
  return recommendations.join("\n    ");
};

// Compare current vitals with historical data
export const compareWithHistory = (
  current: VitalsDataPoint,
  historical: VitalsDataPoint[]
): { [key: string]: { change: number; trend: 'improving' | 'worsening' | 'stable' } } => {
  if (historical.length === 0) {
    return {
      heartRate: { change: 0, trend: 'stable' },
      temperature: { change: 0, trend: 'stable' },
      oxygenLevel: { change: 0, trend: 'stable' }
    };
  }
  
  // Calculate average historical values
  const avgHistoricalHeartRate = calculateAverage(historical.map(point => point.heartRate.value));
  const avgHistoricalTemperature = calculateAverage(historical.map(point => point.temperature.value));
  const avgHistoricalOxygenLevel = calculateAverage(historical.map(point => point.oxygenLevel.value));
  
  // Calculate changes
  const heartRateChange = current.heartRate.value - avgHistoricalHeartRate;
  const temperatureChange = current.temperature.value - avgHistoricalTemperature;
  const oxygenLevelChange = current.oxygenLevel.value - avgHistoricalOxygenLevel;
  
  // Determine trends
  const heartRateTrend = determineHeartRateTrend(heartRateChange);
  const temperatureTrend = determineTemperatureTrend(temperatureChange);
  const oxygenLevelTrend = determineOxygenLevelTrend(oxygenLevelChange);
  
  return {
    heartRate: {
      change: Math.round(heartRateChange * 10) / 10,
      trend: heartRateTrend
    },
    temperature: {
      change: Math.round(temperatureChange * 10) / 10,
      trend: temperatureTrend
    },
    oxygenLevel: {
      change: Math.round(oxygenLevelChange * 10) / 10,
      trend: oxygenLevelTrend
    }
  };
};

// Determine trend for heart rate
const determineHeartRateTrend = (change: number): 'improving' | 'worsening' | 'stable' => {
  if (Math.abs(change) < 5) return 'stable';
  
  // If heart rate was high and is coming down, or was low and is going up
  if ((change < 0 && change < -5) || (change > 0 && change > 5)) {
    return 'improving';
  }
  
  return 'worsening';
};

// Determine trend for temperature
const determineTemperatureTrend = (change: number): 'improving' | 'worsening' | 'stable' => {
  if (Math.abs(change) < 0.3) return 'stable';
  
  // If temperature was high and is coming down
  if (change < 0) {
    return 'improving';
  }
  
  // If temperature is going up
  return 'worsening';
};

// Determine trend for oxygen level
const determineOxygenLevelTrend = (change: number): 'improving' | 'worsening' | 'stable' => {
  if (Math.abs(change) < 1) return 'stable';
  
  // If oxygen level is increasing
  if (change > 0) {
    return 'improving';
  }
  
  // If oxygen level is decreasing
  return 'worsening';
};
