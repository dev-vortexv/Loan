import { Typography } from '@mui/material';
import NavGroup from './NavGroup';
import menuItem from 'menu-items';

const MenuList = () => {
  const userRole = localStorage.getItem('userRole');

  const navItemsAdmin = menuItem?.admin?.map((item) => {
    switch (item.type) {
      case 'admin':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Admin Menu Items Error
          </Typography>
        );
    }
  });

  const navItemsSuperAdmin = menuItem?.superadmin?.map((item) => {
    switch (item.type) {
      case 'superadmin':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Super Admin Menu Items Error
          </Typography>
        );
    }
  });

  const navItemsBorrower = menuItem?.borrower?.map((item) => {
    switch (item.type) {
      case 'borrower':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Borrower Menu Items Error
          </Typography>
        );
    }
  });

  const navItemsLoanAgent = menuItem?.loanAgent?.map((item) => {
    switch (item.type) {
      case 'loanAgent':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Loan Agent Menu Items Error
          </Typography>
        );
    }
  });

  return (
    <>
      {userRole === 'admin' && navItemsAdmin}
      {userRole === 'superadmin' && navItemsSuperAdmin}
      {userRole === 'borrower' && navItemsBorrower}
      {userRole === 'loanAgent' && navItemsLoanAgent}
    </>
  );
};

export default MenuList;
