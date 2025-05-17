
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import AttendanceSummary from '@/components/dashboard/AttendanceSummary';
import AttendanceStats from '@/components/dashboard/AttendanceStats';
import StudentList from '@/components/dashboard/StudentList';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  // Check if user is logged in and is an admin
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    
    const user = JSON.parse(userData);
    if (user.role !== 'admin') {
      navigate('/');
    }
  }, [navigate]);

  // Sample attendance data
  const attendanceData = [
    { day: 'Mon', checkedIn: 95, checkedOut: 92, absent: 5 },
    { day: 'Tue', checkedIn: 90, checkedOut: 88, absent: 10 },
    { day: 'Wed', checkedIn: 98, checkedOut: 97, absent: 2 },
    { day: 'Thu', checkedIn: 92, checkedOut: 90, absent: 8 },
    { day: 'Fri', checkedIn: 88, checkedOut: 85, absent: 12 },
    { day: 'Sat', checkedIn: 80, checkedOut: 78, absent: 20 },
    { day: 'Sun', checkedIn: 75, checkedOut: 72, absent: 25 },
  ];

  const attendanceStatusData = [
    { name: 'Present', value: 456, color: '#4CAF50' },
    { name: 'Absent', value: 44, color: '#ea384c' },
    { name: 'Leave', value: 12, color: '#9b87f5' },
    { name: 'Late', value: 22, color: '#FF9800' },
  ];

  const totalStudents = 500;
  
  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex space-x-2">
          <Button onClick={() => setActiveTab('overview')} variant={activeTab === 'overview' ? 'default' : 'outline'}>
            Overview
          </Button>
          <Button onClick={() => setActiveTab('students')} variant={activeTab === 'students' ? 'default' : 'outline'}>
            Students
          </Button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <>
          <AttendanceSummary totalStudents={totalStudents} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={attendanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="checkedIn" name="Checked In" fill="#4CAF50" />
                      <Bar dataKey="checkedOut" name="Checked Out" fill="#2196F3" />
                      <Bar dataKey="absent" name="Absent" fill="#ea384c" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Attendance Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={attendanceStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {attendanceStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} students`, '']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <AttendanceStats />
        </>
      ) : (
        <StudentList />
      )}
    </MainLayout>
  );
};

export default Dashboard;
