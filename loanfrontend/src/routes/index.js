import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import PageNotFoundRoutes from './PageNotFoundRoutes';
import SuperAdminRoutes from './SuperAdminRoutes';

// ==============================|| ROUTING RENDER ||============================== //

export default function ThemeRoutes() {
  return useRoutes([SuperAdminRoutes, MainRoutes, AuthenticationRoutes, PageNotFoundRoutes]);
}
