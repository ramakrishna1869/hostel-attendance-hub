
import { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'recharts';
import { 
  BarChart, 
  LineChart, 
  PieChart, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const StudentReports = () => {
  const [reportType, setReportType] = useState('monthly');
  const [roomFilter, setRoomFilter] = useState('all');
  const [studentFilter, setStudentFilter] = useState('all');
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(1)).toISOString().split('T')[0], // First day of current month
    end: new Date().toISOString().split('T')[0], // Today
  });
  
  // Sample rooms data
  const rooms = ['101', '102', '103', '104', '105', '201', '202', '203', '204', '205'];
  
  // Sample students data (Indian names)
  const students = [
    { id: '1', name: 'Rahul Sharma', room: '101' }, 
    { id: '2', name: 'Priya Patel', room: '102' },
    { id: '3', name: 'Amit Kumar', room: '103' },
    { id: '4', name: 'Neha Gupta', room: '104' },
    { id: '5', name: 'Karthik Reddy', room: '105' },
    { id: '6', name: 'Anjali Singh', room: '201' },
    { id: '7', name: 'Rajesh Verma', room: '202' },
    { id: '8', name: 'Sneha Mishra', room: '203' },
    { id: '9', name: 'Deepak Joshi', room: '204' },
    { id: '10', name: 'Ayesha Khan', room: '205' },
  ];
  
  // Monthly attendance data
  const monthlyData = [
    { month: 'Jan', present: 22, absent: 9, leave: 1 },
    { month: 'Feb', present: 20, absent: 8, leave: 4 },
    { month: 'Mar', present: 23, absent: 7, leave: 1 },
    { month: 'Apr', present: 19, absent: 10, leave: 3 },
    { month: 'May', present: 24, absent: 6, leave: 2 },
    { month: 'Jun', present: 21, absent: 9, leave: 1 },
  ];
  
  // Student-wise attendance data
  const studentWiseData = [
    { name: 'Rahul Sharma', present: 85, absent: 10, leave: 5, total: 100 },
    { name: 'Priya Patel', present: 90, absent: 5, leave: 5, total: 100 },
    { name: 'Amit Kumar', present: 70, absent: 20, leave: 10, total: 100 },
    { name: 'Neha Gupta', present: 82, absent: 12, leave: 6, total: 100 },
    { name: 'Karthik Reddy', present: 88, absent: 8, leave: 4, total: 100 },
  ];
  
  // Room-wise attendance data
  const roomWiseData = [
    { room: '101', present: 88, absent: 8, leave: 4 },
    { room: '102', present: 90, absent: 5, leave: 5 },
    { room: '103', present: 70, absent: 25, leave: 5 },
    { room: '104', present: 82, absent: 12, leave: 6 },
    { room: '105', present: 86, absent: 8, leave: 6 },
    { room: '201', present: 92, absent: 5, leave: 3 },
    { room: '202', present: 88, absent: 6, leave: 6 },
    { room: '203', present: 78, absent: 16, leave: 6 },
    { room: '204', present: 84, absent: 10, leave: 6 },
    { room: '205', present: 90, absent: 6, leave: 4 },
  ];
  
  // Status distribution data
  const statusData = [
    { name: 'Present', value: 456, color: '#4CAF50' },
    { name: 'Absent', value: 44, color: '#ea384c' },
    { name: 'Leave', value: 34, color: '#9b87f5' },
  ];
  
  // Current filtered data based on selection
  const [filteredData, setFilteredData] = useState(monthlyData);
  
  // Update filtered data when filters change
  useEffect(() => {
    let data = [];
    
    if (reportType === 'monthly') {
      data = monthlyData;
    } else if (reportType === 'student') {
      data = studentFilter === 'all' 
        ? studentWiseData 
        : studentWiseData.filter(item => item.name === studentFilter);
    } else if (reportType === 'room') {
      data = roomFilter === 'all'
        ? roomWiseData
        : roomWiseData.filter(item => item.room === roomFilter);
    }
    
    setFilteredData(data);
  }, [reportType, roomFilter, studentFilter]);
  
  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Report Type</label>
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger>
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Monthly Trend</SelectItem>
              <SelectItem value="student">Student-wise</SelectItem>
              <SelectItem value="room">Room-wise</SelectItem>
              <SelectItem value="status">Status Distribution</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {reportType === 'room' && (
          <div>
            <label className="block text-sm font-medium mb-1">Room</label>
            <Select value={roomFilter} onValueChange={setRoomFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select room" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Rooms</SelectItem>
                {rooms.map(room => (
                  <SelectItem key={room} value={room}>Room {room}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {reportType === 'student' && (
          <div>
            <label className="block text-sm font-medium mb-1">Student</label>
            <Select value={studentFilter} onValueChange={setStudentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Select student" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                {students.map(student => (
                  <SelectItem key={student.id} value={student.name}>{student.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <Input 
            type="date" 
            value={dateRange.start} 
            onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <Input 
            type="date" 
            value={dateRange.end} 
            onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
          />
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button>Generate Report</Button>
      </div>
      
      {/* Charts based on selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reportType === 'monthly' && (
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Attendance Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
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
        )}
        
        {reportType === 'student' && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Student Attendance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="present" name="Present" stroke="#4CAF50" />
                      <Line type="monotone" dataKey="absent" name="Absent" stroke="#ea384c" />
                      <Line type="monotone" dataKey="leave" name="Leave" stroke="#9b87f5" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Attendance Percentage</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center items-center h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={filteredData.map(student => ({
                        name: student.name,
                        value: (student.present / student.total) * 100,
                        color: `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
                      }))}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, value}) => `${name}: ${value.toFixed(0)}%`}
                    >
                      {filteredData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={`hsl(${index * 45 % 360}, 70%, 50%)`} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value.toFixed(0)}%`, 'Attendance']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        )}
        
        {reportType === 'room' && (
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Room-wise Attendance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="room" />
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
        )}
        
        {reportType === 'status' && (
          <Card className="col-span-1 lg:col-span-2">
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({name, value}) => `${name}: ${value}`}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} students`, '']} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Students</div>
            <div className="text-2xl font-bold">125</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Present Today</div>
            <div className="text-2xl font-bold text-green-600">98</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Absent Today</div>
            <div className="text-2xl font-bold text-red-600">18</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">On Leave</div>
            <div className="text-2xl font-bold text-blue-600">9</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentReports;
