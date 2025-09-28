# 🎯 OpenCells Menú Lateral - Microfrontend

Un componente de menú lateral desarrollado con **OpenCells** y **Lit**, diseñado para funcionar como microfrontend en aplicaciones contenedoras.

![OpenCells](https://img.shields.io/badge/OpenCells-Framework-blue)
![Lit](https://img.shields.io/badge/Lit-Web%20Components-green)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue)
![Microfrontend](https://img.shields.io/badge/Microfrontend-Architecture-orange)

## ✨ Características

- 🎨 **Diseño Moderno**: Interfaz atractiva con gradientes y transiciones suaves
- 📱 **Responsive**: Se adapta a diferentes tamaños de pantalla
- 🔄 **Colapsible**: Menú expandible/contraíble con animaciones
- 📦 **Microfrontend**: Funciona independientemente como componente aislado
- 🔗 **Comunicación por Eventos**: Sistema robusto de comunicación con la aplicación contenedora
- 🏷️ **Badges**: Soporte para indicadores numéricos en elementos del menú
- 📂 **Secciones**: Organización por categorías
- ♿ **Accesible**: Soporte para navegación por teclado y lectores de pantalla
- 🎯 **Fácil Integración**: Compatible con cualquier framework (React, Vue, Angular, etc.)

## 🚀 Inicio Rápido

### Instalación y Desarrollo

```bash
# Clonar el repositorio
git clone <repository-url>
cd oc_menu/oc_menu

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173/`

### Comandos Disponibles

```bash
npm run dev      # Servidor de desarrollo con hot reload
npm run build    # Construir para producción
npm run preview  # Vista previa de la build de producción
```

## 🏗️ Arquitectura

### Estructura del Proyecto

```
oc_menu/
├── src/
│   ├── components/
│   │   ├── app-index.ts          # Componente raíz
│   │   └── menu-sidebar.ts       # Componente principal del menú
│   ├── types/
│   │   └── menu-events.ts        # Definiciones de tipos y eventos
│   ├── services/
│   │   └── menu-communication.ts # Servicio de comunicación
│   └── css/
│       └── main.css              # Estilos globales
├── integration-example.html      # Ejemplo de integración
├── MENU_DOCUMENTATION.md         # Documentación detallada
└── package.json
```

### Componentes Principales

1. **`MenuSidebar`**: Componente principal del menú lateral
2. **`MenuCommunicationService`**: Servicio para la comunicación entre componentes
3. **Sistema de Eventos**: Comunicación bidireccional con la aplicación contenedora

## 🔌 Integración

### 1. Como Iframe (Recomendado para desarrollo)

```html
<iframe 
  src="http://localhost:5173/" 
  frameborder="0" 
  style="width: 280px; height: 100vh; border: none;">
</iframe>
```

### 2. Como Web Component

```html
<script type="module" src="path/to/menu-sidebar.js"></script>
<menu-sidebar></menu-sidebar>
```

### 3. Escuchar Eventos

```javascript
// Escuchar eventos del menú
window.addEventListener('message', (event) => {
  const { type, menuId, menuLabel } = event.data;
  
  switch (type) {
    case 'menu-item-selected':
      console.log(`Navegar a: ${menuLabel} (${menuId})`);
      // Implementar lógica de navegación
      break;
    case 'menu-ready':
      console.log('Menú listo para usar');
      break;
  }
});
```

### 4. Controlar el Menú

```javascript
// Activar un elemento específico
iframe.contentWindow.postMessage({
  command: 'setActiveItem',
  itemId: 'dashboard'
}, '*');

// Colapsar el menú
iframe.contentWindow.postMessage({
  command: 'collapse'
}, '*');
```

## 📋 Configuración del Menú

```typescript
interface MenuConfig {
  title?: string;           // Título del menú
  logo?: string;           // URL del logo  
  items: MenuItem[];       // Elementos del menú
  footer?: {               // Pie del menú
    version?: string;
    company?: string;
  };
}

interface MenuItem {
  id: string;              // ID único
  label: string;           // Etiqueta visible
  icon?: string;           // Icono (emoji o texto)
  section?: string;        // Sección del menú
  disabled?: boolean;      // Estado deshabilitado
  badge?: string | number; // Badge/contador
}
```

### Ejemplo de Configuración

```javascript
const menuConfig = {
  title: 'Mi Aplicación',
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
  ]
};
```

## 🔔 Sistema de Eventos

### Eventos Emitidos

- **`menu-ready`**: El menú está completamente cargado
- **`menu-item-selected`**: Se seleccionó un elemento del menú
- **`menu-collapsed`**: El menú se colapsó
- **`menu-expanded`**: El menú se expandió

### Comandos Disponibles

- **`setActiveItem`**: Activar un elemento específico
- **`updateConfig`**: Actualizar la configuración del menú
- **`collapse`**: Colapsar el menú
- **`expand`**: Expandir el menú

## 🌟 Demo Interactiva

Ejecuta la aplicación y abre `integration-example.html` en tu navegador para ver una demostración completa de:

- ✅ Comunicación bidireccional
- ✅ Control programático del menú
- ✅ Log de eventos en tiempo real
- ✅ Contenido dinámico basado en selección
- ✅ Interfaz de prueba completa

## 🔧 Personalización

### Estilos CSS

El componente utiliza CSS-in-JS con Lit. Puedes personalizar:

```css
:root {
  --menu-width: 280px;
  --menu-collapsed-width: 70px;
  --menu-primary-color: #1e3a8a;
  --menu-secondary-color: #1e40af;
  --menu-text-color: #ffffff;
}
```

### Temas Personalizados

```javascript
// Ejemplo de tema oscuro
const darkTheme = {
  '--menu-primary-color': '#0f172a',
  '--menu-secondary-color': '#1e293b',
  '--menu-text-color': '#f1f5f9'
};
```

## 🚢 Despliegue

### Build de Producción

```bash
npm run build
```

Los archivos generados estarán en `dist/` y pueden ser servidos desde cualquier servidor web estático.

### CDN (Recomendado para producción)

```html
<script type="module" src="https://tu-cdn.com/menu-sidebar.js"></script>
```

## 🤝 Integración con Frameworks

### React

```jsx
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const handleMenuEvent = (event) => {
      if (event.data.type === 'menu-item-selected') {
        // Manejar navegación
        navigate(`/${event.data.menuId}`);
      }
    };
    
    window.addEventListener('message', handleMenuEvent);
    return () => window.removeEventListener('message', handleMenuEvent);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <iframe src="/menu" width="280" height="100%" />
      <main>Mi contenido</main>
    </div>
  );
}
```

### Vue 3

```vue
<template>
  <div class="app-layout">
    <iframe ref="menuFrame" src="/menu" />
    <main>{{ currentContent }}</main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const currentContent = ref('Dashboard');

onMounted(() => {
  window.addEventListener('message', (event) => {
    if (event.data.type === 'menu-item-selected') {
      currentContent.value = event.data.menuLabel;
    }
  });
});
</script>
```

### Angular

```typescript
@Component({
  selector: 'app-root',
  template: `
    <div class="app-layout">
      <iframe src="/menu" width="280" height="100%"></iframe>
      <main>{{ currentSection }}</main>
    </div>
  `
})
export class AppComponent implements OnInit {
  currentSection = 'Dashboard';

  ngOnInit() {
    window.addEventListener('message', (event) => {
      if (event.data.type === 'menu-item-selected') {
        this.currentSection = event.data.menuLabel;
      }
    });
  }
}
```

## 📝 Próximas Funcionalidades

- [ ] 🌳 **Sub-menús multinivel**: Soporte para elementos anidados
- [ ] 🎨 **Editor de temas**: Interfaz para personalizar colores
- [ ] 🔍 **Búsqueda**: Filtrado de elementos del menú
- [ ] 📱 **Modo móvil**: Adaptación para dispositivos pequeños
- [ ] 🔐 **Autenticación**: Integración con sistemas de auth
- [ ] 📊 **Analytics**: Métricas de uso del menú
- [ ] 🌐 **i18n**: Soporte para múltiples idiomas

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia Apache 2.0. Ver el archivo `LICENSE` para más detalles.

## 🙋‍♂️ Soporte

Si tienes preguntas o necesitas ayuda:

- 📖 Consulta la [documentación detallada](MENU_DOCUMENTATION.md)
- 🐛 Reporta bugs en [Issues](../../issues)
- 💡 Propón nuevas funcionalidades en [Discussions](../../discussions)

---

Desarrollado con ❤️ usando [OpenCells](https://github.com/open-cells/open-cells) y [Lit](https://lit.dev/)
Menu App Open cells
