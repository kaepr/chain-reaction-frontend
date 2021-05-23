import { useRecoilValue } from 'recoil';
import { Route, Redirect } from 'react-router-dom';
import { userData } from '../../store/store';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = useRecoilValue(userData);

  let logged = false;
  if (Object.keys(user).length !== 0 && user.constructor === Object) {
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
