
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import MainLayout from '@/components/layouts/MainLayout';
import ClockDisplay from '@/components/student/ClockDisplay';
import StatusMessage from '@/components/student/StatusMessage';
import CheckInOutButton from '@/components/student/CheckInOutButton';
import { Card, CardContent } from '@/components/ui/card';

const AttendancePage = () => {
  const { toast } = useToast();
  const [attendanceStatus, setAttendanceStatus] = useState({
    checkedIn: false,
    checkedOut: false,
    checkInTime: null,
    checkOutTime: null,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // In a real app, this would fetch from your backend API
    // For now, we'll use localStorage to simulate
    fetchTodayAttendance();
  }, []);

  const fetchTodayAttendance = () => {
    setLoading(true);
    
    // Simulate API call with localStorage
    setTimeout(() => {
      const storedAttendance = localStorage.getItem('todayAttendance');
      if (storedAttendance) {
        const attendance = JSON.parse(storedAttendance);
        const today = new Date().toDateString();
        
        // Only use attendance data if it's from today
        if (attendance.date === today) {
          setAttendanceStatus({
            checkedIn: !!attendance.checkInTime,
            checkedOut: !!attendance.checkOutTime,
            checkInTime: attendance.checkInTime,
            checkOutTime: attendance.checkOutTime
          });
        }
      }
      setLoading(false);
    }, 500);
    
    // In a real app, this would be:
    /*
    axios.get('/api/attendance/today')
      .then(response => {
        setAttendanceStatus({
          checkedIn: !!response.data.checkInTime,
          checkedOut: !!response.data.checkOutTime,
          checkInTime: response.data.checkInTime,
          checkOutTime: response.data.checkOutTime
        });
      })
      .catch(error => {
        console.error('Error fetching attendance:', error);
        toast({
          title: "Error",
          description: "Could not fetch today's attendance",
          variant: "destructive"
        });
      })
      .finally(() => {
        setLoading(false);
      });
    */
  };

  const handleCheckIn = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const now = new Date();
      const checkInTime = now.toLocaleTimeString();
      
      // Save to localStorage for demo
      const todayAttendance = {
        date: now.toDateString(),
        checkInTime: checkInTime,
        checkOutTime: null,
        status: now.getHours() >= 9 ? "Late" : "Present"
      };
      
      localStorage.setItem('todayAttendance', JSON.stringify(todayAttendance));
      
      setAttendanceStatus({
        checkedIn: true,
        checkedOut: false,
        checkInTime: checkInTime,
        checkOutTime: null
      });
      
      toast({
        title: "Checked In",
        description: `You've successfully checked in at ${checkInTime}`,
      });
      
      setLoading(false);
    }, 800);
    
    // In a real app:
    /*
    axios.post('/api/attendance/checkin')
      .then(response => {
        setAttendanceStatus({
          checkedIn: true,
          checkedOut: false,
          checkInTime: response.data.checkInTime,
          checkOutTime: null
        });
        
        toast({
          title: "Checked In",
          description: `You've successfully checked in at ${response.data.checkInTime}`,
        });
      })
      .catch(error => {
        console.error('Error checking in:', error);
        toast({
          title: "Error",
          description: error.response?.data?.message || "Could not check in",
          variant: "destructive"
        });
      })
      .finally(() => {
        setLoading(false);
      });
    */
  };

  const handleCheckOut = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const now = new Date();
      const checkOutTime = now.toLocaleTimeString();
      
      // Get existing data and update
      const existingData = JSON.parse(localStorage.getItem('todayAttendance') || '{}');
      const updatedAttendance = {
        ...existingData,
        checkOutTime: checkOutTime
      };
      
      localStorage.setItem('todayAttendance', JSON.stringify(updatedAttendance));
      
      setAttendanceStatus(prev => ({
        ...prev,
        checkedOut: true,
        checkOutTime: checkOutTime
      }));
      
      toast({
        title: "Checked Out",
        description: `You've successfully checked out at ${checkOutTime}`,
      });
      
      setLoading(false);
    }, 800);
    
    // In a real app:
    /*
    axios.post('/api/attendance/checkout')
      .then(response => {
        setAttendanceStatus(prev => ({
          ...prev,
          checkedOut: true,
          checkOutTime: response.data.checkOutTime
        }));
        
        toast({
          title: "Checked Out",
          description: `You've successfully checked out at ${response.data.checkOutTime}`,
        });
      })
      .catch(error => {
        console.error('Error checking out:', error);
        toast({
          title: "Error",
          description: error.response?.data?.message || "Could not check out",
          variant: "destructive"
        });
      })
      .finally(() => {
        setLoading(false);
      });
    */
  };

  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-6">
                <h1 className="text-xl font-bold">Today's Attendance</h1>
                
                <ClockDisplay />
                
                <div className="w-full pt-4">
                  <CheckInOutButton 
                    checkedIn={attendanceStatus.checkedIn}
                    checkedOut={attendanceStatus.checkedOut}
                    onCheckIn={handleCheckIn}
                    onCheckOut={handleCheckOut}
                    loading={loading}
                  />
                </div>
                
                <StatusMessage 
                  checkedIn={attendanceStatus.checkedIn}
                  checkedOut={attendanceStatus.checkedOut}
                  checkInTime={attendanceStatus.checkInTime}
                  checkOutTime={attendanceStatus.checkOutTime}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AttendancePage;
