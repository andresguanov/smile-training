---
group: 'general'
title: '8.-Single Spa Vue 2'
---

<div class="sidebar-r-doc">
  <div>En esta página</div>
  <ul>
    <li><a href="#actualizacion-desde-el-proyecto-base">Actualización</a></li>
    <li><a href="#estrategia-de-scoped-css">Estrategia Scoped</a></li>
    <li><a href="#consideraciones-a-tener-en-cuenta">Consideraciones</a></li>
  </ul>
</div>

# Single Spa Vue 2

<div class="card-title">
En el pasado, los microfronts basados en Vue 2 en nuestra aplicación se enrutaban mediante AWS. Esta solución resultó efectiva en su momento. Sin embargo, con el tiempo hemos enfrentado limitaciones significativas, especialmente en cuanto a la transición entre microfronts de Vue 2 y Vue 3, así como la falta de capacidades de cacheo.

La presente guía tiene como objetivo explicar las consideraciones clave para actualizar los microfronts de `Vue 2` y su integración con un orquestador basado en `single-spa`, permitiendo así una transición más fluida entre versiones de Vue y optimizando el rendimiento de la aplicación

</div>

## Actualización desde el proyecto base

<div class="card-warn">
  Para llevar a cabo la actualización del proyecto se requiere seguir la siguiente
  <a href="/story/src-stories-longfile5-story-js">guía</a>
</div>

## Estrategia de Scoped CSS

Para integrar microfronts de Vue 2 con el orquestador, es esencial asegurar que las clases de CSS no entren en conflicto entre diferentes microfronts. Para evitar problemas de sobreescritura y colisión de estilos, se implementó un enfoque de "scoping" para las clases CSS.

Con el objetivo de prevenir conflictos entre las clases de `smile-css`, `smile-ui`, `smile-ui-alegra`, y el microfront en sí, se creó un plugin de PostCSS.

```js
module.exports = globalClassName => {
  return {
    postcssPlugin: 'add-global-class',
    Once(root) {
      root.walkRules(rule => {
        if (rule.selector.startsWith('.')) {
          rule.selector = `.${globalClassName} ${rule.selector}`;
        }
      });
    },
  };
};
module.exports.postcss = true;
```

Este plugin añade una clase padre a todas las clases CSS durante el proceso de construcción (build). Por lo tanto, todo el contenido del microfront debe estar envuelto dentro de un contenedor con las siguientes clases:

```vue
<template>
  <div :class="proyect_name">
    <div class="smile-ui-vue2">
      <div class="smile-css">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
```

### Consideraciones a tener en cuenta

- `Eliminación de Clases Globales:`

Las clases globales han sido eliminadas. Como resultado, los inputs o componentes que dependían de las clases globales de smile-css pueden no funcionar correctamente. Utiliza únicamente los componentes de smile-ui, que conforman el Design System.

- `Widgets Exportados:`

Los widgets exportados a través de un paquete de npm desde un microfront deben estar cubiertos por las mismas clases que el microfront. Para esto, se creó un componente llamado WidgetContainer dentro de la carpeta widget. Este componente debe ser utilizado para envolver los widgets exportados.

Si tu microfrontend utiliza widgets con una versión antigua de smile-ui, puede haber conflictos de estilos. Para solucionarlo, informa al responsable del widget sobre el problema y pídele que actualice la versión de smile-ui utilizada.

```vue
<template>
  <WidgetContainer>
    <Widget></Widget>
  </WidgetContainer>
</template>
```

- `Librerías con CSS Propio:`

Si una librería externa que requiere su propio CSS deja de funcionar, es posible que el CSS de la librería necesite ser global. En estos casos, puedes crear un archivo CSS, por ejemplo, `general.css`, e importar los archivos necesarios en él.

```css
/* general.css */
body {
  @import '~vue2-datepicker/scss/index.scss';
}
```

Luego, importa este archivo en `mount.js`, donde se instalan los plugins, stores, y se crea la app. Siempre que sea posible, evita usar múltiples librerías externas y prefiere utilizar las herramientas proporcionadas por smile-ui.

Espero que esta documentación te resulte útil. Si necesitas algún ajuste o información adicional, házmelo saber. `

`Derian Rosado (Developer)`: derian.rosado@alegra.com
