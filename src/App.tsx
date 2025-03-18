
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { Toaster } from './components/ui/toaster';
import Index from './pages/Index';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Comparison from './pages/Comparison';
import PatientProfile from './pages/PatientProfile';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import { LanguageProvider } from './contexts/LanguageContext';

// تعريف نموذج المستخدم الموسع
export interface UserProfile {
  name: string;
  email: string;
  age?: number;
  gender?: string;
  bloodType?: string;
  dateOfBirth?: string;
  address?: string;
  phone?: string;
  emergencyContact?: string;
  chronicConditions?: string[];
  allergies?: string[];
  patientId?: string;
}

// تحديث واجهة AuthContext
interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (email: string, password: string) => void;
  register: (userData: UserProfile, password: string) => void;
  logout: () => void;
  updateUserProfile: (userData: Partial<UserProfile>) => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
  updateUserProfile: () => {},
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  
  const login = (email: string, password: string) => {
    // في تطبيق حقيقي، سيتحقق هذا من بيانات الاعتماد مع الخادم الخلفي
    const savedUser = localStorage.getItem(`user_${email}`);
    if (savedUser) {
      const userProfile = JSON.parse(savedUser);
      setUser(userProfile);
      setIsAuthenticated(true);
    } else {
      // إذا لم يكن المستخدم موجودًا، سنقوم بإنشاء ملف تعريف أساسي
      const basicProfile: UserProfile = { 
        name: email.split('@')[0], 
        email 
      };
      setUser(basicProfile);
      setIsAuthenticated(true);
      // حفظ الملف الشخصي الأساسي
      localStorage.setItem(`user_${email}`, JSON.stringify(basicProfile));
    }
  };
  
  const register = (userData: UserProfile, password: string) => {
    // إنشاء معرف المريض
    const patientId = `P${Math.floor(10000 + Math.random() * 90000)}`;
    const userProfile = { ...userData, patientId };
    
    // حفظ بيانات المستخدم في التخزين المحلي
    localStorage.setItem(`user_${userData.email}`, JSON.stringify(userProfile));
    
    setUser(userProfile);
    setIsAuthenticated(true);
  };
  
  const updateUserProfile = (userData: Partial<UserProfile>) => {
    if (user) {
      const updatedProfile = { ...user, ...userData };
      setUser(updatedProfile);
      
      // تحديث البيانات في التخزين المحلي
      localStorage.setItem(`user_${user.email}`, JSON.stringify(updatedProfile));
    }
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  
  return (
    <LanguageProvider>
      <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, updateUserProfile }}>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* المسارات المحمية */}
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
            <Route path="/comparison" element={isAuthenticated ? <Comparison /> : <Navigate to="/login" />} />
            <Route path="/patient-profile" element={isAuthenticated ? <PatientProfile /> : <Navigate to="/login" />} />
            
            {/* مسار 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthContext.Provider>
    </LanguageProvider>
  );
}

export default App;
