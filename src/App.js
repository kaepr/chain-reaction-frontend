import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import useSWR from 'swr';
import { useRecoilState, useRecoilValue } from 'recoil';

import API from './utils/api/api';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import { Login, Register } from './pages/Auth';

import { userData } from './store/store';

const fetcher = (url) => API.get(url).then((res) => res.data);

function App() {
  const [user, setUser] = useRecoilState(userData);

  const { data, error } = useSWR('/api/user/me', fetcher);

  useEffect(() => {
    if (data !== undefined && data !== {}) setUser(data.userData);
  }, [data]);

  console.log('user from recoil ', user);

  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" exact component={About} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Router>
  );
}

export default App;
