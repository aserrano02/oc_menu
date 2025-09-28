import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ElementController } from '@open-cells/element-controller';
import { MenuConfig } from '../types/menu-events.js';
import './menu-sidebar.js';

@customElement('app-index')
export class AppIndex extends LitElement {
  elementController = new ElementController(this);

  static styles = css`
    :host {
      display: block;
      width: 100%;
      height: 100vh;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    main {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `;

  private _menuConfig: MenuConfig = {
    title: 'OpenCells Menu',
    logo: '/images/favicon.svg',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: '📊',
        section: 'Principal'
      },
      {
        id: 'users',
        label: 'Usuarios',
        icon: '👥',
        section: 'Principal',
        badge: '12'
      },
      {
        id: 'projects',
        label: 'Proyectos',
        icon: '📂',
        section: 'Principal'
      },
      {
        id: 'analytics',
        label: 'Analíticas',
        icon: '📈',
        section: 'Principal'
      },
      {
        id: 'settings',
        label: 'Configuración',
        icon: '⚙️',
        section: 'Sistema'
      },
      {
        id: 'help',
        label: 'Ayuda',
        icon: '❓',
        section: 'Sistema'
      },
      {
        id: 'profile',
        label: 'Mi Perfil',
        icon: '👤',
        section: 'Usuario'
      },
      {
        id: 'notifications',
        label: 'Notificaciones',
        icon: '🔔',
        section: 'Usuario',
        badge: '3'
      },
      {
        id: 'logout',
        label: 'Cerrar Sesión',
        icon: '🚪',
        section: 'Usuario'
      }
    ],
    footer: {
      company: 'OpenCells Framework',
      version: '1.0.0'
    }
  };

  render() {
    return html`
      <main role="main">
        <menu-sidebar .config="${this._menuConfig}"></menu-sidebar>
      </main>
    `;
  }
}
