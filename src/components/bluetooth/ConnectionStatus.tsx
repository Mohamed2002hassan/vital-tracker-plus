
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ConnectionStatusProps {
  isConnected: boolean;
  isSimulation: boolean;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected, isSimulation }) => {
  const { t } = useLanguage();

  if (!isConnected) {
    return null;
  }

  return (
    <p className="text-sm text-green-600 flex items-center">
      <span className="inline-block h-2 w-2 bg-green-600 rounded-full mr-2 animate-pulse"></span>
      {t('deviceConnected')} - {isSimulation ? t('simulationActive') : t('receivingLiveData')}
    </p>
  );
};

export default ConnectionStatus;
