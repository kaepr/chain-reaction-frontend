import { useAtom } from 'jotai';
import { useQuery } from 'react-query';
import { userData } from '../../store/store';
import API from '../api/api';

export function useUser() {
  const [user, setUser] = useAtom(userData);

  const checkLoggedIn = async () => {
    const res = await API.get('/api/user/me');
    setUser(res.data);
    console.log('data from jotai = ', user);
    return res.data;
  };

  // eslint-disable-next-line no-empty-pattern
  const { refetch, data, isLoading, error } = useQuery(
    'checkAuth',
    checkLoggedIn
  );

  return {
    refetch,
    data,
    isLoading,
    error,
  };
}
