import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, MapPin, Camera, Clock, CheckCircle, Zap, Award } from 'lucide-react';
import civicHeroImage from '@/assets/civic-hero.jpg';
import civicDashboardImage from '@/assets/civic-dashboard.jpg';
import solvedPotholeImage from '@/assets/solved-pothole.jpg';
import solvedStreetlightImage from '@/assets/solved-streetlight.jpg';
import solvedTrashImage from '@/assets/solved-trash.jpg';

interface LandingPageProps {
  onReportIssue: () => void;
}

export function LandingPage({ onReportIssue }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-hero">
      {/* 3D Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-animated animate-gradient opacity-20" />
        <div className="container mx-auto px-4 py-20 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8 animate-slide-up">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium animate-bounce-in">
                  <Zap className="w-4 h-4 mr-2" />
                  Smart City Technology
                </div>
                <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                  Report<br />
                  <span className="text-transparent bg-clip-text bg-gradient-civic">
                    Community
                  </span><br />
                  Issues
                </h1>
                <p className="text-xl text-muted-foreground max-w-xl">
                  Empower your community with real-time issue reporting. From potholes to broken streetlights, 
                  your reports drive faster municipal response and create lasting change.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  onClick={onReportIssue}
                  className="px-8 py-4 text-lg font-semibold bg-gradient-civic hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                >
                  <AlertCircle className="w-6 h-6 mr-2" />
                  Report an Issue
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => {
                    const resolvedSection = document.getElementById('success-stories');
                    resolvedSection?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 text-lg glass-effect"
                >
                  <Award className="w-6 h-6 mr-2" />
                  View Success Stories
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center animate-fade-in">
                  <div className="text-3xl font-bold text-primary">1,247</div>
                  <div className="text-sm text-muted-foreground">Issues Reported</div>
                </div>
                <div className="text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <div className="text-3xl font-bold text-accent">923</div>
                  <div className="text-sm text-muted-foreground">Issues Resolved</div>
                </div>
                <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <div className="text-3xl font-bold text-warning">2.3</div>
                  <div className="text-sm text-muted-foreground">Avg Response (days)</div>
                </div>
              </div>
            </div>

            {/* Right Content - 3D Image */}
            <div className="relative perspective-1000">
              <div className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-3d transform-3d animate-float">
                <img 
                  src={civicDashboardImage} 
                  alt="CivicPulse Smart Dashboard" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                
                {/* Floating Elements */}
                <div className="absolute top-6 right-6 bg-card/80 backdrop-blur-md rounded-xl p-3 animate-bounce-in" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-resolved rounded-full animate-pulse" />
                    <span className="text-sm font-medium">Live Updates</span>
                  </div>
                </div>
                
                <div className="absolute bottom-6 left-6 bg-card/80 backdrop-blur-md rounded-xl p-3 animate-bounce-in" style={{ animationDelay: '0.7s' }}>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-resolved" />
                    <span className="text-sm font-medium">74% Success Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple, fast, and effective civic engagement in three easy steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center hover:shadow-3d transition-all duration-500 animate-fade-in glass-effect group">
            <CardContent className="pt-8 pb-8">
              <div className="w-20 h-20 bg-gradient-civic rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce-in">
                <Camera className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Capture & Report</h3>
              <p className="text-muted-foreground">
                Take a photo of the issue and add a description. Our smart system automatically detects your location.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-3d transition-all duration-500 animate-fade-in glass-effect group" style={{ animationDelay: '0.1s' }}>
            <CardContent className="pt-8 pb-8">
              <div className="w-20 h-20 bg-gradient-civic rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce-in">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Smart Routing</h3>
              <p className="text-muted-foreground">
                AI-powered system routes your report to the right department for fastest possible response.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-3d transition-all duration-500 animate-fade-in glass-effect group" style={{ animationDelay: '0.2s' }}>
            <CardContent className="pt-8 pb-8">
              <div className="w-20 h-20 bg-gradient-civic rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce-in">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Track Progress</h3>
              <p className="text-muted-foreground">
                Receive real-time updates as your issue moves from reported to acknowledged to resolved.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Success Stories Section */}
      <div className="bg-card/30 py-20" id="success-stories">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Success Stories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See the real impact of community reporting in action
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="overflow-hidden hover:shadow-3d transition-all duration-500 animate-scale-in group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={solvedPotholeImage} 
                  alt="Before and after pothole repair" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-resolved text-resolved-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Resolved
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Pothole Repair</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Major pothole on Main Street causing traffic issues was reported and fixed within 48 hours.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reported: July 15</span>
                  <span className="text-resolved font-medium">Resolved: July 17</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-3d transition-all duration-500 animate-scale-in group" style={{ animationDelay: '0.1s' }}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={solvedStreetlightImage} 
                  alt="Before and after streetlight repair" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-resolved text-resolved-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Resolved
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Streetlight Fixed</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Dark intersection made safe again with rapid streetlight replacement and improved visibility.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reported: Aug 05</span>
                  <span className="text-resolved font-medium">Resolved: Aug 06</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-3d transition-all duration-500 animate-scale-in group" style={{ animationDelay: '0.2s' }}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={solvedTrashImage} 
                  alt="Before and after trash cleanup" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-resolved text-resolved-foreground px-3 py-1 rounded-full text-sm font-medium">
                  Resolved
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">Waste Management</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Overflowing bins replaced with larger capacity system, improving neighborhood cleanliness.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reported: Aug 12</span>
                  <span className="text-resolved font-medium">Resolved: Aug 14</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-3d transition-all duration-500 animate-scale-in group" style={{ animationDelay: '0.3s' }}>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Drainage Issue Resolved</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Blocked or damaged drainage cleared within 2 days of reporting, preventing waterlogging and improving public safety
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reported: Aug 21</span>
                  <span className="text-resolved font-medium">Resolved: Aug 24</span>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-3d transition-all duration-500 animate-scale-in group" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold mb-2">Park Maintenance</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Damaged park bench replaced with new weather-resistant seating for community use.
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Reported: Aug 29</span>
                  <span className="text-resolved font-medium">Resolved: Aug 30</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="bg-gradient-civic rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-animated animate-gradient opacity-30" />
            <div className="relative">
              <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of citizens already improving their communities through CivicPulse
              </p>
              <Button 
                size="lg" 
                onClick={onReportIssue}
                className="px-12 py-4 text-lg font-semibold bg-white text-primary hover:bg-white/90 transition-all duration-300 transform hover:scale-105"
              >
                <AlertCircle className="w-6 h-6 mr-2" />
                Start Reporting Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
