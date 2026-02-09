'use client'

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

const ProtectedRoute = ({ children }) => {
  const { user, getAccessToken } = useAuth();
  const router = useRouter()
  const token = getAccessToken();

  if (!user || !token) {
    router.push('/')
    return;
  }

  return children;
};

export default ProtectedRoute;