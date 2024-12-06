import dashboard from './dashboard';
import customer from './customers';
import form from './loan_Forms';
import wallets from './wallet';
import loan from './loans';
import expense from './expenses';
// import repayment from './repayments';
import users from './user';
import superAdminDashboard from './superAdmin';
import plans_payment from './plans_payment';
import borrowers from './borrowers';
import loanAgents from './loanAgents';
import setting from './setting';
import landers from './landers';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
  admin: [dashboard, customer, form, wallets, loan, expense, users, plans_payment, setting, landers],
  superadmin: [superAdminDashboard],
  borrower: [borrowers],
  loanAgent: [loanAgents]
};

export default menuItems;
