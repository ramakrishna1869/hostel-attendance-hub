
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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Student = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const { toast } = useToast();
  
  // Sample attendance history data - in a real app this would come from your backend
  const attendanceHistory = [
    { date: '05/11', status: 'present', checkInTime: '08:10', checkOutTime: '17:30' },
    { date: '05/12', status: 'present', checkInTime: '07:55', checkOutTime: '17:15' },
    { date: '05/13', status: 'present', checkInTime: '08:05', checkOutTime: '17:20' },
    { date: '05/14', status: 'absent', checkInTime: '-', checkOutTime: '-' },
    { date: '05/15', status: 'late', checkInTime: '09:45', checkOutTime: '17:30' },
    { date: '05/16', status: 'present', checkInTime: '08:00', checkOutTime: '17:10' },
  ];
  
  // Chart data for attendance overview
  const chartData = [
    { name: 'Mon', checkinTime: 8.17, checkoutTime: 17.5 },
    { name: 'Tue', checkinTime: 7.92, checkoutTime: 17.25 },
    { name: 'Wed', checkinTime: 8.08, checkoutTime: 17.33 },
    { name: 'Thu', checkinTime: 0, checkoutTime: 0 },
    { name: 'Fri', checkinTime: 9.75, checkoutTime: 17.5 },
    { name: 'Sat', checkinTime: 8.0, checkoutTime: 17.17 },
    { name: 'Today', checkinTime: 0, checkoutTime: 0 },
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
    
    // Check if already checked in today
    const todayCheckIn = localStorage.getItem(`checkIn_${user.id}_${new Date().toLocaleDateString()}`);
    if (todayCheckIn) {
      setIsCheckedIn(true);
    }
  }, [navigate]);
  
  const handleAttendance = () => {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const dateString = now.toLocaleDateString();
    
    if (!isCheckedIn) {
      // Check-in
      localStorage.setItem(`checkIn_${userData.id}_${dateString}`, timeString);
      toast({
        title: "Checked In Successfully",
        description: `Time: ${timeString}`,
      });
      setIsCheckedIn(true);
    } else {
      // Check-out
      localStorage.setItem(`checkOut_${userData.id}_${dateString}`, timeString);
      toast({
        title: "Checked Out Successfully",
        description: `Time: ${timeString}`,
      });
    }
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
          
          {/* Check-in/Check-out Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
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
                
                <Button 
                  size="lg" 
                  className={`w-48 h-16 text-lg ${isCheckedIn ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
                  onClick={handleAttendance}
                >
                  {isCheckedIn ? 'Check Out' : 'Check In'}
                </Button>
                
                {isCheckedIn && (
                  <p className="text-sm text-muted-foreground mt-4">You checked in today at {localStorage.getItem(`checkIn_${userData?.id}_${new Date().toLocaleDateString()}`)}</p>
                )}
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
                      <th className="py-3 px-4 text-left">Check-in Time</th>
                      <th className="py-3 px-4 text-left">Check-out Time</th>
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
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {day.status.charAt(0).toUpperCase() + day.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4">{day.checkInTime}</td>
                        <td className="py-3 px-4">{day.checkOutTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
          
          {/* Attendance Analytics */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Attendance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis label={{ value: 'Time (24hr)', angle: -90, position: 'insideLeft' }} />
                    <Tooltip formatter={(value) => [`${value}:00`, '']} />
                    <Legend />
                    <Line type="monotone" dataKey="checkinTime" name="Check-in Time" stroke="#4CAF50" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="checkoutTime" name="Check-out Time" stroke="#2196F3" />
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
