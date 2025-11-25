import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Calendar, Camera, AlertCircle } from 'lucide-react';
import { useCivic, Issue, IssueStatus } from '@/contexts/CivicContext';

interface UserDashboardProps {
  onBack: () => void;
  onReportNew: () => void;
}

export function UserDashboard({ onBack, onReportNew }: UserDashboardProps) {
  const { getUserIssues } = useCivic();
  const userIssues = getUserIssues();

  const getStatusColor = (status: IssueStatus) => {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'acknowledged':
        return 'status-acknowledged';
      case 'resolved':
        return 'status-resolved';
      default:
        return 'bg-secondary';
    }
  };

  const getStatusLabel = (status: IssueStatus) => {
    switch (status) {
      case 'pending':
        return 'Under Review';
      case 'acknowledged':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>

          <Button
            onClick={onReportNew}
            className="bg-gradient-civic hover:opacity-90"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Report New Issue
          </Button>
        </div>

        <Card className="shadow-lg mb-6">
          <CardHeader>
            <CardTitle className="text-2xl text-primary flex items-center space-x-2">
              <MapPin className="w-6 h-6" />
              <span>My Reported Issues</span>
            </CardTitle>
            <p className="text-muted-foreground">
              Track the status of your community issue reports
            </p>
          </CardHeader>
        </Card>

        {userIssues.length === 0 ? (
          <Card className="shadow-lg">
            <CardContent className="py-12 text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">No Issues Reported Yet</h3>
              <p className="text-muted-foreground mb-6">
                Start by reporting your first community issue to help improve your neighborhood.
              </p>
              <Button onClick={onReportNew} className="bg-gradient-civic hover:opacity-90">
                Report Your First Issue
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {userIssues.map((issue) => (
              <Card key={issue.id} className="shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
                    {/* Issue Photo */}
                    {issue.photo && (
                      <div className="lg:w-32 lg:h-32 w-full h-48 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                        <img
                          src={issue.photo}
                          alt="Issue"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Issue Details */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground mb-1">
                            Issue #{issue.id}
                          </h3>
                          <p className="text-muted-foreground">
                            {issue.description}
                          </p>
                        </div>
                        <Badge className={getStatusColor(issue.status)}>
                          {getStatusLabel(issue.status)}
                        </Badge>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{issue.location.address}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Reported {issue.createdAt.toLocaleDateString()}</span>
                        </div>
                      </div>

                      {issue.department && (
                        <div className="text-sm">
                          <span className="text-muted-foreground">Assigned to: </span>
                          <span className="font-medium text-primary capitalize">
                            {issue.department.replace('-', ' ')} Department
                          </span>
                        </div>
                      )}

                      {/* Progress Timeline */}
                      <div className="flex items-center space-x-2 pt-2">
                        <div className={`w-3 h-3 rounded-full ${
                          ['pending', 'acknowledged', 'resolved'].includes(issue.status) 
                            ? 'bg-primary' 
                            : 'bg-muted'
                        }`} />
                        <div className={`flex-1 h-1 ${
                          ['acknowledged', 'resolved'].includes(issue.status)
                            ? 'bg-primary'
                            : 'bg-muted'
                        }`} />
                        <div className={`w-3 h-3 rounded-full ${
                          ['acknowledged', 'resolved'].includes(issue.status)
                            ? 'bg-primary'
                            : 'bg-muted'
                        }`} />
                        <div className={`flex-1 h-1 ${
                          issue.status === 'resolved'
                            ? 'bg-accent'
                            : 'bg-muted'
                        }`} />
                        <div className={`w-3 h-3 rounded-full ${
                          issue.status === 'resolved'
                            ? 'bg-accent'
                            : 'bg-muted'
                        }`} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}