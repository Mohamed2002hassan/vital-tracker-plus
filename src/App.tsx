
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

// Auth Context
interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string } | null;
  login: (email: string, password: string) => void;
  register: (name: string, email: string, password: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: () => {},
  register: () => {},
  logout: () => {},
});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  
  const login = (email: string, password: string) => {
    // In a real app, this would validate credentials with a backend
    setIsAuthenticated(true);
    setUser({ name: "Test User", email });
  };
  
  const register = (name: string, email: string, password: string) => {
    // In a real app, this would create a new user in the backend
    setIsAuthenticated(true);
    setUser({ name, email });
  };
  
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };
  
  return (
    <LanguageProvider>
      <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout }}>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
            <Route path="/comparison" element={isAuthenticated ? <Comparison /> : <Navigate to="/login" />} />
            <Route path="/patient-profile" element={<PatientProfile />} />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthContext.Provider>
    </LanguageProvider>
  );
}

export default App;
