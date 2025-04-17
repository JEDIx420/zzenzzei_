
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import AppLayout from "./components/layout/AppLayout";
import Auth from "./pages/Auth";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Companies from "./pages/Companies";
import Pipeline from "./pages/Pipeline";
import Analytics from "./pages/Analytics";
import Integrations from "./pages/Integrations";
import NotFound from "./pages/NotFound";
import Settings from "./pages/Settings";
import UserManagement from "./pages/UserManagement";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="customers" element={<Customers />} />
              <Route path="customers/new" element={<Customers />} />
              <Route path="companies" element={<Companies />} />
              <Route path="companies/new" element={<Companies />} />
              <Route path="pipeline" element={<Pipeline />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="integrations" element={<Integrations />} />
              <Route path="settings" element={<Settings />} />
              <Route path="user-management" element={<UserManagement />} />
            </Route>
            {/* ADD All CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
