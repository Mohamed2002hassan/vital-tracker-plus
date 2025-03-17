import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define available languages
export type Language = 'ar' | 'en';

// Define the context type
type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

// Create the context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'ar',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Create translations object
const translations = {
  ar: {
    // Header
    'dashboard': 'لوحة التحكم',
    'reports': 'التقارير',
    'comparison': 'المقارنة',
    'patientProfile': 'ملف المريض',
    'login': 'تسجيل الدخول',
    'register': 'إنشاء حساب',
    'logout': 'تسجيل الخروج',
    'user': 'المستخدم',
    
    // Index page
    'healthMonitoringSystem': 'نظام المراقبة الصحية',
    'remoteBiomarkers': 'مراقبة المؤشرات الحيوية عن بعد بتقنيات متقدمة للرعاية الصحية الذكية',
    'createNewAccount': 'إنشاء حساب جديد',
    'contactUs': 'اتصل بنا',
    'heartRateMonitoring': 'مراقبة نبضات القلب',
    'realtimeHeartRate': 'متابعة معدل ضربات القلب في الوقت الفعلي',
    'advancedAnalysis': 'تحليل متقدم لإيقاع القلب مع إنذارات فورية عند اكتشاف أي اضطرابات.',
    'temperatureMeasurement': 'قياس درجة الحرارة',
    'accurateTemperature': 'متابعة درجة حرارة الجسم بدقة عالية',
    'preciseReadings': 'قياسات دقيقة لدرجة حرارة الجسم مع تنبيهات عند ارتفاعها عن المعدل الطبيعي.',
    'bloodOxygenLevel': 'مستوى الأكسجين في الدم',
    'oxygenSaturation': 'مراقبة تشبع الأكسجين في الدم',
    'oxygenTracking': 'تتبع مستويات الأكسجين في الدم مع تحليلات تفصيلية وتنبيهات عند انخفاضها.',
    'viewData': 'عرض البيانات',
    'importantNote': 'ملاحظة هامة',
    'monitoringDisclaimer': 'هذا النظام مخصص للمراقبة فقط ولا يغني عن زيارة الطبيب المختص في الحالات الطارئة.',
    
    // Dashboard
    'monitorVitalSigns': 'مراقبة العلامات الحيوية في الوقت الحقيقي',
    'refreshData': 'تحديث البيانات',
    'heartRate': 'نبضات القلب',
    'temperature': 'درجة الحرارة',
    'oxygenLevel': 'مستوى الأكسجين',
    'heartRateMonitor': 'مراقب نبضات القلب',
    'aiDiagnosis': 'التشخيص الذكي',
    'quickTips': 'نصائح سريعة',
    'stayHydrated': 'حافظ على ترطيب جسمك للحفاظ على معدل ضربات القلب ودرجة حرارة الجسم المثالية',
    'deepBreathing': 'التنفس العميق المنتظم يمكن أن يساعد في تحسين مستويات الأكسجين',
    'consultHealthcare': 'إذا لاحظت قراءات غير طبيعية باستمرار، استشر أخصائي رعاية صحية',
    'checkReports': 'تحقق من صفحة التقارير للحصول على تحليل مفصل لمؤشرات صحتك',
    'allRightsReserved': 'جميع الحقوق محفوظة',
    'emergencyContact': 'اتصال الطوارئ',
    'emergencyMessage': 'في حالة الطوارئ، اتصل فوراً بالرقم التالي',
    'callEmergency': 'اتصل بالطوارئ',
    
    // Disease Prediction
    'smartDiagnosis': 'التشخيص الذكي',
    'analyzeHealthConditions': 'تحليل وتوقع الحالات الصحية بناءً على المؤشرات الحيوية',
    'clickToAnalyze': 'اضغط على الزر أدناه لتحليل المؤشرات الحيوية والتنبؤ بالحالات الصحية المحتملة',
    'diagnosisDisclaimer': '*ملاحظة: هذا التحليل تقريبي وليس بديلا�� عن التشخيص الطبي المتخصص',
    'matchPercentage': 'نسبة التطابق:',
    'possibleSymptoms': 'الأعراض المحتملة:',
    'medicalAdvice': 'النصيحة الطبية:',
    'newAnalysis': 'تحليل جديد',
    'analyzeVitals': 'تحليل المؤشرات الحيوية',
    'analyzing': 'جاري التحليل...',
    
    // Status
    'normal': 'طبيعي',
    'warning': 'تحذير',
    'critical': 'حرج',
    'withinNormalRange': 'ضمن المعدل الطبيعي',
    'outsideNormalRange': 'خارج المعدل الطبيعي',
    'requiresAttention': 'يتطلب اهتمام',
    
    // Contact
    'contactTitle': 'اتصل بنا',
    'contactSubtitle': 'نحن هنا للإجابة على استفساراتك ومساعدتك في أي وقت',
    'contactInfo': 'معلومات الاتصال',
    'contactMethods': 'يمكنك التواصل معنا من خلال وسائل الاتصال التالية',
    'workingHours': 'ساعات العمل',
    'availableTimes': 'نحن متاحون للمساعدة خلال هذه الأوقات',
    'sendMessage': 'أرسل لنا رسالة',
    'messageInstructions': 'يمكنك إرسال استفسارك وسنقوم بالرد عليك في أقرب وقت ممكن',
    'name': 'الاسم',
    'email': 'البريد الإلكتروني',
    'message': 'الرسالة',
    'send': 'إرسال',
    'sending': 'جاري الإرسال...',
    'messageSent': 'تم إرسال الرسالة بنجاح',
    'messageResponse': 'سنقوم بالرد عليك في أقرب وقت ممكن',
    
    // Login/Register
    'loginTitle': 'تسجيل الدخول',
    'loginSubtitle': 'أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة التحكم',
    'emailAddress': 'البريد الإلكتروني',
    'password': 'كلمة المرور',
    'confirmPassword': 'تأكيد كلمة المرور',
    'loggingIn': 'جاري تسجيل الدخول...',
    'noAccount': 'ليس لديك حساب؟',
    'registerTitle': 'إنشاء حساب',
    'registerSubtitle': 'أدخل معلوماتك لإنشاء حساب',
    'fullName': 'الاسم الكامل',
    'creatingAccount': 'جاري إنشاء الحساب...',
    'haveAccount': 'لديك حساب بالفعل؟',
    'passwordsDontMatch': 'كلمات المرور غير متطابقة',
    'registrationSuccess': 'تم إنشاء الحساب بنجاح!',
    'registrationFailed': 'فشل في إنشاء الحساب',
    'fillAllFields': 'يرجى ملء جميع الحقول',
  },
  
  en: {
    // Header
    'dashboard': 'Dashboard',
    'reports': 'Reports',
    'comparison': 'Comparison',
    'patientProfile': 'Patient Profile',
    'login': 'Login',
    'register': 'Register',
    'logout': 'Logout',
    'user': 'User',
    
    // Index page
    'healthMonitoringSystem': 'Health Monitoring System',
    'remoteBiomarkers': 'Remote biomarker monitoring with advanced technology for smart healthcare',
    'createNewAccount': 'Create New Account',
    'contactUs': 'Contact Us',
    'heartRateMonitoring': 'Heart Rate Monitoring',
    'realtimeHeartRate': 'Real-time heart rate monitoring',
    'advancedAnalysis': 'Advanced heart rhythm analysis with instant alerts for any abnormalities.',
    'temperatureMeasurement': 'Temperature Measurement',
    'accurateTemperature': 'High precision body temperature monitoring',
    'preciseReadings': 'Precise body temperature measurements with alerts when above normal range.',
    'bloodOxygenLevel': 'Blood Oxygen Level',
    'oxygenSaturation': 'Blood oxygen saturation monitoring',
    'oxygenTracking': 'Track blood oxygen levels with detailed analytics and alerts when low.',
    'viewData': 'View Data',
    'importantNote': 'Important Note',
    'monitoringDisclaimer': 'This system is for monitoring only and does not replace visiting a specialist doctor in emergency cases.',
    
    // Dashboard
    'monitorVitalSigns': 'Monitor your vital signs in real-time',
    'refreshData': 'Refresh Data',
    'heartRate': 'Heart Rate',
    'temperature': 'Temperature',
    'oxygenLevel': 'Oxygen Level',
    'heartRateMonitor': 'Heart Rate Monitor',
    'aiDiagnosis': 'AI Diagnosis',
    'quickTips': 'Quick Tips',
    'stayHydrated': 'Stay hydrated to maintain optimal heart rate and body temperature',
    'deepBreathing': 'Regular deep breathing can help improve oxygen levels',
    'consultHealthcare': 'If you notice consistently abnormal readings, consult a healthcare professional',
    'checkReports': 'Check the Reports page for detailed analysis of your health metrics',
    'allRightsReserved': 'All rights reserved',
    'emergencyContact': 'Emergency Contact',
    'emergencyMessage': 'In case of emergency, call immediately',
    'callEmergency': 'Call Emergency',
    
    // Disease Prediction
    'smartDiagnosis': 'Smart Diagnosis',
    'analyzeHealthConditions': 'Analyze and predict health conditions based on vital signs',
    'clickToAnalyze': 'Click the button below to analyze vital signs and predict potential health conditions',
    'diagnosisDisclaimer': '*Note: This analysis is approximate and not a substitute for specialized medical diagnosis',
    'matchPercentage': 'Match Percentage:',
    'possibleSymptoms': 'Possible Symptoms:',
    'medicalAdvice': 'Medical Advice:',
    'newAnalysis': 'New Analysis',
    'analyzeVitals': 'Analyze Vital Signs',
    'analyzing': 'Analyzing...',
    
    // Status
    'normal': 'Normal',
    'warning': 'Warning',
    'critical': 'Critical',
    'withinNormalRange': 'Within normal range',
    'outsideNormalRange': 'Outside normal range',
    'requiresAttention': 'Requires attention',
    
    // Contact
    'contactTitle': 'Contact Us',
    'contactSubtitle': 'We are here to answer your inquiries and assist you anytime',
    'contactInfo': 'Contact Information',
    'contactMethods': 'You can contact us through the following methods',
    'workingHours': 'Working Hours',
    'availableTimes': 'We are available to help during these times',
    'sendMessage': 'Send Us a Message',
    'messageInstructions': 'You can send your inquiry and we will respond as soon as possible',
    'name': 'Name',
    'email': 'Email',
    'message': 'Message',
    'send': 'Send',
    'sending': 'Sending...',
    'messageSent': 'Message sent successfully',
    'messageResponse': 'We will respond to you as soon as possible',
    
    // Login/Register
    'loginTitle': 'Login',
    'loginSubtitle': 'Enter your credentials to access the dashboard',
    'emailAddress': 'Email Address',
    'password': 'Password',
    'confirmPassword': 'Confirm Password',
    'loggingIn': 'Logging in...',
    'noAccount': 'Don\'t have an account?',
    'registerTitle': 'Register',
    'registerSubtitle': 'Enter your information to create an account',
    'fullName': 'Full Name',
    'creatingAccount': 'Creating account...',
    'haveAccount': 'Already have an account?',
    'passwordsDontMatch': 'Passwords don\'t match',
    'registrationSuccess': 'Registration successful',
    'registrationFailed': 'Registration failed',
    'fillAllFields': 'Please fill out all fields',
  }
};

// Create a provider component
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Get initial language from localStorage or default to 'ar'
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage === 'en' ? 'en' : 'ar';
  });

  // Update language function
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    // Set dir attribute on document based on language
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Set initial direction
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  // Translation function
  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Create a hook for using the language context
export const useLanguage = () => useContext(LanguageContext);
