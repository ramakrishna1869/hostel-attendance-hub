
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Bell, LogOut, User } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Student = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [isPresenceMarked, setIsPresenceMarked] = useState(false);
  const { toast } = useToast();
  
  // Sample attendance history data - in a real app this would come from your backend
  const attendanceHistory = [
    { date: '05/11', status: 'present', markedTime: '08:10 AM', remarks: '-' },
    { date: '05/12', status: 'present', markedTime: '07:55 AM', remarks: '-' },
    { date: '05/13', status: 'present', markedTime: '08:05 AM', remarks: '-' },
    { date: '05/14', status: 'absent', markedTime: '-', remarks: 'Not in hostel' },
    { date: '05/15', status: 'leave', markedTime: '-', remarks: 'Family event' },
    { date: '05/16', status: 'present', markedTime: '08:00 AM', remarks: '-' },
  ];
  
  // Chart data for attendance overview
  const chartData = [
    { day: 'Mon', present: 1, absent: 0, leave: 0 },
    { day: 'Tue', present: 1, absent: 0, leave: 0 },
    { day: 'Wed', present: 1, absent: 0, leave: 0 },
    { day: 'Thu', present: 0, absent: 1, leave: 0 },
    { day: 'Fri', present: 0, absent: 0, leave: 1 },
    { day: 'Sat', present: 1, absent: 0, leave: 0 },
    { day: 'Sun', present: 0, absent: 0, leave: 0 },
  ];
  
  // Monthly stats data
  const monthlyStats = [
    { month: 'Jan', present: 22, absent: 3, leave: 6 },
    { month: 'Feb', present: 20, absent: 4, leave: 4 },
    { month: 'Mar', present: 25, absent: 2, leave: 4 },
    { month: 'Apr', present: 23, absent: 3, leave: 4 },
    { month: 'May', present: 12, absent: 2, leave: 1 },
  ];
  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/');
      return;
    }
    
    const user = JSON.parse(storedUser);
    if (user.role !== 'student') {
      navigate('/');
    }
    
    setUserData(user);
    
    // Check if already marked presence today
    const todayPresence = localStorage.getItem(`presence_${user.id}_${new Date().toLocaleDateString()}`);
    if (todayPresence) {
      setIsPresenceMarked(true);
    }
  }, [navigate]);
  
  const handleMarkPresence = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    
    // Mark presence
    localStorage.setItem(`presence_${userData.id}_${dateString}`, timeString);
    toast({
      title: "Attendance Marked Successfully",
      description: `Your presence has been recorded for today at ${timeString}`,
    });
    setIsPresenceMarked(true);
  };
  
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };
  
  const getUserInitials = () => {
    if (!userData || !userData.name) return 'U';
    
    const nameParts = userData.name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return nameParts[0][0];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <h1 className="text-xl font-bold">Hostel Attendance Hub</h1>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarFallback className="bg-primary text-white">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <div className="flex items-center justify-start p-2">
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{userData?.name}</p>
                    <p className="text-xs text-muted-foreground">{userData?.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student Info */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarFallback className="text-xl bg-primary text-white">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-semibold mb-1">{userData?.name}</h3>
                <p className="text-sm text-muted-foreground">{userData?.email}</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">ID</span>
                  <span className="font-medium">{userData?.id}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">Room Number</span>
                  <span className="font-medium">{userData?.roomNumber}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">Role</span>
                  <span className="font-medium capitalize">{userData?.role}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Mark Presence Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Mark Today's Presence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center p-6">
                <div className="text-center mb-6">
                  <p className="text-2xl font-bold">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-4xl font-bold mt-2">
                    {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                {isPresenceMarked ? (
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center rounded-full w-16 h-16 bg-green-100 text-green-800 mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-lg font-medium text-green-800">Your attendance has been marked for today!</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Marked at {localStorage.getItem(`presence_${userData?.id}_${new Date().toLocaleDateString()}`)}
                    </p>
                  </div>
                ) : (
                  <Button 
                    size="lg" 
                    className="w-48 h-16 text-lg bg-primary hover:bg-primary/90"
                    onClick={handleMarkPresence}
                  >
                    Mark Presence
                  </Button>
                )}
                
                <div className="mt-6 w-full max-w-md">
                  <p className="text-sm text-center text-muted-foreground mb-2">This Month's Attendance</p>
                  <div className="flex justify-between items-center">
                    <div className="text-center">
                      <p className="text-xl font-bold text-green-600">25</p>
                      <p className="text-xs text-muted-foreground">Present</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-red-600">2</p>
                      <p className="text-xs text-muted-foreground">Absent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-blue-600">3</p>
                      <p className="text-xs text-muted-foreground">On Leave</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold">83%</p>
                      <p className="text-xs text-muted-foreground">Attendance</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Attendance History */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Attendance History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b text-xs font-medium text-muted-foreground">
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-left">Marked Time</th>
                      <th className="py-3 px-4 text-left">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceHistory.map((day, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{day.date}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                            day.status === 'present' ? 'bg-green-100 text-green-800' : 
                            day.status === 'absent' ? 'bg-red-100 text-red-800' : 
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {day.status.charAt(0).toUpperCase() + day.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">{day.markedTime}</td>
                        <td className="py-3 px-4">{day.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Attendance Analytics */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Weekly Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="present" name="Present" fill="#4CAF50" />
                    <Bar dataKey="absent" name="Absent" fill="#ea384c" />
                    <Bar dataKey="leave" name="On Leave" fill="#9b87f5" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Monthly Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={monthlyStats}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="present" name="Present" stroke="#4CAF50" />
                    <Line type="monotone" dataKey="absent" name="Absent" stroke="#ea384c" />
                    <Line type="monotone" dataKey="leave" name="On Leave" stroke="#9b87f5" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Student;
