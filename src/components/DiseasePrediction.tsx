
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Brain, RotateCw } from 'lucide-react';
import { VitalsDataPoint } from '@/utils/vitalsData';
import { predictDisease } from '@/utils/diseasePredictor';
import { useLanguage } from '@/contexts/LanguageContext';

interface DiseasePredictionProps {
  vitalsData: VitalsDataPoint;
}

const DiseasePrediction = ({ vitalsData }: DiseasePredictionProps) => {
  const [prediction, setPrediction] = useState<{ disease: string; confidence: number; symptoms: string[]; advice: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const generatePrediction = async () => {
    setLoading(true);
    try {
      // In a real application, this would call an API
      const result = await predictDisease(vitalsData);
      setPrediction(result);
      
      // Show toast with prediction result
      if (result.confidence > 0.7) {
        toast({
          title: t('warning'),
          description: language === 'ar' 
            ? `هناك احتمالية عالية للإصابة بـ ${result.disease}`
            : `High probability of ${result.disease} detected`,
          variant: "destructive",
        });
      } else {
        toast({
          title: language === 'ar' ? "تحليل المؤشرات" : "Vitals Analysis",
          description: language === 'ar' 
            ? "تم تحليل المؤشرات الحيوية بنجاح"
            : "Vital signs analyzed successfully",
        });
      }
    } catch (error) {
      toast({
        title: language === 'ar' ? "خطأ" : "Error",
        description: language === 'ar' 
          ? "حدث خطأ أثناء تحليل البيانات"
          : "An error occurred while analyzing the data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border border-gray-100 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-purple-500" />
          {t('smartDiagnosis')}
        </CardTitle>
        <CardDescription>
          {t('analyzeHealthConditions')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {prediction ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{prediction.disease}</h3>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                {t('matchPercentage')} {(prediction.confidence * 100).toFixed(0)}%
              </span>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">{t('possibleSymptoms')}:</h4>
              <ul className="list-disc list-inside text-sm">
                {prediction.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 p-3 rounded-md mt-2">
              <h4 className="text-sm font-medium text-blue-700 mb-1">{t('medicalAdvice')}:</h4>
              <p className="text-sm text-blue-800">{prediction.advice}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-4">{t('clickToAnalyze')}</p>
            <p className="text-xs text-gray-400">
              {t('diagnosisDisclaimer')}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={generatePrediction} 
          className="w-full justify-center"
          disabled={loading}
        >
          {loading ? (
            <>
              <RotateCw className={`h-4 w-4 animate-spin ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
              {t('analyzing')}
            </>
          ) : (
            prediction ? t('newAnalysis') : t('analyzeVitals')
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DiseasePrediction;
