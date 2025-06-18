import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '@/store';
import { useAuthInit } from '@/hooks/useAuth';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const isReady = useAuthInit();
  const token = useSelector((state: RootState) => state.auth.token);

  if (!isReady) return null;
  if (!token) return <Navigate to="/login" />;

  return <>{children}</>;
}
