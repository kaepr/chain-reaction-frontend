import { Route, Redirect } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userData } from '../../store/store';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [user, setUser] = useAtom(userData);
  console.log(' user in private route = ', user);
  
  let logged = false;
  if (user && Object.keys(user).length !== 0 && user.constructor === Object) {
    logged = true;
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        logged ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
