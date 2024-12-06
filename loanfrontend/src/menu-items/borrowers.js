// assets
import { IconUserExclamation } from '@tabler/icons';

// constant
const icons = {
  IconUserExclamation
};

// ==============================|| BORROWERS MENU ITEMS ||============================== //

const borrower = {
  title: 'Customers',
  type: 'borrower',
  children: [
    {
      id: '01',
      title: 'Borrowers',
      type: 'item',
      url: '/customers/borrowers',
      icon: icons.IconUserExclamation
      //   breadcrumbs: false
    }
  ]
};

export default borrower;
