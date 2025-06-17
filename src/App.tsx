import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { Navigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthGuard from '@/guards/AuthGuard';
import LoginPage from './pages/LoginPage';
import CustomersPage from './pages/CustomersPage';

function App() {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/customers" element={<AuthGuard><CustomersPage /></AuthGuard>} />
        <Route path="*" element={<Navigate to="/customers" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
