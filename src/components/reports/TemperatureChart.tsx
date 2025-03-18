
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface TemperatureChartProps {
  data: { date: string; value: number }[];
}

const TemperatureChart = ({ data }: TemperatureChartProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg temperature-color">Temperature</CardTitle>
        <CardDescription>Average daily measurements (°C)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={[35, 39]} tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value) => [`${value}°C`, 'Temperature']}
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#ef4444" 
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

export default TemperatureChart;
