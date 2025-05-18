
import React from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Analytics = () => {
  // Sample attendance data for the chart - in a real app, this would come from your API
  const weeklyAttendance = [
    { day: 'Mon', present: 1, absent: 0, late: 0 },
    { day: 'Tue', present: 1, absent: 0, late: 0 },
    { day: 'Wed', present: 0, absent: 1, late: 0 },
    { day: 'Thu', present: 1, absent: 0, late: 0 },
    { day: 'Fri', present: 0, absent: 0, late: 1 },
    { day: 'Sat', present: 1, absent: 0, late: 0 },
    { day: 'Sun', present: 1, absent: 0, late: 0 },
  ];
  
  const monthlyAttendance = [
    { month: 'Jan', present: 20, absent: 5, late: 6 },
    { month: 'Feb', present: 22, absent: 3, late: 5 },
    { month: 'Mar', present: 18, absent: 10, late: 2 },
    { month: 'Apr', present: 25, absent: 2, late: 3 },
    { month: 'May', present: 26, absent: 0, late: 5 },
  ];
  
  // Calculate attendance percentage
  const totalDays = 31;
  const presentDays = 26;
  const absentDays = 2;
  const lateDays = 3;
  
  const presentPercentage = Math.round((presentDays / totalDays) * 100);
  const absentPercentage = Math.round((absentDays / totalDays) * 100);
  const latePercentage = Math.round((lateDays / totalDays) * 100);
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Attendance Analytics</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Present</CardTitle>
              <CardDescription>Days marked as present</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{presentDays} days</div>
              <div className="text-sm text-muted-foreground">{presentPercentage}% of total days</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Absent</CardTitle>
              <CardDescription>Days marked as absent</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{absentDays} days</div>
              <div className="text-sm text-muted-foreground">{absentPercentage}% of total days</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Late</CardTitle>
              <CardDescription>Days marked as late</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{lateDays} days</div>
              <div className="text-sm text-muted-foreground">{latePercentage}% of total days</div>
            </CardContent>
          </Card>
        </div>
        
        {/* Weekly Attendance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Attendance</CardTitle>
            <CardDescription>Your attendance pattern for the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={weeklyAttendance}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" stackId="a" fill="#10b981" name="Present" />
                  <Bar dataKey="late" stackId="a" fill="#f59e0b" name="Late" />
                  <Bar dataKey="absent" stackId="a" fill="#ef4444" name="Absent" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Monthly Attendance Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Attendance</CardTitle>
            <CardDescription>Your attendance pattern for the past 5 months</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyAttendance}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" fill="#10b981" name="Present" />
                  <Bar dataKey="absent" fill="#ef4444" name="Absent" />
                  <Bar dataKey="late" fill="#f59e0b" name="Late" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Analytics;
