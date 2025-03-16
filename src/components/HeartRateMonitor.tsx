
import { useEffect, useRef, useState } from 'react';
import { generateECGData } from '@/utils/vitalsData';

interface HeartRateMonitorProps {
  heartRate: number;
  status: "normal" | "warning" | "critical";
}

const HeartRateMonitor = ({ heartRate, status }: HeartRateMonitorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [data, setData] = useState<number[]>([]);
  
  // Generate ECG data
  useEffect(() => {
    setData(generateECGData(150));
    
    // Update ECG data at interval based on heart rate
    const interval = setInterval(() => {
      setData(prevData => {
        const newData = [...prevData];
        newData.shift();
        
        // Generate new ECG point
        const lastPoint = newData[newData.length - 1];
        const newPoint = generateECGData(1)[0];
        
        newData.push(newPoint);
        return newData;
      });
    }, 60 / heartRate * 1000 / 20); // Update frequency based on heart rate
    
    return () => clearInterval(interval);
  }, [heartRate]);
  
  // Draw ECG waveform
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const drawECG = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Set line style
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      // Set color based on status
      if (status === 'normal') {
        ctx.strokeStyle = '#8B5CF6'; // Purple
      } else if (status === 'warning') {
        ctx.strokeStyle = '#f59e0b'; // Yellow
      } else {
        ctx.strokeStyle = '#ef4444'; // Red
      }
      
      // Draw ECG line
      ctx.beginPath();
      
      const stepSize = canvas.width / (data.length - 1);
      const midY = canvas.height / 2;
      const amplitude = canvas.height / 4;
      
      data.forEach((value, index) => {
        const x = index * stepSize;
        const y = midY - value * amplitude / 20;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.stroke();
    };
    
    drawECG();
    
    // Animate heartbeat effect when heart rate changes
    canvas.classList.add('animate-pulse-opacity');
    setTimeout(() => {
      canvas.classList.remove('animate-pulse-opacity');
    }, 500);
    
  }, [data, status]);
  
  return (
    <div className="w-full h-40 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={160}
        className="w-full h-full"
      />
    </div>
  );
};

export default HeartRateMonitor;
