
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const StudentAnalyticsPage = () => {
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, fetch from API
    // For now, we'll simulate API response
    setTimeout(() => {
      const mockedData = {
        dailyAttendance: [
          { date: '05/01', status: 'present' },
          { date: '05/02', status: 'present' },
          { date: '05/03', status: 'absent' },
          { date: '05/04', status: 'present' },
          { date: '05/05', status: 'present' },
          { date: '05/06', status: 'late' },
          { date: '05/07', status: 'present' },
          { date: '05/08', status: 'present' },
          { date: '05/09', status: 'present' },
          { date: '05/10', status: 'absent' },
          { date: '05/11', status: 'present' },
          { date: '05/12', status: 'present' },
          { date: '05/13', status: 'present' },
          { date: '05/14', status: 'present' },
          { date: '05/15', status: 'present' },
          { date: '05/16', status: 'present' },
          { date: '05/17', status: 'present' },
          { date: '05/18', status: 'present' },
          { date: '05/19', status: 'late' },
          { date: '05/20', status: 'present' },
          { date: '05/21', status: 'present' },
          { date: '05/22', status: 'present' },
          { date: '05/23', status: 'absent' },
          { date: '05/24', status: 'present' },
          { date: '05/25', status: 'present' },
          { date: '05/26', status: 'present' },
          { date: '05/27', status: 'present' },
          { date: '05/28', status: 'present' },
          { date: '05/29', status: 'present' },
          { date: '05/30', status: 'present' },
        ],
        summary: {
          present: 25,
          absent: 3,
          late: 2,
          bestStreak: 9,
          currentStreak: 6,
        },
        missedDays: [
          { date: 'May 3, 2023', reason: 'No check-in recorded' },
          { date: 'May 10, 2023', reason: 'No check-in recorded' },
          { date: 'May 23, 2023', reason: 'No check-in recorded' },
        ]
      };
      
      setAttendanceData(mockedData);
      setLoading(false);
    }, 1000);
    
    // In a real app:
    /*
    fetch('/api/attendance/history')
      .then(res => res.json())
      .then(data => {
        setAttendanceData(data);
      })
      .catch(err => {
        console.error('Error fetching attendance history:', err);
        toast({
          title: "Error",
          description: "Could not load your attendance history",
          variant: "destructive"
        });
      })
      .finally(() => {
        setLoading(false);
      });
    */
  }, []);
  
  // Transform data for charts
  const getBarChartData = () => {
    if (!attendanceData) return [];
    
    // Group by 5 days for better display
    const groupedData = [];
    for (let i = 0; i < attendanceData.dailyAttendance.length; i += 5) {
      const chunk = attendanceData.dailyAttendance.slice(i, i + 5);
      const present = chunk.filter(day => day.status === 'present').length;
      const absent = chunk.filter(day => day.status === 'absent').length;
      const late = chunk.filter(day => day.status === 'late').length;
      
      groupedData.push({
        dateRange: `${chunk[0].date} - ${chunk[chunk.length-1].date}`,
        present,
        absent,
        late
      });
    }
    
    return groupedData;
  };
  
  const getPieChartData = () => {
    if (!attendanceData) return [];
    
    return [
      { name: 'Present', value: attendanceData.summary.present, color: '#10b981' },
      { name: 'Absent', value: attendanceData.summary.absent, color: '#ef4444' },
      { name: 'Late', value: attendanceData.summary.late, color: '#f59e0b' },
    ];
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p>Loading your analytics...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (!attendanceData) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p>No attendance data found</p>
        </div>
      </MainLayout>
    );
  }
  
  const total = attendanceData.summary.present + attendanceData.summary.absent + attendanceData.summary.late;
  const attendancePercentage = Math.round((attendanceData.summary.present / total) * 100);
  
  return (
    <MainLayout>
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">My Attendance Analytics</h1>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Attendance Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{attendancePercentage}%</div>
              <p className="text-sm text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Present Days</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{attendanceData.summary.present}</div>
              <p className="text-sm text-muted-foreground">Out of {total} days</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Best Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{attendanceData.summary.bestStreak} days</div>
              <p className="text-sm text-muted-foreground">Consecutive attendance</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Current Streak</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-yellow-600">{attendanceData.summary.currentStreak} days</div>
              <p className="text-sm text-muted-foreground">Keep it up!</p>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Attendance</CardTitle>
              <CardDescription>Last 30 days attendance pattern</CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getBarChartData()}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dateRange" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" name="Present" fill="#10b981" />
                  <Bar dataKey="late" name="Late" fill="#f59e0b" />
                  <Bar dataKey="absent" name="Absent" fill="#ef4444" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Attendance Distribution</CardTitle>
              <CardDescription>Overall attendance breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getPieChartData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {getPieChartData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Missed Days */}
        <Card>
          <CardHeader>
            <CardTitle>Missed Days This Month</CardTitle>
            <CardDescription>Days you were marked absent</CardDescription>
          </CardHeader>
          <CardContent>
            {attendanceData.missedDays.length > 0 ? (
              <ul className="divide-y">
                {attendanceData.missedDays.map((day, index) => (
                  <li key={index} className="py-3 flex justify-between items-center">
                    <span>{day.date}</span>
                    <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
                      {day.reason}
                    </Badge>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center py-4 text-muted-foreground">
                No missed days this month. Great job!
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default StudentAnalyticsPage;
