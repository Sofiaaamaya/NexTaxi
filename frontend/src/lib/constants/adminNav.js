export const ADMIN_NAV_ITEMS = [
  { key: 'dashboard', icon: 'LayoutDashboard', path: '/admin/dashboard' },
  { key: 'drivers', icon: 'Car', path: '/admin/conductores' },
  { key: 'invitations', icon: 'Mail', path: '/admin/invitaciones' },
];

export const GERENTE_NAV_ITEMS = [
  { key: 'dashboard', icon: 'LayoutDashboard', path: '/gerente/dashboard' },
  { key: 'drivers', icon: 'Car', path: '/gerente/conductores' },
];

export const CONDUCTOR_NAV_ITEMS = [
  {
    key: 'dashboard',
    icon: 'LayoutDashboard',
    path: '/conductor/dashboard'
  },
  {
    key: 'miPerfil',
    icon: 'User',
    path: '/conductor/mi-perfil'
  },
  {
    key: 'misViajes',
    icon: 'Car',
    path: '/conductor/mis-viajes'
  }
];
