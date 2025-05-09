
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell, Menu, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  toggleSidebar: () => void;
  sidebarState: string;
  isMobile: boolean;
}

const Navbar = ({ toggleSidebar, sidebarState, isMobile }: NavbarProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleProfileAction = (action: string) => {
    switch(action) {
      case 'profile':
        toast({
          title: "Profile",
          description: "Profile page will be available soon",
        });
        break;
      case 'settings':
        toast({
          title: "Settings",
          description: "Settings page will be available soon",
        });
        break;
      case 'logout':
        toast({
          title: "Logged out",
          description: "You have been logged out successfully",
        });
        // In a real app, we would handle actual logout logic here
        break;
      default:
        break;
    }
  };

  // Determine which icon to show based on sidebar state
  const sidebarIcon = isMobile 
    ? (sidebarState === "expanded" ? <X size={20} /> : <Menu size={20} />)
    : (sidebarState === "expanded" ? <X size={20} /> : <Menu size={20} />);

  // Determine the accessible label
  const sidebarLabel = isMobile
    ? (sidebarState === "expanded" ? "Close sidebar" : "Open sidebar")
    : (sidebarState === "expanded" ? "Collapse sidebar" : "Expand sidebar");

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label={sidebarLabel}
            className="mr-2"
          >
            {sidebarIcon}
          </Button>
          <Link 
            to="/"
            className="flex items-center gap-2 font-semibold text-lg md:text-xl transition-all hover:opacity-80"
          >
            <img 
              src="/lovable-uploads/8c629d68-ca86-4919-97a6-ac1e6803d6ba.png" 
              alt="zzenzzei logo" 
              className="h-8 w-8"
            />
            <span className="hidden md:inline-block animate-fade-in">zzenzzei</span>
          </Link>
        </div>

        <div className={`ml-auto flex items-center gap-4 ${showSearch ? 'w-full md:w-auto' : ''}`}>
          {showSearch ? (
            <div className="relative w-full md:w-64 animate-fade-in">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8 pr-4"
                autoFocus
                onBlur={() => setShowSearch(false)}
              />
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Search"
              onClick={() => setShowSearch(true)}
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-sm font-medium">AT</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProfileAction('profile')}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleProfileAction('settings')}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProfileAction('logout')}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
