import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { setToken } from '@/store/slices/authSlice';
import { getToken } from '@/lib/token';

export const useAuthInit = () => {
  const dispatch = useAppDispatch();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = getToken();
    if (saved) dispatch(setToken(saved));
    setIsInitialized(true);
  }, []);

  return isInitialized;
};
