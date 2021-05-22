import { useEffect } from 'react';

import API from './utils/api/api';

function App() {
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.post('/api/auth/login', {
          email: 'test5@gmail.com',
          password: '123456',
        });
        console.log('res = ', res.data);
      } catch (err) {
        console.log('err', err);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <input type="text"></input>
    </div>
  );
}

export default App;
