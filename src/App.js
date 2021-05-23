import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useSWR from 'swr';
import { useAtom } from 'jotai';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';

import PrivateRoute from './components/Routes/PrivateRoute';
import API from './utils/api/api';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import { Login, Register } from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Play from './pages/Play';

import { userData } from './store/store';
import { getRefreshToken } from './utils/tokenHandler';

const fetcher = (url) => API.get(url).then((res) => res.data);

function App() {
  // const [user, setUser] = useRecoilState(userData);

  // const { data, error } = useSWR('/api/user/me', fetcher);

  // useEffect(() => {
  //   if (data !== undefined) {
  //     setUser(data.userData);
  //   }
  // }, [data, setUser]);

  // console.log('in app js ', data);

  const [data, setData] = useAtom(userData);

  const checkLoggedIn = async () => {
    const res = await API.get('/api/user/me');
    setData(res.data);
    return res.data;
  };

  // eslint-disable-next-line no-empty-pattern
  const {} = useQuery('checkAuth', checkLoggedIn);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <PrivateRoute path="/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/play" exact component={Play} />
      </Switch>
    </Router>
  );
}

export default App;
