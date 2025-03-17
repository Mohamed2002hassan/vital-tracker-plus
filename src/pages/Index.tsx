
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Heart, Thermometer, Droplet, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/Header';

const Index = () => {
  const { t, language } = useLanguage();
  
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 space-y-10">
        <div className="text-center space-y-4">
          <Activity className="h-16 w-16 text-primary mx-auto" />
          <h1 className="text-4xl font-bold tracking-tight">{t('healthMonitoringSystem')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t('remoteBiomarkers')}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Button asChild size="lg">
              <Link to="/login">{t('login')}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/register">{t('createNewAccount')}</Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link to="/contact">
                {t('contactUs')} 
                <MessageSquare className={`${language === 'ar' ? 'mr-2' : 'ml-2'} h-4 w-4`} />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Heart className="h-8 w-8 text-red-500 mb-2" />
              <CardTitle>{t('heartRateMonitoring')}</CardTitle>
              <CardDescription>
                {t('realtimeHeartRate')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t('advancedAnalysis')}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost">
                <Link to="/dashboard">
                  {t('viewData')} 
                  <ArrowRight className={`${language === 'ar' ? 'mr-2' : 'ml-2'} h-4 w-4`} />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Thermometer className="h-8 w-8 text-yellow-500 mb-2" />
              <CardTitle>{t('temperatureMeasurement')}</CardTitle>
              <CardDescription>
                {t('accurateTemperature')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t('preciseReadings')}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost">
                <Link to="/dashboard">
                  {t('viewData')} 
                  <ArrowRight className={`${language === 'ar' ? 'mr-2' : 'ml-2'} h-4 w-4`} />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <Droplet className="h-8 w-8 text-blue-500 mb-2" />
              <CardTitle>{t('bloodOxygenLevel')}</CardTitle>
              <CardDescription>
                {t('oxygenSaturation')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{t('oxygenTracking')}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost">
                <Link to="/dashboard">
                  {t('viewData')} 
                  <ArrowRight className={`${language === 'ar' ? 'mr-2' : 'ml-2'} h-4 w-4`} />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Alert>
          <AlertTitle>{t('importantNote')}</AlertTitle>
          <AlertDescription>
            {t('monitoringDisclaimer')}
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
};

export default Index;
