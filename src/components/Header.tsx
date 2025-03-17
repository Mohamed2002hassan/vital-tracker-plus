
import { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';
import { Button } from '@/components/ui/button';
import { Activity, FileText, BarChart2, LogOut, ClipboardList } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const location = useLocation();
  const { t, language } = useLanguage();
  
  const isActiveRoute = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="bg-white border-b border-gray-200 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Activity className={`h-8 w-8 text-medical-blue ${language === 'ar' ? 'ml-2' : 'mr-2'}`} />
              <span className="text-xl font-bold text-medical-dark">VitalTrack</span>
            </Link>
          </div>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <nav className={`hidden md:flex ${language === 'ar' ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                <Link 
                  to="/dashboard" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveRoute('/dashboard') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                    <Activity className="h-4 w-4" />
                    <span>{t('dashboard')}</span>
                  </div>
                </Link>
                
                <Link 
                  to="/reports" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveRoute('/reports') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                    <FileText className="h-4 w-4" />
                    <span>{t('reports')}</span>
                  </div>
                </Link>
                
                <Link 
                  to="/comparison" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveRoute('/comparison') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                    <BarChart2 className="h-4 w-4" />
                    <span>{t('comparison')}</span>
                  </div>
                </Link>

                <Link 
                  to="/patient-profile" 
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActiveRoute('/patient-profile') 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-1' : 'space-x-1'}`}>
                    <ClipboardList className="h-4 w-4" />
                    <span>{t('patientProfile')}</span>
                  </div>
                </Link>
              </nav>
              
              <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
                <LanguageSwitcher />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={logout}
                  className="text-gray-700 hover:text-gray-900"
                >
                  <LogOut className={`h-4 w-4 ${language === 'ar' ? 'ml-1' : 'mr-1'}`} />
                  <span className="hidden sm:inline">{t('logout')}</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className={`flex items-center ${language === 'ar' ? 'space-x-reverse space-x-2' : 'space-x-2'}`}>
              <LanguageSwitcher />
              <Link to="/login">
                <Button variant="ghost" size="sm">{t('login')}</Button>
              </Link>
              <Link to="/register">
                <Button size="sm">{t('register')}</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isAuthenticated && (
        <div className="md:hidden border-t border-gray-200">
          <div className="flex justify-between px-2 py-3">
            <Link 
              to="/dashboard" 
              className={`flex-1 text-center py-2 ${
                isActiveRoute('/dashboard') 
                  ? 'text-primary font-medium' 
                  : 'text-gray-600'
              }`}
            >
              <Activity className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs">{t('dashboard')}</span>
            </Link>
            
            <Link 
              to="/reports" 
              className={`flex-1 text-center py-2 ${
                isActiveRoute('/reports') 
                  ? 'text-primary font-medium' 
                  : 'text-gray-600'
              }`}
            >
              <FileText className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs">{t('reports')}</span>
            </Link>
            
            <Link 
              to="/comparison" 
              className={`flex-1 text-center py-2 ${
                isActiveRoute('/comparison') 
                  ? 'text-primary font-medium' 
                  : 'text-gray-600'
              }`}
            >
              <BarChart2 className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs">{t('comparison')}</span>
            </Link>
            
            <Link 
              to="/patient-profile" 
              className={`flex-1 text-center py-2 ${
                isActiveRoute('/patient-profile') 
                  ? 'text-primary font-medium' 
                  : 'text-gray-600'
              }`}
            >
              <ClipboardList className="h-5 w-5 mx-auto mb-1" />
              <span className="text-xs">{t('patientProfile')}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
