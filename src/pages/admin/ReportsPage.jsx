
import { useState, useEffect } from 'react';
import { Calendar, Download, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, subDays } from 'date-fns';

const ReportsPage = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('week'); // 'today', 'week', 'month'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const end = format(today, 'yyyy-MM-dd');
    
    let start;
    if (dateRange === 'today') {
      start = end;
    } else if (dateRange === 'week') {
      start = format(subDays(today, 7), 'yyyy-MM-dd');
    } else if (dateRange === 'month') {
      start = format(subDays(today, 30), 'yyyy-MM-dd');
    }
    
    setStartDate(start);
    setEndDate(end);
    
    fetchReports(start, end);
  }, [dateRange]);

  const fetchReports = async (from, to) => {
    try {
      setLoading(true);
      // In a real app, this would be an API call
      // const response = await axios.get(`/api/admin/reports?from=${from}&to=${to}`);
      // setReports(response.data);
      
      // Mock data
      setTimeout(() => {
        const mockReports = [
          {
            date: '2025-05-18',
            total: 120,
            present: 112,
            absent: 8,
            percentage: 93.3,
            records: [
              { time: '08:00 AM', checkins: 45, checkouts: 2 },
              { time: '09:00 AM', checkins: 32, checkouts: 5 },
              { time: '10:00 AM', checkins: 20, checkouts: 8 },
              { time: '11:00 AM', checkins: 15, checkouts: 12 },
            ]
          },
          {
            date: '2025-05-17',
            total: 120,
            present: 108,
            absent: 12,
            percentage: 90,
            records: [
              { time: '08:00 AM', checkins: 40, checkouts: 0 },
              { time: '09:00 AM', checkins: 30, checkouts: 3 },
              { time: '10:00 AM', checkins: 24, checkouts: 10 },
              { time: '11:00 AM', checkins: 14, checkouts: 15 },
            ]
          },
          {
            date: '2025-05-16',
            total: 120,
            present: 115,
            absent: 5,
            percentage: 95.8,
            records: [
              { time: '08:00 AM', checkins: 50, checkouts: 1 },
              { time: '09:00 AM', checkins: 35, checkouts: 4 },
              { time: '10:00 AM', checkins: 18, checkouts: 7 },
              { time: '11:00 AM', checkins: 12, checkouts: 18 },
            ]
          },
        ];
        setReports(mockReports);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load reports');
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    toast.success(`Exporting data as ${format.toUpperCase()}`);
    // In a real app, this would call an API endpoint
    // window.open(`/api/admin/reports/export?from=${startDate}&to=${endDate}&format=${format}`, '_blank');
  };

  return (
    <MainLayout>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-6">Attendance Reports</h1>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <Tabs defaultValue="week" className="w-full md:w-auto" onValueChange={setDateRange}>
            <TabsList>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="week">Last 7 Days</TabsTrigger>
              <TabsTrigger value="month">Last 30 Days</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport('csv')}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button variant="outline" onClick={() => handleExport('pdf')}>
              <FileText className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Summary ({startDate} to {endDate})</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-lg">Average Attendance</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary">
                        {Math.round(reports.reduce((acc, curr) => acc + curr.percentage, 0) / reports.length)}%
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-lg">Total Present</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-green-600">
                        {reports.reduce((acc, curr) => acc + curr.present, 0)}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="py-4">
                      <CardTitle className="text-lg">Total Absent</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-red-500">
                        {reports.reduce((acc, curr) => acc + curr.absent, 0)}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>

            {reports.map((report) => (
              <Card key={report.date}>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="flex items-center">
                      <Calendar className="mr-2 h-5 w-5" />
                      {new Date(report.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </CardTitle>
                    <Badge className={report.percentage > 90 ? 'bg-green-500' : 'bg-yellow-500'}>
                      {report.percentage}% Present
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Check-ins</TableHead>
                          <TableHead>Check-outs</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {report.records.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>{record.time}</TableCell>
                            <TableCell>{record.checkins}</TableCell>
                            <TableCell>{record.checkouts}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Students</p>
                      <p className="text-xl font-semibold">{report.total}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Present</p>
                      <p className="text-xl font-semibold text-green-600">{report.present}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Absent</p>
                      <p className="text-xl font-semibold text-red-500">{report.absent}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default ReportsPage;
