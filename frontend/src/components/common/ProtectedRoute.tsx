import { useDispatch } from "react-redux";
import { useEffect, type JSX } from "react";
import { Navigate } from "react-router-dom";
import { setUser } from "@/redux/features/auth/authSlice";
import { useGetMeQuery } from "@/redux/features/auth/authApiSlice";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const dispatch = useDispatch();
  const { data: user, isLoading } = useGetMeQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};