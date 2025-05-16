
import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface DisconnectButtonProps {
  onDisconnect: () => void;
}

const DisconnectButton: React.FC<DisconnectButtonProps> = ({ onDisconnect }) => {
  const { t } = useLanguage();

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={onDisconnect}
    >
      {t('disconnect')}
    </Button>
  );
};

export default DisconnectButton;
