
import React from 'react';
import { Bluetooth, BluetoothOff } from 'lucide-react';
import { BluetoothReading } from '@/services/BluetoothService';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBluetoothDevice } from '@/hooks/useBluetoothDevice';
import BluetoothDeviceList from './bluetooth/BluetoothDeviceList';
import ConnectionStatus from './bluetooth/ConnectionStatus';
import ScanControls from './bluetooth/ScanControls';
import DisconnectButton from './bluetooth/DisconnectButton';

interface BluetoothDeviceConnectProps {
  onReading: (reading: BluetoothReading) => void;
}

const BluetoothDeviceConnect = ({ onReading }: BluetoothDeviceConnectProps) => {
  const { t, language } = useLanguage();
  const {
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
  } = useBluetoothDevice(onReading);

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
            <DisconnectButton 
              onDisconnect={simulationActive ? stopSimulation : handleDisconnect} 
            />
          ) : (
            <ScanControls 
              isSupported={isSupported}
              isScanning={isScanning}
              onScan={handleScanDevices}
              onSimulate={startSimulation}
            />
          )}
        </div>
      </div>
      
      {!isSupported && (
        <p className="text-sm text-red-500 mb-4">
          {t('browserDoesNotSupportBluetooth')}
        </p>
      )}
      
      <BluetoothDeviceList 
        devices={devices} 
        onConnect={handleConnect} 
      />
      
      <ConnectionStatus 
        isConnected={isConnected} 
        isSimulation={simulationActive} 
      />
    </div>
  );
};

export default BluetoothDeviceConnect;
