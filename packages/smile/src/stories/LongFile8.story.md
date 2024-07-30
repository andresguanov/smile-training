---
group: 'general'
title: '7.-Instalación librería'
---

<div class="sidebar-r-doc">
  <div>En esta página</div>
  <ul>
    <li><a href="#requisitos">Requisitos</a></li>
    <li><a href="#configuracion">Configuración</a></li>
  </ul>
</div>

# Instalación librería

<div class="card-warn">
  Los microfronts clonados a partir del proyecto base no necesitan de esta guía.
  <a href="/story/src-stories-longfile1-story-js">Saber más</a>
</div>

Para instalar la librería de SmileUI desde cero, sigue los pasos a continuación:

## Requisitos

Antes de iniciar la instalación, asegúrate de que tu proyecto cumpla con los siguientes requisitos:

- **Vue 3.4.x:** Tu proyecto debe estar utilizando esta versión.

- **TailwindCSS:** Debe estar instalado. [Saber más](https://tailwindcss.com/docs/installation)

- **Autenticación en GitHub Packages:** Debes estar logeado en el registro de paquetes de GitHub para instalar la librería. [Saber más](/story/src-stories-longfile1-story-js#instalando-las-dependencias)

## Configuración

### Configurar el registro de GitHub

Crea un archivo `.npmrc` en la raíz de tu proyecto con el siguiente contenido:

```
@alegradev:registry=https://npm.pkg.github.com
```

Esto permitirá instalar la librería SmileUI con el siguiente comando:

```bash
npm i @alegradev/smile-ui-next
```

### Modificar archivos de configuración

Actualiza los siguientes archivos con la configuración adecuada:

`tailwind.config.js`

```js
import colors from 'tailwindcss/colors';
import { theme } from '@alegradev/smile-ui-next';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: theme(colors),
  plugins: [],
};
```

`src/style.css` (o en la hoja de estilos global)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* https://github.com/alegradev/smile-ui-next/blob/master/packages/smile/src/index.css */
:root {
  --sm-color-primary-50: 235, 250, 250;
  --sm-color-primary-100: 212, 242, 241;
  --sm-color-primary-200: 182, 236, 234;
  --sm-color-primary-300: 160, 228, 226;
  --sm-color-primary-400: 134, 223, 220;
  --sm-color-primary-500: 0, 177, 157;
  --sm-color-primary-600: 10, 158, 154;
  --sm-color-primary-700: 0, 83, 94;
  --sm-color-primary-800: 0, 106, 103;
  --sm-color-primary-900: 0, 84, 82;
}
```

`src/main.ts` (o en el script principal del proyecto)

```ts
import { createApp } from 'vue';
import '../node_modules/@alegradev/smile-ui-next/dist/style.css';
import './style.css';
import App from './App.vue';

createApp(App).mount('#app');
```

### Probar la instalación

Para verificar que SmileUI está correctamente instalado, utiliza el siguiente componente:

```vue
<script setup lang="ts">
import { SButton } from '@alegradev/smile-ui-next';
</script>

<template>
  <SButton size="small"> Button </SButton>
</template>
```

Con estos pasos, deberías estar listo para empezar a usar SmileUI en tu proyecto 🚀.
