import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';
import RoleProtectedRoute from './RoleProtectedRoutes';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
const Borrowers = Loadable(lazy(() => import('views/Borrowers')));
const LoansTypes = Loadable(lazy(() => import('views/LoansTypes')));
const LoansAgreement = Loadable(lazy(() => import('views/LoansAgreement')));
const LoansSettlement = Loadable(lazy(() => import('views/LoansSettlement')));
const Wallets = Loadable(lazy(() => import('views/Wallets')));
const Transfer = Loadable(lazy(() => import('views/Transfer')));
const Transaction = Loadable(lazy(() => import('views/Transaction')));
const Loans = Loadable(lazy(() => import('views/Loans')));
const ActiveLoans = Loadable(lazy(() => import('views/ActiveLoans')));
const PendingLoans = Loadable(lazy(() => import('views/PendingLoans')));
const DeniedLoans = Loadable(lazy(() => import('views/DeniedLoans')));
const FullyPaidLoans = Loadable(lazy(() => import('views/FullyPaidLoans')));
const DefaultLoans = Loadable(lazy(() => import('views/DefaultLoans')));
const ExpensesCategories = Loadable(lazy(() => import('views/ExpensesCategories')));
const ExpansesList = Loadable(lazy(() => import('views/ExpansesList')));
const RepaymentsList = Loadable(lazy(() => import('views/RepaymentsList')));
const ManageUsers = Loadable(lazy(() => import('views/ManageUsers')));
const Roles = Loadable(lazy(() => import('views/Roles')));
const PaymentsDetails = Loadable(lazy(() => import('views/PaymentsDetails')));
const Subscription = Loadable(lazy(() => import('views/Subscription')));
const OverviewBorrowersDetail = Loadable(lazy(() => import('views/Borrowers/OverView')));
const OverviewLoanDetail = Loadable(lazy(() => import('views/Loans/OverView')));
const Setting = Loadable(lazy(() => import('views/Setting')));
const OverviewWalletDetail = Loadable(lazy(() => import('views/Wallets/Overview')));
const ReceivePaymentHistory = Loadable(lazy(() => import('views/ActiveLoans/Overview')));
const LandersDetails = Loadable(lazy(() => import('views/LandersDetails')));
const LoanOffersDetails = Loadable(lazy(() => import('views/LoanOffers')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <RoleProtectedRoute roles={['admin']} element={<DashboardDefault />} />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <RoleProtectedRoute roles={['admin']} element={<DashboardDefault />} />
        }
      ]
    },
    {
      path: 'customers',
      children: [
        {
          path: 'borrowers',
          element: <RoleProtectedRoute roles={['admin', 'borrower']} element={<Borrowers />} />
        }
      ]
    },
    {
      path: 'customers',
      children: [
        {
          path: 'borrowers/view/:id',
          element: <RoleProtectedRoute roles={['admin', 'borrower']} element={<OverviewBorrowersDetail />} />
        }
      ]
    },
    {
      path: 'loanAgreement',
      children: [
        {
          path: 'loanTypes',
          element: <RoleProtectedRoute roles={['admin']} element={<LoansTypes />} />
        }
      ]
    },
    {
      path: 'loanAgreement',
      children: [
        {
          path: 'loanForms',
          element: <RoleProtectedRoute roles={['admin']} element={<LoansAgreement />} />
        }
      ]
    },
    {
      path: 'loanAgreement',
      children: [
        {
          path: 'loanSettlement',
          element: <RoleProtectedRoute roles={['admin']} element={<LoansSettlement />} />
        }
      ]
    },
    {
      path: 'Wallets',
      children: [
        {
          path: 'walletList',
          element: <RoleProtectedRoute roles={['admin']} element={<Wallets />} />
        }
      ]
    },
    {
      path: 'Wallets',
      children: [
        {
          path: 'walletList/view/:id',
          element: <RoleProtectedRoute roles={['admin']} element={<OverviewWalletDetail />} />
        }
      ]
    },
    {
      path: 'Wallets',
      children: [
        {
          path: 'transfers',
          element: <RoleProtectedRoute roles={['admin']} element={<Transfer />} />
        }
      ]
    },
    {
      path: 'Wallets',
      children: [
        {
          path: 'transactions',
          element: <RoleProtectedRoute roles={['admin']} element={<Transaction />} />
        }
      ]
    },
    {
      path: 'Loans',
      children: [
        {
          path: 'loanList',
          element: <RoleProtectedRoute roles={['admin', 'loanAgent']} element={<Loans />} />
        }
      ]
    },
    {
      path: 'Loans',
      children: [
        {
          path: 'loanList/view/:id',
          element: <RoleProtectedRoute roles={['admin', 'loanAgent']} element={<OverviewLoanDetail />} />
        }
      ]
    },
    {
      path: 'Loans',
      children: [
        {
          path: 'pendingLoans',
          element: <RoleProtectedRoute roles={['admin', 'loanAgent']} element={<PendingLoans />} />
        }
      ]
    },
    {
      path: 'Loans',
      children: [
        {
          path: 'activeLoans',
          element: <RoleProtectedRoute roles={['admin', 'loanAgent']} element={<ActiveLoans />} />
        }
      ]
    },
    {
      path: 'Loans',
      children: [
        {
          path: 'deniedLoans',
          element: <RoleProtectedRoute roles={['admin', 'loanAgent']} element={<DeniedLoans />} />
        }
      ]
    },

    {
      path: 'Loans',
      children: [
        {
          path: 'fullyPaidLoans',
          element: <RoleProtectedRoute roles={['admin', 'loanAgent']} element={<FullyPaidLoans />} />
        }
      ]
    },
    {
      path: 'Loans',
      children: [
        {
          path: 'defaultedLoans',
          element: <RoleProtectedRoute roles={['admin', 'loanAgent']} element={<DefaultLoans />} />
        }
      ]
    },
    {
      path: 'Expenses',
      children: [
        {
          path: 'expenseCategories',
          element: <RoleProtectedRoute roles={['admin']} element={<ExpensesCategories />} />
        }
      ]
    },
    {
      path: 'Expenses',
      children: [
        {
          path: 'expensesList',
          element: <RoleProtectedRoute roles={['admin']} element={<ExpansesList />} />
        }
      ]
    },
    {
      path: 'Repayments',
      children: [
        {
          path: 'repaymentList',
          element: <RoleProtectedRoute roles={['admin']} element={<RepaymentsList />} />
        }
      ]
    },
    {
      path: 'UserManagement',
      children: [
        {
          path: 'roles',
          element: <RoleProtectedRoute roles={['admin']} element={<Roles />} />
        }
      ]
    },
    {
      path: 'UserManagement',
      children: [
        {
          path: 'manageUsers',
          element: <RoleProtectedRoute roles={['admin']} element={<ManageUsers />} />
        }
      ]
    },
    {
      path: 'AccountManagement',
      children: [
        {
          path: 'Payments',
          element: <RoleProtectedRoute roles={['admin']} element={<PaymentsDetails />} />
        }
      ]
    },
    {
      path: 'AccountManagement',
      children: [
        {
          path: 'Subscription',
          element: <RoleProtectedRoute roles={['admin']} element={<Subscription />} />
        }
      ]
    },
    {
      path: 'AccountManagement',
      children: [
        {
          path: 'LoanOffers',
          element: <RoleProtectedRoute roles={['admin']} element={<LoanOffersDetails />} />
        }
      ]
    },

    {
      path: 'Setting',
      children: [
        {
          path: 'tab',
          element: <RoleProtectedRoute roles={['admin']} element={<Setting />} />
        }
      ]
    },
    {
      path: 'ReceivedPayment/History/:id',
      element: <RoleProtectedRoute roles={['admin', 'loanAgent']} element={<ReceivePaymentHistory />} />
    },
    {
      path: 'Landers',
      children: [
        {
          path: 'List',
          element: <RoleProtectedRoute roles={['admin']} element={<LandersDetails />} />
        }
      ]
    }
  ]
};

export default MainRoutes;
