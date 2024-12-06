import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
import MainLayout from 'layout/MainLayout';
import RoleProtectedRoute from './RoleProtectedRoutes';

// login option  routing
const SuperAdminDashboardDetails = Loadable(lazy(() => import('adminPages/Dashboard')));
const UsersDetails = Loadable(lazy(() => import('adminPages/UsersDetails')));
const PackagesDetails = Loadable(lazy(() => import('adminPages/Packages')));
const PaymentsDetails = Loadable(lazy(() => import('adminPages/PaymentsDetails')));

// ==============================|| ADMIN ROUTING ||============================== //

const SuperAdminRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: 'superAdminDashboard',
      children: [
        {
          path: 'home',
          element: <RoleProtectedRoute roles={['superadmin']} element={<SuperAdminDashboardDetails />} />
        }
      ]
    },
    {
      path: 'superAdminDashboard',
      children: [
        {
          path: 'userDetails',
          element: <RoleProtectedRoute roles={['superadmin']} element={<UsersDetails />} />
        }
      ]
    },
    {
      path: 'superAdminDashboard',
      children: [
        {
          path: 'packages',
          element: <RoleProtectedRoute roles={['superadmin']} element={<PackagesDetails />} />
        }
      ]
    },
    {
      path: 'superAdminDashboard',
      children: [
        {
          path: 'paymentsDetails',
          element: <RoleProtectedRoute roles={['superadmin']} element={<PaymentsDetails />} />
        }
      ]
    }
  ]
};

export default SuperAdminRoutes;
