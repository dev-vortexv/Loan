import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const RoleProtectedRoute = ({ element, roles }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && roles.includes(user.role)) {
    return element;
  } else {
    return <Navigate to="/login" />;
  }
};

RoleProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default RoleProtectedRoute;
