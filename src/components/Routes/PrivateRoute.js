import { Route, Redirect } from 'react-router-dom';
import { useAtom } from 'jotai';
import { userData, logged } from '../../store/store';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [loggedInCheck] = useAtom(logged);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedInCheck ? (
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
