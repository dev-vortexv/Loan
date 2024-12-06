// assets
import { IconCreditCard, IconSettings } from '@tabler/icons';

// constant
const icons = {
  IconCreditCard,
  IconSettings
};

// ==============================|| SETTING List ||============================== //

const setting = {
  title: 'Setting Management',
  type: 'admin',
  children: [
    {
      id: '18',
      title: 'Setting ',
      type: 'item',
      url: 'Setting/tab',
      icon: icons.IconSettings,
      breadcrumbs: false
    }
  ]
};

export default setting;
