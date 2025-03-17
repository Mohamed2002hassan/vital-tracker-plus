
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Activity } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      if (email && password) {
        login(email, password);
        toast({
          title: language === 'ar' ? "تم تسجيل الدخول بنجاح" : "Login successful",
          description: language === 'ar' ? "مرحباً بعودتك إلى نظام المراقبة الصحية!" : "Welcome back to the health monitoring system!",
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: language === 'ar' ? "فشل تسجيل الدخول" : "Login failed",
          description: language === 'ar' ? "يرجى إدخال بيانات صحيحة" : "Please enter valid credentials",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8" dir={language === 'ar' ? "rtl" : "ltr"}>
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Activity className="h-12 w-12 text-primary" />
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
            {language === 'ar' ? "تسجيل الدخول" : "Sign in"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {language === 'ar' ? "ليس لديك حساب؟" : "Don't have an account?"}{" "}
            <Link to="/register" className="font-medium text-primary hover:text-primary/90">
              {language === 'ar' ? "إنشاء حساب جديد" : "Create a new account"}
            </Link>
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{language === 'ar' ? "تسجيل الدخول" : "Sign in"}</CardTitle>
            <CardDescription>
              {language === 'ar' ? "أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة التحكم" : "Enter your credentials to access the dashboard"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{language === 'ar' ? "البريد الإلكتروني" : "Email"}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{language === 'ar' ? "كلمة المرور" : "Password"}</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  dir="ltr"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading 
                  ? (language === 'ar' ? "جاري تسجيل الدخول..." : "Signing in...") 
                  : (language === 'ar' ? "تسجيل الدخول" : "Sign in")}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
