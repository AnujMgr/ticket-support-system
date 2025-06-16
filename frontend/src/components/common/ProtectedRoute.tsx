import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useGetMeQuery } from "@/redux/features/auth/authApiSlice";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { data: user, isLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};