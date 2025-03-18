
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface CombinedVitalsChartProps {
  heartRateData: { date: string; value: number }[];
  temperatureData: { date: string; value: number }[];
  oxygenLevelData: { date: string; value: number }[];
}

const CombinedVitalsChart = ({ heartRateData, temperatureData, oxygenLevelData }: CombinedVitalsChartProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-medical-blue" />
          Summary of All Vitals
        </CardTitle>
        <CardDescription>
          Combined view of all vital measurements over time
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
                type="category"
                allowDuplicatedCategory={false}
              />
              <YAxis yAxisId="heartRate" orientation="left" domain={[40, 120]} tick={{ fontSize: 12 }} />
              <YAxis yAxisId="temperature" orientation="right" domain={[35, 39]} tick={{ fontSize: 12 }} />
              <YAxis yAxisId="oxygenLevel" orientation="right" domain={[90, 100]} hide />
              <Tooltip contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
              <Legend />
              
              <Line 
                yAxisId="heartRate"
                data={heartRateData}
                type="monotone" 
                dataKey="value" 
                name="Heart Rate (bpm)"
                stroke="#8B5CF6" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line 
                yAxisId="temperature"
                data={temperatureData}
                type="monotone" 
                dataKey="value" 
                name="Temperature (°C)"
                stroke="#ef4444" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line 
                yAxisId="oxygenLevel"
                data={oxygenLevelData}
                type="monotone" 
                dataKey="value" 
                name="Oxygen Level (%)"
                stroke="#0EA5E9" 
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CombinedVitalsChart;
