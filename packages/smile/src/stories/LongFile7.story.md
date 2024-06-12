---
group: 'general'
title: '6.-Product Tour'
---

<div class="sidebar-r-doc">
  <div>En esta página</div>
  <ul>
    <li><a href="#requisitos">Requisitos</a></li>
    <li><a href="#uso">Uso</a></li>
  </ul>
</div>

# Product Tour

<div class="card-title">
El Product Tour proporciona una funcionalidad para guiar a los usuarios a través de las características clave de las aplicaciones de Alegra. Este tour ofrece una experiencia interactiva y orientada a la guía
</div>

---

## Requisitos

Para poder utilizar el Product Tour, es necesario que la aplicación consuma el componente de `Topbar` de `smile-ui-alegra-next`, el cual es un módulo federado. El componente de Topbar se consume de forma individual en todos los microfrontends de Vue 2 y a través del orquestador de microfrontends de Vue 3.

<div class="image-product-tour-container">
  <div class="image-product-tour"></div>
</div>

<br>

<div class="card-warn">
**NOTA** Durante el desarrollo local de microfrontends en Vue 3, es importante tener en cuenta que el componente de Topbar no está instalado. Por lo tanto, para probar el funcionamiento del Product Tour de forma local, es necesario <a href="/story/src-stories-longfile1-story-js#correr-microfront-en-testing">correr microfront en testing</a>
</div>

## Uso

El Product Tour está accesible a través de la variable global `window`. Esto significa que se puede invocar desde cualquier parte de la aplicación.

```js
window._smileLayout.showPopup('elementId', options);

// Example

window._smileLayout.showPopup('s-launcher-component', {
  title: 'Navega entre tus empresas 🚀',
  description:
    'Desde aquí podrás cambiar entre las empresas que tienes vinculadas. Agrega una nueva empresa y prueba todo el poder de la Contabilidad Inteligente.',
  labelSecondaryAction: 'Anterior',
  labelMainAction: 'Explorar',
  close: () => console.log('Se ha cerrado el PopOver'),
  mainAction: () => console.log('Se ha ejecutado la acción principal'),
  secondaryAction: () => console.log('Se ha ejecutado la acción secundaria'),
});
```

### Parámetros

`elementId (string)`: El ID del elemento HTML sobre el cual se desplegará el PopOver.

`options (Object)`: Un objeto de configuración que contiene las siguientes propiedades:

- `title (string, opcional)`: Título del PopOver.
- `description (string, opcional)`: Descripción detallada.
- `labelMainAction (string, opcional)`: Etiqueta para la acción principal.
- `labelSecondaryAction (string, opcional)`: Etiqueta para la acción secundaria.
- `placement ('left' | 'top' | 'right' | 'bottom', opcional)`: Posición relativa con respecto al elemento.
- `mainAction (function, opcional)`: Función a ejecutar al activar la acción principal.
- `secondaryAction (function, opcional)`: Función a ejecutar al activar la acción secundaria.
- `close (function, opcional)`: Función a ejecutar al cerrar el PopOver.
