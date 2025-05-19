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
      // In production, this would fetch from your backend API
      // const response = await fetch(`/api/reports?from=${from}&to=${to}`);
      // const data = await response.json();
      // setReports(data);
      
      // For demo purposes, we'll just show an empty state
      setTimeout(() => {
        setReports([]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching reports:', error);
      toast.error('Failed to load reports');
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    if (reports.length === 0) {
      toast.error('No data available to export');
      return;
    }
    
    const filename = `attendance-report-${format === 'csv' ? 'csv' : 'pdf'}`;
    toast.success(`Exporting ${filename}`);
    
    // In a real app, this would call an API endpoint to download the file
    // window.open(`/api/reports/export?from=${startDate}&to=${endDate}&format=${format}`, '_blank');
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
            <Button 
              variant="outline" 
              onClick={() => handleExport('csv')}
              disabled={reports.length === 0}
            >
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
            <Button 
              variant="outline" 
              onClick={() => handleExport('pdf')}
              disabled={reports.length === 0}
            >
              <FileText className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : reports.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">No reports available</h3>
                <p>Reports will appear here once attendance data is available</p>
              </div>
            </CardContent>
          </Card>
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
                        {/*report.records.map((record, index) => (
                          <TableRow key={index}>
                            <TableCell>{record.time}</TableCell>
                            <TableCell>{record.checkins}</TableCell>
                            <TableCell>{record.checkouts}</TableCell>
                          </TableRow>
                        ))*/}
                      </TableBody>
                    </Table>
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Students</p>
                      {/*<p className="text-xl font-semibold">{report.total}</p>*/}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Present</p>
                      {/*<p className="text-xl font-semibold text-green-600">{report.present}</p>*/}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Absent</p>
                      {/*<p className="text-xl font-semibold text-red-500">{report.absent}</p>*/}
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
