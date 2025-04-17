
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, Save, Download, User, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import PageHeader from "@/components/ui/PageHeader";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const profileFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
});

const Settings = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const profileForm = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });
  
  useEffect(() => {
    if (user) {
      // Load user profile data
      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase
            .from("profiles")
            .select("username")
            .eq("id", user.id)
            .single();
            
          if (error) throw error;
          
          profileForm.setValue("username", data.username || "");
          profileForm.setValue("email", user.email || "");
        } catch (error: any) {
          console.error("Error fetching profile:", error.message);
        }
      };
      
      fetchProfile();
    }
  }, [user]);
  
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // In a real app, we would process the file here
      toast({
        title: "File Imported",
        description: `Imported ${file.name} successfully`,
      });
    }
  };
  
  const handleProfileUpdate = async (values: z.infer<typeof profileFormSchema>) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // Update username in profiles table
      const { error: profileError } = await supabase
        .from("profiles")
        .update({ username: values.username })
        .eq("id", user.id);
        
      if (profileError) throw profileError;
      
      // Update email in auth.users if it has changed
      if (values.email !== user.email) {
        const { error: emailError } = await supabase.auth.updateUser({
          email: values.email,
        });
        
        if (emailError) throw emailError;
      }
      
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleLogout = async () => {
    await signOut();
    navigate("/auth");
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="Settings" 
        description="Manage your account settings and preferences."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>
              Update your account details and preferences.
            </CardDescription>
          </CardHeader>
          <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(handleProfileUpdate)}>
              <CardContent className="space-y-4">
                <FormField
                  control={profileForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={profileForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications">Notifications</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive push notifications in app
                    </div>
                  </div>
                  <Switch 
                    id="notifications" 
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-updates">Email updates</Label>
                    <div className="text-sm text-muted-foreground">
                      Receive email updates about activity
                    </div>
                  </div>
                  <Switch 
                    id="email-updates" 
                    checked={emailUpdates}
                    onCheckedChange={setEmailUpdates}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="submit" disabled={isLoading}>
                  <Save className="mr-2 h-4 w-4" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
                <Button variant="outline" type="button" onClick={handleLogout}>
                  Sign Out
                </Button>
              </CardFooter>
            </form>
          </Form>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Import/Export</CardTitle>
              <CardDescription>
                Import contact or account information from CSV files.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full items-center gap-2">
                <Label htmlFor="file-import">Import Contacts/Accounts</Label>
                <div className="flex flex-col gap-2">
                  <Input 
                    id="file-import" 
                    type="file" 
                    accept=".csv,.xlsx,.xls" 
                    onChange={handleFileImport} 
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    Supported formats: CSV, Excel (.xlsx, .xls)
                  </p>
                </div>
              </div>
              <div className="grid w-full items-center gap-2">
                <Label>Export Data</Label>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export Contacts as CSV
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Export Companies as CSV
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {isAdmin && (
            <Card>
              <CardHeader>
                <CardTitle>Admin Controls</CardTitle>
                <CardDescription>
                  Special controls available to administrators.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant="default" 
                  className="w-full justify-start"
                  onClick={() => navigate("/user-management")}
                >
                  <User className="mr-2 h-4 w-4" />
                  User Management
                </Button>
                <Button 
                  variant="default" 
                  className="w-full justify-start"
                >
                  <Shield className="mr-2 h-4 w-4" />
                  System Settings
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
