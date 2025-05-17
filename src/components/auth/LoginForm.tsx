
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Mock authentication for now
      // In a real implementation, this would call your backend API
      console.log('Logging in with:', { email, password });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, hardcode an admin login
      if (email === 'admin@example.com' && password === 'admin123') {
        // Store token in localStorage
        localStorage.setItem('user', JSON.stringify({ 
          role: 'admin', 
          name: 'Admin User',
          email: email 
        }));
        
        toast({
          title: "Login successful",
          description: "Welcome back to the Hostel Attendance System!",
        });
        
        navigate('/dashboard');
      } else if (email === 'student@example.com' && password === 'student123') {
        // Store token in localStorage
        localStorage.setItem('user', JSON.stringify({ 
          role: 'student', 
          name: 'John Doe',
          email: email,
          roomNumber: '101',
          id: 'ST12345'
        }));
        
        toast({
          title: "Login successful",
          description: "Welcome back to the Hostel Attendance System!",
        });
        
        navigate('/student');
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Something went wrong. Please try again later.",
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-500" />
            ) : (
              <Eye className="h-4 w-4 text-gray-500" />
            )}
          </Button>
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-primary hover:bg-primary-hover" 
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
      
      <div className="text-center text-sm text-gray-500">
        <p>Demo Accounts:</p>
        <p>Admin: admin@example.com / admin123</p>
        <p>Student: student@example.com / student123</p>
      </div>
    </form>
  );
};

export default LoginForm;
