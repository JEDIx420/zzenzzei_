
import { Link, useLocation } from "react-router-dom";
import { 
  BarChart3, 
  Building2, 
  Layers, 
  LayoutDashboard, 
  Link2, 
  Settings, 
  Users,
  Upload
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import SidebarFileImport from "@/components/SidebarFileImport";

interface SidebarProps {
  state: string;  // "expanded", "collapsed", or "closed"
}

interface SidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const mainNav: SidebarItem[] = [
  {
    name: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Customers",
    href: "/customers",
    icon: Users,
    badge: "New",
  },
  {
    name: "Companies",
    href: "/companies",
    icon: Building2,
  },
  {
    name: "Pipeline",
    href: "/pipeline",
    icon: Layers,
  },
  {
    name: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    name: "Integrations",
    href: "/integrations",
    icon: Link2,
  },
];

const Sidebar = ({ state }: SidebarProps) => {
  const location = useLocation();
  const pathname = location.pathname;
  
  const isExpanded = state === "expanded";
  const isCollapsed = state === "collapsed";
  const isVisible = isExpanded || isCollapsed;
  const isIconOnly = isCollapsed;

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex flex-col bg-background border-r",
        "transform transition-transform duration-300 ease-in-out",
        isVisible ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0",
        isIconOnly ? "md:w-16" : "md:w-64"
      )}
    >
      <div className="h-16 flex-shrink-0 flex-grow-0" />
      <ScrollArea className="flex-1 py-4">
        <nav className="grid gap-1 px-2">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all",
                "hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-foreground/70",
                isIconOnly && "justify-center px-2"
              )}
            >
              <item.icon className="h-5 w-5" />
              {!isIconOnly && <span>{item.name}</span>}
              {!isIconOnly && item.badge && (
                <Badge 
                  variant="outline" 
                  className="ml-auto font-normal bg-primary/10 text-primary border-primary/20"
                >
                  {item.badge}
                </Badge>
              )}
            </Link>
          ))}
        </nav>
        
        <Separator className="my-4 mx-2" />
        
        {/* File Import Section */}
        {!isIconOnly && <SidebarFileImport />}
        {isIconOnly && (
          <div className="px-2 py-2 flex justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10"
              title="Import Data"
            >
              <Upload className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        )}
        
        <Separator className="my-4 mx-2" />
        
        <div className={cn("px-3 py-2", isIconOnly && "text-center")}>
          {!isIconOnly && (
            <h4 className="mb-2 text-xs font-semibold text-foreground/70">
              Settings
            </h4>
          )}
          <Link
            to="/settings"
            className={cn(
              "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              "hover:bg-accent hover:text-accent-foreground transition-all",
              pathname === "/settings"
                ? "bg-accent text-accent-foreground"
                : "text-foreground/70",
              isIconOnly && "justify-center px-2"
            )}
          >
            <Settings className="h-5 w-5" />
            {!isIconOnly && <span>Settings</span>}
          </Link>
        </div>
      </ScrollArea>
      
      {!isIconOnly && (
        <div className="border-t p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <span className="text-sm font-medium">AT</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin</span>
              <span className="text-xs text-muted-foreground">admin@example.com</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
