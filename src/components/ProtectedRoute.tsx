import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ children, requireAuth, requireAdmin }: ProtectedRouteProps) {
  const { user, isAdmin } = useAuthStore();

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  if (requireAuth && !user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
