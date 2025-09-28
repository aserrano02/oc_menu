import { MENU_CHANNEL, MENU_EVENTS } from '../types/menu-events.js';

/**
 * Utilidad para la comunicación entre el menú lateral y la aplicación contenedora
 */
export class MenuCommunicationService {
  private static instance: MenuCommunicationService;
  private listeners: Map<string, Function[]> = new Map();

  private constructor() {
    this.initializeGlobalListener();
  }

  static getInstance(): MenuCommunicationService {
    if (!MenuCommunicationService.instance) {
      MenuCommunicationService.instance = new MenuCommunicationService();
    }
    return MenuCommunicationService.instance;
  }

  /**
   * Inicializa el listener global para eventos del menú
   */
  private initializeGlobalListener() {
    window.addEventListener(MENU_CHANNEL, (event: any) => {
      const { type, ...detail } = event.detail;
      this.notifyListeners(type, detail);
    });
  }

  /**
   * Suscribirse a un tipo específico de evento del menú
   */
  on(eventType: string, callback: Function): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, []);
    }
    this.listeners.get(eventType)!.push(callback);
  }

  /**
   * Desuscribirse de un tipo de evento
   */
  off(eventType: string, callback: Function): void {
    const callbacks = this.listeners.get(eventType);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  /**
   * Notificar a los listeners registrados
   */
  private notifyListeners(eventType: string, detail: any): void {
    const callbacks = this.listeners.get(eventType);
    if (callbacks) {
      callbacks.forEach(callback => callback(detail));
    }
  }

  /**
   * Enviar comando al menú lateral
   */
  sendToMenu(command: string, data?: any): void {
    const event = new CustomEvent('menu-command', {
      detail: { command, data }
    });
    document.dispatchEvent(event);
  }

  /**
   * Métodos de conveniencia para eventos comunes
   */
  onMenuReady(callback: (detail: any) => void): void {
    this.on(MENU_EVENTS.MENU_READY, callback);
  }

  onItemSelected(callback: (detail: any) => void): void {
    this.on(MENU_EVENTS.ITEM_SELECTED, callback);
  }

  onMenuCollapsed(callback: (detail: any) => void): void {
    this.on(MENU_EVENTS.MENU_COLLAPSED, callback);
  }

  onMenuExpanded(callback: (detail: any) => void): void {
    this.on(MENU_EVENTS.MENU_EXPANDED, callback);
  }
}

/**
 * Instancia global del servicio de comunicación
 */
export const menuCommunication = MenuCommunicationService.getInstance();