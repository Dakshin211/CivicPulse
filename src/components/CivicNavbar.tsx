import { Button } from '@/components/ui/button';
import { MapPin, Users, Settings } from 'lucide-react';
import { useState } from 'react';

interface CivicNavbarProps {
  currentView: 'citizen' | 'admin';
  onViewChange: (view: 'citizen' | 'admin') => void;
}

export function CivicNavbar({ currentView, onViewChange }: CivicNavbarProps) {
  return (
    <nav className="bg-card border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-civic rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary">CivicReport</h1>
              <p className="text-sm text-muted-foreground">Community Issue Reporting System</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={currentView === 'citizen' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewChange('citizen')}
              className="flex items-center space-x-2"
            >
              <Users className="w-4 h-4" />
              <span>Citizen Portal</span>
            </Button>
            <Button
              variant={currentView === 'admin' ? 'default' : 'outline'}
              size="sm"
              onClick={() => onViewChange('admin')}
              className="flex items-center space-x-2"
            >
              <Settings className="w-4 h-4" />
              <span>Admin Dashboard</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}