// assets
import { IconCreditCard, IconMoneybag, IconGift } from '@tabler/icons';

// constant
const icons = {
  IconCreditCard,
  IconMoneybag,
  IconGift
};

// ==============================|| Account Management List ||============================== //

const plans = {
  title: 'Account Management',
  type: 'admin',
  children: [
    {
      id: '16',
      title: 'Subscription',
      type: 'item',
      url: 'AccountManagement/Subscription',
      icon: icons.IconCreditCard,
      breadcrumbs: false
    },
    {
      id: '17',
      title: 'Payment Details',
      type: 'item',
      url: 'AccountManagement/Payments',
      icon: icons.IconMoneybag,
      breadcrumbs: false
    },
    {
      id: '17.1',
      title: 'Loan Offers',
      type: 'item',
      url: 'AccountManagement/LoanOffers',
      icon: icons.IconGift,
      breadcrumbs: false
    }
  ]
};

export default plans;
