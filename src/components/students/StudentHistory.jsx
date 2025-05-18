
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  LineChart, 
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
    { id: '1', name: 'Rahul Sharma', roomNumber: '101', status: 'present', checkInTime: '08:15 AM', checkOutTime: '05:30 PM', attendancePercentage: '95%' },
    { id: '2', name: 'Priya Patel', roomNumber: '102', status: 'present', checkInTime: '08:05 AM', checkOutTime: '05:45 PM', attendancePercentage: '92%' },
    { id: '3', name: 'Amit Kumar', roomNumber: '103', status: 'absent', checkInTime: '-', checkOutTime: '-', attendancePercentage: '78%' },
    { id: '4', name: 'Neha Gupta', roomNumber: '104', status: 'leave', checkInTime: '-', checkOutTime: '-', attendancePercentage: '85%' },
    { id: '5', name: 'Karthik Reddy', roomNumber: '105', status: 'late', checkInTime: '10:20 AM', checkOutTime: '06:15 PM', attendancePercentage: '88%' },
    { id: '6', name: 'Anjali Singh', roomNumber: '201', status: 'present', checkInTime: '07:55 AM', checkOutTime: '05:10 PM', attendancePercentage: '97%' },
    { id: '7', name: 'Rajesh Verma', roomNumber: '202', status: 'present', checkInTime: '08:10 AM', checkOutTime: '05:25 PM', attendancePercentage: '94%' },
    { id: '8', name: 'Sneha Mishra', roomNumber: '203', status: 'absent', checkInTime: '-', checkOutTime: '-', attendancePercentage: '79%' },
    { id: '9', name: 'Deepak Joshi', roomNumber: '204', status: 'late', checkInTime: '09:45 AM', checkOutTime: '06:00 PM', attendancePercentage: '83%' },
    { id: '10', name: 'Ayesha Khan', roomNumber: '205', status: 'present', checkInTime: '08:00 AM', checkOutTime: '05:15 PM', attendancePercentage: '96%' },
  ];
  
  // Sample history data - weekly
  const weeklyHistory = [
    { date: 'May 10', status: 'present', checkIn: '08:12 AM', checkOut: '05:25 PM' },
    { date: 'May 11', status: 'present', checkIn: '08:05 AM', checkOut: '05:30 PM' },
    { date: 'May 12', status: 'present', checkIn: '08:20 AM', checkOut: '05:15 PM' },
    { date: 'May 13', status: 'absent', checkIn: '-', checkOut: '-' },
    { date: 'May 14', status: 'present', checkIn: '08:07 AM', checkOut: '05:40 PM' },
    { date: 'May 15', status: 'late', checkIn: '09:45 AM', checkOut: '06:00 PM' },
    { date: 'May 16', status: 'present', checkIn: '08:10 AM', checkOut: '05:35 PM' },
  ];
  
  // Monthly history data
  const monthlyHistory = Array(30).fill(0).map((_, i) => {
    const day = i + 1;
    const date = `May ${day}`;
    const rand = Math.random();
    let status = 'present';
    let checkIn = `08:${Math.floor(Math.random() * 30).toString().padStart(2, '0')} AM`;
    let checkOut = `05:${Math.floor(Math.random() * 45).toString().padStart(2, '0')} PM`;
    
    if (rand < 0.1) {
      status = 'absent';
      checkIn = '-';
      checkOut = '-';
    } else if (rand < 0.15) {
      status = 'late';
      checkIn = `09:${Math.floor(Math.random() * 30).toString().padStart(2, '0')} AM`;
    } else if (rand < 0.18) {
      status = 'leave';
      checkIn = '-';
      checkOut = '-';
    }
    
    return { date, status, checkIn, checkOut };
  });
  
  // Chart data - monthly attendance
  const monthlyChartData = [
    { month: 'Jan', present: 19, absent: 3, late: 1, leave: 0 },
    { month: 'Feb', present: 18, absent: 2, late: 1, leave: 1 },
    { month: 'Mar', present: 20, absent: 0, late: 2, leave: 0 },
    { month: 'Apr', present: 18, absent: 2, late: 0, leave: 2 },
    { month: 'May', present: 16, absent: 2, late: 1, leave: 0 }
  ];
  
  // Check-in time trend data
  const checkInTrendData = [
    { date: 'May 10', time: 492 }, // 8:12 AM in minutes
    { date: 'May 11', time: 485 }, // 8:05 AM
    { date: 'May 12', time: 500 }, // 8:20 AM
    { date: 'May 13', time: 0 },   // Absent
    { date: 'May 14', time: 487 }, // 8:07 AM
    { date: 'May 15', time: 585 }, // 9:45 AM
    { date: 'May 16', time: 490 }  // 8:10 AM
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
                  <Bar dataKey="late" name="Late" fill="#FF9800" />
                  <Bar dataKey="leave" name="Leave" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Check-in Time Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={checkInTrendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[480, 600]} tickFormatter={(value) => {
                    const hours = Math.floor(value / 60);
                    const minutes = value % 60;
                    return `${hours}:${minutes.toString().padStart(2, '0')}`;
                  }} />
                  <Tooltip formatter={(value) => {
                    if (value === 0) return "Absent";
                    const hours = Math.floor(value / 60);
                    const minutes = value % 60;
                    return [`${hours}:${minutes.toString().padStart(2, '0')} AM`, "Check-in time"];
                  }} />
                  <Legend />
                  <Line type="monotone" dataKey="time" name="Check-in Time" stroke="#2196F3" activeDot={{ r: 8 }} />
                </LineChart>
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
                  <th className="py-3 px-4 text-left">Check-in</th>
                  <th className="py-3 px-4 text-left">Check-out</th>
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
                        record.status === 'leave' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">{record.checkIn}</td>
                    <td className="py-3 px-4">{record.checkOut}</td>
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
