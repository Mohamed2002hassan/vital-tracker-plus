
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Activity, Thermometer, Droplet } from 'lucide-react';
import { Vital } from '@/utils/vitalsData';
import { useLanguage } from '@/contexts/LanguageContext';

interface VitalCardProps {
  title: string;
  value: number;
  status: "normal" | "warning" | "critical";
  unit: string;
  type: "heartRate" | "temperature" | "oxygenLevel";
  className?: string;
}

const VitalCard = ({ title, value, status, unit, type, className }: VitalCardProps) => {
  const [animate, setAnimate] = useState(false);
  const { t } = useLanguage();
  
  // Animate value changes
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [value]);
  
  const getIcon = () => {
    switch (type) {
      case "heartRate":
        return <Activity className={cn("h-6 w-6", status === "normal" ? "text-medical-purple" : status === "warning" ? "text-medical-yellow" : "text-medical-red")} />;
      case "temperature":
        return <Thermometer className={cn("h-6 w-6", status === "normal" ? "text-medical-red" : status === "warning" ? "text-medical-yellow" : "text-medical-red")} />;
      case "oxygenLevel":
        return <Droplet className={cn("h-6 w-6", status === "normal" ? "text-medical-blue" : status === "warning" ? "text-medical-yellow" : "text-medical-red")} />;
    }
  };
  
  const getStatusColor = () => {
    switch (status) {
      case "normal":
        return "bg-green-100 text-green-800";
      case "warning":
        return "bg-yellow-100 text-yellow-800";
      case "critical":
        return "bg-red-100 text-red-800";
    }
  };
  
  const getValueColor = () => {
    switch (status) {
      case "normal":
        return type === "heartRate" ? "text-medical-purple" : type === "temperature" ? "text-medical-red" : "text-medical-blue";
      case "warning":
        return "text-medical-yellow";
      case "critical":
        return "text-medical-red";
    }
  };
  
  const getStatusText = () => {
    switch (status) {
      case "normal":
        return t('normal');
      case "warning":
        return t('warning');
      case "critical":
        return t('critical');
    }
  };
  
  const getStatusDescription = () => {
    switch (status) {
      case "normal":
        return t('withinNormalRange');
      case "warning":
        return t('outsideNormalRange');
      case "critical":
        return t('requiresAttention');
    }
  };
  
  return (
    <div className={cn("vital-card", className)}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          {getIcon()}
          {title}
        </h3>
        <span className={cn("px-2 py-1 rounded-full text-xs font-medium", getStatusColor())}>
          {getStatusText()}
        </span>
      </div>
      
      <div className="mt-1">
        <div className={cn("text-3xl font-bold transition-all", getValueColor(), animate && "scale-110")}>
          {value} <span className="text-lg font-normal text-gray-500">{unit}</span>
        </div>
        
        <p className="text-sm text-gray-500 mt-2">
          {getStatusDescription()}
        </p>
      </div>
    </div>
  );
};

export default VitalCard;
