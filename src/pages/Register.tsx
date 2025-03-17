
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

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: language === 'ar' ? "كلمات المرور غير متطابقة" : "Passwords don't match",
        description: language === 'ar' ? "يرجى التأكد من تطابق كلمات المرور" : "Please make sure your passwords match",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API request
    setTimeout(() => {
      if (name && email && password) {
        register(name, email, password);
        toast({
          title: language === 'ar' ? "تم التسجيل بنجاح" : "Registration successful",
          description: language === 'ar' ? "تم إنشاء حسابك!" : "Your account has been created!",
        });
        navigate('/dashboard');
      } else {
        toast({
          variant: "destructive",
          title: language === 'ar' ? "فشل التسجيل" : "Registration failed",
          description: language === 'ar' ? "يرجى ملء جميع الحقول" : "Please fill out all fields",
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
            {language === 'ar' ? "إنشاء حساب" : "Create your account"}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {language === 'ar' ? "لديك حساب بالفعل؟" : "Already have an account?"}{" "}
            <Link to="/login" className="font-medium text-primary hover:text-primary/90">
              {language === 'ar' ? "تسجيل الدخول" : "Sign in"}
            </Link>
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>{language === 'ar' ? "التسجيل" : "Register"}</CardTitle>
            <CardDescription>
              {language === 'ar' ? "أدخل معلوماتك لإنشاء حساب" : "Enter your information to create an account"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">
                  {language === 'ar' ? "الاسم الكامل" : "Full Name"}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={language === 'ar' ? "محمد احمد" : "John Doe"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">
                  {language === 'ar' ? "البريد الإلكتروني" : "Email"}
                </Label>
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
                <Label htmlFor="password">
                  {language === 'ar' ? "كلمة المرور" : "Password"}
                </Label>
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
              
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  {language === 'ar' ? "تأكيد كلمة المرور" : "Confirm Password"}
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  dir="ltr"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading 
                  ? (language === 'ar' ? "جاري إنشاء الحساب..." : "Creating account...") 
                  : (language === 'ar' ? "إنشاء حساب" : "Create account")}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
