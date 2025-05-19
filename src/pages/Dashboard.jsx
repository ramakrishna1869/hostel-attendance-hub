
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import AttendanceSummary from '@/components/dashboard/AttendanceSummary';
import AttendanceStats from '@/components/dashboard/AttendanceStats';
import StudentList from '@/components/dashboard/StudentList';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [dataAvailable, setDataAvailable] = useState(false);
  const totalStudents = 158; // Demo value

  // Sample attendance data for charts
  const attendanceData = [
    { day: 'Mon', checkedIn: 150, checkedOut: 148, absent: 8 },
    { day: 'Tue', checkedIn: 147, checkedOut: 145, absent: 11 },
    { day: 'Wed', checkedIn: 151, checkedOut: 149, absent: 7 },
    { day: 'Thu', checkedIn: 153, checkedOut: 151, absent: 5 },
    { day: 'Fri', checkedIn: 145, checkedOut: 140, absent: 13 },
  ];

  const attendanceStatusData = [
    { name: 'Present', value: 142, color: '#4CAF50' },
    { name: 'Absent', value: 8, color: '#F44336' },
    { name: 'On Leave', value: 3, color: '#2196F3' },
    { name: 'Late', value: 5, color: '#FF9800' },
  ];

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

  // Simulate API loading
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // In production, this would fetch from your backend API
        // const response = await fetch('/api/dashboard');
        // const data = await response.json();
        
        // For demonstration, simulate loading data
        setTimeout(() => {
          setLoading(false);
          setDataAvailable(true);
        }, 1000);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
        setDataAvailable(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleViewAllStudents = () => {
    navigate('/students');
  };
  
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

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-lg">Loading data...</span>
        </div>
      ) : activeTab === 'overview' ? (
        <>
          <AttendanceSummary totalStudents={totalStudents} />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {dataAvailable ? (
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
                ) : (
                  <div className="flex items-center justify-center h-80">
                    <p className="text-muted-foreground">No attendance data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Attendance Status</CardTitle>
              </CardHeader>
              <CardContent>
                {dataAvailable ? (
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
                ) : (
                  <div className="flex items-center justify-center h-80">
                    <p className="text-muted-foreground">No status data available</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <AttendanceStats />

          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Student Activity</h2>
              <Button variant="outline" onClick={handleViewAllStudents}>
                View All Students
              </Button>
            </div>
            <Card>
              <CardContent className="p-4">
                <StudentList />
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="p-4">
            <StudentList />
          </CardContent>
        </Card>
      )}
    </MainLayout>
  );
};

export default Dashboard;
