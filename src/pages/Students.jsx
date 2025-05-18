
import React, { useState } from 'react';
import MainLayout from '../components/layouts/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Search, Download, Plus, Edit, Trash, Eye } from 'lucide-react';

const Students = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roomFilter, setRoomFilter] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    roomNumber: '',
    phone: '',
    password: '',
  });
  
  // Sample student data - in a real app, this would come from your API
  const [students, setStudents] = useState([
    { 
      id: 'S001', 
      name: 'Rahul Sharma', 
      email: 'rahul.s@example.com', 
      roomNumber: '101', 
      phone: '9812345670',
      role: 'student',
      attendanceStatus: 'present',
      checkInTime: '08:15 AM'
    },
    { 
      id: 'S002', 
      name: 'Priya Patel', 
      email: 'priya.p@example.com', 
      roomNumber: '102', 
      phone: '9876543210',
      role: 'student',
      attendanceStatus: 'present',
      checkInTime: '08:05 AM'
    },
    { 
      id: 'S003', 
      name: 'Amit Kumar', 
      email: 'amit.k@example.com', 
      roomNumber: '103', 
      phone: '9898767654',
      role: 'student',
      attendanceStatus: 'absent',
      checkInTime: '-'
    },
    { 
      id: 'S004', 
      name: 'Neha Gupta', 
      email: 'neha.g@example.com', 
      roomNumber: '104', 
      phone: '9756431280',
      role: 'student',
      attendanceStatus: 'late',
      checkInTime: '10:25 AM'
    },
    { 
      id: 'S005', 
      name: 'Karthik Reddy', 
      email: 'karthik.r@example.com', 
      roomNumber: '105', 
      phone: '9867452301',
      role: 'student',
      attendanceStatus: 'present',
      checkInTime: '08:30 AM'
    },
    { 
      id: 'S006', 
      name: 'Anjali Singh', 
      email: 'anjali.s@example.com', 
      roomNumber: '201', 
      phone: '9234567890',
      role: 'student',
      attendanceStatus: 'present',
      checkInTime: '07:55 AM'
    },
    { 
      id: 'S007', 
      name: 'Rajesh Verma', 
      email: 'rajesh.v@example.com', 
      roomNumber: '202', 
      phone: '9345678901',
      role: 'student',
      attendanceStatus: 'late',
      checkInTime: '09:40 AM'
    },
    { 
      id: 'S008', 
      name: 'Sneha Mishra', 
      email: 'sneha.m@example.com', 
      roomNumber: '203', 
      phone: '9567890123',
      role: 'student',
      attendanceStatus: 'absent',
      checkInTime: '-'
    },
    { 
      id: 'S009', 
      name: 'Deepak Joshi', 
      email: 'deepak.j@example.com', 
      roomNumber: '204', 
      phone: '9678901234',
      role: 'student',
      attendanceStatus: 'present',
      checkInTime: '08:10 AM'
    },
    { 
      id: 'S010', 
      name: 'Ayesha Khan', 
      email: 'ayesha.k@example.com', 
      roomNumber: '205', 
      phone: '9789012345',
      role: 'student',
      attendanceStatus: 'present',
      checkInTime: '08:00 AM'
    },
  ]);
  
  // Filter students based on search query and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      student.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || student.attendanceStatus === statusFilter;
    
    const matchesRoom = !roomFilter || student.roomNumber.includes(roomFilter);
    
    return matchesSearch && matchesStatus && matchesRoom;
  });
  
  // Handle adding a new student
  const handleAddStudent = () => {
    // Validation
    if (!newStudent.name || !newStudent.email || !newStudent.roomNumber || !newStudent.phone || !newStudent.password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "All fields are required."
      });
      return;
    }
    
    // In a real app, you would call your API here
    // POST /api/admin/students with newStudent data
    
    const newStudentWithId = {
      ...newStudent,
      id: `S${(students.length + 1).toString().padStart(3, '0')}`,
      role: 'student',
      attendanceStatus: 'absent',
      checkInTime: '-'
    };
    
    setStudents([...students, newStudentWithId]);
    setNewStudent({ name: '', email: '', roomNumber: '', phone: '', password: '' });
    setShowAddModal(false);
    
    toast({
      title: "Success",
      description: "Student added successfully."
    });
  };
  
  // Handle editing a student
  const handleEditStudent = () => {
    if (!selectedStudent.name || !selectedStudent.roomNumber || !selectedStudent.phone) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Name, room number and phone are required."
      });
      return;
    }
    
    // In a real app, you would call your API here
    // PUT /api/admin/students/:id with selectedStudent data
    
    const updatedStudents = students.map(student => 
      student.id === selectedStudent.id ? selectedStudent : student
    );
    
    setStudents(updatedStudents);
    setShowEditModal(false);
    
    toast({
      title: "Success",
      description: "Student updated successfully."
    });
  };
  
  // Handle deleting a student
  const handleDeleteStudent = () => {
    // In a real app, you would call your API here
    // DELETE /api/admin/students/:id
    
    const updatedStudents = students.filter(student => 
      student.id !== selectedStudent.id
    );
    
    setStudents(updatedStudents);
    setShowDeleteModal(false);
    
    toast({
      title: "Success",
      description: "Student deleted successfully."
    });
  };
  
  // Handle exporting student data as CSV
  const handleExportCSV = () => {
    // Get filtered students data
    const data = filteredStudents;
    
    // Create CSV content
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Name,Email,Room Number,Phone,Role,Status,Check-in Time\n";
    
    data.forEach(student => {
      csvContent += `${student.id},${student.name},${student.email},${student.roomNumber},${student.phone},${student.role},${student.attendanceStatus},${student.checkInTime}\n`;
    });
    
    // Create download link
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_data.csv");
    document.body.appendChild(link);
    
    // Trigger download
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Success",
      description: `Exported ${filteredStudents.length} student records.`
    });
  };
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student Management</h1>
          <Button onClick={() => setShowAddModal(true)} className="flex items-center gap-1">
            <Plus className="w-4 h-4" /> Add Student
          </Button>
        </div>
        
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by name or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
              <SelectItem value="late">Late</SelectItem>
            </SelectContent>
          </Select>
          
          <Input
            placeholder="Filter by room..."
            value={roomFilter}
            onChange={(e) => setRoomFilter(e.target.value)}
            className="w-full md:w-[180px]"
          />
          
          <Button variant="outline" onClick={handleExportCSV} className="flex items-center gap-1">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
        
        {/* Students Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                        No students found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id} className="hover:bg-muted/50">
                        <TableCell>{student.id}</TableCell>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.roomNumber}</TableCell>
                        <TableCell>{student.email}</TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell>
                          <Badge 
                            variant={
                              student.attendanceStatus === 'present' ? 'default' : 
                              student.attendanceStatus === 'absent' ? 'destructive' : 
                              'secondary'
                            }
                            className={
                              student.attendanceStatus === 'present' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                              student.attendanceStatus === 'absent' ? 'bg-red-100 text-red-800 hover:bg-red-100' : 
                              'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                            }
                          >
                            {student.attendanceStatus.charAt(0).toUpperCase() + student.attendanceStatus.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedStudent(student);
                                setShowViewModal(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedStudent({...student});
                                setShowEditModal(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => {
                                setSelectedStudent(student);
                                setShowDeleteModal(true);
                              }}
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        {/* Add Student Modal */}
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Student</DialogTitle>
              <DialogDescription>
                Create a new student record. All fields are required.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <Input
                  id="name"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                  placeholder="e.g., Ram Kumar"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input
                  id="email"
                  type="email"
                  value={newStudent.email}
                  onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                  placeholder="e.g., ram.kumar@example.com"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="roomNumber" className="text-sm font-medium">Room Number</label>
                  <Input
                    id="roomNumber"
                    value={newStudent.roomNumber}
                    onChange={(e) => setNewStudent({ ...newStudent, roomNumber: e.target.value })}
                    placeholder="e.g., 101"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">Phone Number</label>
                  <Input
                    id="phone"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
                    placeholder="e.g., 9812345670"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">Initial Password</label>
                <Input
                  id="password"
                  type="password"
                  value={newStudent.password}
                  onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
                  placeholder="Set an initial password"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddModal(false)}>Cancel</Button>
              <Button onClick={handleAddStudent}>Add Student</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Edit Student Modal */}
        {selectedStudent && (
          <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Edit Student</DialogTitle>
                <DialogDescription>
                  Update student information. ID and email cannot be changed.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="edit-id" className="text-sm font-medium">Student ID</label>
                  <Input
                    id="edit-id"
                    value={selectedStudent.id}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-name" className="text-sm font-medium">Full Name</label>
                  <Input
                    id="edit-name"
                    value={selectedStudent.name}
                    onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-email" className="text-sm font-medium">Email</label>
                  <Input
                    id="edit-email"
                    value={selectedStudent.email}
                    disabled
                    className="bg-gray-100"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="edit-room" className="text-sm font-medium">Room Number</label>
                    <Input
                      id="edit-room"
                      value={selectedStudent.roomNumber}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, roomNumber: e.target.value })}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="edit-phone" className="text-sm font-medium">Phone Number</label>
                    <Input
                      id="edit-phone"
                      value={selectedStudent.phone}
                      onChange={(e) => setSelectedStudent({ ...selectedStudent, phone: e.target.value })}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="edit-status" className="text-sm font-medium">Attendance Status</label>
                  <Select 
                    value={selectedStudent.attendanceStatus} 
                    onValueChange={(value) => setSelectedStudent({ ...selectedStudent, attendanceStatus: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="present">Present</SelectItem>
                      <SelectItem value="absent">Absent</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowEditModal(false)}>Cancel</Button>
                <Button onClick={handleEditStudent}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
        {/* Delete Student Modal */}
        <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
          <DialogContent className="sm:max-w-[400px]">
            <DialogHeader>
              <DialogTitle>Delete Student</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this student? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            
            {selectedStudent && (
              <div className="py-4">
                <p><strong>ID:</strong> {selectedStudent.id}</p>
                <p><strong>Name:</strong> {selectedStudent.name}</p>
                <p><strong>Email:</strong> {selectedStudent.email}</p>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDeleteStudent}>Delete</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* View Student Details Modal */}
        <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Student Details</DialogTitle>
              <DialogDescription>
                Complete information about the selected student.
              </DialogDescription>
            </DialogHeader>
            
            {selectedStudent && (
              <div className="space-y-6 py-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Personal Information</h3>
                    <div className="space-y-2">
                      <p><strong>ID:</strong> {selectedStudent.id}</p>
                      <p><strong>Name:</strong> {selectedStudent.name}</p>
                      <p><strong>Email:</strong> {selectedStudent.email}</p>
                      <p><strong>Phone:</strong> {selectedStudent.phone}</p>
                      <p><strong>Room Number:</strong> {selectedStudent.roomNumber}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Today's Attendance</h3>
                    <div className="space-y-2">
                      <p>
                        <strong>Status:</strong> 
                        <Badge 
                          variant={
                            selectedStudent.attendanceStatus === 'present' ? 'default' : 
                            selectedStudent.attendanceStatus === 'absent' ? 'destructive' : 
                            'secondary'
                          }
                          className={`ml-2 ${
                            selectedStudent.attendanceStatus === 'present' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                            selectedStudent.attendanceStatus === 'absent' ? 'bg-red-100 text-red-800 hover:bg-red-100' : 
                            'bg-yellow-100 text-yellow-800 hover:bg-yellow-100'
                          }`}
                        >
                          {selectedStudent.attendanceStatus.charAt(0).toUpperCase() + selectedStudent.attendanceStatus.slice(1)}
                        </Badge>
                      </p>
                      <p><strong>Check-in Time:</strong> {selectedStudent.checkInTime}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Recent Attendance History</h3>
                  <table className="min-w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-xs font-medium text-muted-foreground">
                        <th className="border px-2 py-1 text-left">Date</th>
                        <th className="border px-2 py-1 text-left">Status</th>
                        <th className="border px-2 py-1 text-left">Check-in</th>
                        <th className="border px-2 py-1 text-left">Check-out</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {/* Sample attendance history */}
                      <tr>
                        <td className="border px-2 py-1">18-05-2025</td>
                        <td className="border px-2 py-1">
                          <span className="inline-block px-1 py-0.5 text-xs rounded bg-green-100 text-green-800">Present</span>
                        </td>
                        <td className="border px-2 py-1">{selectedStudent.attendanceStatus !== 'absent' ? selectedStudent.checkInTime : '-'}</td>
                        <td className="border px-2 py-1">-</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">17-05-2025</td>
                        <td className="border px-2 py-1">
                          <span className="inline-block px-1 py-0.5 text-xs rounded bg-green-100 text-green-800">Present</span>
                        </td>
                        <td className="border px-2 py-1">08:10 AM</td>
                        <td className="border px-2 py-1">06:15 PM</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">16-05-2025</td>
                        <td className="border px-2 py-1">
                          <span className="inline-block px-1 py-0.5 text-xs rounded bg-red-100 text-red-800">Absent</span>
                        </td>
                        <td className="border px-2 py-1">-</td>
                        <td className="border px-2 py-1">-</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">15-05-2025</td>
                        <td className="border px-2 py-1">
                          <span className="inline-block px-1 py-0.5 text-xs rounded bg-yellow-100 text-yellow-800">Late</span>
                        </td>
                        <td className="border px-2 py-1">09:45 AM</td>
                        <td className="border px-2 py-1">05:30 PM</td>
                      </tr>
                      <tr>
                        <td className="border px-2 py-1">14-05-2025</td>
                        <td className="border px-2 py-1">
                          <span className="inline-block px-1 py-0.5 text-xs rounded bg-green-100 text-green-800">Present</span>
                        </td>
                        <td className="border px-2 py-1">08:05 AM</td>
                        <td className="border px-2 py-1">06:20 PM</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Attendance Summary</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded p-2 text-center">
                      <div className="text-2xl font-bold text-green-600">80%</div>
                      <div className="text-xs text-muted-foreground">Present</div>
                    </div>
                    <div className="border rounded p-2 text-center">
                      <div className="text-2xl font-bold text-red-600">10%</div>
                      <div className="text-xs text-muted-foreground">Absent</div>
                    </div>
                    <div className="border rounded p-2 text-center">
                      <div className="text-2xl font-bold text-yellow-600">10%</div>
                      <div className="text-xs text-muted-foreground">Late</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowViewModal(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Students;
