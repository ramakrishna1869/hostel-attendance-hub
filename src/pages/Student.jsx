
import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Check, Clock } from 'lucide-react';

const Student = () => {
  const { toast } = useToast();
  const [student, setStudent] = useState({
    id: 'S001',
    name: 'Rahul Sharma',
    email: 'rahul.s@example.com',
    roomNumber: '101',
    hostelName: 'Block A',
    phone: '9812345670',
  });
  
  // In a real app, this would come from your API
  const [attendanceToday, setAttendanceToday] = useState({
    date: new Date().toLocaleDateString(),
    hasCheckedIn: false,
    hasCheckedOut: false,
    checkInTime: null,
    checkOutTime: null,
  });
  
  // Sample attendance history - in a real app, this would come from your API
  const [attendanceHistory, setAttendanceHistory] = useState([
    { 
      date: '17-05-2025', 
      status: 'present', 
      checkInTime: '08:05 AM', 
      checkOutTime: '06:15 PM',
      remarks: '-'
    },
    { 
      date: '16-05-2025', 
      status: 'absent', 
      checkInTime: '-', 
      checkOutTime: '-',
      remarks: 'Not in hostel'
    },
    { 
      date: '15-05-2025', 
      status: 'late', 
      checkInTime: '09:45 AM', 
      checkOutTime: '05:30 PM',
      remarks: 'Reported late'
    },
    { 
      date: '14-05-2025', 
      status: 'present', 
      checkInTime: '08:10 AM', 
      checkOutTime: '06:20 PM',
      remarks: '-'
    },
    { 
      date: '13-05-2025', 
      status: 'present', 
      checkInTime: '08:00 AM', 
      checkOutTime: '06:10 PM',
      remarks: '-'
    },
    { 
      date: '12-05-2025', 
      status: 'leave', 
      checkInTime: '-', 
      checkOutTime: '-',
      remarks: 'Family event'
    },
    { 
      date: '11-05-2025', 
      status: 'leave', 
      checkInTime: '-', 
      checkOutTime: '-',
      remarks: 'Family event'
    },
  ]);
  
  // Check if the current time is within the range (7 AM - 9 AM for on-time check-in)
  const isLateCheckIn = () => {
    const now = new Date();
    const hours = now.getHours();
    return hours >= 9; // After 9 AM is considered late
  };
  
  const handleCheckIn = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const isLate = isLateCheckIn();
    
    // In a real app, you would call your API to record the check-in
    // POST /api/attendance/checkin
    
    setAttendanceToday({
      ...attendanceToday,
      hasCheckedIn: true,
      checkInTime: formattedTime,
    });
    
    // Add this check-in to today's history
    const today = new Date().toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric' 
    }).split('/').join('-');
    
    const newEntry = {
      date: today,
      status: isLate ? 'late' : 'present',
      checkInTime: formattedTime,
      checkOutTime: '-',
      remarks: isLate ? 'Reported late' : '-'
    };
    
    setAttendanceHistory([newEntry, ...attendanceHistory]);
    
    toast({
      title: "Check-in Successful",
      description: `You checked in at ${formattedTime}${isLate ? ' (Late)' : ''}`,
      variant: isLate ? "destructive" : "default",
    });
  };
  
  const handleCheckOut = () => {
    const now = new Date();
    const formattedTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // In a real app, you would call your API to record the check-out
    // POST /api/attendance/checkout
    
    setAttendanceToday({
      ...attendanceToday,
      hasCheckedOut: true,
      checkOutTime: formattedTime,
    });
    
    // Update today's history with check-out time
    const updatedHistory = [...attendanceHistory];
    if (updatedHistory.length > 0) {
      updatedHistory[0].checkOutTime = formattedTime;
      setAttendanceHistory(updatedHistory);
    }
    
    toast({
      title: "Check-out Successful",
      description: `You checked out at ${formattedTime}`,
    });
  };
  
  // Get attendance status badge
  const getStatusBadge = (status) => {
    let color = 'bg-gray-100 text-gray-800';
    
    switch (status) {
      case 'present':
        color = 'bg-green-100 text-green-800';
        break;
      case 'absent':
        color = 'bg-red-100 text-red-800';
        break;
      case 'late':
        color = 'bg-yellow-100 text-yellow-800';
        break;
      case 'leave':
        color = 'bg-blue-100 text-blue-800';
        break;
      default:
        color = 'bg-gray-100 text-gray-800';
    }
    
    return (
      <Badge className={color + ' hover:bg-opacity-90'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Student Information */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Name</p>
                <p className="font-medium">{student.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                <p>{student.id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Room Number</p>
                <p>{student.roomNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Hostel</p>
                <p>{student.hostelName}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Email</p>
                <p>{student.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Phone</p>
                <p>{student.phone}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Today's Attendance */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
              <CardDescription>
                Mark your daily attendance by checking in and out
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-muted-foreground">Date</div>
                  <div className="font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
                
                <div className="flex gap-4">
                  <Button
                    onClick={handleCheckIn}
                    disabled={attendanceToday.hasCheckedIn}
                    className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" />
                    {attendanceToday.hasCheckedIn ? 'Checked In' : 'Check In'}
                  </Button>
                  
                  <Button
                    onClick={handleCheckOut}
                    disabled={!attendanceToday.hasCheckedIn || attendanceToday.hasCheckedOut}
                    className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Clock className="h-4 w-4" />
                    {attendanceToday.hasCheckedOut ? 'Checked Out' : 'Check Out'}
                  </Button>
                </div>
              </div>
              
              {/* Attendance Status */}
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Check-in Time</p>
                    <p className="font-medium">
                      {attendanceToday.checkInTime ? attendanceToday.checkInTime : 'Not checked in yet'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Check-out Time</p>
                    <p className="font-medium">
                      {attendanceToday.checkOutTime ? attendanceToday.checkOutTime : 'Not checked out yet'}
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <div className="font-medium">
                      {attendanceToday.hasCheckedIn ? 
                        getStatusBadge(isLateCheckIn() && !attendanceHistory.some(a => a.date === new Date().toLocaleDateString('en-GB', {day: '2-digit', month: '2-digit', year: 'numeric'}).split('/').join('-')) ? 'late' : 'present') : 
                        getStatusBadge('absent')}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Attendance History */}
        <Card>
          <CardHeader>
            <CardTitle>Attendance History</CardTitle>
            <CardDescription>Your check-in and check-out records</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Check-in Time</TableHead>
                  <TableHead>Check-out Time</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendanceHistory.map((record, index) => (
                  <TableRow key={index}>
                    <TableCell>{record.date}</TableCell>
                    <TableCell>{getStatusBadge(record.status)}</TableCell>
                    <TableCell>{record.checkInTime}</TableCell>
                    <TableCell>{record.checkOutTime}</TableCell>
                    <TableCell>{record.remarks}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Student;
