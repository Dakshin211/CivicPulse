import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LandingPage } from '@/components/LandingPage';
import { IssueForm } from '@/components/IssueForm';
import { UserDashboard } from '@/components/UserDashboard';
import { AdminDashboard } from '@/components/AdminDashboard';
import { AdminLogin } from '@/components/AdminLogin';

type View = 'landing' | 'report' | 'dashboard' | 'admin-login';
type UserType = 'citizen' | 'admin';

const Index = () => {
  const [currentView, setCurrentView] = useState<View>('landing');
  const [userType, setUserType] = useState<UserType>('citizen');
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  // Load admin login state from localStorage on mount
  useEffect(() => {
    const savedAdminState = localStorage.getItem('civic-admin-logged-in');
    if (savedAdminState === 'true') {
      setIsAdminLoggedIn(true);
    }
  }, []);

  // Save admin login state to localStorage
  useEffect(() => {
    localStorage.setItem('civic-admin-logged-in', isAdminLoggedIn.toString());
  }, [isAdminLoggedIn]);

  const handleReportIssue = () => {
    setCurrentView('report');
  };

  const handleFormSuccess = () => {
    setCurrentView('dashboard');
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
  };

  const handleViewDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleUserTypeChange = (type: UserType) => {
    setUserType(type);
    if (type === 'admin') {
      if (isAdminLoggedIn) {
        setCurrentView('dashboard');
      } else {
        setCurrentView('admin-login');
      }
    } else {
      setCurrentView('landing');
      setIsAdminLoggedIn(false);
    }
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setCurrentView('dashboard');
  };

  const handleAdminLogout = () => {
    setIsAdminLoggedIn(false);
    setUserType('citizen');
    setCurrentView('landing');
    localStorage.removeItem('civic-admin-logged-in');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        userType={userType} 
        onUserTypeChange={handleUserTypeChange}
      />
      
      <main className="flex-1">
        {currentView === 'landing' && userType === 'citizen' && (
          <LandingPage onReportIssue={handleReportIssue} />
        )}
        
        {currentView === 'report' && (
          <IssueForm 
            onBack={handleBackToHome} 
            onSuccess={handleFormSuccess}
          />
        )}
        
        {currentView === 'dashboard' && userType === 'citizen' && (
          <UserDashboard 
            onBack={handleBackToHome}
            onReportNew={handleReportIssue}
          />
        )}
        
        {currentView === 'admin-login' && (
          <AdminLogin 
            onLogin={handleAdminLogin}
            onBack={() => handleUserTypeChange('citizen')}
          />
        )}
        
        {currentView === 'dashboard' && userType === 'admin' && isAdminLoggedIn && (
          <AdminDashboard onBack={handleAdminLogout} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Index;
