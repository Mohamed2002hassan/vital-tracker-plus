
import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { VitalsDataPoint } from '@/utils/vitalsData';

interface AlertBannerProps {
  vitals: VitalsDataPoint;
}

const AlertBanner = ({ vitals }: AlertBannerProps) => {
  const [visible, setVisible] = useState(false);
  const [alertType, setAlertType] = useState<"normal" | "warning" | "critical">("normal");
  const [alertMessage, setAlertMessage] = useState("");
  
  useEffect(() => {
    // Check if any vital signs are in warning or critical state
    const { heartRate, temperature, oxygenLevel } = vitals;
    
    if (
      heartRate.status === "critical" || 
      temperature.status === "critical" || 
      oxygenLevel.status === "critical"
    ) {
      setAlertType("critical");
      
      // Generate alert message
      let message = "Critical Alert: ";
      if (heartRate.status === "critical") {
        message += `Heart rate (${heartRate.value} bpm) is ${heartRate.value < 60 ? "too low" : "too high"}. `;
      }
      if (temperature.status === "critical") {
        message += `Body temperature (${temperature.value}°C) is ${temperature.value < 36 ? "too low" : "too high"}. `;
      }
      if (oxygenLevel.status === "critical") {
        message += `Oxygen level (${oxygenLevel.value}%) is too low. `;
      }
      message += "Please seek medical attention.";
      
      setAlertMessage(message);
      setVisible(true);
    } else if (
      heartRate.status === "warning" || 
      temperature.status === "warning" || 
      oxygenLevel.status === "warning"
    ) {
      setAlertType("warning");
      
      // Generate alert message
      let message = "Warning: ";
      if (heartRate.status === "warning") {
        message += `Heart rate (${heartRate.value} bpm) is outside normal range. `;
      }
      if (temperature.status === "warning") {
        message += `Body temperature (${temperature.value}°C) is outside normal range. `;
      }
      if (oxygenLevel.status === "warning") {
        message += `Oxygen level (${oxygenLevel.value}%) is slightly low. `;
      }
      message += "Monitor your condition closely.";
      
      setAlertMessage(message);
      setVisible(true);
    } else {
      setAlertType("normal");
      setAlertMessage("All vital signs are normal.");
      setVisible(false);
    }
  }, [vitals]);
  
  if (!visible) return null;
  
  return (
    <div className={`alert-banner ${alertType} animate-slide-down rounded-lg mb-6 flex items-center justify-between`}>
      <div className="flex items-center">
        <AlertTriangle className="h-5 w-5 mr-2" />
        <span>{alertMessage}</span>
      </div>
      <button 
        onClick={() => setVisible(false)}
        className="text-white hover:text-gray-200 transition-colors"
      >
        <X className="h-5 w-5" />
      </button>
    </div>
  );
};

export default AlertBanner;
