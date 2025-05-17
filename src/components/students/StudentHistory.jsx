
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  LineChart, 
  PieChart,
  Pie,
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Bar, 
  Line 
} from 'recharts';

const StudentHistory = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [timeRange, setTimeRange] = useState('week');
  const [loading, setLoading] = useState(true);
  
  // Sample Indian student data
  const studentsData = [
    { id: '1', name: 'Rahul Sharma', roomNumber: '101', status: 'present', markedTime: '08:15 AM', attendancePercentage: '95%' },
    { id: '2', name: 'Priya Patel', roomNumber: '102', status: 'present', markedTime: '08:05 AM', attendancePercentage: '92%' },
    { id: '3', name: 'Amit Kumar', roomNumber: '103', status: 'absent', markedTime: '-', attendancePercentage: '78%' },
    { id: '4', name: 'Neha Gupta', roomNumber: '104', status: 'leave', markedTime: '-', attendancePercentage: '85%' },
    { id: '5', name: 'Karthik Reddy', roomNumber: '105', status: 'late', markedTime: '10:20 AM', attendancePercentage: '88%' },
    { id: '6', name: 'Anjali Singh', roomNumber: '201', status: 'present', markedTime: '07:55 AM', attendancePercentage: '97%' },
    { id: '7', name: 'Rajesh Verma', roomNumber: '202', status: 'present', markedTime: '08:10 AM', attendancePercentage: '94%' },
    { id: '8', name: 'Sneha Mishra', roomNumber: '203', status: 'absent', markedTime: '-', attendancePercentage: '79%' },
    { id: '9', name: 'Deepak Joshi', roomNumber: '204', status: 'late', markedTime: '09:45 AM', attendancePercentage: '83%' },
    { id: '10', name: 'Ayesha Khan', roomNumber: '205', status: 'present', markedTime: '08:00 AM', attendancePercentage: '96%' },
  ];
  
  // Sample history data - weekly
  const weeklyHistory = [
    { date: 'May 10', status: 'present', markedTime: '08:12 AM', remarks: '-' },
    { date: 'May 11', status: 'present', markedTime: '08:05 AM', remarks: '-' },
    { date: 'May 12', status: 'present', markedTime: '08:20 AM', remarks: '-' },
    { date: 'May 13', status: 'absent', markedTime: '-', remarks: 'Not in hostel' },
    { date: 'May 14', status: 'present', markedTime: '08:07 AM', remarks: '-' },
    { date: 'May 15', status: 'leave', markedTime: '-', remarks: 'Family event' },
    { date: 'May 16', status: 'present', markedTime: '08:10 AM', remarks: '-' },
  ];
  
  // Monthly history data
  const monthlyHistory = Array(30).fill(0).map((_, i) => {
    const day = i + 1;
    const date = `May ${day}`;
    const rand = Math.random();
    let status = 'present';
    let markedTime = `08:${Math.floor(Math.random() * 30).toString().padStart(2, '0')} AM`;
    let remarks = '-';
    
    if (rand < 0.1) {
      status = 'absent';
      markedTime = '-';
      remarks = 'Not present during roll call';
    } else if (rand < 0.18) {
      status = 'leave';
      markedTime = '-';
      remarks = 'Approved leave';
    }
    
    return { date, status, markedTime, remarks };
  });
  
  // Chart data - monthly attendance
  const monthlyChartData = [
    { month: 'Jan', present: 19, absent: 3, leave: 9 },
    { month: 'Feb', present: 18, absent: 2, leave: 8 },
    { month: 'Mar', present: 20, absent: 0, leave: 11 },
    { month: 'Apr', present: 18, absent: 2, leave: 10 },
    { month: 'May', present: 16, absent: 2, leave: 4 }
  ];
  
  // Weekly presence data
  const weeklyPresenceData = [
    { date: 'May 10', status: 'present' }, 
    { date: 'May 11', status: 'present' }, 
    { date: 'May 12', status: 'present' }, 
    { date: 'May 13', status: 'absent' },   
    { date: 'May 14', status: 'present' }, 
    { date: 'May 15', status: 'leave' }, 
    { date: 'May 16', status: 'present' }  
  ];
  
  // Attendance distribution data for pie chart
  const statusDistribution = [
    { name: 'Present', value: 23, color: '#4CAF50' },
    { name: 'Absent', value: 3, color: '#ea384c' },
    { name: 'Leave', value: 4, color: '#9b87f5' },
  ];
  
  // Find the student by ID
  useEffect(() => {
    const foundStudent = studentsData.find(s => s.id === id);
    setStudent(foundStudent);
    setLoading(false);
  }, [id]);
  
  // Get current history data based on the selected time range
  const getCurrentHistoryData = () => {
    return timeRange === 'week' ? weeklyHistory : monthlyHistory;
  };
  
  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }
  
  if (!student) {
    return <div className="text-center py-8">Student not found</div>;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Attendance History: {student.name}</h2>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export History</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Room Number</div>
            <div className="text-2xl font-bold">{student.roomNumber}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Attendance</div>
            <div className="text-2xl font-bold">{student.attendancePercentage}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Current Status</div>
            <div className={`text-2xl font-bold ${
              student.status === 'present' ? 'text-green-600' : 
              student.status === 'absent' ? 'text-red-600' :
              student.status === 'leave' ? 'text-blue-600' : 'text-yellow-600'
            }`}>
              {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Attendance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="present" name="Present" fill="#4CAF50" />
                  <Bar dataKey="absent" name="Absent" fill="#ea384c" />
                  <Bar dataKey="leave" name="Leave" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({name, value, percent}) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b text-xs font-medium text-muted-foreground">
                  <th className="py-3 px-4 text-left">Date</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Marked Time</th>
                  <th className="py-3 px-4 text-left">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentHistoryData().map((record, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{record.date}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        record.status === 'present' ? 'bg-green-100 text-green-800' : 
                        record.status === 'absent' ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">{record.markedTime}</td>
                    <td className="py-3 px-4">{record.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentHistory;
