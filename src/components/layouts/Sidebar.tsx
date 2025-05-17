
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { BarChart, Home, Users, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isMobile: boolean;
}

const Sidebar = ({ isOpen, setIsOpen, isMobile }: SidebarProps) => {
  const navigate = useNavigate();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: <Home className="w-5 h-5" /> },
    { name: 'Students', href: '/students', icon: <Users className="w-5 h-5" /> },
    { name: 'Reports', href: '/reports', icon: <BarChart className="w-5 h-5" /> },
  ];
  
  const closeSidebar = () => {
    setIsOpen(false);
  };
  
  const handleNavigation = (href: string) => {
    navigate(href);
    if (isMobile) {
      closeSidebar();
    }
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
            <span className="text-xl font-bold">HAS Admin</span>
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
                  "w-full justify-start px-3",
                  location.pathname === item.href ? "bg-gray-100" : ""
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
