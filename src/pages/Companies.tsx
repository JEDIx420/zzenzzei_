
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
import CompanyCard, { CompanyData } from "@/components/ui/CompanyCard";

// Sample data - in a real app, this would come from the database
const companyData: CompanyData[] = [
  {
    id: "comp-1",
    name: "Acme Corporation",
    email: "info@acme.com",
    website: "acme.com",
    location: "New York, NY",
    industry: "Manufacturing",
    employeeCount: 250,
    status: "active",
    tags: ["Enterprise", "Manufacturing"],
  },
  {
    id: "comp-2",
    name: "TechStart Inc.",
    email: "contact@techstart.io",
    website: "techstart.io",
    location: "San Francisco, CA",
    industry: "Technology",
    employeeCount: 45,
    status: "active",
    tags: ["Startup", "SaaS"],
  },
  {
    id: "comp-3",
    name: "Johnson & Associates",
    email: "info@johnsonassoc.com",
    website: "johnsonassociates.com",
    location: "Chicago, IL",
    industry: "Consulting",
    employeeCount: 120,
    status: "inactive",
    tags: ["Professional Services"],
  },
  {
    id: "comp-4",
    name: "Global Solutions",
    email: "contact@globalsolutions.com",
    website: "globalsolutions.com",
    location: "Boston, MA",
    industry: "Finance",
    employeeCount: 500,
    status: "active",
    tags: ["Enterprise", "Finance"],
  },
  {
    id: "comp-5",
    name: "Mill Technologies",
    email: "hello@milltech.co",
    website: "milltech.co",
    location: "Denver, CO",
    industry: "Technology",
    employeeCount: 75,
    status: "lead",
    tags: ["Mid-market", "Tech"],
  },
  {
    id: "comp-6",
    name: "EcoFriendly Solutions",
    email: "contact@ecofriendly.org",
    website: "ecofriendly.org",
    location: "Portland, OR",
    industry: "Environmental",
    employeeCount: 30,
    status: "lead",
    tags: ["Non-profit", "Green"],
  },
];

const Companies = () => {
  const [companies, setCompanies] = useState<CompanyData[]>(companyData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [industryFilter, setIndustryFilter] = useState<string>("all");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleViewCompany = (id: string) => {
    toast.info(`Viewing company ${id}`);
    // In a real app, navigate to company details page
  };

  const handleEditCompany = (id: string) => {
    toast.info(`Editing company ${id}`);
    // In a real app, open edit modal or navigate to edit page
  };

  const handleDeleteCompany = (id: string) => {
    toast.info(`Deleting company ${id}`);
    setCompanies(companies.filter((company) => company.id !== id));
  };

  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (company.email &&
        company.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (company.website &&
        company.website.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === "all" || company.status === statusFilter;

    const matchesIndustry =
      industryFilter === "all" || company.industry === industryFilter;

    return matchesSearch && matchesStatus && matchesIndustry;
  });

  const industries = Array.from(
    new Set(companies.map((company) => company.industry).filter(Boolean))
  ) as string[];

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Companies" 
        description="Manage and track all your company accounts."
      >
        <Link to="/companies/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Company
          </Button>
        </Link>
      </PageHeader>

      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search companies..."
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
          <Select
            value={industryFilter}
            onValueChange={setIndustryFilter}
          >
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by industry" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Industries</SelectItem>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {filteredCompanies.length === 0 ? (
        <div className="flex h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Search className="h-10 w-10 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No companies found</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find any companies matching your search criteria.
          </p>
          <Button className="mt-6" asChild>
            <Link to="/companies/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add a new company
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredCompanies.map((company) => (
            <CompanyCard
              key={company.id}
              company={company}
              onView={handleViewCompany}
              onEdit={handleEditCompany}
              onDelete={handleDeleteCompany}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Companies;
