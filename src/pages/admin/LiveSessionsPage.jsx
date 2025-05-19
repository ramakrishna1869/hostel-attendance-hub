
import { useState, useEffect } from 'react';
import { Users, Clock, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from 'sonner';
import MainLayout from '@/components/layouts/MainLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const LiveSessionsPage = () => {
  const [liveData, setLiveData] = useState({
    checkedIn: [],
    recentActivity: []
  });
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [activeTab, setActiveTab] = useState('present');
  
  // Fetch live data
  const fetchLiveData = async () => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // const response = await axios.get('/api/admin/live');
      // setLiveData(response.data);
      
      // Mock data
      setTimeout(() => {
        const mockData = {
          checkedIn: [
            { 
              id: 1, 
              name: 'Raj Kumar', 
              rollNo: 'CS2021001', 
              roomNo: 'A-101', 
              checkinTime: '08:15 AM', 
              duration: '2h 30m'
            },
            { 
              id: 2, 
              name: 'Amit Patel', 
              rollNo: 'CS2021003', 
              roomNo: 'A-103', 
              checkinTime: '07:45 AM', 
              duration: '3h 00m'
            },
            { 
              id: 3, 
              name: 'Vikram Joshi', 
              rollNo: 'CS2021005', 
              roomNo: 'A-105', 
              checkinTime: '08:00 AM', 
              duration: '2h 45m'
            },
            { 
              id: 4, 
              name: 'Suresh Reddy', 
              rollNo: 'CS2021007', 
              roomNo: 'A-107', 
              checkinTime: '08:30 AM', 
              duration: '2h 15m'
            },
            { 
              id: 5, 
              name: 'Kiran Kumar', 
              rollNo: 'CS2021009', 
              roomNo: 'A-109', 
              checkinTime: '07:50 AM', 
              duration: '2h 55m'
            },
          ],
          recentActivity: [
            { 
              id: 1, 
              name: 'Priya Singh', 
              rollNo: 'CS2021002', 
              roomNo: 'B-202', 
              actionType: 'checkout', 
              time: '10:45 AM'
            },
            { 
              id: 2, 
              name: 'Meera Desai', 
              rollNo: 'CS2021006', 
              roomNo: 'B-206', 
              actionType: 'checkout', 
              time: '10:30 AM'
            },
            { 
              id: 3, 
              name: 'Nisha Verma', 
              rollNo: 'CS2021010', 
              roomNo: 'B-210', 
              actionType: 'checkout',
              time: '10:15 AM'
            },
            { 
              id: 4, 
              name: 'Rohit Sharma', 
              rollNo: 'CS2021011', 
              roomNo: 'A-111', 
              actionType: 'checkin', 
              time: '09:55 AM'
            },
            { 
              id: 5, 
              name: 'Sneha Gupta', 
              rollNo: 'CS2021012', 
              roomNo: 'B-212', 
              actionType: 'checkin', 
              time: '09:50 AM'
            },
          ]
        };
        setLiveData(mockData);
        setLoading(false);
        setLastUpdated(new Date());
      }, 1000);
    } catch (error) {
      console.error('Error fetching live data:', error);
      toast.error('Failed to load live data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveData();
    
    // Set up polling every 15 seconds
    const intervalId = setInterval(fetchLiveData, 15000);
    
    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const handleRefresh = () => {
    fetchLiveData();
    toast.info('Data refreshed');
  };

  // Helper to get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  // Helper to get activity badge
  const getActivityBadge = (actionType) => {
    if (actionType === 'checkin') {
      return <Badge className="bg-green-500">Check In</Badge>;
    } else {
      return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Check Out</Badge>;
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-2xl font-bold">Live Sessions</h1>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <p className="text-sm text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
            <Button variant="outline" size="sm" onClick={handleRefresh}>
              <RefreshCw className="h-4 w-4 mr-1" />
              Refresh
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Currently Present
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-green-600">{liveData.checkedIn.length}</p>
              <p className="text-sm text-muted-foreground">students checked in</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">{liveData.recentActivity.length}</p>
              <p className="text-sm text-muted-foreground">actions in the last hour</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="present" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="present">Present Students</TabsTrigger>
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
          </TabsList>
          <TabsContent value="present">
            {loading ? (
              <div className="flex justify-center items-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {liveData.checkedIn.length === 0 ? (
                  <p className="col-span-full text-center py-12 text-muted-foreground">
                    No students currently checked in
                  </p>
                ) : (
                  liveData.checkedIn.map(student => (
                    <Card key={student.id} className="overflow-hidden">
                      <div className="border-l-4 border-green-500 pl-4 py-4 flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {getInitials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium truncate">{student.name}</h3>
                          <p className="text-sm text-muted-foreground flex flex-col sm:flex-row sm:gap-2">
                            <span>{student.rollNo}</span>
                            <span className="hidden sm:inline">•</span>
                            <span>Room {student.roomNo}</span>
                          </p>
                        </div>
                      </div>
                      <CardContent className="pt-2 pb-4">
                        <div className="flex justify-between items-center text-sm">
                          <div>
                            <p className="text-muted-foreground">Check-in</p>
                            <p className="font-medium">{student.checkinTime}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-muted-foreground">Duration</p>
                            <p className="font-medium">{student.duration}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="recent">
            {loading ? (
              <div className="flex justify-center items-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {liveData.recentActivity.length === 0 ? (
                  <p className="col-span-full text-center py-12 text-muted-foreground">
                    No recent activity
                  </p>
                ) : (
                  liveData.recentActivity.map(activity => (
                    <Card key={activity.id}>
                      <CardContent className="pt-6 pb-4 flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-secondary text-secondary-foreground">
                            {getInitials(activity.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="font-medium truncate">{activity.name}</h3>
                            {getActivityBadge(activity.actionType)}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Room {activity.roomNo} • {activity.time}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default LiveSessionsPage;
