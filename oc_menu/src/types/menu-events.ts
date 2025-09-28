/**
 * Tipos de eventos que puede emitir el menú lateral
 */
export interface MenuEventDetail {
  menuId: string;
  menuLabel: string;
  menuIcon?: string;
  data?: any;
}

export interface MenuEvent extends CustomEvent<MenuEventDetail> {
  type: 'menu-item-selected';
}

/**
 * Configuración de elementos del menú
 */
export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  section?: string;
  disabled?: boolean;
  badge?: string | number;
  children?: MenuItem[];
}

/**
 * Configuración del menú lateral
 */
export interface MenuConfig {
  title?: string;
  logo?: string;
  items: MenuItem[];
  footer?: {
    version?: string;
    company?: string;
  };
}

/**
 * Canal de comunicación con la aplicación contenedora
 */
export const MENU_CHANNEL = 'oc-menu-channel';

/**
 * Tipos de eventos disponibles
 */
export const MENU_EVENTS = {
  ITEM_SELECTED: 'menu-item-selected',
  MENU_READY: 'menu-ready',
  MENU_COLLAPSED: 'menu-collapsed',
  MENU_EXPANDED: 'menu-expanded',
} as const;