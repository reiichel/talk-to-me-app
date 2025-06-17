import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import type { RootState } from '@/store';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const token = useSelector((state: RootState) => state.auth.token);

  if (!token) return <Navigate to="/login" />;

  return <>{children}</>;
}
