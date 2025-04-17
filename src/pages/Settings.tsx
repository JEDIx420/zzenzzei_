
import { useState } from "react";
import { Upload, Save, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import PageHeader from "@/components/ui/PageHeader";

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      // In a real app, we would process the file here
      toast.success(`Imported ${file.name} successfully`);
    }
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
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue="Admin" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue="admin@example.com" />
            </div>
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
          <CardFooter>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </CardFooter>
        </Card>

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
      </div>
    </div>
  );
};

export default Settings;
