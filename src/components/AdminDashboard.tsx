import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  ArrowLeft, 
  Settings,
  BarChart3,
  CheckCircle,
  Clock,
  AlertTriangle,
  Building2,
  Wrench,
  Zap,
  Trash2
} from 'lucide-react';
import { useCivic, Issue, IssueStatus, Department } from '@/contexts/CivicContext';

interface AdminDashboardProps {
  onBack: () => void;
}

export function AdminDashboard({ onBack }: AdminDashboardProps) {
  const { issues, updateIssueStatus, deleteIssue } = useCivic();
  const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

  const handleDeleteIssue = (issueId: string) => {
    if (confirm('Are you sure you want to delete this issue? This action cannot be undone.')) {
      deleteIssue(issueId);
    }
  };

  const handleStatusUpdate = (issueId: string, status: IssueStatus, department?: Department) => {
    updateIssueStatus(issueId, status, department);
  };

  const getStatusStats = () => {
    const stats = {
      pending: issues.filter(i => i.status === 'pending').length,
      acknowledged: issues.filter(i => i.status === 'acknowledged').length,
      resolved: issues.filter(i => i.status === 'resolved').length,
    };
    return stats;
  };

  const getDepartmentIcon = (dept?: Department) => {
    switch (dept) {
      case 'sanitation': return <Building2 className="w-4 h-4" />;
      case 'public-works': return <Wrench className="w-4 h-4" />;
      case 'electrical': return <Zap className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const stats = getStatusStats();

  return (
    <div className="min-h-screen bg-gradient-hero py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-semibold text-primary">Municipal Admin Dashboard</h1>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Issues</p>
                  <p className="text-2xl font-bold text-foreground">{issues.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-pending">{stats.pending}</p>
                </div>
                <div className="w-12 h-12 bg-pending/10 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-pending" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-acknowledged">{stats.acknowledged}</p>
                </div>
                <div className="w-12 h-12 bg-acknowledged/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-acknowledged" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                  <p className="text-2xl font-bold text-resolved">{stats.resolved}</p>
                </div>
                <div className="w-12 h-12 bg-resolved/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-resolved" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="list" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="list">Issue List</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Issue Management</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {issues.length === 0 ? (
                  <div className="text-center py-8">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No issues reported yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {issues.map((issue) => (
                      <div key={issue.id} className="border border-border rounded-lg p-4 hover:bg-muted/30 transition-colors">
                        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-4 lg:space-y-0">
                          {/* Issue Photo */}
                          {issue.photo && (
                            <div className="lg:w-20 lg:h-20 w-full h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                              <img
                                src={issue.photo}
                                alt="Issue"
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}

                          {/* Issue Details */}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-foreground">
                                  Issue #{issue.id}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {issue.description}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <div className="flex items-center space-x-1">
                                <MapPin className="w-4 h-4" />
                                <span>{issue.location.address}</span>
                              </div>
                              <span>•</span>
                              <span>Reported {issue.createdAt.toLocaleDateString()}</span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex flex-col space-y-2 lg:w-64">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">Status:</span>
                              <Badge className={`
                                ${issue.status === 'pending' ? 'status-pending' : ''}
                                ${issue.status === 'acknowledged' ? 'status-acknowledged' : ''}
                                ${issue.status === 'resolved' ? 'status-resolved' : ''}
                              `}>
                                {issue.status === 'pending' ? 'Under Review' : 
                                 issue.status === 'acknowledged' ? 'In Progress' : 'Resolved'}
                              </Badge>
                            </div>

                            <Select
                              value={issue.department || ''}
                              onValueChange={(value) => 
                                handleStatusUpdate(issue.id, issue.status, value as Department)
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Assign Department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sanitation">
                                  <div className="flex items-center space-x-2">
                                    <Building2 className="w-4 h-4" />
                                    <span>Sanitation</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="public-works">
                                  <div className="flex items-center space-x-2">
                                    <Wrench className="w-4 h-4" />
                                    <span>Public Works</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="electrical">
                                  <div className="flex items-center space-x-2">
                                    <Zap className="w-4 h-4" />
                                    <span>Electrical</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>

                            <Select
                              value={issue.status}
                              onValueChange={(value) => 
                                handleStatusUpdate(issue.id, value as IssueStatus, issue.department)
                              }
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Under Review</SelectItem>
                                <SelectItem value="acknowledged">In Progress</SelectItem>
                                <SelectItem value="resolved">Resolved</SelectItem>
                              </SelectContent>
                            </Select>

                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteIssue(issue.id)}
                              className="w-full"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete Issue
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map" className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5" />
                  <span>Interactive Map View</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/30 border-2 border-dashed border-muted-foreground/25 rounded-lg h-96 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <MapPin className="w-16 h-16 text-muted-foreground mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Interactive Map</h3>
                      <p className="text-muted-foreground max-w-md">
                        This area would display an interactive Google Maps embed showing all reported issues as markers. 
                        Each marker would be color-coded by status and clickable for details.
                      </p>
                    </div>
                    {issues.length > 0 && (
                      <div className="bg-card rounded-lg p-4 max-w-sm mx-auto">
                        <p className="text-sm font-medium mb-2">Issues on Map:</p>
                        <div className="space-y-1 text-sm">
                          {issues.slice(0, 3).map(issue => (
                            <div key={issue.id} className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${
                                issue.status === 'pending' ? 'bg-pending' :
                                issue.status === 'acknowledged' ? 'bg-acknowledged' : 'bg-resolved'
                              }`} />
                              <span className="truncate">{issue.location.address}</span>
                            </div>
                          ))}
                          {issues.length > 3 && (
                            <p className="text-muted-foreground">+{issues.length - 3} more issues</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Issue Analytics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Status Distribution */}
                  <div>
                    <h3 className="font-semibold mb-4">Issues by Status</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-pending rounded-full" />
                          <span>Pending Review</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{stats.pending}</span>
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-pending transition-all duration-300"
                              style={{ width: `${issues.length > 0 ? (stats.pending / issues.length) * 100 : 0}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-acknowledged rounded-full" />
                          <span>In Progress</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{stats.acknowledged}</span>
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-acknowledged transition-all duration-300"
                              style={{ width: `${issues.length > 0 ? (stats.acknowledged / issues.length) * 100 : 0}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 bg-resolved rounded-full" />
                          <span>Resolved</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{stats.resolved}</span>
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-resolved transition-all duration-300"
                              style={{ width: `${issues.length > 0 ? (stats.resolved / issues.length) * 100 : 0}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Department Distribution */}
                  <div>
                    <h3 className="font-semibold mb-4">Issues by Department</h3>
                    <div className="space-y-3">
                      {(['sanitation', 'public-works', 'electrical'] as Department[]).map(dept => {
                        const count = issues.filter(i => i.department === dept).length;
                        return (
                          <div key={dept} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {getDepartmentIcon(dept)}
                              <span className="capitalize">{dept.replace('-', ' ')}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{count}</span>
                              <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-primary transition-all duration-300"
                                  style={{ width: `${issues.length > 0 ? (count / issues.length) * 100 : 0}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Resolution Rate */}
                <div className="mt-8 p-4 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {issues.length > 0 ? Math.round((stats.resolved / issues.length) * 100) : 0}%
                    </div>
                    <div className="text-muted-foreground">Resolution Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}