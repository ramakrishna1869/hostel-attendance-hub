
import React, { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Profile = () => {
  const [student, setStudent] = useState(null);
  
  useEffect(() => {
    // In a real app, fetch user data from API
    // For now, we'll use localStorage
    const userString = localStorage.getItem('user');
    if (userString) {
      setStudent(JSON.parse(userString));
    }
  }, []);
  
  const getUserInitials = () => {
    if (!student || !student.name) return 'S';
    
    const nameParts = student?.name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0][0]}${nameParts[1][0]}`;
    }
    return nameParts[0][0];
  };
  
  if (!student) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p>Loading profile...</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student Profile</h1>
        </div>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex flex-col items-center gap-2">
                <Avatar className="h-24 w-24">
                  <AvatarFallback className="bg-primary text-white text-xl">
                    {getUserInitials()}
                  </AvatarFallback>
                </Avatar>
                <p className="text-lg font-medium">{student.name}</p>
                <p className="text-sm text-muted-foreground">{student.role}</p>
              </div>
              
              <div className="flex flex-1 flex-col gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Student ID</p>
                  <p className="font-medium">{student.id || 'S001'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{student.email || 'student@example.com'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Room Number</p>
                  <p>{student.roomNumber || '101'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{student.phone || '9876543210'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Additional information like hostel rules, etc. could go here */}
      </div>
    </MainLayout>
  );
};

export default Profile;
