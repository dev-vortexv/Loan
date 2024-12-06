// assets
import {
    IconHome,
    IconCalendarEvent,
    IconMail,
    IconFileUpload,
    IconFileInvoice,
    IconPhoneCall,
    IconAntennaBars5,
    IconChecklist,
    IconNotebook,
    IconPhoneCheck,
    IconUsers
  } from '@tabler/icons';
  
  // constant
  const icons = {
    IconHome,
    IconCalendarEvent,
    IconMail,
    IconFileUpload,
    IconFileInvoice,
    IconPhoneCall,
    IconAntennaBars5,
    IconChecklist,
    IconNotebook,
    IconPhoneCheck,
    IconUsers
  };
  
  // ==============================|| ADMIN DASHBOARD MENU ITEMS ||============================== //
  
  const superAdminDashboard = {
    title: 'SuperAdmin-Menu',
    type: 'superadmin',
    children: [
      {
        id: '01',
        title: 'Dashboard',
        type: 'item',
        url: '/superAdminDashboard/home',
        icon: icons.IconHome,
        breadcrumbs: false
      },
      {
        id: '02',
        title: 'Users Details',
        type: 'item',
        url: '/superAdminDashboard/userDetails',
        icon: icons.IconAntennaBars5,
        breadcrumbs: false
      },
      {
        id: '03',
        title: 'Packages',
        type: 'item',
        url: '/superAdminDashboard/packages',
        icon: icons.IconChecklist,
        breadcrumbs: false
      },
      {
        id: '04',
        title: 'Payment Details',
        type: 'item',
        url: '/superAdminDashboard/paymentsDetails',
        icon: icons.IconNotebook,
        breadcrumbs: false
      }
    ]
  };
  
  export default superAdminDashboard;
  