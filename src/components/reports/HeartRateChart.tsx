
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface HeartRateChartProps {
  data: { date: string; value: number }[];
}

const HeartRateChart = ({ data }: HeartRateChartProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg heart-rate-color">Heart Rate</CardTitle>
        <CardDescription>Average daily measurements (BPM)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={[40, 120]} tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value) => [`${value} bpm`, 'Heart Rate']}
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#8B5CF6" 
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

export default HeartRateChart;
