
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { format, subDays } from 'date-fns';
import { generateHistoricalData, VitalsDataPoint } from '@/utils/vitalsData';
import { generateVitalAnalysis, getDailyAverages } from '@/utils/analysisUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import TimeRangeSelector from '@/components/reports/TimeRangeSelector';
import ReportDownloader from '@/components/reports/ReportDownloader';
import ReportTabs from '@/components/reports/ReportTabs';

const Reports = () => {
  const [historicalData, setHistoricalData] = useState<VitalsDataPoint[]>([]);
  const [timeRange, setTimeRange] = useState<string>("7");
  const [analysisText, setAnalysisText] = useState<string>("");
  const [currentTab, setCurrentTab] = useState<string>("charts");
  const { language } = useLanguage();
  
  // Mock patient data (in a real app this would come from an API or context)
  const patientData = {
    id: "P12345",
    name: language === 'ar' ? "أحمد محمد" : "Ahmad Mohammad",
    age: 42,
    gender: language === 'ar' ? "ذكر" : "Male",
    bloodType: "A+",
  };
  
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
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow page-container">
        <div className="page-heading">
          <h1 className="page-title">Health Reports</h1>
          <p className="page-subtitle">Detailed analysis of your vital signs over time</p>
        </div>
        
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TimeRangeSelector 
            timeRange={timeRange} 
            onTimeRangeChange={setTimeRange} 
          />
          
          <ReportDownloader 
            analysisText={analysisText} 
            patientData={patientData} 
          />
        </div>
        
        <ReportTabs
          currentTab={currentTab}
          onTabChange={setCurrentTab}
          heartRateData={heartRateData}
          temperatureData={temperatureData}
          oxygenLevelData={oxygenLevelData}
          analysisText={analysisText}
          timeRange={timeRange}
        />
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
