
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Clock } from 'lucide-react';

const StudentInfoPage = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch user data from API
    // For now, we'll use localStorage and simulate API call
    setTimeout(() => {
      const userString = localStorage.getItem('user');
      if (userString) {
        const userData = JSON.parse(userString);
        
        // Add additional simulated data
        const enhancedData = {
          ...userData,
          roomNumber: userData.roomNumber || '201',
          rollNumber: userData.id || 'S2023001',
          lastCheckIn: '08:15 AM today',
          lastCheckOut: '06:30 PM yesterday',
          totalPresent: 28,
          totalAbsent: 2,
          attendancePercentage: '93%',
          profilePicture: null
        };
        
        setStudent(enhancedData);
      }
      setLoading(false);
    }, 800);
    
    // In a real app:
    /*
    fetch('/api/student/profile')
      .then(res => res.json())
      .then(data => {
        setStudent(data);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
        toast({
          title: "Error",
          description: "Could not load your profile information",
          variant: "destructive"
        });
      })
      .finally(() => {
        setLoading(false);
      });
    */
  }, []);
  
  const getUserInitials = () => {
    if (!student || !student.name) return 'S';
    
    const nameParts = student?.name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return nameParts[0][0];
  };
  
  const handleEditProfile = () => {
    toast({
      title: "Edit Profile",
      description: "This feature is currently disabled",
    });
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p>Loading profile information...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (!student) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p>No profile information found</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">My Information</h1>
          <Button onClick={handleEditProfile} variant="outline" disabled>
            Edit Profile
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-primary text-white text-xl">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <CardTitle className="text-xl">{student.name}</CardTitle>
              <CardDescription>{student.email}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                <p>{student.rollNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Room Number</p>
                <p>{student.roomNumber}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Role</p>
                <p className="capitalize">{student.role}</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Attendance Summary Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Attendance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Check In</p>
                    <p className="font-medium">{student.lastCheckIn}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-red-50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Last Check Out</p>
                    <p className="font-medium">{student.lastCheckOut}</p>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-green-600">{student.totalPresent}</p>
                  <p className="text-sm text-muted-foreground">Days Present</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-red-600">{student.totalAbsent}</p>
                  <p className="text-sm text-muted-foreground">Days Absent</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-3xl font-bold text-primary">{student.attendancePercentage}</p>
                  <p className="text-sm text-muted-foreground">Attendance</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentInfoPage;
