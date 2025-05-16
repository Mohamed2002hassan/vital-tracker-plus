
import React from 'react';
import { Button } from '@/components/ui/button';
import { Activity } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ScanControlsProps {
  isSupported: boolean;
  isScanning: boolean;
  onScan: () => void;
  onSimulate: () => void;
}

const ScanControls: React.FC<ScanControlsProps> = ({ 
  isSupported, 
  isScanning, 
  onScan, 
  onSimulate 
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        onClick={onScan}
        disabled={!isSupported || isScanning}
      >
        {isScanning ? t('scanning') : t('scanForDevices')}
      </Button>
      
      <Button
        variant="default"
        size="sm"
        onClick={onSimulate}
        className="flex items-center"
      >
        <Activity className="h-4 w-4 mr-1" />
        {t('simulate')}
      </Button>
    </div>
  );
};

export default ScanControls;
