
import React from 'react';
import { Button } from '@/components/ui/button';
import { BluetoothDevice } from '@/services/BluetoothService';
import { useLanguage } from '@/contexts/LanguageContext';

interface BluetoothDeviceListProps {
  devices: BluetoothDevice[];
  onConnect: (deviceId: string) => void;
}

const BluetoothDeviceList: React.FC<BluetoothDeviceListProps> = ({ devices, onConnect }) => {
  const { t } = useLanguage();

  if (devices.length === 0) {
    return null;
  }

  return (
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
              onClick={() => onConnect(device.id)}
            >
              {t('connect')}
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BluetoothDeviceList;
