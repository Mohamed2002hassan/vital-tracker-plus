
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HeartRateChart from './HeartRateChart';
import TemperatureChart from './TemperatureChart';
import OxygenLevelChart from './OxygenLevelChart';
import CombinedVitalsChart from './CombinedVitalsChart';
import HealthAnalysis from './HealthAnalysis';

interface ReportTabsProps {
  currentTab: string;
  onTabChange: (value: string) => void;
  heartRateData: { date: string; value: number }[];
  temperatureData: { date: string; value: number }[];
  oxygenLevelData: { date: string; value: number }[];
  analysisText: string;
  timeRange: string;
}

const ReportTabs = ({
  currentTab,
  onTabChange,
  heartRateData,
  temperatureData,
  oxygenLevelData,
  analysisText,
  timeRange
}: ReportTabsProps) => {
  return (
    <Tabs value={currentTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8">
        <TabsTrigger value="charts">Charts</TabsTrigger>
        <TabsTrigger value="analysis">Analysis</TabsTrigger>
      </TabsList>
      
      <TabsContent value="charts" className="animate-fade-in">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <HeartRateChart data={heartRateData} />
          <TemperatureChart data={temperatureData} />
          <OxygenLevelChart data={oxygenLevelData} />
        </div>
        
        <CombinedVitalsChart 
          heartRateData={heartRateData}
          temperatureData={temperatureData}
          oxygenLevelData={oxygenLevelData}
        />
      </TabsContent>
      
      <TabsContent value="analysis" className="animate-fade-in">
        <HealthAnalysis analysisText={analysisText} timeRange={timeRange} />
      </TabsContent>
    </Tabs>
  );
};

export default ReportTabs;
