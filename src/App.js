import { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import API from './utils/api/api';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import About from './pages/About';
import { Login, Register } from './pages/Auth';

function App() {
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const res = await API.post('/api/auth/login', {
  //         email: 'test5@gmail.com',
  //         password: '123456',
  //       });
  //       console.log('res = ', res.data);
  //     } catch (err) {
  //       console.log('err', err);
  //     }
  //   }

  //   fetchData();
  // }, []);

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
