
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

const LiveAttendancePage = () => {
  const [liveData, setLiveData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Function to fetch live attendance data
  const fetchLiveData = () => {
    setLoading(true);
    
    // In a real app, fetch from API
    // For now, simulate API response with random data
    setTimeout(() => {
      const mockStudents = [
        { id: '1', name: 'Rahul Sharma', roomNumber: 'A-101', lastActivity: new Date(), status: 'checked-in', timestamp: '10:15 AM' },
        { id: '2', name: 'Priya Singh', roomNumber: 'B-205', lastActivity: new Date(), status: 'checked-out', timestamp: '10:05 AM' },
        { id: '3', name: 'Amit Kumar', roomNumber: 'A-102', lastActivity: new Date(), status: 'checked-in', timestamp: '09:55 AM' },
        { id: '4', name: 'Deepika Patel', roomNumber: 'C-301', lastActivity: new Date(), status: 'checked-in', timestamp: '09:45 AM' },
        { id: '5', name: 'Ravi Verma', roomNumber: 'A-103', lastActivity: new Date(), status: 'checked-out', timestamp: '09:30 AM' },
        { id: '6', name: 'Sunita Gupta', roomNumber: 'B-206', lastActivity: new Date(), status: 'checked-in', timestamp: '09:20 AM' },
      ];
      
      setLiveData(mockStudents);
      setLastUpdated(new Date());
      setLoading(false);
    }, 800);
    
    // In a real app:
    /*
    fetch('/api/attendance/live')
      .then(res => res.json())
      .then(data => {
        setLiveData(data);
        setLastUpdated(new Date());
      })
      .catch(err => {
        console.error('Error fetching live attendance:', err);
      })
      .finally(() => {
        setLoading(false);
      });
    */
  };
  
  // Initial data fetch
  useEffect(() => {
    fetchLiveData();
  }, []);
  
  // Set up auto-refresh every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchLiveData();
    }, 15000);
    
    return () => clearInterval(interval);
  }, []);
  
  const getUserInitials = (name) => {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return nameParts[0][0];
  };
  
  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Live Attendance</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {format(lastUpdated, 'HH:mm:ss')}
            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
          </p>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Live feed of check-ins and check-outs. Automatically refreshes every 15 seconds.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <p>Loading live data...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {liveData.map((student) => (
                  <Card key={student.id} className={`overflow-hidden border-l-4 ${
                    student.status === 'checked-in' ? 'border-l-green-500' : 'border-l-red-500'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback className="bg-primary text-white">
                            {getUserInitials(student.name)}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium truncate">{student.name}</h3>
                            <Badge variant={student.status === 'checked-in' ? 'outline' : 'destructive'} className="ml-2">
                              {student.status === 'checked-in' ? 'In' : 'Out'}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">Room {student.roomNumber}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {student.status === 'checked-in' ? 'Checked in' : 'Checked out'} at {student.timestamp}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Today's Status</CardTitle>
            <CardDescription>
              Summary of today's attendance statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="text-green-600 text-3xl font-bold">
                  {liveData.filter(s => s.status === 'checked-in').length}
                </h3>
                <p className="text-green-800">Currently Checked In</p>
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg">
                <h3 className="text-red-600 text-3xl font-bold">
                  {liveData.filter(s => s.status === 'checked-out').length}
                </h3>
                <p className="text-red-800">Currently Checked Out</p>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="text-blue-600 text-3xl font-bold">
                  {liveData.length}
                </h3>
                <p className="text-blue-800">Total Activity Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default LiveAttendancePage;
