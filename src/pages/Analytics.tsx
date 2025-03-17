
import { useState } from "react";
import { BarChart, LineChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/ui/PageHeader";
import { ResponsiveContainer, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as RechartsLineChart, Line } from "recharts";

const performanceData = [
  { month: "Jan", revenue: 12000, leads: 40, closed: 10 },
  { month: "Feb", revenue: 18000, leads: 50, closed: 15 },
  { month: "Mar", revenue: 15000, leads: 45, closed: 12 },
  { month: "Apr", revenue: 22000, leads: 60, closed: 18 },
  { month: "May", revenue: 28000, leads: 70, closed: 25 },
  { month: "Jun", revenue: 25000, leads: 65, closed: 20 },
];

const Analytics = () => {
  const [loading, setLoading] = useState(false);
  
  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Analytics"
        description="Performance metrics and business insights"
      />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="leads">Lead Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-4 w-4" />
                  Revenue Trend
                </CardTitle>
                <CardDescription>Monthly revenue performance</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                    <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                    <Legend />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="mr-2 h-4 w-4" />
                  Leads Performance
                </CardTitle>
                <CardDescription>New leads vs. closed deals</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart
                    data={performanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="leads" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="closed" stroke="hsl(var(--destructive))" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="revenue" className="h-[400px] rounded-md border">
          <div className="flex h-full items-center justify-center">
            <p className="text-lg text-muted-foreground">
              Detailed revenue analytics coming soon...
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="leads" className="h-[400px] rounded-md border">
          <div className="flex h-full items-center justify-center">
            <p className="text-lg text-muted-foreground">
              Detailed lead analytics coming soon...
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
