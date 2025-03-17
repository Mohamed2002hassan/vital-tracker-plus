
import { VitalsDataPoint } from './vitalsData';

// Disease prediction utility
export const predictDisease = (vitalsData: VitalsDataPoint): Promise<{ 
  disease: string; 
  confidence: number; 
  symptoms: string[]; 
  advice: string;
}> => {
  // Simulating an API call with a promise
  return new Promise((resolve) => {
    setTimeout(() => {
      const { heartRate, temperature, oxygenLevel } = vitalsData;
      
      // Simple rule-based disease prediction
      if (temperature.value > 38 && heartRate.value > 100) {
        // High fever with elevated heart rate
        if (oxygenLevel.value < 95) {
          // With low oxygen - possible pneumonia
          resolve({
            disease: "الالتهاب الرئوي",
            confidence: 0.85,
            symptoms: [
              "ارتفاع في درجة الحرارة",
              "زيادة معدل ضربات القلب",
              "انخفاض مستوى الأكسجين في الدم",
              "ضيق في التنفس",
              "سعال"
            ],
            advice: "يُنصح بمراجعة الطبيب على وجه السرعة. قد تحتاج إلى فحص الصدر بالأشعة وتقييم طبي شامل."
          });
        } else {
          // Normal oxygen - possible flu/infection
          resolve({
            disease: "الإنفلونزا أو عدوى فيروسية",
            confidence: 0.78,
            symptoms: [
              "ارتفاع في درجة الحرارة",
              "زيادة معدل ضربات القلب",
              "صداع",
              "آلام في الجسم",
              "إرهاق عام"
            ],
            advice: "خذ قسطاً من الراحة، اشرب كمية كافية من السوائل، واستخدم خافض للحرارة إذا لزم الأمر. استشر الطبيب إذا استمرت الأعراض لأكثر من 3 أيام."
          });
        }
      } else if (temperature.value < 36 && heartRate.value < 60) {
        // Low body temperature and bradycardia
        resolve({
          disease: "انخفاض حرارة الجسم",
          confidence: 0.82,
          symptoms: [
            "انخفاض درجة حرارة الجسم",
            "بطء ضربات القلب",
            "شعور بالتعب",
            "ارتباك ذهني",
            "برودة الأطراف"
          ],
          advice: "قم بتدفئة الجسم تدريجياً، واطلب المساعدة الطبية الفورية إذا كان الانخفاض شديداً (أقل من 35 درجة مئوية)."
        });
      } else if (oxygenLevel.value < 92) {
        // Severe oxygen deprivation
        resolve({
          disease: "نقص الأكسجة",
          confidence: 0.9,
          symptoms: [
            "انخفاض حاد في مستوى الأكسجين بالدم",
            "ضيق في التنفس",
            "تعب وإرهاق",
            "دوار",
            "زرقة الشفاه أو الأظافر"
          ],
          advice: "هذه حالة طبية طارئة تستدعي زيارة الطوارئ على الفور. انتقل إلى أقرب مستشفى أو اتصل بالإسعاف."
        });
      } else if (heartRate.value > 100 && temperature.value < 37.5) {
        // Tachycardia without fever
        resolve({
          disease: "تسارع ضربات القلب",
          confidence: 0.65,
          symptoms: [
            "زيادة في معدل ضربات القلب",
            "خفقان",
            "قلق",
            "ضيق في التنفس",
            "دوخة"
          ],
          advice: "راقب حالتك وسجل أي أعراض إضافية. إذا استمرت حالة تسارع ضربات القلب أو تكررت، استشر طبيب القلب."
        });
      } else {
        // No clear patterns or normal readings
        resolve({
          disease: "لا توجد مؤشرات واضحة لحالة مرضية محددة",
          confidence: 0.4,
          symptoms: [
            "المؤشرات الحيوية ضمن النطاق الطبيعي أو قريبة منه",
            "قد تكون هناك بعض التقلبات الطفيفة في المؤشرات"
          ],
          advice: "المؤشرات الحيوية في حالة مستقرة نسبياً. استمر في المراقبة الدورية وممارسة عادات صحية."
        });
      }
    }, 1500); // Simulate processing delay
  });
};

// Additional utility to provide a more detailed analysis for medical professionals
export const getDetailedAnalysis = (prediction: { disease: string; confidence: number }) => {
  // This could be expanded to provide more in-depth medical information
  // for healthcare professionals
  switch (prediction.disease) {
    case "الالتهاب الرئوي":
      return {
        possibleCauses: ["عدوى بكتيرية", "عدوى فيروسية", "استنشاق مواد غريبة"],
        recommendedTests: ["أشعة صدر", "تحليل دم شامل", "مزرعة بلغم"],
        possibleTreatments: ["مضادات حيوية", "مسكنات ألم", "موسعات شعب هوائية"]
      };
    case "الإنفلونزا أو عدوى فيروسية":
      return {
        possibleCauses: ["فيروس الإنفلونزا", "فيروسات الجهاز التنفسي العلوي"],
        recommendedTests: ["مسحة أنفية", "تحليل CBC"],
        possibleTreatments: ["مضادات للفيروسات", "خافضات للحرارة", "مكملات فيتامين C"]
      };
    default:
      return {
        note: "لا توجد معلومات تفصيلية إضافية متوفرة لهذه الحالة"
      };
  }
};
