
import { 
  Building2, 
  Mail, 
  Globe, 
  MapPin, 
  Users, 
  MoreHorizontal 
} from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface CompanyData {
  id: string;
  name: string;
  email?: string;
  website?: string;
  location?: string;
  industry?: string;
  employeeCount?: number;
  status: "active" | "inactive" | "lead";
  logoUrl?: string;
  tags?: string[];
}

interface CompanyCardProps {
  company: CompanyData;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  lead: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

const CompanyCard = ({ company, onView, onEdit, onDelete }: CompanyCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md animate-enter" style={{ "--animation-delay": `${Math.random() * 200}ms` } as React.CSSProperties}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-md border bg-muted">
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  className="h-10 w-10 object-contain"
                />
              ) : (
                <Building2 className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div>
              <h3 className="font-medium">{company.name}</h3>
              {company.industry && (
                <p className="text-sm text-muted-foreground">{company.industry}</p>
              )}
              <Badge
                variant="outline"
                className={`mt-2 font-normal ${statusColors[company.status]}`}
              >
                {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onView(company.id)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(company.id)}>
                Edit company
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete(company.id)}
                className="text-destructive focus:text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 grid gap-2 text-sm">
          {company.email && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>{company.email}</span>
            </div>
          )}
          {company.website && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span>{company.website}</span>
            </div>
          )}
          {company.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{company.location}</span>
            </div>
          )}
          {company.employeeCount && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{company.employeeCount} employees</span>
            </div>
          )}
        </div>
        {company.tags && company.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {company.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="font-normal">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="bg-muted/50 p-3 flex justify-between">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onView(company.id)}
        >
          View Details
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-muted-foreground"
          onClick={() => onView(company.id + '/contacts')}
        >
          <Users className="h-4 w-4 mr-1" />
          Contacts
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CompanyCard;
