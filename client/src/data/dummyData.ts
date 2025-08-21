export interface Organization {
  id: string;
  name: string;
  adminId: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  organizationId: string;
  managerId: string;
  status: 'active' | 'completed' | 'on_hold';
  createdAt: string;
}

export interface Sprint {
  id: string;
  name: string;
  projectId: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed';
  goal: string;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  sprintId: string;
  assigneeId?: string;
  reporterId: string;
  type: 'story' | 'bug' | 'task' | 'epic';
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'todo' | 'in_progress' | 'review' | 'done';
  points?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  ticketId: string;
  userId: string;
  content: string;
  createdAt: string;
}

// Dummy Organizations
export const ORGANIZATIONS: Organization[] = [
  {
    id: 'org1',
    name: 'TechCorp Solutions',
    adminId: '2',
    createdAt: '2024-01-01'
  },
  {
    id: 'org2', 
    name: 'StartupX',
    adminId: '7',
    createdAt: '2024-02-15'
  }
];

// Dummy Projects
export const PROJECTS: Project[] = [
  {
    id: 'proj1',
    name: 'Customer Portal Redesign',
    description: 'Complete overhaul of the customer-facing portal with modern UI/UX',
    organizationId: 'org1',
    managerId: '3',
    status: 'active',
    createdAt: '2024-03-01'
  },
  {
    id: 'proj2',
    name: 'Mobile App Development',
    description: 'Native iOS and Android app for customer engagement',
    organizationId: 'org1', 
    managerId: '3',
    status: 'active',
    createdAt: '2024-03-15'
  },
  {
    id: 'proj3',
    name: 'API Integration Platform',
    description: 'Microservices architecture for third-party integrations',
    organizationId: 'org1',
    managerId: '4',
    status: 'on_hold',
    createdAt: '2024-02-20'
  }
];

// Dummy Sprints
export const SPRINTS: Sprint[] = [
  {
    id: 'sprint1',
    name: 'Sprint 1 - Foundation',
    projectId: 'proj1',
    startDate: '2024-08-01',
    endDate: '2024-08-15',
    status: 'completed',
    goal: 'Set up project structure and basic components'
  },
  {
    id: 'sprint2',
    name: 'Sprint 2 - User Authentication',
    projectId: 'proj1',
    startDate: '2024-08-16',
    endDate: '2024-08-30',
    status: 'active',
    goal: 'Implement secure user authentication and authorization'
  },
  {
    id: 'sprint3',
    name: 'Sprint 3 - Dashboard',
    projectId: 'proj1',
    startDate: '2024-09-01',
    endDate: '2024-09-15', 
    status: 'planning',
    goal: 'Create responsive dashboard with data visualization'
  },
  {
    id: 'sprint4',
    name: 'Sprint 1 - App Setup',
    projectId: 'proj2',
    startDate: '2024-08-10',
    endDate: '2024-08-24',
    status: 'active',
    goal: 'Mobile app foundation and navigation'
  }
];

// Dummy Tickets
export const TICKETS: Ticket[] = [
  {
    id: 'ticket1',
    title: 'Setup React project structure',
    description: 'Initialize the React project with TypeScript, routing, and basic folder structure',
    sprintId: 'sprint1',
    assigneeId: '5',
    reporterId: '3',
    type: 'task',
    priority: 'high',
    status: 'done',
    points: 5,
    createdAt: '2024-08-01T09:00:00Z',
    updatedAt: '2024-08-03T15:30:00Z'
  },
  {
    id: 'ticket2',
    title: 'Design login page mockups',
    description: 'Create wireframes and high-fidelity mockups for the login page',
    sprintId: 'sprint2',
    assigneeId: '6',
    reporterId: '4', 
    type: 'story',
    priority: 'medium',
    status: 'in_progress',
    points: 3,
    createdAt: '2024-08-16T10:00:00Z',
    updatedAt: '2024-08-18T14:20:00Z'
  },
  {
    id: 'ticket3',
    title: 'Implement JWT authentication',
    description: 'Set up secure JWT-based authentication with refresh tokens',
    sprintId: 'sprint2',
    assigneeId: '5',
    reporterId: '3',
    type: 'story',
    priority: 'critical',
    status: 'review',
    points: 8,
    createdAt: '2024-08-17T08:30:00Z',
    updatedAt: '2024-08-19T16:45:00Z'
  },
  {
    id: 'ticket4',
    title: 'Fix login form validation bug',
    description: 'Email validation is not working properly on the login form',
    sprintId: 'sprint2',
    assigneeId: '5',
    reporterId: '6',
    type: 'bug',
    priority: 'high',
    status: 'todo',
    points: 2,
    createdAt: '2024-08-18T11:15:00Z',
    updatedAt: '2024-08-18T11:15:00Z'
  },
  {
    id: 'ticket5',
    title: 'Create responsive navigation component',
    description: 'Build a mobile-first navigation component with proper accessibility',
    sprintId: 'sprint4',
    assigneeId: '5',
    reporterId: '4',
    type: 'task',
    priority: 'medium',
    status: 'in_progress',
    points: 5,
    createdAt: '2024-08-10T13:00:00Z',
    updatedAt: '2024-08-15T09:30:00Z'
  }
];

// Dummy Comments
export const COMMENTS: Comment[] = [
  {
    id: 'comment1',
    ticketId: 'ticket2',
    userId: '6',
    content: 'Working on the initial wireframes. Should have the first draft ready by tomorrow.',
    createdAt: '2024-08-17T14:30:00Z'
  },
  {
    id: 'comment2', 
    ticketId: 'ticket3',
    userId: '5',
    content: 'JWT implementation is complete. Ready for code review.',
    createdAt: '2024-08-19T16:00:00Z'
  },
  {
    id: 'comment3',
    ticketId: 'ticket3',
    userId: '3',
    content: 'Great work! Just a few minor suggestions in the PR.',
    createdAt: '2024-08-19T17:15:00Z'
  }
];