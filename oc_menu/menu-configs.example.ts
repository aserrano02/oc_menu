/**
 * Configuración de ejemplo para el menú lateral OpenCells
 * 
 * Este archivo muestra diferentes configuraciones posibles para el menú.
 * Puedes copiar y modificar estas configuraciones según tus necesidades.
 */

import { MenuConfig } from './src/types/menu-events.js';

// ================================
// CONFIGURACIÓN BÁSICA
// ================================
export const basicMenuConfig: MenuConfig = {
  title: 'Mi App',
  items: [
    { id: 'home', label: 'Inicio', icon: '🏠' },
    { id: 'profile', label: 'Perfil', icon: '👤' },
    { id: 'settings', label: 'Configuración', icon: '⚙️' }
  ]
};

// ================================
// CONFIGURACIÓN EMPRESARIAL
// ================================
export const enterpriseMenuConfig: MenuConfig = {
  title: 'Sistema Empresarial',
  logo: '/assets/company-logo.svg',
  items: [
    // Sección Principal
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      section: 'Principal'
    },
    {
      id: 'analytics',
      label: 'Analíticas',
      icon: '📈',
      section: 'Principal'
    },
    {
      id: 'reports',
      label: 'Reportes',
      icon: '📋',
      section: 'Principal'
    },

    // Sección de Gestión
    {
      id: 'users',
      label: 'Usuarios',
      icon: '👥',
      section: 'Gestión',
      badge: '12'
    },
    {
      id: 'projects',
      label: 'Proyectos',
      icon: '📂',
      section: 'Gestión',
      badge: '5'
    },
    {
      id: 'tasks',
      label: 'Tareas',
      icon: '✅',
      section: 'Gestión',
      badge: '23'
    },

    // Sección de Configuración
    {
      id: 'system-config',
      label: 'Configuración del Sistema',
      icon: '⚙️',
      section: 'Configuración'
    },
    {
      id: 'integrations',
      label: 'Integraciones',
      icon: '🔗',
      section: 'Configuración'
    },
    {
      id: 'security',
      label: 'Seguridad',
      icon: '🔒',
      section: 'Configuración'
    },

    // Sección de Usuario
    {
      id: 'notifications',
      label: 'Notificaciones',
      icon: '🔔',
      section: 'Usuario',
      badge: '3'
    },
    {
      id: 'my-profile',
      label: 'Mi Perfil',
      icon: '👤',
      section: 'Usuario'
    },
    {
      id: 'logout',
      label: 'Cerrar Sesión',
      icon: '🚪',
      section: 'Usuario'
    }
  ],
  footer: {
    company: 'Mi Empresa S.A.',
    version: '2.1.0'
  }
};

// ================================
// CONFIGURACIÓN E-COMMERCE
// ================================
export const ecommerceMenuConfig: MenuConfig = {
  title: 'Tienda Online',
  logo: '/assets/store-logo.svg',
  items: [
    {
      id: 'home',
      label: 'Inicio',
      icon: '🏠',
      section: 'Navegación'
    },
    {
      id: 'catalog',
      label: 'Catálogo',
      icon: '📚',
      section: 'Navegación'
    },
    {
      id: 'cart',
      label: 'Carrito',
      icon: '🛒',
      section: 'Navegación',
      badge: '4'
    },
    {
      id: 'orders',
      label: 'Mis Pedidos',
      icon: '📦',
      section: 'Mi Cuenta'
    },
    {
      id: 'wishlist',
      label: 'Lista de Deseos',
      icon: '❤️',
      section: 'Mi Cuenta',
      badge: '7'
    },
    {
      id: 'account',
      label: 'Mi Cuenta',
      icon: '👤',
      section: 'Mi Cuenta'
    },
    {
      id: 'support',
      label: 'Soporte',
      icon: '🎧',
      section: 'Ayuda'
    },
    {
      id: 'faq',
      label: 'Preguntas Frecuentes',
      icon: '❓',
      section: 'Ayuda'
    }
  ],
  footer: {
    company: 'Mi Tienda Online',
    version: '1.5.2'
  }
};

// ================================
// CONFIGURACIÓN DE ADMINISTRACIÓN
// ================================
export const adminMenuConfig: MenuConfig = {
  title: 'Panel de Admin',
  items: [
    {
      id: 'overview',
      label: 'Resumen General',
      icon: '📊',
      section: 'Dashboard'
    },
    {
      id: 'user-management',
      label: 'Gestión de Usuarios',
      icon: '👥',
      section: 'Administración',
      badge: 'NEW'
    },
    {
      id: 'content-management',
      label: 'Gestión de Contenido',
      icon: '📝',
      section: 'Administración'
    },
    {
      id: 'permissions',
      label: 'Permisos y Roles',
      icon: '🔐',
      section: 'Administración'
    },
    {
      id: 'system-logs',
      label: 'Logs del Sistema',
      icon: '📄',
      section: 'Monitoreo'
    },
    {
      id: 'performance',
      label: 'Rendimiento',
      icon: '⚡',
      section: 'Monitoreo'
    },
    {
      id: 'backup',
      label: 'Respaldos',
      icon: '💾',
      section: 'Mantenimiento'
    },
    {
      id: 'maintenance',
      label: 'Mantenimiento',
      icon: '🔧',
      section: 'Mantenimiento',
      disabled: true
    }
  ],
  footer: {
    company: 'Sistema Administrativo',
    version: '3.0.1'
  }
};

// ================================
// CONFIGURACIÓN MINIMALISTA
// ================================
export const minimalMenuConfig: MenuConfig = {
  title: 'App Simple',
  items: [
    { id: 'dashboard', label: 'Panel', icon: '■' },
    { id: 'data', label: 'Datos', icon: '▲' },
    { id: 'settings', label: 'Config', icon: '●' },
    { id: 'help', label: 'Ayuda', icon: '?' }
  ]
};

// ================================
// CONFIGURACIÓN CON ICONOS UNICODE
// ================================
export const unicodeIconsConfig: MenuConfig = {
  title: 'Unicode Icons Demo',
  items: [
    { id: 'home', label: 'Inicio', icon: '⌂', section: 'Principal' },
    { id: 'mail', label: 'Correo', icon: '✉', section: 'Principal', badge: '12' },
    { id: 'calendar', label: 'Calendario', icon: '📅', section: 'Principal' },
    { id: 'contacts', label: 'Contactos', icon: '☎', section: 'Principal' },
    { id: 'files', label: 'Archivos', icon: '📁', section: 'Archivos' },
    { id: 'photos', label: 'Fotos', icon: '🖼', section: 'Archivos' },
    { id: 'music', label: 'Música', icon: '♪', section: 'Archivos' },
    { id: 'tools', label: 'Herramientas', icon: '🔧', section: 'Sistema' },
    { id: 'preferences', label: 'Preferencias', icon: '⚙', section: 'Sistema' }
  ]
};

// ================================
// CONFIGURACIÓN PARA DESARROLLO
// ================================
export const devMenuConfig: MenuConfig = {
  title: 'Dev Tools',
  items: [
    { id: 'code', label: 'Editor de Código', icon: '</>', section: 'Desarrollo' },
    { id: 'terminal', label: 'Terminal', icon: '$', section: 'Desarrollo' },
    { id: 'git', label: 'Control Git', icon: 'git', section: 'Desarrollo' },
    { id: 'database', label: 'Base de Datos', icon: 'DB', section: 'Desarrollo' },
    { id: 'api', label: 'API Testing', icon: 'API', section: 'Testing' },
    { id: 'logs', label: 'Logs', icon: 'LOG', section: 'Testing' },
    { id: 'deploy', label: 'Despliegue', icon: '🚀', section: 'DevOps' },
    { id: 'monitor', label: 'Monitoreo', icon: '📊', section: 'DevOps' }
  ],
  footer: {
    company: 'Dev Environment',
    version: 'v1.0.0-dev'
  }
};

// ================================
// FUNCIONES DE UTILIDAD
// ================================

/**
 * Crea una configuración personalizada basada en parámetros
 */
export function createCustomMenuConfig(
  title: string,
  items: Array<{id: string, label: string, icon?: string, section?: string}>,
  options?: {
    logo?: string;
    footer?: { company?: string; version?: string };
  }
): MenuConfig {
  return {
    title,
    logo: options?.logo,
    items: items.map(item => ({
      id: item.id,
      label: item.label,
      icon: item.icon || '●',
      section: item.section
    })),
    footer: options?.footer
  };
}

/**
 * Agrega badges dinámicos a elementos específicos
 */
export function addBadgesToConfig(
  config: MenuConfig,
  badges: Record<string, string | number>
): MenuConfig {
  return {
    ...config,
    items: config.items.map(item => ({
      ...item,
      badge: badges[item.id] || item.badge
    }))
  };
}

/**
 * Deshabilita elementos específicos del menú
 */
export function disableMenuItems(
  config: MenuConfig,
  disabledIds: string[]
): MenuConfig {
  return {
    ...config,
    items: config.items.map(item => ({
      ...item,
      disabled: disabledIds.includes(item.id) || item.disabled
    }))
  };
}

// ================================
// CONFIGURACIÓN POR DEFECTO
// ================================
export default enterpriseMenuConfig;