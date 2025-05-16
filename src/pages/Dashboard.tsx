import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import VitalCard from '@/components/VitalCard';
import HeartRateMonitor from '@/components/HeartRateMonitor';
import AlertBanner from '@/components/AlertBanner';
import DiseasePrediction from '@/components/DiseasePrediction';
import BluetoothDeviceConnect from '@/components/BluetoothDeviceConnect';
import { generateVitalData, VitalsDataPoint } from '@/utils/vitalsData';
import { Button } from '@/components/ui/button';
import { RefreshCw, Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BluetoothReading } from '@/services/BluetoothService';

const Dashboard = () => {
  const [vitalsData, setVitalsData] = useState<VitalsDataPoint | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRealData, setIsRealData] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();
  
  // Load initial data
  useEffect(() => {
    fetchVitalsData();
  }, []);
  
  // Function to fetch new vital data
  const fetchVitalsData = () => {
    // اذا كان هناك اتصال حقيقي مع الأجهزة، لا نقوم بتوليد بيانات عشوائية
    if (isRealData) return;
    
    setLoading(true);
    
    // Simulate loading delay
    setTimeout(() => {
      const newData = generateVitalData();
      setVitalsData(newData);
      setLoading(false);
      
      // Show toast notification if any readings are concerning
      if (
        newData.heartRate.status === "critical" || 
        newData.temperature.status === "critical" || 
        newData.oxygenLevel.status === "critical"
      ) {
        toast({
          variant: "destructive",
          title: "Critical Alert",
          description: "One or more vital signs require immediate attention.",
        });
      } else if (
        newData.heartRate.status === "warning" || 
        newData.temperature.status === "warning" || 
        newData.oxygenLevel.status === "warning"
      ) {
        toast({
          variant: "default",
          title: "Warning",
          description: "One or more vital signs are outside normal range.",
        });
      }
    }, 1500);
  };
  
  // استقبال القراءات الحقيقية من الأجهزة الطبية
  const handleDeviceReading = (reading: BluetoothReading) => {
    // تبديل وضع البيانات إلى بيانات حقيقية
    if (!isRealData) {
      setIsRealData(true);
    }
    
    setVitalsData((prevData) => {
      if (!prevData) {
        // إذا لم تكن هناك بيانات سابقة، نقوم بتوليد بيانات أولية
        const newData = generateVitalData();
        
        // تحديث القيمة المستلمة فقط
        if (reading.type === "heartRate") {
          newData.heartRate.value = reading.value;
          newData.heartRate.timestamp = reading.timestamp;
        } else if (reading.type === "temperature") {
          newData.temperature.value = reading.value;
          newData.temperature.timestamp = reading.timestamp;
        } else if (reading.type === "oxygenLevel") {
          newData.oxygenLevel.value = reading.value;
          newData.oxygenLevel.timestamp = reading.timestamp;
        }
        
        return newData;
      }
      
      // نسخة جديدة من البيانات السابقة
      const updatedData = { ...prevData };
      
      // تحديث القيمة المستلمة فقط
      if (reading.type === "heartRate") {
        updatedData.heartRate = {
          ...updatedData.heartRate,
          value: reading.value,
          timestamp: reading.timestamp
        };
      } else if (reading.type === "temperature") {
        updatedData.temperature = {
          ...updatedData.temperature,
          value: reading.value,
          timestamp: reading.timestamp
        };
      } else if (reading.type === "oxygenLevel") {
        updatedData.oxygenLevel = {
          ...updatedData.oxygenLevel,
          value: reading.value,
          timestamp: reading.timestamp
        };
      }
      
      return updatedData;
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow page-container">
        <div className="page-heading">
          <h1 className="page-title">{t('dashboard')}</h1>
          <p className="page-subtitle">{t('monitorVitalSigns')}</p>
        </div>
        
        {/* إضافة مكون الاتصال بالأجهزة الطبية */}
        <BluetoothDeviceConnect onReading={handleDeviceReading} />
        
        <div className="mb-6 flex justify-end">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchVitalsData}
            disabled={loading || isRealData}
            className="flex items-center"
          >
            <RefreshCw className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'} ${loading ? 'animate-spin' : ''}`} />
            {isRealData ? t('usingRealData') : t('refreshData')}
          </Button>
        </div>
        
        {vitalsData && <AlertBanner vitals={vitalsData} />}
        
        <div className="grid gap-6 md:grid-cols-3">
          {vitalsData ? (
            <>
              <VitalCard 
                title={t('heartRate')} 
                value={vitalsData.heartRate.value} 
                status={vitalsData.heartRate.status}
                unit="bpm"
                type="heartRate"
              />
              <VitalCard 
                title={t('temperature')} 
                value={vitalsData.temperature.value} 
                status={vitalsData.temperature.status}
                unit="°C"
                type="temperature"
              />
              <VitalCard 
                title={t('oxygenLevel')} 
                value={vitalsData.oxygenLevel.value} 
                status={vitalsData.oxygenLevel.status}
                unit="%"
                type="oxygenLevel"
              />
            </>
          ) : (
            <>
              <div className="vital-card animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="vital-card animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="vital-card animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">{t('heartRateMonitor')}</h2>
            {vitalsData ? (
              <HeartRateMonitor 
                heartRate={vitalsData.heartRate.value} 
                status={vitalsData.heartRate.status} 
              />
            ) : (
              <div className="w-full h-40 bg-gray-100 rounded-xl animate-pulse"></div>
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">{t('aiDiagnosis')}</h2>
            {vitalsData ? (
              <DiseasePrediction vitalsData={vitalsData} />
            ) : (
              <div className="w-full h-40 bg-gray-100 rounded-xl animate-pulse"></div>
            )}
          </div>
        </div>
        
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-4">{t('quickTips')}</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-medical-blue font-bold mr-2">•</span>
              {t('stayHydrated')}
            </li>
            <li className="flex items-start">
              <span className="text-medical-blue font-bold mr-2">•</span>
              {t('deepBreathing')}
            </li>
            <li className="flex items-start">
              <span className="text-medical-blue font-bold mr-2">•</span>
              {t('consultHealthcare')}
            </li>
            <li className="flex items-start">
              <span className="text-medical-blue font-bold mr-2">•</span>
              {t('checkReports')}
            </li>
          </ul>
        </div>
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-4 border-b border-gray-100 mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('contactUs')}</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className={`h-5 w-5 text-gray-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <a href="mailto:support@vitaltrack.com" className="text-gray-600 hover:text-primary">
                    support@vitaltrack.com
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className={`h-5 w-5 text-gray-500 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                  <a href="tel:+123456789" className="text-gray-600 hover:text-primary">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">{t('emergencyContact')}</h3>
              <p className="text-gray-600 mb-2">{t('emergencyMessage')}</p>
              <a 
                href="tel:911" 
                className="inline-flex items-center bg-red-50 text-red-700 px-4 py-2 rounded-lg font-medium"
              >
                <Phone className={`h-4 w-4 ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
                {t('callEmergency')}
              </a>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} VitalTrack. {t('allRightsReserved')}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
