# Documentación del Menú Lateral OpenCells

## Descripción General

Este proyecto implementa un menú lateral como microfrontend utilizando el framework OpenCells. El menú está diseñado para funcionar de manera independiente y comunicarse con la aplicación contenedora a través de eventos personalizados.

## Arquitectura

### Componentes Principales

1. **`menu-sidebar.ts`** - Componente principal del menú lateral
2. **`menu-events.ts`** - Definiciones de tipos y eventos
3. **`menu-communication.ts`** - Servicio de comunicación
4. **`app-index.ts`** - Componente raíz de la aplicación

### Comunicación por Eventos

El menú utiliza un sistema de comunicación basado en eventos a través del canal `oc-menu-channel`:

#### Eventos Emitidos por el Menú:

- **`menu-ready`**: Se emite cuando el menú está completamente cargado
- **`menu-item-selected`**: Se emite cuando se selecciona un elemento del menú
- **`menu-collapsed`**: Se emite cuando el menú se colapsa
- **`menu-expanded`**: Se emite cuando el menú se expande

#### Estructura del Evento:

```typescript
interface MenuEventDetail {
  menuId: string;      // ID único del elemento
  menuLabel: string;   // Etiqueta del elemento
  menuIcon?: string;   // Icono del elemento (opcional)
  data?: any;         // Datos adicionales (opcional)
}
```

## Uso en Aplicación Contenedora

### 1. Incluir el Microfrontend

```html
<iframe src="ruta-al-menu/index.html" frameborder="0"></iframe>
<!-- o -->
<script type="module" src="ruta-al-menu/components/menu-sidebar.js"></script>
<menu-sidebar></menu-sidebar>
```

### 2. Escuchar Eventos

```javascript
// Escuchar todos los eventos del menú
window.addEventListener('oc-menu-channel', (event) => {
  const { type, menuId, menuLabel } = event.detail;
  
  switch (type) {
    case 'menu-item-selected':
      // Navegar a la sección correspondiente
      navigateToSection(menuId);
      break;
    case 'menu-ready':
      console.log('Menú cargado y listo');
      break;
  }
});

// Usando el servicio de comunicación (recomendado)
import { menuCommunication } from './services/menu-communication.js';

menuCommunication.onItemSelected((detail) => {
  console.log('Item seleccionado:', detail.menuId);
  // Lógica de navegación
});

menuCommunication.onMenuReady((detail) => {
  console.log('Menú listo:', detail);
});
```

### 3. Controlar el Menú Programáticamente

```javascript
// Activar un elemento específico
const menuElement = document.querySelector('menu-sidebar');
menuElement.setActiveItem('dashboard');

// Actualizar configuración del menú
menuElement.updateConfig({
  items: [
    { id: 'new-item', label: 'Nuevo Item', icon: '🆕' }
  ]
});
```

## Configuración del Menú

### Estructura de Configuración:

```typescript
interface MenuConfig {
  title?: string;           // Título del menú
  logo?: string;           // URL del logo
  items: MenuItem[];       // Elementos del menú
  footer?: {               // Pie del menú (opcional)
    version?: string;
    company?: string;
  };
}

interface MenuItem {
  id: string;              // ID único (requerido)
  label: string;           // Etiqueta visible (requerido)
  icon?: string;           // Icono (emoji o texto)
  section?: string;        // Sección del menú
  disabled?: boolean;      // Si está deshabilitado
  badge?: string | number; // Badge/notificación
  children?: MenuItem[];   // Sub-elementos (futuro)
}
```

### Ejemplo de Configuración:

```javascript
const menuConfig = {
  title: 'Mi Aplicación',
  logo: '/assets/logo.svg',
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
      id: 'settings',
      label: 'Configuración',
      icon: '⚙️',
      section: 'Sistema'
    }
  ],
  footer: {
    company: 'Mi Empresa',
    version: '1.0.0'
  }
};
```

## Características del Menú

### Funcionalidades:

- ✅ **Colapsible**: Permite contraer/expandir el menú
- ✅ **Secciones**: Organización por secciones
- ✅ **Badges**: Indicadores numéricos en elementos
- ✅ **Estados**: Soporte para elementos activos y deshabilitados
- ✅ **Responsive**: Adaptable a diferentes tamaños
- ✅ **Accesible**: Soporte para navegación por teclado y lectores de pantalla

### Estilos:

- Diseño moderno con gradiente azul
- Transiciones suaves
- Hover effects
- Indicadores visuales para elemento activo
- Tooltips en modo colapsado

## Desarrollo y Personalización

### Comandos Disponibles:

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Construir para producción
npm run preview  # Vista previa de la build
```

### Personalización de Estilos:

El componente utiliza Lit CSS-in-JS. Para personalizar:

1. Modifica las variables CSS en `menu-sidebar.ts`
2. Usa CSS custom properties para temas
3. Extiende el componente para personalizaciones avanzadas

### Extensiones Futuras:

- [ ] Soporte para sub-menús multinivel
- [ ] Temas personalizables
- [ ] Integración con sistemas de autenticación
- [ ] Búsqueda en el menú
- [ ] Drag & drop para reordenar elementos

## Integración con Diferentes Frameworks

### React:
```jsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleMenuEvent = (event) => {
      // Manejar eventos del menú
    };
    
    window.addEventListener('oc-menu-channel', handleMenuEvent);
    return () => window.removeEventListener('oc-menu-channel', handleMenuEvent);
  }, []);

  return <div>Mi aplicación React</div>;
}
```

### Vue:
```vue
<script setup>
import { onMounted, onUnmounted } from 'vue';

const handleMenuEvent = (event) => {
  // Manejar eventos del menú
};

onMounted(() => {
  window.addEventListener('oc-menu-channel', handleMenuEvent);
});

onUnmounted(() => {
  window.removeEventListener('oc-menu-channel', handleMenuEvent);
});
</script>
```

### Angular:
```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<div>Mi aplicación Angular</div>'
})
export class AppComponent implements OnInit, OnDestroy {
  private menuListener = (event: any) => {
    // Manejar eventos del menú
  };

  ngOnInit() {
    window.addEventListener('oc-menu-channel', this.menuListener);
  }

  ngOnDestroy() {
    window.removeEventListener('oc-menu-channel', this.menuListener);
  }
}
```