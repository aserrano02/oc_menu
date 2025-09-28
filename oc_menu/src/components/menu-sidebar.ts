import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { MenuConfig, MenuItem, MenuEventDetail, MENU_CHANNEL, MENU_EVENTS } from '../types/menu-events.js';

@customElement('menu-sidebar')
export class MenuSidebar extends LitElement {
  @property({ type: Object })
  config: MenuConfig = {
    title: 'OpenCells Menu',
    items: []
  };

  @state()
  private _collapsed = false;

  @state()
  private _activeItem = '';

  static styles = css`
    :host {
      display: block;
      width: 280px;
      height: 100vh;
      background: linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%);
      color: white;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
      transition: width 0.3s ease;
      overflow: hidden;
    }

    :host([collapsed]) {
      width: 70px;
    }

    .menu-header {
      padding: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .menu-logo {
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
    }

    .menu-title {
      font-size: 18px;
      font-weight: 600;
      opacity: 1;
      transition: opacity 0.3s ease;
    }

    :host([collapsed]) .menu-title {
      opacity: 0;
    }

    .menu-content {
      flex: 1;
      overflow-y: auto;
      padding: 20px 0;
    }

    .menu-section {
      margin-bottom: 24px;
    }

    .section-title {
      padding: 0 20px 8px;
      font-size: 12px;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.6);
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: opacity 0.3s ease;
    }

    :host([collapsed]) .section-title {
      opacity: 0;
    }

    .menu-item {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      cursor: pointer;
      transition: all 0.2s ease;
      border: none;
      background: none;
      color: inherit;
      font: inherit;
      width: 100%;
      text-align: left;
      position: relative;
    }

    .menu-item:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    .menu-item.active {
      background: rgba(255, 255, 255, 0.15);
    }

    .menu-item.active::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 3px;
      background: #60a5fa;
    }

    .menu-item:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .menu-icon {
      width: 20px;
      height: 20px;
      margin-right: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      font-size: 16px;
    }

    .menu-label {
      flex: 1;
      font-size: 14px;
      font-weight: 500;
      opacity: 1;
      transition: opacity 0.3s ease;
    }

    :host([collapsed]) .menu-label {
      opacity: 0;
    }

    .menu-badge {
      background: #ef4444;
      color: white;
      font-size: 11px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 18px;
      text-align: center;
      transition: opacity 0.3s ease;
    }

    :host([collapsed]) .menu-badge {
      opacity: 0;
    }

    .menu-footer {
      padding: 20px;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
      font-size: 12px;
      color: rgba(255, 255, 255, 0.6);
      text-align: center;
    }

    .collapse-button {
      position: absolute;
      top: 20px;
      right: 15px;
      background: rgba(255, 255, 255, 0.1);
      border: none;
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s ease;
    }

    .collapse-button:hover {
      background: rgba(255, 255, 255, 0.2);
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    this._setupMessageListener();
    this._emitMenuReady();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._cleanupMessageListener();
  }

  private _setupMessageListener() {
    this._messageListener = (event: MessageEvent) => {
      // Solo procesar mensajes de la aplicación contenedora (iframe parent)
      if (event.source !== window.parent) return;
      
      const { command, itemId, config } = event.data;
      
      switch (command) {
        case 'setActiveItem':
          if (itemId) {
            this.setActiveItem(itemId);
          }
          break;
        case 'updateConfig':
          if (config) {
            this.updateConfig(config);
          }
          break;
        case 'collapse':
          this._collapsed = true;
          this.setAttribute('collapsed', '');
          this.requestUpdate();
          break;
        case 'expand':
          this._collapsed = false;
          this.removeAttribute('collapsed');
          this.requestUpdate();
          break;
      }
    };
    
    window.addEventListener('message', this._messageListener);
  }

  private _cleanupMessageListener() {
    if (this._messageListener) {
      window.removeEventListener('message', this._messageListener);
    }
  }

  private _messageListener?: (event: MessageEvent) => void;

  render() {
    return html`
      <div class="menu-header">
        <div class="menu-logo">
          ${this.config.logo ? html`<img src="${this.config.logo}" alt="Logo" />` : html`OC`}
        </div>
        <div class="menu-title">${this.config.title}</div>
        <button class="collapse-button" @click="${this._toggleCollapse}">
          ${this._collapsed ? '→' : '←'}
        </button>
      </div>

      <div class="menu-content">
        ${this._renderMenuItems()}
      </div>

      ${this.config.footer ? html`
        <div class="menu-footer">
          ${this.config.footer.company ? html`<div>${this.config.footer.company}</div>` : ''}
          ${this.config.footer.version ? html`<div>v${this.config.footer.version}</div>` : ''}
        </div>
      ` : ''}
    `;
  }

  private _renderMenuItems() {
    const sections = this._groupItemsBySection();
    
    return Object.entries(sections).map(([sectionName, items]) => html`
      <div class="menu-section">
        ${sectionName !== 'default' ? html`<div class="section-title">${sectionName}</div>` : ''}
        ${items.map(item => this._renderMenuItem(item))}
      </div>
    `);
  }

  private _renderMenuItem(item: MenuItem) {
    const isActive = this._activeItem === item.id;
    
    return html`
      <button 
        class="menu-item ${isActive ? 'active' : ''}"
        ?disabled="${item.disabled}"
        @click="${() => this._handleItemClick(item)}"
        title="${this._collapsed ? item.label : ''}"
      >
        <div class="menu-icon">
          ${item.icon || '●'}
        </div>
        <div class="menu-label">${item.label}</div>
        ${item.badge ? html`<div class="menu-badge">${item.badge}</div>` : ''}
      </button>
    `;
  }

  private _groupItemsBySection(): Record<string, MenuItem[]> {
    const sections: Record<string, MenuItem[]> = {};
    
    this.config.items.forEach(item => {
      const section = item.section || 'default';
      if (!sections[section]) {
        sections[section] = [];
      }
      sections[section].push(item);
    });
    
    return sections;
  }

  private _handleItemClick(item: MenuItem) {
    if (item.disabled) return;
    
    this._activeItem = item.id;
    this.requestUpdate();
    
    const eventDetail: MenuEventDetail = {
      menuId: item.id,
      menuLabel: item.label,
      menuIcon: item.icon,
      data: item
    };
    
    this._emitEvent(MENU_EVENTS.ITEM_SELECTED, eventDetail);
  }

  private _toggleCollapse() {
    this._collapsed = !this._collapsed;
    
    if (this._collapsed) {
      this.setAttribute('collapsed', '');
      this._emitEvent(MENU_EVENTS.MENU_COLLAPSED, { collapsed: true });
    } else {
      this.removeAttribute('collapsed');
      this._emitEvent(MENU_EVENTS.MENU_EXPANDED, { collapsed: false });
    }
  }

  private _emitMenuReady() {
    this._emitEvent(MENU_EVENTS.MENU_READY, { 
      ready: true, 
      config: this.config 
    });
  }

  private _emitEvent(type: string, detail: any) {
    const event = new CustomEvent(type, {
      detail,
      bubbles: true,
      composed: true
    });
    
    // Emitir evento local
    this.dispatchEvent(event);
    
    // Emitir evento al canal global para la aplicación contenedora
    window.dispatchEvent(new CustomEvent(MENU_CHANNEL, {
      detail: {
        type,
        ...detail
      }
    }));

    // Si estamos en un iframe, también enviar mensaje al padre
    if (window.parent !== window) {
      window.parent.postMessage({
        type,
        ...detail
      }, '*');
    }
  }

  /**
   * API pública para establecer el elemento activo
   */
  setActiveItem(itemId: string) {
    this._activeItem = itemId;
    this.requestUpdate();
  }

  /**
   * API pública para actualizar la configuración del menú
   */
  updateConfig(newConfig: Partial<MenuConfig>) {
    this.config = { ...this.config, ...newConfig };
    this.requestUpdate();
  }
}