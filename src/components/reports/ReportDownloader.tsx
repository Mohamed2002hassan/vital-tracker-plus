
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
}

interface ReportDownloaderProps {
  analysisText: string;
  patientData: PatientData;
}

const ReportDownloader = ({ analysisText, patientData }: ReportDownloaderProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();

  const downloadReport = () => {
    const currentDate = format(new Date(), 'yyyy-MM-dd');
    
    // Generate report content with patient information
    let reportContent = `${t('healthReport')}\n`;
    reportContent += `${t('reportDate')}${currentDate}\n\n`;
    reportContent += `${t('patientInfo')}\n`;
    reportContent += `${t('patientName')}${patientData.name}\n`;
    reportContent += `${t('patientID')}${patientData.id}\n`;
    reportContent += `${t('patientAge')}${patientData.age}\n`;
    reportContent += `${t('patientGender')}${patientData.gender}\n`;
    reportContent += `${t('patientBloodType')}${patientData.bloodType}\n\n`;
    
    // Add analysis text to the report
    reportContent += analysisText;
    
    // Add footer
    reportContent += `\n\n${t('generatedReport')}`;
    
    // Create a blob and download it
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health_report_${patientData.id}_${currentDate}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: t('reportDownloaded'),
      description: currentDate,
    });
  };

  return (
    <Button variant="outline" size="sm" onClick={downloadReport} className="flex items-center">
      <Download className="h-4 w-4 mr-2" />
      {t('downloadReport')}
    </Button>
  );
};

export default ReportDownloader;
