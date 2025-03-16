
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import { Activity, Heart, FileText, BarChart2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const Index = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 animate-slide-down">
                <div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                    Monitor Your Vital Signs with Precision
                  </h1>
                  <p className="mt-6 text-xl text-gray-600">
                    Track, analyze, and understand your health metrics with our advanced medical monitoring system.
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-4">
                  {isAuthenticated ? (
                    <Link to="/dashboard">
                      <Button size="lg" className="group">
                        Go to Dashboard
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  ) : (
                    <>
                      <Link to="/register">
                        <Button size="lg" className="group">
                          Get Started
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Button>
                      </Link>
                      <Link to="/login">
                        <Button variant="outline" size="lg">
                          Log in
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
              
              <div className="relative animate-slide-up">
                <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 glass-card">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4 flex flex-col justify-center items-center">
                      <Heart className="h-8 w-8 text-medical-red mb-2 animate-heart-beat" />
                      <span className="text-sm text-gray-500">Heart Rate</span>
                      <span className="text-2xl font-bold text-medical-red">72 BPM</span>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 flex flex-col justify-center items-center">
                      <Activity className="h-8 w-8 text-medical-purple mb-2" />
                      <span className="text-sm text-gray-500">Activity</span>
                      <span className="text-2xl font-bold text-medical-purple">Normal</span>
                    </div>
                    <div className="bg-red-50 rounded-xl p-4 flex flex-col justify-center items-center">
                      <FileText className="h-8 w-8 text-medical-blue mb-2" />
                      <span className="text-sm text-gray-500">Reports</span>
                      <span className="text-2xl font-bold text-medical-blue">7 Days</span>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 flex flex-col justify-center items-center">
                      <BarChart2 className="h-8 w-8 text-medical-green mb-2" />
                      <span className="text-sm text-gray-500">Analytics</span>
                      <span className="text-2xl font-bold text-medical-green">Detailed</span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -z-10 -bottom-4 -right-4 h-full w-full bg-gradient-to-br from-medical-blue to-medical-purple rounded-2xl opacity-20 blur-xl"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">Key Features</h2>
              <p className="mt-4 text-xl text-gray-600">
                Comprehensive health monitoring at your fingertips
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-transform duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <Activity className="h-6 w-6 text-medical-blue" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-Time Monitoring</h3>
                <p className="text-gray-600">
                  Track your heart rate, temperature, and oxygen levels in real-time with accurate readings.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-transform duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-medical-red" />
                </div>
                <h3 className="text-xl font-bold mb-2">Detailed Reports</h3>
                <p className="text-gray-600">
                  Generate comprehensive reports with insights and recommendations based on your health data.
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 transition-transform duration-300 hover:scale-105">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-medical-purple" />
                </div>
                <h3 className="text-xl font-bold mb-2">Historical Comparison</h3>
                <p className="text-gray-600">
                  Compare your current health metrics with historical data to track progress and identify trends.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-medical-blue to-medical-purple text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Monitor Your Health?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Sign up today and start tracking your vital signs for better health management.
            </p>
            {!isAuthenticated && (
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/register">
                  <Button variant="secondary" size="lg">
                    Create Account
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="outline" size="lg" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
                    Log in
                  </Button>
                </Link>
              </div>
            )}
            {isAuthenticated && (
              <Link to="/dashboard">
                <Button variant="secondary" size="lg">
                  Go to Dashboard
                </Button>
              </Link>
            )}
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <Activity className="h-8 w-8 text-medical-blue mr-2" />
              <span className="text-xl font-bold">VitalTrack</span>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} VitalTrack. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
