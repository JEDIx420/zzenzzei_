
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  PieChart, 
  ArrowUpRight, 
  Building2, 
  CalendarClock, 
  DollarSign, 
  Users, 
  LineChart, 
  PlusCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/components/ui/PageHeader";
import StatCard from "@/components/ui/StatCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 280 },
  { name: "May", value: 590 },
  { name: "Jun", value: 350 },
];

const recentActivities = [
  {
    id: 1,
    title: "New lead created",
    description: "John Doe was added as a new lead",
    date: "2 hours ago",
  },
  {
    id: 2,
    title: "Deal moved to negotiation",
    description: "ABC Corp deal was updated",
    date: "5 hours ago",
  },
  {
    id: 3,
    title: "Meeting scheduled",
    description: "Call with XYZ Inc. on Monday",
    date: "1 day ago",
  },
  {
    id: 4,
    title: "Task completed",
    description: "Follow-up email sent to TechSolutions",
    date: "2 days ago",
  },
];

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Dashboard"
        description="Overview of your sales and customer data."
      >
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Deal
        </Button>
      </PageHeader>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Customers"
          value="124"
          icon={<Users className="h-4 w-4" />}
          description="This month"
          trend={{ value: 12, positive: true }}
          loading={loading}
        />
        <StatCard
          title="Active Deals"
          value="18"
          icon={<LineChart className="h-4 w-4" />}
          description="4 closing soon"
          loading={loading}
        />
        <StatCard
          title="Revenue"
          value="$48,200"
          icon={<DollarSign className="h-4 w-4" />}
          description="This quarter"
          trend={{ value: 8, positive: true }}
          loading={loading}
        />
        <StatCard
          title="Companies"
          value="36"
          icon={<Building2 className="h-4 w-4" />}
          description="5 new this month"
          loading={loading}
        />
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  Monthly revenue for the current year
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false}
                      tickFormatter={(value) => `$${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [`$${value}`, "Revenue"]}
                      labelStyle={{ color: "#111" }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="hsl(var(--primary))" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <CalendarClock className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium leading-none">
                          {activity.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base">
                    Sales by Pipeline Stage
                  </CardTitle>
                  <CardDescription>
                    Distribution of deals by stage
                  </CardDescription>
                </div>
                <PieChart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { stage: "Lead", deals: 36, value: "$128,000", color: "bg-blue-500" },
                    { stage: "Discovery", deals: 24, value: "$96,000", color: "bg-indigo-500" },
                    { stage: "Proposal", deals: 16, value: "$72,000", color: "bg-violet-500" },
                    { stage: "Negotiation", deals: 8, value: "$48,000", color: "bg-purple-500" },
                    { stage: "Closed", deals: 12, value: "$62,000", color: "bg-green-500" },
                  ].map((item) => (
                    <div key={item.stage} className="flex items-center">
                      <div className={`h-2 w-2 rounded-full ${item.color}`} />
                      <div className="ml-2 flex-1">
                        <div className="font-medium">{item.stage}</div>
                        <div className="text-xs text-muted-foreground">
                          {item.deals} deals
                        </div>
                      </div>
                      <div>{item.value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base">
                    Quick Actions
                  </CardTitle>
                  <CardDescription>
                    Frequently used actions
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  <Link to="/customers/new">
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Add New Customer
                      <ArrowUpRight className="ml-auto h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/companies/new">
                    <Button variant="outline" className="w-full justify-start">
                      <Building2 className="mr-2 h-4 w-4" />
                      Add New Company
                      <ArrowUpRight className="ml-auto h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/pipeline">
                    <Button variant="outline" className="w-full justify-start">
                      <LineChart className="mr-2 h-4 w-4" />
                      View Pipeline
                      <ArrowUpRight className="ml-auto h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="/integrations">
                    <Button variant="outline" className="w-full justify-start">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      Set Up n8n Integration
                      <ArrowUpRight className="ml-auto h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="h-[500px] rounded-md border">
          <div className="flex h-full items-center justify-center">
            <p className="text-lg text-muted-foreground">
              Analytics dashboard coming soon...
            </p>
          </div>
        </TabsContent>
        <TabsContent value="reports" className="h-[500px] rounded-md border">
          <div className="flex h-full items-center justify-center">
            <p className="text-lg text-muted-foreground">
              Reports dashboard coming soon...
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
