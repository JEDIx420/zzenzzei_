
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      // Redirect to auth if not logged in, otherwise to dashboard
      navigate(user ? "/dashboard" : "/auth", { replace: true });
    }
  }, [navigate, user, isLoading]);

  return null;
};

export default Index;
