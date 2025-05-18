
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Search, Download, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const StudentListPage = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [attendanceFilter, setAttendanceFilter] = useState('all');
  const [blockFilter, setBlockFilter] = useState('all');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, fetch from API
    // For now, simulate API response
    setTimeout(() => {
      const mockedStudents = [
        { id: '1', name: 'Rahul Sharma', roomNumber: 'A-101', email: 'rahul.s@example.com', phone: '9876543210', attendanceStatus: 'present' },
        { id: '2', name: 'Priya Singh', roomNumber: 'B-205', email: 'priya.s@example.com', phone: '9876543211', attendanceStatus: 'absent' },
        { id: '3', name: 'Amit Kumar', roomNumber: 'A-102', email: 'amit.k@example.com', phone: '9876543212', attendanceStatus: 'present' },
        { id: '4', name: 'Deepika Patel', roomNumber: 'C-301', email: 'deepika.p@example.com', phone: '9876543213', attendanceStatus: 'late' },
        { id: '5', name: 'Ravi Verma', roomNumber: 'A-103', email: 'ravi.v@example.com', phone: '9876543214', attendanceStatus: 'present' },
        { id: '6', name: 'Sunita Gupta', roomNumber: 'B-206', email: 'sunita.g@example.com', phone: '9876543215', attendanceStatus: 'absent' },
        { id: '7', name: 'Ankit Joshi', roomNumber: 'C-302', email: 'ankit.j@example.com', phone: '9876543216', attendanceStatus: 'present' },
        { id: '8', name: 'Neha Mishra', roomNumber: 'A-104', email: 'neha.m@example.com', phone: '9876543217', attendanceStatus: 'late' },
        { id: '9', name: 'Rajesh Yadav', roomNumber: 'B-207', email: 'rajesh.y@example.com', phone: '9876543218', attendanceStatus: 'present' },
        { id: '10', name: 'Kavita Sharma', roomNumber: 'C-303', email: 'kavita.s@example.com', phone: '9876543219', attendanceStatus: 'absent' }
      ];
      
      setStudents(mockedStudents);
      setFilteredStudents(mockedStudents);
      setLoading(false);
    }, 800);
    
    // In a real app:
    /*
    fetch('/api/admin/students')
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setFilteredStudents(data);
      })
      .catch(err => {
        console.error('Error fetching students:', err);
        toast({
          title: "Error",
          description: "Could not load student data",
          variant: "destructive"
        });
      })
      .finally(() => {
        setLoading(false);
      });
    */
  }, []);
  
  // Apply filters whenever filter values change
  useEffect(() => {
    let result = [...students];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(student => 
        student.name.toLowerCase().includes(query) || 
        student.id.toLowerCase().includes(query) ||
        student.roomNumber.toLowerCase().includes(query)
      );
    }
    
    // Apply attendance filter
    if (attendanceFilter !== 'all') {
      result = result.filter(student => student.attendanceStatus === attendanceFilter);
    }
    
    // Apply block filter
    if (blockFilter !== 'all') {
      result = result.filter(student => student.roomNumber.startsWith(blockFilter));
    }
    
    setFilteredStudents(result);
  }, [searchQuery, attendanceFilter, blockFilter, students]);
  
  const handleViewStudent = (studentId) => {
    navigate(`/students/history/${studentId}`);
  };
  
  const handleResetPassword = (studentId) => {
    // Simulate API call
    toast({
      title: "Password Reset",
      description: `Password reset link sent to student ID: ${studentId}`,
    });
  };
  
  const handleOpenDeleteDialog = (student) => {
    setStudentToDelete(student);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteStudent = () => {
    if (!studentToDelete) return;
    
    // In a real app, make API call
    // For now, just update local state
    setStudents(students.filter(s => s.id !== studentToDelete.id));
    setFilteredStudents(filteredStudents.filter(s => s.id !== studentToDelete.id));
    
    toast({
      title: "Student Deleted",
      description: `${studentToDelete.name} has been removed from the system`,
    });
    
    setIsDeleteDialogOpen(false);
    setStudentToDelete(null);
  };
  
  const handleExportData = () => {
    toast({
      title: "Export Started",
      description: "Student data is being exported as CSV",
    });
  };
  
  const getAttendanceStatusBadge = (status) => {
    switch (status) {
      case 'present':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Present</span>;
      case 'absent':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Absent</span>;
      case 'late':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Late</span>;
      default:
        return null;
    }
  };
  
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <p>Loading student data...</p>
        </div>
      </MainLayout>
    );
  }
  
  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <h1 className="text-2xl font-bold">Student Management</h1>
          <Button onClick={() => navigate('/admin/students/add')} className="sm:self-end">
            <Plus className="w-4 h-4 mr-2" /> Add Student
          </Button>
        </div>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ID..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select value={attendanceFilter} onValueChange={setAttendanceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by attendance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Attendance</SelectItem>
                  <SelectItem value="present">Present</SelectItem>
                  <SelectItem value="absent">Absent</SelectItem>
                  <SelectItem value="late">Late</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={blockFilter} onValueChange={setBlockFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by block" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Blocks</SelectItem>
                  <SelectItem value="A">A Block</SelectItem>
                  <SelectItem value="B">B Block</SelectItem>
                  <SelectItem value="C">C Block</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="md:col-span-4 flex justify-end">
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="w-4 h-4 mr-2" /> Export Students
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Students List</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Room</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Phone</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium">{student.name}</td>
                        <td className="py-4 px-4">{student.roomNumber}</td>
                        <td className="py-4 px-4">{student.email}</td>
                        <td className="py-4 px-4">{student.phone}</td>
                        <td className="py-4 px-4">
                          {getAttendanceStatusBadge(student.attendanceStatus)}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleViewStudent(student.id)}>
                              View
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleResetPassword(student.id)}>
                              Reset
                            </Button>
                            <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleOpenDeleteDialog(student)}>
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="py-6 text-center text-muted-foreground">
                        No students match your filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Student</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {studentToDelete?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteStudent}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default StudentListPage;
