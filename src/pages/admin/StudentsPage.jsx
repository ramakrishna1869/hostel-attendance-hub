
import { useState, useEffect } from 'react';
import { Search, ArrowUpDown, UserCircle, Bell } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import MainLayout from '@/components/layouts/MainLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const StudentsPage = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'ascending',
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        // In production, this would fetch from your backend API
        // const response = await fetch('/api/students');
        // const data = await response.json();
        
        // For demonstration purposes only - minimal sample data
        setTimeout(() => {
          setStudents([
            {
              id: '101',
              name: 'Rahul Sharma',
              rollNo: 'CS21045',
              roomNo: '101',
              status: 'checked-in',
              lastCheckin: '08:15 AM, 19 May 2025'
            },
            {
              id: '102',
              name: 'Priya Patel',
              rollNo: 'CS21023',
              roomNo: '205',
              status: 'checked-out',
              lastCheckin: '07:50 AM, 19 May 2025'
            },
            {
              id: '103',
              name: 'Amit Kumar',
              rollNo: 'CS21008',
              roomNo: '112',
              status: 'absent',
              lastCheckin: '-'
            },
          ]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching students:', error);
        toast.error('Failed to load students');
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'checked-in':
        return <Badge className="bg-green-500">Present</Badge>;
      case 'checked-out':
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Checked Out</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const handleViewProfile = (student) => {
    // In real app, navigate to student detail page
    // navigate(`/admin/students/${student.id}`);
    toast.info(`Viewing ${student.name}'s profile`);
  };

  const handleSendAlert = (student) => {
    toast.success(`Alert sent to ${student.name}`);
  };

  const handleExport = () => {
    if (students.length === 0) {
      toast.error('No data available to export');
      return;
    }
    
    // In production, this would generate a real CSV or PDF
    toast.success('Exporting student data');
  };

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.rollNo?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort students based on sortConfig
  const sortedStudents = [...filteredStudents].sort((a, b) => {
    if (!a[sortConfig.key] || !b[sortConfig.key]) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  return (
    <MainLayout>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Students</h1>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport} disabled={students.length === 0}>Export</Button>
            <Button>Add Student</Button>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="flex justify-center items-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Roll No</TableHead>
                      <TableHead>Room No</TableHead>
                      <TableHead 
                        className="cursor-pointer"
                        onClick={() => requestSort('status')}
                      >
                        Status
                        <ArrowUpDown className="inline ml-2 h-4 w-4" />
                      </TableHead>
                      <TableHead>Last Check-in</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedStudents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          No students found. Data will appear here once available.
                        </TableCell>
                      </TableRow>
                    ) : (
                      sortedStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>{student.rollNo}</TableCell>
                          <TableCell>{student.roomNo}</TableCell>
                          <TableCell>{getStatusBadge(student.status)}</TableCell>
                          <TableCell>{student.lastCheckin}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="icon" onClick={() => handleViewProfile(student)}>
                                <UserCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleSendAlert(student)}>
                                <Bell className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default StudentsPage;
