
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart, Home, Users, X, Video, UserCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const Sidebar = ({ isOpen, setIsOpen, isMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get user from localStorage for role-based navigation
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : { role: 'student' }; // Default to student if no user found
  
  // Define navigation items based on user role
  const getNavigationItems = () => {
    if (user.role === 'admin') {
      return [
        { name: 'Dashboard', href: '/admin/dashboard', icon: <Home className="w-5 h-5" /> },
        { name: 'Students', href: '/admin/students', icon: <Users className="w-5 h-5" /> },
        { name: 'Reports', href: '/admin/reports', icon: <BarChart className="w-5 h-5" /> },
        { name: 'Live Sessions', href: '/admin/live', icon: <Video className="w-5 h-5" /> },
      ];
    } else {
      // Student navigation
      return [
        { name: 'My Info', href: '/student/info', icon: <UserCircle className="w-5 h-5" /> },
        { name: 'Check In/Out', href: '/student/attendance', icon: <Clock className="w-5 h-5" /> },
        { name: 'My Analytics', href: '/student/analytics', icon: <BarChart className="w-5 h-5" /> },
      ];
    }
  };
  
  const navigation = getNavigationItems();
  
  const closeSidebar = () => {
    setIsOpen(false);
  };
  
  const handleNavigation = (href) => {
    navigate(href);
    if (isMobile) {
      closeSidebar();
    }
  };

  // Helper function to check if a navigation item is active
  const isActive = (href) => {
    return location.pathname === href || location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed z-30 flex h-full w-64 flex-col bg-white border-r transition-all duration-300 ease-in-out",
          isMobile ? (isOpen ? "translate-x-0" : "-translate-x-full") : "relative translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center">
            <span className="text-xl font-bold">HAS {user.role === 'admin' ? 'Admin' : 'Student'}</span>
          </div>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={closeSidebar}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        {/* Navigation */}
        <div className="flex-1 overflow-auto py-4">
          <nav className="space-y-1 px-2">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "w-full justify-start px-3 transition-colors",
                  isActive(item.href) ? "bg-gray-100 text-primary" : "hover:bg-gray-50"
                )}
                onClick={() => handleNavigation(item.href)}
              >
                {item.icon}
                <span className="ml-3">{item.name}</span>
              </Button>
            ))}
          </nav>
        </div>
        
        {/* Sidebar Footer */}
        <div className="border-t p-4">
          <p className="text-xs text-gray-500">© 2025 Hostel Attendance System</p>
          <p className="text-xs text-gray-400 mt-1">Managed by Hostel Warden</p>
        </div>
      </aside>
      
      {/* Spacer for desktop */}
      {!isMobile && (
        <div className="w-64 flex-shrink-0" />
      )}
    </>
  );
};

export default Sidebar;
