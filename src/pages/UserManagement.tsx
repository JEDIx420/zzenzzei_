
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import PageHeader from "@/components/ui/PageHeader";

interface Profile {
  id: string;
  username: string;
  is_admin: boolean;
  created_at: string;
}

const UserManagement = () => {
  const { isAdmin, isLoading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to view this page.",
        variant: "destructive",
      });
      navigate("/dashboard");
      return;
    }

    if (!authLoading && isAdmin) {
      fetchProfiles();
    }
  }, [authLoading, isAdmin, navigate]);

  const fetchProfiles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProfiles(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to fetch user profiles",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleAdmin = async (id: string, currentValue: boolean) => {
    setIsProcessing(id);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_admin: !currentValue })
        .eq("id", id);

      if (error) throw error;

      // Update local state
      setProfiles(profiles.map(profile => 
        profile.id === id ? { ...profile, is_admin: !currentValue } : profile
      ));

      toast({
        title: "Success",
        description: `Admin status ${!currentValue ? "granted" : "revoked"} successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update admin status",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    setIsProcessing(id);
    try {
      const { error } = await supabase.auth.admin.deleteUser(id);

      if (error) throw error;

      // User will be removed from profiles via cascade delete
      setProfiles(profiles.filter(profile => profile.id !== id));

      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete user",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(null);
    }
  };

  if (authLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <PageHeader 
        title="User Management" 
        description="Manage user accounts and permissions." 
      />
      
      <div className="bg-white rounded-md border shadow-sm">
        {isLoading ? (
          <div className="flex justify-center items-center h-64">Loading users...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Admin</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {profiles.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">No users found</TableCell>
                </TableRow>
              ) : (
                profiles.map((profile) => (
                  <TableRow key={profile.id}>
                    <TableCell className="font-medium">{profile.username}</TableCell>
                    <TableCell>
                      {new Date(profile.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Switch 
                        checked={profile.is_admin} 
                        onCheckedChange={() => handleToggleAdmin(profile.id, profile.is_admin)}
                        disabled={isProcessing === profile.id}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(profile.id)}
                        disabled={isProcessing === profile.id}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default UserManagement;
