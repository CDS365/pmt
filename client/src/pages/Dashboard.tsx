import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import DashboardStats from '@/components/Dashboard/DashboardStats';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  TicketCheck, 
  TrendingUp, 
  Clock,
  Plus,
  ArrowRight
} from 'lucide-react';
import { PROJECTS, SPRINTS, TICKETS } from '@/data/dummyData';

const Dashboard = () => {
  const { user } = useAuth();

  const getRecentActivity = () => {
    // Get recent tickets based on user role
    let relevantTickets = [];
    
    switch (user?.role) {
      case 'developer':
      case 'qa_tester':
        relevantTickets = TICKETS.filter(t => t.assigneeId === user.id);
        break;
      default:
        relevantTickets = TICKETS;
    }
    
    return relevantTickets
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);
  };

  const getActiveSprints = () => {
    return SPRINTS.filter(s => s.status === 'active').slice(0, 3);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'high': return 'bg-warning text-warning-foreground';
      case 'medium': return 'bg-primary text-primary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'done': return 'bg-success text-success-foreground';
      case 'in_progress': return 'bg-warning text-warning-foreground';
      case 'review': return 'bg-primary text-primary-foreground';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  const getRoleGreeting = () => {
    const time = new Date().getHours();
    const greeting = time < 12 ? 'Good morning' : time < 18 ? 'Good afternoon' : 'Good evening';
    const roleLabel = user?.role?.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
    
    return `${greeting}, ${user?.name}! Welcome to your ${roleLabel} dashboard.`;
  };

  const recentActivity = getRecentActivity();
  const activeSprints = getActiveSprints();

  return (
    <div className="p-6 space-y-6 bg-background">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-primary bg-clip-text text-transparent">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          {getRoleGreeting()}
        </p>
      </div>

      {/* Stats Grid */}
      <DashboardStats />

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="shadow-card border-border">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest updates on your tickets and projects
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-hover">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((ticket) => (
                  <div key={ticket.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-fast">
                    <div className="flex-shrink-0">
                      <TicketCheck className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{ticket.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${getPriorityColor(ticket.priority)}`}
                        >
                          {ticket.priority}
                        </Badge>
                        <Badge 
                          variant="outline" 
                          className={`text-xs ${getStatusColor(ticket.status)}`}
                        >
                          {ticket.status.replace('_', ' ')}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {new Date(ticket.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {recentActivity.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No recent activity found
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Sprints */}
        <div>
          <Card className="shadow-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Active Sprints
              </CardTitle>
              <CardDescription>
                Current sprint progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeSprints.map((sprint) => {
                  const sprintTickets = TICKETS.filter(t => t.sprintId === sprint.id);
                  const completedTickets = sprintTickets.filter(t => t.status === 'done');
                  const progress = sprintTickets.length > 0 
                    ? Math.round((completedTickets.length / sprintTickets.length) * 100) 
                    : 0;
                  
                  return (
                    <div key={sprint.id} className="p-3 rounded-lg border border-border hover:shadow-sm transition-fast">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium truncate">{sprint.name}</h4>
                        <Badge variant="secondary" className="bg-success text-success-foreground">
                          Active
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{progress}%</span>
                        </div>
                        <div className="w-full bg-secondary rounded-full h-2">
                          <div 
                            className="bg-gradient-success h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>{completedTickets.length}/{sprintTickets.length} tickets</span>
                          <span>Due {new Date(sprint.endDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {activeSprints.length === 0 && (
                  <p className="text-center text-muted-foreground py-8">
                    No active sprints
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      {['admin', 'project_manager', 'team_lead'].includes(user?.role || '') && (
        <Card className="shadow-card border-border">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks for your role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-gradient-primary hover:bg-primary-hover">
                <Plus className="h-4 w-4 mr-2" />
                New Project
              </Button>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Create Sprint
              </Button>
              <Button variant="outline">
                <TicketCheck className="h-4 w-4 mr-2" />
                Add Ticket
              </Button>
              {user?.role === 'admin' && (
                <Button variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Dashboard;