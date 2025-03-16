
// Mock sensor data for the application

// Types
export interface Vital {
  timestamp: Date;
  value: number;
  status: "normal" | "warning" | "critical";
}

export interface VitalsDataPoint {
  timestamp: Date;
  heartRate: Vital;
  temperature: Vital;
  oxygenLevel: Vital;
}

// Status determination functions
export const determineHeartRateStatus = (value: number): "normal" | "warning" | "critical" => {
  if (value < 50 || value > 120) return "critical";
  if (value < 60 || value > 100) return "warning";
  return "normal";
};

export const determineTemperatureStatus = (value: number): "normal" | "warning" | "critical" => {
  if (value < 35 || value > 39) return "critical";
  if (value < 36 || value > 37.8) return "warning";
  return "normal";
};

export const determineOxygenLevelStatus = (value: number): "normal" | "warning" | "critical" => {
  if (value < 90) return "critical";
  if (value < 95) return "warning";
  return "normal";
};

// Generate a random value within a specified range
const randomValue = (min: number, max: number): number => {
  return Math.round((Math.random() * (max - min) + min) * 10) / 10;
};

// Generate a single vital data point
export const generateVitalData = (): VitalsDataPoint => {
  const heartRateValue = randomValue(55, 105);
  const temperatureValue = randomValue(35.5, 38);
  const oxygenLevelValue = randomValue(92, 99);
  
  const now = new Date();
  
  return {
    timestamp: now,
    heartRate: {
      timestamp: now,
      value: heartRateValue,
      status: determineHeartRateStatus(heartRateValue)
    },
    temperature: {
      timestamp: now,
      value: temperatureValue,
      status: determineTemperatureStatus(temperatureValue)
    },
    oxygenLevel: {
      timestamp: now,
      value: oxygenLevelValue,
      status: determineOxygenLevelStatus(oxygenLevelValue)
    }
  };
};

// Generate historical data for a specified number of days
export const generateHistoricalData = (days: number = 7): VitalsDataPoint[] => {
  const data: VitalsDataPoint[] = [];
  const now = new Date();
  
  // Generate data points for each day
  for (let i = days; i >= 0; i--) {
    // Generate multiple readings per day
    for (let j = 0; j < 3; j++) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(8 + j * 6); // Readings at 8am, 2pm, 8pm
      
      const heartRateValue = randomValue(60, 100);
      const temperatureValue = randomValue(36, 37.5);
      const oxygenLevelValue = randomValue(94, 99);
      
      data.push({
        timestamp: date,
        heartRate: {
          timestamp: date,
          value: heartRateValue,
          status: determineHeartRateStatus(heartRateValue)
        },
        temperature: {
          timestamp: date,
          value: temperatureValue,
          status: determineTemperatureStatus(temperatureValue)
        },
        oxygenLevel: {
          timestamp: date,
          value: oxygenLevelValue,
          status: determineOxygenLevelStatus(oxygenLevelValue)
        }
      });
    }
  }
  
  return data;
};

// Generate ECG data for heart rate visualization
export const generateECGData = (length: number = 100): number[] => {
  const data: number[] = [];
  
  for (let i = 0; i < length; i++) {
    // Create a waveform pattern that mimics ECG
    let value = 0;
    
    if (i % 20 === 0) {
      value = 5; // P wave
    } else if (i % 20 === 2) {
      value = 0;
    } else if (i % 20 === 3) {
      value = -2; // Q wave
    } else if (i % 20 === 4) {
      value = 20; // R wave
    } else if (i % 20 === 5) {
      value = -5; // S wave
    } else if (i % 20 === 7) {
      value = 3; // T wave
    } else if (i % 20 === 9) {
      value = 0;
    } else {
      value = Math.sin(i / 10) * 0.5; // Baseline noise
    }
    
    data.push(value);
  }
  
  return data;
};
