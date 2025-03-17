
import { User, Mail, Phone, MapPin, MoreHorizontal, Link } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface CustomerData {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location?: string;
  company?: string;
  status: "active" | "inactive" | "lead";
  avatarUrl?: string;
  tags?: string[];
}

interface CustomerCardProps {
  customer: CustomerData;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const statusColors = {
  active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  inactive: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
  lead: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
};

const CustomerCard = ({ customer, onView, onEdit, onDelete }: CustomerCardProps) => {
  const initials = customer.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md animate-enter" style={{ "--animation-delay": `${Math.random() * 200}ms` } as React.CSSProperties}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={customer.avatarUrl} alt={customer.name} />
              <AvatarFallback className="text-lg">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium">{customer.name}</h3>
              {customer.company && (
                <p className="text-sm text-muted-foreground">{customer.company}</p>
              )}
              <Badge
                variant="outline"
                className={`mt-2 font-normal ${statusColors[customer.status]}`}
              >
                {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
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
              <DropdownMenuItem onClick={() => onView(customer.id)}>
                View details
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onEdit(customer.id)}>
                Edit customer
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onDelete(customer.id)}
                className="text-destructive focus:text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="mt-4 grid gap-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Mail className="h-4 w-4" />
            <span>{customer.email}</span>
          </div>
          {customer.phone && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{customer.phone}</span>
            </div>
          )}
          {customer.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{customer.location}</span>
            </div>
          )}
        </div>
        {customer.tags && customer.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1">
            {customer.tags.map((tag) => (
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
          onClick={() => onView(customer.id)}
        >
          View Profile
        </Button>
        {customer.company && (
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground"
          >
            <Link className="h-4 w-4 mr-1" />
            Company
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CustomerCard;
