
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface OxygenLevelChartProps {
  data: { date: string; value: number }[];
}

const OxygenLevelChart = ({ data }: OxygenLevelChartProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg oxygen-color">Oxygen Level</CardTitle>
        <CardDescription>Average daily measurements (%)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis domain={[90, 100]} tick={{ fontSize: 12 }} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Oxygen Level']}
                contentStyle={{ borderRadius: '0.5rem', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#0EA5E9"
                fill="#0EA5E9"
                fillOpacity={0.2}
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OxygenLevelChart;
