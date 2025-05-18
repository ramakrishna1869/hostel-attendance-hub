
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Home, BarChart as ChartIcon, Users, Clock } from 'lucide-react';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, fetch from API
    // For now, simulate API response
    setTimeout(() => {
      const mockedData = {
        totalStudents: 120,
        checkedInToday: 92,
        attendancePercentage: 76.7,
        alerts: [
          { id: 1, message: 'Student Rahul Sharma has missed 3 consecutive days', severity: 'warning' },
          { id: 2, message: '10 students have not checked out yesterday', severity: 'info' },
          { id: 3, message: 'New student registrations pending approval (5)', severity: 'info' }
        ],
        weeklyAttendance: [
          { day: 'Mon', present: 102, absent: 18 },
          { day: 'Tue', present: 110, absent: 10 },
          { day: 'Wed', present: 95, absent: 25 },
          { day: 'Thu', present: 87, absent: 33 },
          { day: 'Fri', present: 92, absent: 28 },
          { day: 'Sat', present: 115, absent: 5 },
          { day: 'Sun', present: 116, absent: 4 }
        ],
        attendanceByBlock: [
          { name: 'A Block', students: 40, present: 32 },
          { name: 'B Block', students: 35, present: 28 },
          { name: 'C Block', students: 25, present: 22 },
          { name: 'D Block', students: 20, present: 10 }
        ],
        recentActivity: [
          { time: '10:15 AM', name: 'Amit Kumar', action: 'Checked In', room: 'A-101' },
          { time: '10:05 AM', name: 'Priya Singh', action: 'Checked Out', room: 'B-205' },
          { time: '09:55 AM', name: 'Rajeev Mehta', action: 'Checked In', room: 'C-304' },
          { time: '09:45 AM', name: 'Sneha Gupta', action: 'Checked In', room: 'A-110' }
        ]
      };
      
      setDashboardData(mockedData);
      setLoading(false);
    }, 800);
    
    // In a real app:
    /*
    fetch('/api/admin/dashboard')
      .then(res => res.json())
      .then(data => {
        setDashboardData(data);
      })
      .catch(err => {
        console.error('Error fetching dashboard data:', err);
      })
      .finally(() => {
        setLoading(false);
      });
    */
  }, []);
  
  const getAttendanceByBlockData = () => {
    if (!dashboardData) return [];
    
    return dashboardData.attendanceByBlock.map(block => ({
      name: block.name,
      present: block.present,
      absent: block.students - block.present,
    }));
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p>Loading dashboard data...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (!dashboardData) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p>No dashboard data found</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <h3 className="text-3xl font-bold">{dashboardData.totalStudents}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-50 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Checked In Today</p>
                  <h3 className="text-3xl font-bold">{dashboardData.checkedInToday}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-yellow-50 p-3 rounded-full">
                  <Home className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blocks Occupied</p>
                  <h3 className="text-3xl font-bold">{dashboardData.attendanceByBlock.length}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="bg-purple-50 p-3 rounded-full">
                  <ChartIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Attendance Rate</p>
                  <h3 className="text-3xl font-bold">{dashboardData.attendancePercentage}%</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Alerts */}
        <div className="mb-6 space-y-3">
          <h2 className="text-xl font-bold">Alerts & Notifications</h2>
          {dashboardData.alerts.map((alert) => (
            <Alert key={alert.id} variant={alert.severity === 'warning' ? 'destructive' : 'default'}>
              <AlertTitle>{alert.severity === 'warning' ? 'Warning' : 'Information'}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Attendance</CardTitle>
              <CardDescription>Present vs Absent students over the past week</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={dashboardData.weeklyAttendance}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" name="Present" fill="#10b981" />
                  <Bar dataKey="absent" name="Absent" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Attendance by Block</CardTitle>
              <CardDescription>Present vs Absent students by hostel block</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getAttendanceByBlockData()}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                  layout="vertical"
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" name="Present" stackId="a" fill="#10b981" />
                  <Bar dataKey="absent" name="Absent" stackId="a" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest check-ins and check-outs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Time</th>
                    <th className="text-left py-3 px-4">Student</th>
                    <th className="text-left py-3 px-4">Action</th>
                    <th className="text-left py-3 px-4">Room</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.recentActivity.map((activity, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{activity.time}</td>
                      <td className="py-3 px-4 font-medium">{activity.name}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                          activity.action === 'Checked In' 
                            ? 'bg-green-50 text-green-700' 
                            : 'bg-red-50 text-red-700'
                        }`}>
                          {activity.action}
                        </span>
                      </td>
                      <td className="py-3 px-4">{activity.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
