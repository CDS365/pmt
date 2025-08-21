import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'super_admin' | 'admin' | 'project_manager' | 'team_lead' | 'developer' | 'qa_tester';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  organizationId?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy users for different roles
const DUMMY_USERS: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'super@admin.com',
    role: 'super_admin'
  },
  {
    id: '2', 
    name: 'Mike Chen',
    email: 'admin@org1.com',
    role: 'admin',
    organizationId: 'org1'
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    email: 'pm@org1.com', 
    role: 'project_manager',
    organizationId: 'org1'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'lead@org1.com',
    role: 'team_lead',
    organizationId: 'org1'
  },
  {
    id: '5',
    name: 'John Smith',
    email: 'dev@org1.com',
    role: 'developer',
    organizationId: 'org1'
  },
  {
    id: '6',
    name: 'Lisa Wang',
    email: 'qa@org1.com',
    role: 'qa_tester',
    organizationId: 'org1'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    // Simple demo authentication - any password works
    const foundUser = DUMMY_USERS.find(u => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}