
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AttendanceStats = () => {
  // Sample data for demonstration - in a real app this would come from your backend API
  const recentActivity = [
    { 
      id: 1, 
      studentName: 'Rahul Sharma', 
      roomNumber: '101', 
      action: 'Checked In', 
      time: '08:15 AM',
      date: '2025-05-19'
    },
    { 
      id: 2, 
      studentName: 'Priya Patel', 
      roomNumber: '205', 
      action: 'Checked Out', 
      time: '05:30 PM',
      date: '2025-05-19'
    },
    { 
      id: 3, 
      studentName: 'Amit Kumar', 
      roomNumber: '112', 
      action: 'Absent', 
      time: '-',
      date: '2025-05-19'
    },
  ];
  
  const pendingRequests = [
    {
      id: 1,
      studentName: 'Ananya Singh',
      roomNumber: '201',
      requestType: 'Leave Application',
      fromDate: '2025-05-20',
      toDate: '2025-05-22',
      reason: 'Family event'
    },
    {
      id: 2,
      studentName: 'Vikram Reddy',
      roomNumber: '108',
      requestType: 'Late Check-in',
      fromDate: '2025-05-20',
      toDate: '2025-05-20',
      reason: 'Medical appointment'
    },
  ];

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Attendance Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recent">
          <TabsList className="mb-4">
            <TabsTrigger value="recent">Recent Activity</TabsTrigger>
            <TabsTrigger value="pending">Pending Requests ({pendingRequests.length})</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b text-xs font-medium text-muted-foreground">
                    <th className="py-3 px-4 text-left">Student</th>
                    <th className="py-3 px-4 text-left">Room</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Time</th>
                    <th className="py-3 px-4 text-left">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((activity) => (
                    <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4">{activity.studentName}</td>
                      <td className="py-3 px-4">{activity.roomNumber}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          activity.action === 'Checked In' ? 'bg-green-100 text-green-800' : 
                          activity.action === 'Checked Out' ? 'bg-blue-100 text-blue-800' : 
                          activity.action === 'Absent' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {activity.action}
                        </span>
                      </td>
                      <td className="py-3 px-4">{activity.time}</td>
                      <td className="py-3 px-4">{activity.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          
          <TabsContent value="pending">
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <Card key={request.id} className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between">
                      <div>
                        <h4 className="font-semibold">{request.studentName} ({request.roomNumber})</h4>
                        <p className="text-sm text-muted-foreground">{request.requestType}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {request.fromDate === request.toDate 
                            ? `Date: ${request.fromDate}`
                            : `From: ${request.fromDate} To: ${request.toDate}`
                          }
                        </p>
                        <p className="text-sm mt-2">{request.reason}</p>
                      </div>
                      <div className="mt-4 sm:mt-0 flex items-start space-x-2">
                        <button className="text-sm px-3 py-1 bg-primary text-white rounded">Approve</button>
                        <button className="text-sm px-3 py-1 bg-gray-200 text-gray-800 rounded">Reject</button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AttendanceStats;
