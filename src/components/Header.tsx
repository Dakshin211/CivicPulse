import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Menu, 
  X, 
  Globe, 
  Phone, 
  Mail,
  MapPin,
  Clock
} from 'lucide-react';

interface HeaderProps {
  userType: 'citizen' | 'admin';
  onUserTypeChange: (type: 'citizen' | 'admin') => void;
}

export function Header({ userType, onUserTypeChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-card/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-civic rounded-xl flex items-center justify-center animate-glow">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">CivicPulse</h1>
              <p className="text-xs text-muted-foreground">Community Issue Tracker</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>24/7 Reporting</span>
            </div>
            
            {/* User Type Toggle */}
            <div className="flex items-center space-x-2">
              <Button
                variant={userType === 'citizen' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onUserTypeChange('citizen')}
                className="relative"
              >
                Citizen Portal
              </Button>
              <Button
                variant={userType === 'admin' ? 'default' : 'outline'}
                size="sm"
                onClick={() => onUserTypeChange('admin')}
                className="relative"
              >
                <Shield className="w-4 h-4 mr-1" />
                Admin
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-slide-up">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>24/7 Reporting Available</span>
              </div>
              <div className="flex flex-col space-y-2 pt-2">
                <Button
                  variant={userType === 'citizen' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    onUserTypeChange('citizen');
                    setIsMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  Citizen Portal
                </Button>
                <Button
                  variant={userType === 'admin' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    onUserTypeChange('admin');
                    setIsMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  <Shield className="w-4 h-4 mr-1" />
                  Admin Dashboard
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}