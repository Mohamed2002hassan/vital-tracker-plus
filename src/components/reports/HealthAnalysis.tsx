
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

interface HealthAnalysisProps {
  analysisText: string;
  timeRange: string;
}

const HealthAnalysis = ({ analysisText, timeRange }: HealthAnalysisProps) => {
  return (
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
  );
};

export default HealthAnalysis;
