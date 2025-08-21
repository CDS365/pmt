import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, Users, UserCog, Crown, Code, Bug } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const success = login(email, password);
    
    if (success) {
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to PMT.",
      });
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  const demoUsers = [
    { email: 'super@admin.com', role: 'Super Admin', icon: Crown, color: 'bg-gradient-primary' },
    { email: 'admin@org1.com', role: 'Admin', icon: Building2, color: 'bg-gradient-primary' },
    { email: 'pm@org1.com', role: 'Project Manager', icon: UserCog, color: 'bg-gradient-success' },
    { email: 'lead@org1.com', role: 'Team Lead', icon: Users, color: 'bg-gradient-warning' },
    { email: 'dev@org1.com', role: 'Developer', icon: Code, color: 'bg-secondary' },
    { email: 'qa@org1.com', role: 'QA Tester', icon: Bug, color: 'bg-secondary' },
  ];

  const quickLogin = (userEmail: string) => {
    setEmail(userEmail);
    setPassword('demo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary-light/20 to-background flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-3 gap-8">
        {/* Left side - Demo users */}
        <div className="lg:col-span-1 space-y-4">
          <div className="text-center lg:text-left mb-6">
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PMT Demo
            </h1>
            <p className="text-muted-foreground">
              Click any role to quick login
            </p>
          </div>
          
          <div className="grid gap-3">
            {demoUsers.map((user) => (
              <Card 
                key={user.email}
                className="cursor-pointer hover:shadow-card transition-all duration-200 border-border hover:border-primary/30"
                onClick={() => quickLogin(user.email)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${user.color} text-white`}>
                      <user.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{user.role}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="lg:col-span-2 flex items-center justify-center">
          <Card className="w-full max-w-md shadow-card border-border bg-gradient-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">Welcome to PMT</CardTitle>
              <CardDescription>
                Sign in to your project management dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="transition-fast"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="transition-fast"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:bg-primary-hover transition-smooth"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              
              <div className="pt-4 border-t border-border">
                <div className="text-center">
                  <Badge variant="secondary" className="mb-2">Demo Mode</Badge>
                  <p className="text-xs text-muted-foreground">
                    Use any password with the demo emails
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;