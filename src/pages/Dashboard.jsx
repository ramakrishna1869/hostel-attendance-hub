
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [attendanceData, setAttendanceData] = useState([]);
  const [attendanceStatusData, setAttendanceStatusData] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [recentActivity, setRecentActivity] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);

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

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // In production, this would fetch from your backend API
        // const response = await fetch('/api/dashboard');
        // const data = await response.json();
        
        // For now, we'll just simulate the API call and show empty states
        setTimeout(() => {
          setLoading(false);
          setDataAvailable(false); // Set to true when your API is ready
        }, 1500);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
        setDataAvailable(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleViewDetails = (student) => {
    navigate(`/students/history/${student.id}`);
  };

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
          {dataAvailable ? (
            <AttendanceSummary totalStudents={totalStudents} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className={`border-l-4 ${
                  index === 0 ? 'border-l-green-500' : 
                  index === 1 ? 'border-l-red-500' : 
                  index === 2 ? 'border-l-primary' : 
                  'border-l-yellow-500'
                }`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {index === 0 ? 'Present' : 
                       index === 1 ? 'Absent' : 
                       index === 2 ? 'On Leave' : 
                       'Late Check-in'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-6 text-muted-foreground">
                      Data will appear here once available
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Attendance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {dataAvailable && attendanceData.length > 0 ? (
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
                {dataAvailable && attendanceStatusData.length > 0 ? (
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
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Attendance Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {dataAvailable && recentActivity.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b text-xs font-medium text-muted-foreground">
                        <th className="py-3 px-4 text-left">Student</th>
                        <th className="py-3 px-4 text-left">Room</th>
                        <th className="py-3 px-4 text-left">Status</th>
                        <th className="py-3 px-4 text-left">Time</th>
                        <th className="py-3 px-4 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentActivity.map((activity) => (
                        <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 px-4">{activity.studentName}</td>
                          <td className="py-3 px-4">{activity.roomNumber}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                              activity.action === 'Checked In' ? 'bg-green-100 text-green-800' : 
                              activity.action === 'Checked Out' ? 'bg-blue-100 text-blue-800' : 
                              activity.action === 'Absent' ? 'bg-red-100 text-red-800' : 
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {activity.action}
                            </span>
                          </td>
                          <td className="py-3 px-4">{activity.time}</td>
                          <td className="py-3 px-4">{activity.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No recent activity available
                </div>
              )}
            </CardContent>
          </Card>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Recent Student Activity</h2>
              <Button variant="outline" onClick={handleViewAllStudents}>
                View All Students
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                {dataAvailable ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="text-left p-4">Name</th>
                          <th className="text-left p-4">Room</th>
                          <th className="text-left p-4">Status</th>
                          <th className="text-left p-4">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan="4" className="text-center py-8 text-muted-foreground">
                            No student activity available
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    No student activity available
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="text-center py-12 text-muted-foreground">
              Student data will appear here once available
            </div>
          </CardContent>
        </Card>
      )}
    </MainLayout>
  );
};

export default Dashboard;
