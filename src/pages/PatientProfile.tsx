
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { User, ClipboardList, Activity, Calendar, MapPin, Phone, Mail, Edit } from 'lucide-react';

const PatientProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Mock patient data
  const [patient, setPatient] = useState({
    id: "P12345",
    name: "أحمد محمد",
    age: 42,
    gender: "ذكر",
    dateOfBirth: "1981-05-15",
    bloodType: "A+",
    address: "شارع الملك فهد، الرياض",
    phone: "+966 50 123 4567",
    email: "ahmad@example.com",
    emergencyContact: "محمد علي (الأخ) - +966 55 876 5432",
    chronicConditions: ["ارتفاع ضغط الدم", "مرض السكري من النوع الثاني"],
    allergies: ["البنسلين", "المكسرات"],
    medications: [
      { name: "ليسينوبريل", dosage: "10 ملغ", frequency: "مرة واحدة يومياً", startDate: "2022-03-10" },
      { name: "ميتفورمين", dosage: "500 ملغ", frequency: "مرتين يومياً", startDate: "2021-11-05" }
    ],
    medicalHistory: [
      { date: "2023-12-15", condition: "التهاب الجيوب الأنفية", treatment: "المضادات الحيوية", doctor: "د. خالد" },
      { date: "2022-08-20", condition: "كسر في الذراع الأيمن", treatment: "جبيرة لمدة 6 أسابيع", doctor: "د. سارة" },
      { date: "2021-05-12", condition: "عملية إزالة اللوزتين", treatment: "جراحة", doctor: "د. عمر" }
    ],
    vitalSigns: [
      { date: "2023-12-20", heartRate: 72, temperature: 36.8, oxygenLevel: 98, bloodPressure: "120/80" },
      { date: "2023-11-15", heartRate: 75, temperature: 37.0, oxygenLevel: 97, bloodPressure: "125/82" },
      { date: "2023-10-10", heartRate: 70, temperature: 36.7, oxygenLevel: 99, bloodPressure: "118/78" }
    ]
  });

  const handleEdit = () => {
    toast({
      title: "وضع التعديل",
      description: "تم تفعيل وضع تعديل بيانات المريض",
    });
    // In a real app, this would open an edit form
  };
  
  return (
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-8 rtl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight">ملف المريض</h1>
        <Button onClick={() => navigate(-1)}>العودة</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Personal Information Card */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <CardTitle>البيانات الشخصية</CardTitle>
              <Button variant="ghost" size="icon" onClick={handleEdit}>
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex flex-col items-center text-center pb-4">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="" alt={patient.name} />
              <AvatarFallback className="text-lg bg-primary text-primary-foreground">
                {patient.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{patient.name}</h2>
            <p className="text-sm text-muted-foreground mb-4">رقم المريض: {patient.id}</p>
            
            <div className="w-full space-y-3 text-right">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">العمر:</span>
                <span className="font-medium">{patient.age} سنة ({patient.gender})</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">تاريخ الميلاد:</span>
                <span className="font-medium">{patient.dateOfBirth}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">فصيلة الدم:</span>
                <span className="font-medium">{patient.bloodType}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">العنوان:</span>
                <span className="font-medium">{patient.address}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">الهاتف:</span>
                <span className="font-medium" dir="ltr">{patient.phone}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">البريد الإلكتروني:</span>
                <span className="font-medium">{patient.email}</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="w-full">
              <h3 className="font-medium mb-2">جهة الاتصال في حالات الطوارئ:</h3>
              <p className="text-sm">{patient.emergencyContact}</p>
            </div>
          </CardFooter>
        </Card>
        
        {/* Medical Information Tabs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>المعلومات الطبية</CardTitle>
            <CardDescription>السجل الطبي والحالات المرضية والأدوية</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="conditions" className="w-full">
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger value="conditions">الحالات المرضية</TabsTrigger>
                <TabsTrigger value="medications">الأدوية</TabsTrigger>
                <TabsTrigger value="history">السجل الطبي</TabsTrigger>
              </TabsList>
              
              <TabsContent value="conditions" className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">الأمراض المزمنة:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {patient.chronicConditions.map((condition, index) => (
                      <li key={index} className="text-sm">{condition}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">الحساسية:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {patient.allergies.map((allergy, index) => (
                      <li key={index} className="text-sm">{allergy}</li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="medications">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>الدواء</TableHead>
                      <TableHead>الجرعة</TableHead>
                      <TableHead>التكرار</TableHead>
                      <TableHead>تاريخ البدء</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patient.medications.map((medication, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{medication.name}</TableCell>
                        <TableCell>{medication.dosage}</TableCell>
                        <TableCell>{medication.frequency}</TableCell>
                        <TableCell>{medication.startDate}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              
              <TabsContent value="history">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>التاريخ</TableHead>
                      <TableHead>الحالة</TableHead>
                      <TableHead>العلاج</TableHead>
                      <TableHead>الطبيب</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {patient.medicalHistory.map((entry, index) => (
                      <TableRow key={index}>
                        <TableCell>{entry.date}</TableCell>
                        <TableCell className="font-medium">{entry.condition}</TableCell>
                        <TableCell>{entry.treatment}</TableCell>
                        <TableCell>{entry.doctor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* Vital Signs Card */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>سجل العلامات الحيوية</CardTitle>
            <CardDescription>آخر قراءات العلامات الحيوية للمريض</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>التاريخ</TableHead>
                  <TableHead>نبضات القلب (نبضة/دقيقة)</TableHead>
                  <TableHead>درجة الحرارة (°C)</TableHead>
                  <TableHead>مستوى الأكسجين (%)</TableHead>
                  <TableHead>ضغط الدم (mmHg)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patient.vitalSigns.map((vital, index) => (
                  <TableRow key={index}>
                    <TableCell>{vital.date}</TableCell>
                    <TableCell className="font-medium">{vital.heartRate}</TableCell>
                    <TableCell>{vital.temperature}</TableCell>
                    <TableCell>{vital.oxygenLevel}</TableCell>
                    <TableCell>{vital.bloodPressure}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-end border-t pt-4">
            <Button onClick={() => navigate('/dashboard')}>
              <ClipboardList className="mr-2 h-4 w-4" />
              عرض لوحة المراقبة
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PatientProfile;
