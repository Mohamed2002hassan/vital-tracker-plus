
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { format, subDays } from 'date-fns';
import { generateHistoricalData, VitalsDataPoint } from '@/utils/vitalsData';
import { 
  generateVitalAnalysis, 
  getDailyAverages 
} from '@/utils/analysisUtils';
import { FileText, Download, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Reports = () => {
  const [historicalData, setHistoricalData] = useState<VitalsDataPoint[]>([]);
  const [timeRange, setTimeRange] = useState<string>("7");
  const [analysisText, setAnalysisText] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>("charts");
  
  // Load historical data
  useEffect(() => {
    const days = parseInt(timeRange);
    const data = generateHistoricalData(days);
    setHistoricalData(data);
    
    // Generate analysis text
    const analysis = generateVitalAnalysis(data);
    setAnalysisText(analysis);
  }, [timeRange]);
  
  // Format data for charts
  const getChartData = (type: 'heartRate' | 'temperature' | 'oxygenLevel') => {
    return getDailyAverages(historicalData, type).map(item => ({
      date: format(new Date(item.date), 'MMM dd'),
      value: item.value
    }));
  };
  
  const heartRateData = getChartData('heartRate');
  const temperatureData = getChartData('temperature');
  const oxygenLevelData = getChartData('oxygenLevel');
  
  // Function to "download" report (mock functionality)
  const downloadReport = () => {
    alert("Report download functionality would be implemented here in a real application.");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow page-container">
        <div className="page-heading">
          <h1 className="page-title">Health Reports</h1>
          <p className="page-subtitle">Detailed analysis of your vital signs over time</p>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">Last 3 days</SelectItem>
                <SelectItem value="7">Last 7 days</SelectItem>
                <SelectItem value="14">Last 14 days</SelectItem>
                <SelectItem value="30">Last 30 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button variant="outline" size="sm" onClick={downloadReport} className="flex items-center">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="charts" className="animate-fade-in">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg heart-rate-color">Heart Rate</CardTitle>
                  <CardDescription>Average daily measurements (BPM)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={heartRateData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg temperature-color">Temperature</CardTitle>
                  <CardDescription>Average daily measurements (°C)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={temperatureData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg oxygen-color">Oxygen Level</CardTitle>
                  <CardDescription>Average daily measurements (%)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="chart-container">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={oxygenLevelData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
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
            </div>
            
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
          </TabsContent>
          
          <TabsContent value="analysis" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2 text-medical-blue" />
                  Detailed Health Analysis
                </CardTitle>
                <CardDescription>
                  Based on your vital measurements over the past {timeRange} days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <div className="whitespace-pre-line p-4 bg-gray-50 rounded-lg text-gray-700">
                    {analysisText}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} VitalTrack. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Reports;
