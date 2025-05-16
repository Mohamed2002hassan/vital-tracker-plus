
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import BluetoothService, { BluetoothDevice, BluetoothReading } from '@/services/BluetoothService';
import { useLanguage } from '@/contexts/LanguageContext';

// Update the global interface to use correct NodeJS.Timeout type
declare global {
  interface Window {
    _simulationIntervals?: NodeJS.Timeout[];
  }
}

export function useBluetoothDevice(onReading: (reading: BluetoothReading) => void) {
  const [isSupported, setIsSupported] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [devices, setDevices] = useState<BluetoothDevice[]>([]);
  const [simulationActive, setSimulationActive] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  // Check for Bluetooth support
  useEffect(() => {
    const supported = BluetoothService.isSupported();
    setIsSupported(supported);
  }, []);

  // Setup reading response function
  useEffect(() => {
    BluetoothService.onReading((reading) => {
      onReading(reading);
    });
  }, [onReading]);

  // Scan for devices
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

  // Connect to device
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

  // Disconnect device
  const handleDisconnect = () => {
    BluetoothService.disconnect();
    setIsConnected(false);
    setSimulationActive(false);
    toast({
      title: t("deviceDisconnected"),
      description: t("dataStreamStopped"),
    });
  };

  // Start simulation for testing
  const startSimulation = () => {
    setIsConnected(true);
    setSimulationActive(true);
    toast({
      title: t("deviceConnected"),
      description: t("simulationMode"),
    });
    
    // Simulate heart rate data every 3 seconds
    const heartRateInterval = setInterval(() => {
      const heartRate = 60 + Math.floor(Math.random() * 40); // 60-100 bpm
      onReading({
        type: "heartRate",
        value: heartRate,
        timestamp: new Date()
      });
    }, 3000);
    
    // Simulate temperature data every 10 seconds
    const tempInterval = setInterval(() => {
      const temp = 36 + (Math.random() * 2); // 36-38 °C
      onReading({
        type: "temperature",
        value: parseFloat(temp.toFixed(1)),
        timestamp: new Date()
      });
    }, 10000);
    
    // Simulate oxygen level data every 5 seconds
    const oxygenInterval = setInterval(() => {
      const oxygen = 94 + Math.floor(Math.random() * 6); // 94-99%
      onReading({
        type: "oxygenLevel",
        value: oxygen,
        timestamp: new Date()
      });
    }, 5000);
    
    // Store interval references for cleanup - with correct NodeJS.Timeout type
    window._simulationIntervals = [heartRateInterval, tempInterval, oxygenInterval];
  };
  
  // Stop simulation
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

  return {
    isSupported,
    isConnected,
    isScanning,
    devices,
    simulationActive,
    handleScanDevices,
    handleConnect,
    handleDisconnect,
    startSimulation,
    stopSimulation
  };
}
