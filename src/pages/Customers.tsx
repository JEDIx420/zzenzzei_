
import { useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Search, Filter, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import PageHeader from "@/components/ui/PageHeader";
import CustomerCard, { CustomerData } from "@/components/ui/CustomerCard";

// Sample data - in a real app, this would come from the database
const customerData: CustomerData[] = [
  {
    id: "cust-1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    company: "Acme Corporation",
    status: "active",
    tags: ["VIP", "Enterprise"],
  },
  {
    id: "cust-2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    location: "San Francisco, CA",
    company: "TechStart Inc.",
    status: "active",
    tags: ["Startup"],
  },
  {
    id: "cust-3",
    name: "Robert Johnson",
    email: "robert.j@example.com",
    phone: "+1 (555) 234-5678",
    location: "Chicago, IL",
    company: "Johnson & Associates",
    status: "inactive",
    tags: ["Consultant"],
  },
  {
    id: "cust-4",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 876-5432",
    location: "Austin, TX",
    status: "lead",
    tags: ["Prospect"],
  },
  {
    id: "cust-5",
    name: "Michael Wilson",
    email: "michael.w@example.com",
    phone: "+1 (555) 345-6789",
    location: "Boston, MA",
    company: "Global Solutions",
    status: "active",
    tags: ["Enterprise"],
  },
  {
    id: "cust-6",
    name: "Sarah Miller",
    email: "sarah.m@example.com",
    phone: "+1 (555) 654-3210",
    location: "Denver, CO",
    company: "Mill Technologies",
    status: "lead",
    tags: ["Tech"],
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState<CustomerData[]>(customerData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewCustomer = (id: string) => {
    toast.info(`Viewing customer ${id}`);
    // In a real app, navigate to customer details page
  };

  const handleEditCustomer = (id: string) => {
    toast.info(`Editing customer ${id}`);
    // In a real app, open edit modal or navigate to edit page
  };

  const handleDeleteCustomer = (id: string) => {
    toast.info(`Deleting customer ${id}`);
    setCustomers(customers.filter((customer) => customer.id !== id));
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.company &&
        customer.company.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || customer.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Customers" 
        description="Manage and track all your customer relationships."
      >
        <Link to="/customers/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </Link>
      </PageHeader>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search customers..."
            className="pl-8 pr-4"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="lead">Lead</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filteredCustomers.length === 0 ? (
        <div className="flex h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-10 w-10 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No customers found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find any customers matching your search criteria.
          </p>
          <Button className="mt-6" asChild>
            <Link to="/customers/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a new customer
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCustomers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              onView={handleViewCustomer}
              onEdit={handleEditCustomer}
              onDelete={handleDeleteCustomer}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Customers;
