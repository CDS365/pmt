import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building2, 
  FolderKanban, 
  Calendar, 
  TicketCheck, 
  Users, 
  TrendingUp 
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { PROJECTS, SPRINTS, TICKETS, ORGANIZATIONS } from '@/data/dummyData';

const DashboardStats = () => {
  const { user } = useAuth();

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'super_admin':
        return [
          {
            title: 'Organizations',
            value: ORGANIZATIONS.length,
            icon: Building2,
            change: '+12%',
            color: 'bg-gradient-primary'
          },
          {
            title: 'Total Projects',
            value: PROJECTS.length,
            icon: FolderKanban,
            change: '+8%',
            color: 'bg-gradient-success'
          },
          {
            title: 'Active Sprints',
            value: SPRINTS.filter(s => s.status === 'active').length,
            icon: Calendar,
            change: '+15%',
            color: 'bg-gradient-warning'
          },
          {
            title: 'Total Tickets',
            value: TICKETS.length,
            icon: TicketCheck,
            change: '+23%',
            color: 'bg-secondary'
          }
        ];
      
      case 'admin':
        const orgProjects = PROJECTS.filter(p => p.organizationId === user.organizationId);
        const orgSprints = SPRINTS.filter(s => 
          orgProjects.some(p => p.id === s.projectId)
        );
        const orgTickets = TICKETS.filter(t => 
          orgSprints.some(s => s.id === t.sprintId)
        );
        
        return [
          {
            title: 'My Projects',
            value: orgProjects.length,
            icon: FolderKanban,
            change: '+5%',
            color: 'bg-gradient-primary'
          },
          {
            title: 'Active Sprints',
            value: orgSprints.filter(s => s.status === 'active').length,
            icon: Calendar,
            change: '+12%',
            color: 'bg-gradient-success'
          },
          {
            title: 'Total Tickets',
            value: orgTickets.length,
            icon: TicketCheck,
            change: '+18%',
            color: 'bg-gradient-warning'
          },
          {
            title: 'Team Members',
            value: 8,
            icon: Users,
            change: '+2%',
            color: 'bg-secondary'
          }
        ];
      
      case 'project_manager':
      case 'team_lead':
        const myProjects = PROJECTS.filter(p => 
          p.managerId === user?.id || p.organizationId === user?.organizationId
        );
        const mySprints = SPRINTS.filter(s => 
          myProjects.some(p => p.id === s.projectId)
        );
        const myTickets = TICKETS.filter(t => 
          mySprints.some(s => s.id === t.sprintId)
        );
        
        return [
          {
            title: 'My Projects',
            value: myProjects.length,
            icon: FolderKanban,
            change: '+3%',
            color: 'bg-gradient-primary'
          },
          {
            title: 'Active Sprints',
            value: mySprints.filter(s => s.status === 'active').length,
            icon: Calendar,
            change: '+10%',
            color: 'bg-gradient-success'
          },
          {
            title: 'Tickets',
            value: myTickets.length,
            icon: TicketCheck,
            change: '+25%',
            color: 'bg-gradient-warning'
          },
          {
            title: 'Team Size',
            value: 5,
            icon: Users,
            change: '0%',
            color: 'bg-secondary'
          }
        ];
      
      case 'developer':
      case 'qa_tester':
        const assignedTickets = TICKETS.filter(t => t.assigneeId === user?.id);
        const completedTickets = assignedTickets.filter(t => t.status === 'done');
        const inProgressTickets = assignedTickets.filter(t => t.status === 'in_progress');
        
        return [
          {
            title: 'Assigned Tickets',
            value: assignedTickets.length,
            icon: TicketCheck,
            change: '+15%',
            color: 'bg-gradient-primary'
          },
          {
            title: 'In Progress',
            value: inProgressTickets.length,
            icon: Calendar,
            change: '+5%',
            color: 'bg-gradient-warning'
          },
          {
            title: 'Completed',
            value: completedTickets.length,
            icon: TrendingUp,
            change: '+30%',
            color: 'bg-gradient-success'
          },
          {
            title: 'Success Rate',
            value: assignedTickets.length > 0 ? Math.round((completedTickets.length / assignedTickets.length) * 100) + '%' : '0%',
            icon: TrendingUp,
            change: '+5%',
            color: 'bg-secondary'
          }
        ];
      
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-card border-border hover:shadow-lg transition-smooth">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <div className={`p-2 rounded-lg ${stat.color} text-white`}>
              <stat.icon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-success font-medium">
                {stat.change}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;