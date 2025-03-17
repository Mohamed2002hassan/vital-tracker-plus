
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Brain, RotateCw } from 'lucide-react';
import { VitalsDataPoint } from '@/utils/vitalsData';
import { predictDisease } from '@/utils/diseasePredictor';

interface DiseasePredictionProps {
  vitalsData: VitalsDataPoint;
}

const DiseasePrediction = ({ vitalsData }: DiseasePredictionProps) => {
  const [prediction, setPrediction] = useState<{ disease: string; confidence: number; symptoms: string[]; advice: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generatePrediction = async () => {
    setLoading(true);
    try {
      // In a real application, this would call an API
      const result = await predictDisease(vitalsData);
      setPrediction(result);
      
      // Show toast with prediction result
      if (result.confidence > 0.7) {
        toast({
          title: "تنبيه هام",
          description: `هناك احتمالية عالية للإصابة بـ ${result.disease}`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "تحليل المؤشرات",
          description: `تم تحليل المؤشرات الحيوية بنجاح`,
        });
      }
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تحليل البيانات",
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
          التشخيص الذكي
        </CardTitle>
        <CardDescription>
          تحليل وتوقع الحالات الصحية بناءً على المؤشرات الحيوية
        </CardDescription>
      </CardHeader>
      <CardContent>
        {prediction ? (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">{prediction.disease}</h3>
              <span className="text-sm bg-gray-100 px-2 py-1 rounded-full">
                نسبة التطابق: {(prediction.confidence * 100).toFixed(0)}%
              </span>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 mb-1">الأعراض المحتملة:</h4>
              <ul className="list-disc list-inside text-sm">
                {prediction.symptoms.map((symptom, index) => (
                  <li key={index}>{symptom}</li>
                ))}
              </ul>
            </div>

            <div className="bg-blue-50 p-3 rounded-md mt-2">
              <h4 className="text-sm font-medium text-blue-700 mb-1">النصيحة الطبية:</h4>
              <p className="text-sm text-blue-800">{prediction.advice}</p>
            </div>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500 mb-4">اضغط على الزر أدناه لتحليل المؤشرات الحيوية والتنبؤ بالحالات الصحية المحتملة</p>
            <p className="text-xs text-gray-400">
              *ملاحظة: هذا التحليل تقريبي وليس بديلاً عن التشخيص الطبي المتخصص
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
              <RotateCw className="h-4 w-4 animate-spin ml-2" />
              جاري التحليل...
            </>
          ) : (
            prediction ? "تحليل جديد" : "تحليل المؤشرات الحيوية"
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DiseasePrediction;
