
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, UserProfile } from '../App';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { Activity } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registerSchema = z.object({
  name: z.string().min(2, { message: "الاسم مطلوب" }),
  email: z.string().email({ message: "البريد الإلكتروني غير صالح" }),
  password: z.string().min(6, { message: "كلمة المرور يجب أن تكون 6 أحرف على الأقل" }),
  confirmPassword: z.string(),
  age: z.coerce.number().min(1).max(120).optional(),
  gender: z.string().optional(),
  bloodType: z.string().optional(),
  dateOfBirth: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { language, t } = useLanguage();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      age: undefined,
      gender: '',
      bloodType: '',
      dateOfBirth: '',
      phone: '',
      address: '',
    }
  });

  const handleSubmit = (values: z.infer<typeof registerSchema>) => {
    if (values.password !== values.confirmPassword) {
      toast({
        variant: "destructive",
        title: language === 'ar' ? "كلمات المرور غير متطابقة" : "Passwords don't match",
        description: language === 'ar' ? "يرجى التأكد من تطابق كلمات المرور" : "Please make sure your passwords match",
      });
      return;
    }
    
    setIsLoading(true);
    
    // إعداد بيانات المستخدم
    const userData: UserProfile = {
      name: values.name,
      email: values.email,
      age: values.age,
      gender: values.gender,
      bloodType: values.bloodType,
      dateOfBirth: values.dateOfBirth,
      phone: values.phone,
      address: values.address,
      chronicConditions: [],
      allergies: [],
    };
    
    // محاكاة طلب API
    setTimeout(() => {
      register(userData, values.password);
      toast({
        title: language === 'ar' ? "تم التسجيل بنجاح" : "Registration successful",
        description: language === 'ar' ? "تم إنشاء حسابك!" : "Your account has been created!",
      });
      navigate('/dashboard');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8" dir={language === 'ar' ? "rtl" : "ltr"}>
      <div className="w-full max-w-2xl space-y-8">
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* البيانات الأساسية */}
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? "الاسم الكامل" : "Full Name"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={language === 'ar' ? "محمد احمد" : "John Doe"}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? "البريد الإلكتروني" : "Email"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="name@example.com"
                              dir="ltr"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? "كلمة المرور" : "Password"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              dir="ltr"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? "تأكيد كلمة المرور" : "Confirm Password"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              dir="ltr"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                
                <hr className="my-4" />
                
                <h3 className="text-lg font-medium">
                  {language === 'ar' ? "البيانات الشخصية (اختيارية)" : "Personal Information (Optional)"}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? "العمر" : "Age"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="30"
                              {...field}
                              onChange={(e) => field.onChange(e.target.valueAsNumber || undefined)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? "الجنس" : "Gender"}
                          </FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={language === 'ar' ? "اختر الجنس" : "Select gender"} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="ذكر">{language === 'ar' ? "ذكر" : "Male"}</SelectItem>
                              <SelectItem value="أنثى">{language === 'ar' ? "أنثى" : "Female"}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="bloodType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? "فصيلة الدم" : "Blood Type"}
                          </FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder={language === 'ar' ? "اختر فصيلة الدم" : "Select blood type"} />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? "تاريخ الميلاد" : "Date of Birth"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              dir="ltr"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? "رقم الهاتف" : "Phone Number"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="+966 50 123 4567"
                              dir="ltr"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {language === 'ar' ? "العنوان" : "Address"}
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder={language === 'ar' ? "شارع الملك فهد، الرياض" : "123 Main St, City"}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
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
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Register;
