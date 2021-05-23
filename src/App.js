import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useSWR from 'swr';
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
  const [user, setUser] = useRecoilState(userData);

  const { data, error } = useSWR('/api/user/me', fetcher);
  if (data !== undefined && data !== {}) setUser(data.userData);

  useEffect(() => {
    if (data !== undefined && data !== {}) setUser(data.userData);
  }, []);

  console.log('user from recoil ', user);

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
