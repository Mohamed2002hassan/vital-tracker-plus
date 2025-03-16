
import { Link } from 'react-router-dom';
import { Activity, ArrowRight, Heart, Thermometer, Droplet, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-10" dir="rtl">
      <div className="text-center space-y-4">
        <Activity className="h-16 w-16 text-primary mx-auto" />
        <h1 className="text-4xl font-bold tracking-tight">نظام المراقبة الصحية</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          مراقبة المؤشرات الحيوية عن بعد بتقنيات متقدمة للرعاية الصحية الذكية
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Button asChild size="lg">
            <Link to="/login">تسجيل الدخول</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/register">إنشاء حساب جديد</Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link to="/patient-profile">عرض ملف المريض <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <Link to="/contact">اتصل بنا <MessageSquare className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <Heart className="h-8 w-8 text-red-500 mb-2" />
            <CardTitle>مراقبة نبضات القلب</CardTitle>
            <CardDescription>
              متابعة معدل ضربات القلب في الوقت الفعلي
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>تحليل متقدم لإيقاع القلب مع إنذارات فورية عند اكتشاف أي اضطرابات.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost">
              <Link to="/dashboard">عرض البيانات <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Thermometer className="h-8 w-8 text-yellow-500 mb-2" />
            <CardTitle>قياس درجة الحرارة</CardTitle>
            <CardDescription>
              متابعة درجة حرارة الجسم بدقة عالية
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>قياسات دقيقة لدرجة حرارة الجسم مع تنبيهات عند ارتفاعها عن المعدل الطبيعي.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost">
              <Link to="/dashboard">عرض البيانات <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <Droplet className="h-8 w-8 text-blue-500 mb-2" />
            <CardTitle>مستوى الأكسجين في الدم</CardTitle>
            <CardDescription>
              مراقبة تشبع الأكسجين في الدم
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>تتبع مستويات الأكسجين في الدم مع تحليلات تفصيلية وتنبيهات عند انخفاضها.</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="ghost">
              <Link to="/dashboard">عرض البيانات <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Alert>
        <AlertTitle>ملاحظة هامة</AlertTitle>
        <AlertDescription>
          هذا النظام مخصص للمراقبة فقط ولا يغني عن زيارة الطبيب المختص في الحالات الطارئة.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Index;
