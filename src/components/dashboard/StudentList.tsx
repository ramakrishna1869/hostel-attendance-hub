
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';

const StudentList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Sample student data - in a real app this would come from your backend
  const studentsData = [
    { id: '1', name: 'John Doe', roomNumber: '101', status: 'present', checkInTime: '08:15 AM', checkOutTime: '05:30 PM' },
    { id: '2', name: 'Jane Smith', roomNumber: '102', status: 'present', checkInTime: '08:05 AM', checkOutTime: '05:45 PM' },
    { id: '3', name: 'Michael Brown', roomNumber: '103', status: 'absent', checkInTime: '-', checkOutTime: '-' },
    { id: '4', name: 'Sarah Johnson', roomNumber: '104', status: 'leave', checkInTime: '-', checkOutTime: '-' },
    { id: '5', name: 'Robert Wilson', roomNumber: '105', status: 'late', checkInTime: '10:20 AM', checkOutTime: '06:15 PM' },
    { id: '6', name: 'Emily Davis', roomNumber: '201', status: 'present', checkInTime: '07:55 AM', checkOutTime: '05:10 PM' },
    { id: '7', name: 'David Martinez', roomNumber: '202', status: 'present', checkInTime: '08:10 AM', checkOutTime: '05:25 PM' },
    { id: '8', name: 'Lisa Anderson', roomNumber: '203', status: 'absent', checkInTime: '-', checkOutTime: '-' },
    { id: '9', name: 'James Thomas', roomNumber: '204', status: 'late', checkInTime: '09:45 AM', checkOutTime: '06:00 PM' },
    { id: '10', name: 'Jennifer White', roomNumber: '205', status: 'present', checkInTime: '08:00 AM', checkOutTime: '05:15 PM' },
  ];
  
  // Filter and search logic
  const filteredStudents = studentsData.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          student.roomNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || student.status === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search students by name or room number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Students</SelectItem>
              <SelectItem value="present">Present</SelectItem>
              <SelectItem value="absent">Absent</SelectItem>
              <SelectItem value="late">Late</SelectItem>
              <SelectItem value="leave">On Leave</SelectItem>
            </SelectContent>
          </Select>
          <Button>Export Data</Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b text-xs font-medium text-muted-foreground">
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Room</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Check-in</th>
                  <th className="py-3 px-4 text-left">Check-out</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{student.id}</td>
                    <td className="py-3 px-4 font-medium">{student.name}</td>
                    <td className="py-3 px-4">{student.roomNumber}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        student.status === 'present' ? 'bg-green-100 text-green-800' : 
                        student.status === 'absent' ? 'bg-red-100 text-red-800' : 
                        student.status === 'leave' ? 'bg-blue-100 text-blue-800' : 
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-4">{student.checkInTime}</td>
                    <td className="py-3 px-4">{student.checkOutTime}</td>
                    <td className="py-3 px-4">
                      <Button variant="ghost" size="sm">View Details</Button>
                    </td>
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

export default StudentList;
