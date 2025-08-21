import React from 'react';
import { 
  Building2, 
  Users, 
  FolderKanban, 
  Calendar, 
  TicketCheck,
  BarChart3,
  Settings,
  Home,
  Plus
} from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const AppSidebar = () => {
  const { user } = useAuth();
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
      : "hover:bg-muted/70 transition-fast";

  // Role-based navigation items
  const getNavigationItems = () => {
    const baseItems = [
      { title: "Dashboard", url: "/dashboard", icon: Home },
    ];

    switch (user?.role) {
      case 'super_admin':
        return [
          ...baseItems,
          { title: "Organizations", url: "/organizations", icon: Building2 },
          { title: "Analytics", url: "/analytics", icon: BarChart3 },
          { title: "Settings", url: "/settings", icon: Settings },
        ];
      
      case 'admin':
        return [
          ...baseItems,
          { title: "Projects", url: "/projects", icon: FolderKanban },
          { title: "Team Members", url: "/team", icon: Users },
          { title: "Analytics", url: "/analytics", icon: BarChart3 },
          { title: "Settings", url: "/settings", icon: Settings },
        ];
      
      case 'project_manager':
      case 'team_lead':
        return [
          ...baseItems,
          { title: "Projects", url: "/projects", icon: FolderKanban },
          { title: "Sprints", url: "/sprints", icon: Calendar },
          { title: "Tickets", url: "/tickets", icon: TicketCheck },
          { title: "Team", url: "/team", icon: Users },
        ];
      
      case 'developer':
      case 'qa_tester':
        return [
          ...baseItems,
          { title: "My Tickets", url: "/my-tickets", icon: TicketCheck },
          { title: "Projects", url: "/projects", icon: FolderKanban },
          { title: "Sprints", url: "/sprints", icon: Calendar },
        ];
      
      default:
        return baseItems;
    }
  };

  const navigationItems = getNavigationItems();
  const canCreateProjects = ['admin', 'project_manager', 'team_lead'].includes(user?.role || '');

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-60"}>
      <SidebarContent className="bg-sidebar border-sidebar-border">
        {/* Quick Actions */}
        {canCreateProjects && (
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to="/projects/new" 
                      className="bg-gradient-primary text-white hover:bg-primary-hover transition-smooth font-medium"
                    >
                      <Plus className="h-4 w-4" />
                      {!isCollapsed && <span>New Project</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">
            {!isCollapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavClass}
                    >
                      <item.icon className="h-4 w-4 flex-shrink-0" />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Role-specific sections */}
        {(user?.role === 'admin' || user?.role === 'super_admin') && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-sidebar-foreground/70">
              {!isCollapsed && "Management"}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {user.role === 'super_admin' && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/organizations/new" className={getNavClass}>
                        <Building2 className="h-4 w-4 flex-shrink-0" />
                        {!isCollapsed && <span className="truncate">New Organization</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
                {user.role === 'admin' && (
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <NavLink to="/team/invite" className={getNavClass}>
                        <Users className="h-4 w-4 flex-shrink-0" />
                        {!isCollapsed && <span className="truncate">Invite Members</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
};

export { AppSidebar };