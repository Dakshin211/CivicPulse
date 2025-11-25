import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

export type IssueStatus = 'pending' | 'acknowledged' | 'resolved';
export type Department = 'sanitation' | 'public-works' | 'electrical';

export interface Issue {
  id: string;
  description: string;
  photo: string | null;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: IssueStatus;
  department?: Department;
  createdAt: Date;
  updatedAt: Date;
}

interface CivicContextType {
  issues: Issue[];
  submitIssue: (issueData: Omit<Issue, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => void;
  updateIssueStatus: (id: string, status: IssueStatus, department?: Department) => void;
  deleteIssue: (id: string) => void;
  getUserIssues: () => Issue[];
  getResolvedIssues: () => Issue[];
}

const CivicContext = createContext<CivicContextType | undefined>(undefined);

export function CivicProvider({ children }: { children: ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>([]);

  // Load issues from localStorage on mount
  useEffect(() => {
    const savedIssues = localStorage.getItem('civic-issues');
    if (savedIssues) {
      try {
        const parsedIssues = JSON.parse(savedIssues).map((issue: any) => ({
          ...issue,
          createdAt: new Date(issue.createdAt),
          updatedAt: new Date(issue.updatedAt),
        }));
        setIssues(parsedIssues);
      } catch (error) {
        console.error('Failed to load issues from localStorage:', error);
      }
    } else {
      // Add some sample resolved issues for demonstration
      const sampleIssues: Issue[] = [
        {
          id: 'sample-1',
          description: 'Major pothole on Main Street causing traffic safety concerns',
          photo: null,
          location: { lat: 40.7128, lng: -74.0060, address: '123 Main Street, Downtown' },
          status: 'resolved',
          department: 'public-works',
          createdAt: new Date('2024-01-15'),
          updatedAt: new Date('2024-01-17'),
        },
        {
          id: 'sample-2', 
          description: 'Broken streetlight creating dangerous intersection at night',
          photo: null,
          location: { lat: 40.7589, lng: -73.9851, address: '456 Oak Avenue, Midtown' },
          status: 'resolved',
          department: 'electrical',
          createdAt: new Date('2024-01-20'),
          updatedAt: new Date('2024-01-22'),
        },
        {
          id: 'sample-3',
          description: 'Overflowing trash bins attracting pests in residential area',
          photo: null,
          location: { lat: 40.7282, lng: -73.7949, address: '789 Pine Street, Eastside' },
          status: 'resolved',
          department: 'sanitation',
          createdAt: new Date('2024-01-18'),
          updatedAt: new Date('2024-01-21'),
        },
        {
          id: 'sample-4',
          description: 'Graffiti on public building needs cleanup',
          photo: null,
          location: { lat: 40.7505, lng: -73.9934, address: '321 Broadway, Central District' },
          status: 'resolved',
          department: 'public-works',
          createdAt: new Date('2024-01-25'),
          updatedAt: new Date('2024-01-27'),
        },
        {
          id: 'sample-5',
          description: 'Damaged park bench requiring replacement',
          photo: null,
          location: { lat: 40.7831, lng: -73.9712, address: '654 Central Park West' },
          status: 'resolved',
          department: 'public-works',
          createdAt: new Date('2024-01-30'),
          updatedAt: new Date('2024-02-01'),
        },
      ];
      setIssues(sampleIssues);
      localStorage.setItem('civic-issues', JSON.stringify(sampleIssues));
    }
  }, []);

  // Save to localStorage whenever issues change
  useEffect(() => {
    if (issues.length > 0) {
      localStorage.setItem('civic-issues', JSON.stringify(issues));
    }
  }, [issues]);

  const submitIssue = useCallback((issueData: Omit<Issue, 'id' | 'createdAt' | 'updatedAt' | 'status'>) => {
    const newIssue: Issue = {
      ...issueData,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setIssues(prev => [...prev, newIssue]);
    toast({
      title: "Issue Reported Successfully",
      description: `Your issue has been reported with ID: ${newIssue.id}`,
    });
  }, []);

  const updateIssueStatus = useCallback((id: string, status: IssueStatus, department?: Department) => {
    setIssues(prev => prev.map(issue => 
      issue.id === id 
        ? { ...issue, status, department, updatedAt: new Date() }
        : issue
    ));

    // Simulate notification to user
    const statusMessages = {
      pending: 'Your issue is being reviewed',
      acknowledged: 'Your issue has been acknowledged and assigned to our team',
      resolved: 'Your issue has been resolved! Thank you for reporting it.'
    };

    toast({
      title: "Issue Status Updated",
      description: statusMessages[status],
      variant: status === 'resolved' ? 'default' : 'default',
    });
  }, []);

  const deleteIssue = useCallback((id: string) => {
    setIssues(prev => prev.filter(issue => issue.id !== id));
    toast({
      title: "Issue Deleted",
      description: "The issue has been removed from the system.",
      variant: "destructive",
    });
  }, []);

  const getUserIssues = useCallback(() => {
    return issues;
  }, [issues]);

  const getResolvedIssues = useCallback(() => {
    return issues.filter(issue => issue.status === 'resolved');
  }, [issues]);

  return (
    <CivicContext.Provider value={{ 
      issues, 
      submitIssue, 
      updateIssueStatus, 
      deleteIssue,
      getUserIssues,
      getResolvedIssues 
    }}>
      {children}
    </CivicContext.Provider>
  );
}

export function useCivic() {
  const context = useContext(CivicContext);
  if (context === undefined) {
    throw new Error('useCivic must be used within a CivicProvider');
  }
  return context;
}