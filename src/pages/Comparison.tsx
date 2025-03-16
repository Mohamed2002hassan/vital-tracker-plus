
import { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

// Sample data for comparison
const historicalData = {
  heartRate: [
    { date: '2023-01-01', current: 72, previous: 75 },
    { date: '2023-01-02', current: 74, previous: 76 },
    { date: '2023-01-03', current: 71, previous: 73 },
    { date: '2023-01-04', current: 73, previous: 74 },
    { date: '2023-01-05', current: 75, previous: 72 },
    { date: '2023-01-06', current: 70, previous: 71 },
    { date: '2023-01-07', current: 72, previous: 70 },
  ],
  temperature: [
    { date: '2023-01-01', current: 36.8, previous: 37.1 },
    { date: '2023-01-02', current: 36.7, previous: 36.9 },
    { date: '2023-01-03', current: 36.9, previous: 37.0 },
    { date: '2023-01-04', current: 37.0, previous: 36.8 },
    { date: '2023-01-05', current: 36.8, previous: 36.7 },
    { date: '2023-01-06', current: 36.7, previous: 36.8 },
    { date: '2023-01-07', current: 36.9, previous: 36.9 },
  ],
  oxygenLevel: [
    { date: '2023-01-01', current: 98, previous: 97 },
    { date: '2023-01-02', current: 97, previous: 96 },
    { date: '2023-01-03', current: 99, previous: 98 },
    { date: '2023-01-04', current: 98, previous: 97 },
    { date: '2023-01-05', current: 97, previous: 96 },
    { date: '2023-01-06', current: 98, previous: 97 },
    { date: '2023-01-07', current: 99, previous: 98 },
  ]
};

const Comparison = () => {
  const [selectedVital, setSelectedVital] = useState('heartRate');
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [compareType, setCompareType] = useState('week');
  
  // Get appropriate data based on the selected vital
  const getData = () => {
    switch (selectedVital) {
      case 'heartRate':
        return historicalData.heartRate;
      case 'temperature':
        return historicalData.temperature;
      case 'oxygenLevel':
        return historicalData.oxygenLevel;
      default:
        return historicalData.heartRate;
    }
  };
  
  // Get appropriate unit for the selected vital
  const getUnit = () => {
    switch (selectedVital) {
      case 'heartRate':
        return 'bpm';
      case 'temperature':
        return '°C';
      case 'oxygenLevel':
        return '%';
      default:
        return '';
    }
  };
  
  // Get appropriate label for the selected vital
  const getLabel = () => {
    switch (selectedVital) {
      case 'heartRate':
        return 'Heart Rate';
      case 'temperature':
        return 'Temperature';
      case 'oxygenLevel':
        return 'Oxygen Level';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Vital Signs Comparison</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Select Vital Sign</CardTitle>
              <CardDescription>Choose which vital sign to compare</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={selectedVital} onValueChange={setSelectedVital}>
                <SelectTrigger>
                  <SelectValue placeholder="Select vital sign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="heartRate">Heart Rate</SelectItem>
                  <SelectItem value="temperature">Temperature</SelectItem>
                  <SelectItem value="oxygenLevel">Oxygen Level</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Select Date</CardTitle>
              <CardDescription>Choose the date for comparison</CardDescription>
            </CardHeader>
            <CardContent>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Comparison Period</CardTitle>
              <CardDescription>Select the period to compare</CardDescription>
            </CardHeader>
            <CardContent>
              <Select value={compareType} onValueChange={setCompareType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select comparison period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Previous Day</SelectItem>
                  <SelectItem value="week">Previous Week</SelectItem>
                  <SelectItem value="month">Previous Month</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{getLabel()} Comparison</CardTitle>
            <CardDescription>Current vs Previous {compareType === 'day' ? 'Day' : compareType === 'week' ? 'Week' : 'Month'}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis unit={getUnit()} />
                  <Tooltip 
                    formatter={(value: number) => [`${value} ${getUnit()}`, '']}
                    labelFormatter={(label) => `Date: ${label}`}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="current" 
                    stroke="#8884d8" 
                    name="Current" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="previous" 
                    stroke="#82ca9d" 
                    name="Previous" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Statistical Comparison</CardTitle>
            <CardDescription>Key metrics comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="variations">Variations</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-sm text-gray-500">Average</h3>
                    <div className="mt-2 flex justify-between">
                      <span className="text-2xl font-semibold">
                        {selectedVital === 'heartRate' ? '72' : selectedVital === 'temperature' ? '36.8' : '98'}
                        {getUnit()}
                      </span>
                      <span className="text-green-500">+2% vs previous</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-sm text-gray-500">Maximum</h3>
                    <div className="mt-2 flex justify-between">
                      <span className="text-2xl font-semibold">
                        {selectedVital === 'heartRate' ? '75' : selectedVital === 'temperature' ? '37.0' : '99'}
                        {getUnit()}
                      </span>
                      <span className="text-red-500">-1% vs previous</span>
                    </div>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium text-sm text-gray-500">Minimum</h3>
                    <div className="mt-2 flex justify-between">
                      <span className="text-2xl font-semibold">
                        {selectedVital === 'heartRate' ? '70' : selectedVital === 'temperature' ? '36.7' : '97'}
                        {getUnit()}
                      </span>
                      <span className="text-green-500">+3% vs previous</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="trends" className="space-y-4">
                <p className="text-gray-700">
                  The {getLabel().toLowerCase()} values show a slight 
                  {selectedVital === 'heartRate' ? ' decrease' : selectedVital === 'temperature' ? ' stability' : ' increase'} 
                  compared to the previous period. This indicates a 
                  {selectedVital === 'heartRate' ? ' positive' : selectedVital === 'temperature' ? ' normal' : ' beneficial'} 
                  trend in overall health metrics.
                </p>
              </TabsContent>
              
              <TabsContent value="variations" className="space-y-4">
                <p className="text-gray-700">
                  Day-to-day variations remain within normal ranges. The standard deviation of 
                  {selectedVital === 'heartRate' ? ' 1.8 bpm' : selectedVital === 'temperature' ? ' 0.2°C' : ' 0.8%'} 
                  suggests consistent readings with minimal fluctuations, indicating stable health conditions.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Comparison;
