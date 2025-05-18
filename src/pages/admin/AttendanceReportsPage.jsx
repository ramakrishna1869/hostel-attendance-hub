
import React, { useState } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Download, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const attendanceData = [
  { id: '1', name: 'Rahul Sharma', roomNumber: 'A-101', checkIn: '08:15 AM', checkOut: '07:30 PM', status: 'Present' },
  { id: '2', name: 'Priya Singh', roomNumber: 'B-205', checkIn: '08:30 AM', checkOut: '06:45 PM', status: 'Present' },
  { id: '3', name: 'Amit Kumar', roomNumber: 'A-102', checkIn: '09:15 AM', checkOut: '08:00 PM', status: 'Late' },
  { id: '4', name: 'Deepika Patel', roomNumber: 'C-301', checkIn: null, checkOut: null, status: 'Absent' },
  { id: '5', name: 'Ravi Verma', roomNumber: 'A-103', checkIn: '08:05 AM', checkOut: '07:15 PM', status: 'Present' },
  { id: '6', name: 'Sunita Gupta', roomNumber: 'B-206', checkIn: null, checkOut: null, status: 'Absent' },
  { id: '7', name: 'Ankit Joshi', roomNumber: 'C-302', checkIn: '08:45 AM', checkOut: '07:30 PM', status: 'Present' },
  { id: '8', name: 'Neha Mishra', roomNumber: 'A-104', checkIn: '09:20 AM', checkOut: '06:50 PM', status: 'Late' },
  { id: '9', name: 'Rajesh Yadav', roomNumber: 'B-207', checkIn: '08:10 AM', checkOut: '07:00 PM', status: 'Present' },
  { id: '10', name: 'Kavita Sharma', roomNumber: 'C-303', checkIn: '08:25 AM', checkOut: '06:30 PM', status: 'Present' }
];

const AttendanceReportsPage = () => {
  const [date, setDate] = useState(new Date());
  const [statusFilter, setStatusFilter] = useState('all');
  const [blockFilter, setBlockFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  // Apply filters to attendance data
  const filteredData = attendanceData.filter(student => {
    // Apply status filter
    if (statusFilter !== 'all' && student.status.toLowerCase() !== statusFilter) {
      return false;
    }
    
    // Apply block filter
    if (blockFilter !== 'all' && !student.roomNumber.startsWith(blockFilter)) {
      return false;
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        student.name.toLowerCase().includes(query) ||
        student.roomNumber.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  const handleExport = (format) => {
    toast({
      title: "Export Started",
      description: `Attendance report is being exported as ${format.toUpperCase()}`,
    });
  };
  
  return (
    <MainLayout>
      <div className="w-full max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Attendance Reports</h1>
        
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="date" className="mb-2 block">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className="w-full justify-start text-left"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {format(date, 'PPP')}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(date) => date && setDate(date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label htmlFor="status" className="mb-2 block">Status Filter</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="block" className="mb-2 block">Block Filter</Label>
                <Select value={blockFilter} onValueChange={setBlockFilter}>
                  <SelectTrigger id="block">
                    <SelectValue placeholder="Filter by block" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Blocks</SelectItem>
                    <SelectItem value="A">A Block</SelectItem>
                    <SelectItem value="B">B Block</SelectItem>
                    <SelectItem value="C">C Block</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="search" className="mb-2 block">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by name or room"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <Button variant="outline" onClick={() => handleExport('pdf')}>
                <Download className="w-4 h-4 mr-2" /> Export PDF
              </Button>
              <Button variant="outline" onClick={() => handleExport('csv')}>
                <Download className="w-4 h-4 mr-2" /> Export CSV
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Attendance Report</CardTitle>
            <CardDescription>
              Showing attendance records for {format(date, 'MMMM d, yyyy')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Student Name</th>
                    <th className="text-left py-3 px-4">Room Number</th>
                    <th className="text-left py-3 px-4">Check In</th>
                    <th className="text-left py-3 px-4">Check Out</th>
                    <th className="text-left py-3 px-4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((student) => (
                      <tr key={student.id} className="border-b hover:bg-gray-50">
                        <td className="py-4 px-4 font-medium">{student.name}</td>
                        <td className="py-4 px-4">{student.roomNumber}</td>
                        <td className="py-4 px-4">{student.checkIn || 'Not recorded'}</td>
                        <td className="py-4 px-4">{student.checkOut || 'Not recorded'}</td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.status === 'Present' 
                              ? 'bg-green-100 text-green-800' 
                              : student.status === 'Late'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-red-100 text-red-800'
                          }`}>
                            {student.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-6 text-center text-muted-foreground">
                        No attendance records match your filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>Summary: <strong>{filteredData.filter(s => s.status === 'Present').length}</strong> Present, <strong>{filteredData.filter(s => s.status === 'Late').length}</strong> Late, <strong>{filteredData.filter(s => s.status === 'Absent').length}</strong> Absent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AttendanceReportsPage;
