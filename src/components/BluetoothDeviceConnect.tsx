
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bluetooth, BluetoothOff, Activity } from 'lucide-react';
import BluetoothService, { BluetoothDevice, BluetoothReading } from '@/services/BluetoothService';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface BluetoothDeviceConnectProps {
  onReading: (reading: BluetoothReading) => void;
}

const BluetoothDeviceConnect = ({ onReading }: BluetoothDeviceConnectProps) => {
  const [isSupported, setIsSupported] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [simulationActive, setSimulationActive] = useState(false);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  // التحقق من دعم البلوتوث
  useEffect(() => {
    const supported = BluetoothService.isSupported();
    setIsSupported(supported);
  }, []);

  // ضبط وظيفة الاستجابة للقراءات
  useEffect(() => {
    BluetoothService.onReading((reading) => {
      onReading(reading);
    });
  }, [onReading]);

  // البحث عن الأجهزة
  const handleScanDevices = async () => {
    if (!isSupported) {
      toast({
        variant: "destructive",
        title: t("error"),
        description: t("bluetoothNotSupported"),
      });
      return;
    }

    setIsScanning(true);
    try {
      const foundDevices = await BluetoothService.scanForDevices();
      setDevices(foundDevices);
      if (foundDevices.length === 0) {
        toast({
          title: t("noDevicesFound"),
          description: t("tryAgainOrCheckDevice"),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("scanError"),
        description: t("couldNotScanDevices"),
      });
    } finally {
      setIsScanning(false);
    }
  };

  // الاتصال بالجهاز
  const handleConnect = async (deviceId: string) => {
    try {
      const success = await BluetoothService.connectToDevice(deviceId);
      setIsConnected(success);
      
      if (success) {
        toast({
          title: t("deviceConnected"),
          description: t("receivingData"),
        });
      } else {
        toast({
          variant: "destructive",
          title: t("connectionFailed"),
          description: t("checkDeviceAndTryAgain"),
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: t("connectionError"),
        description: t("couldNotConnectToDevice"),
      });
    }
  };

  // قطع الاتصال
  const handleDisconnect = () => {
    BluetoothService.disconnect();
    setIsConnected(false);
    setSimulationActive(false);
    toast({
      title: t("deviceDisconnected"),
      description: t("dataStreamStopped"),
    });
  };

  // محاكاة الأجهزة للاختبار
  const startSimulation = () => {
    setIsConnected(true);
    setSimulationActive(true);
    toast({
      title: t("deviceConnected"),
      description: t("simulationMode"),
    });
    
    // محاكاة إرسال بيانات القلب كل 3 ثواني
    const heartRateInterval = setInterval(() => {
      const heartRate = 60 + Math.floor(Math.random() * 40); // 60-100 bpm
      onReading({
        type: "heartRate",
        value: heartRate,
        timestamp: new Date()
      });
    }, 3000);
    
    // محاكاة إرسال بيانات درجة الحرارة كل 10 ثواني
    const tempInterval = setInterval(() => {
      const temp = 36 + (Math.random() * 2); // 36-38 °C
      onReading({
        type: "temperature",
        value: parseFloat(temp.toFixed(1)),
        timestamp: new Date()
      });
    }, 10000);
    
    // محاكاة إرسال بيانات الأكسجين كل 5 ثواني
    const oxygenInterval = setInterval(() => {
      const oxygen = 94 + Math.floor(Math.random() * 6); // 94-99%
      onReading({
        type: "oxygenLevel",
        value: oxygen,
        timestamp: new Date()
      });
    }, 5000);
    
    // تخزين المراجع للإيقاف لاحقاً
    window._simulationIntervals = [heartRateInterval, tempInterval, oxygenInterval];
  };
  
  // إيقاف المحاكاة
  const stopSimulation = () => {
    if (window._simulationIntervals) {
      window._simulationIntervals.forEach(clearInterval);
      window._simulationIntervals = [];
    }
    setIsConnected(false);
    setSimulationActive(false);
    toast({
      title: t("simulationStopped"),
      description: t("dataStreamStopped"),
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold flex items-center">
          {isSupported ? (
            <Bluetooth className={`h-5 w-5 ${language === 'ar' ? 'ml-2' : 'mr-2'} text-medical-blue`} />
          ) : (
            <BluetoothOff className={`h-5 w-5 ${language === 'ar' ? 'ml-2' : 'mr-2'} text-gray-400`} />
          )}
          {t('medicalDevices')}
        </h2>
        
        <div className="flex space-x-2">
          {isConnected ? (
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={simulationActive ? stopSimulation : handleDisconnect}
            >
              {t('disconnect')}
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleScanDevices}
                disabled={!isSupported || isScanning}
              >
                {isScanning ? t('scanning') : t('scanForDevices')}
              </Button>
              
              <Button
                variant="default"
                size="sm"
                onClick={startSimulation}
                className="flex items-center"
              >
                <Activity className="h-4 w-4 mr-1" />
                {t('simulate')}
              </Button>
            </>
          )}
        </div>
      </div>
      
      {!isSupported && (
        <p className="text-sm text-red-500 mb-4">
          {t('browserDoesNotSupportBluetooth')}
        </p>
      )}
      
      {devices.length > 0 && !isConnected && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">{t('availableDevices')}</h3>
          <ul className="space-y-2">
            {devices.map((device) => (
              <li 
                key={device.id}
                className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <span>{device.name}</span>
                <Button 
                  size="sm" 
                  onClick={() => handleConnect(device.id)}
                >
                  {t('connect')}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {isConnected && (
        <p className="text-sm text-green-600 flex items-center">
          <span className="inline-block h-2 w-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
          {t('deviceConnected')} - {simulationActive ? t('simulationActive') : t('receivingLiveData')}
        </p>
      )}
    </div>
  );
};

declare global {
  interface Window {
    _simulationIntervals?: number[];
  }
}

export default BluetoothDeviceConnect;
