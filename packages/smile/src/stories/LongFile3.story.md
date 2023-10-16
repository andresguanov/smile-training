---
group: 'general'
title: 'CSS'
---

<div class="sidebar-r-doc">
  <div>En esta página</div>
  <ul>
    <li><a href="#usar-estilos-scoped">Estilos scoped</a></li>
    <li><a href="#usar-solo-tailwind-en-la-medida-de-lo-posible">Tailwind en la medida de lo posible</a></li>
    <li><a href="#uso-de-tailwind-en-la-etiqueta-style">Tailwind en la etiqueta style</a></li>
    <li><a href="#no-reinventes-la-rueda">Reinventar la rueda</a></li>
    <li><a href="#no-generes-clases-innecesarias">Clases innecesarias</a></li>
    <li><a href="#agrega-prefijo-a-tus-clases-personalizadas">Prefijo a tus clases</a></li>
  </ul>
</div>

# CSS

<div class="card-title">
Con la introducción de la nueva arquitectura para Vue 3, que se basa en la característica de Module Federations de Webpack 5, es esencial adherirse a la siguiente lista de recomendaciones para prevenir posibles problemas inesperados con los microfronts desarrollados.
</div>

---

## Usar Estilos Scoped

Dentro de un single file component de Vue, es importante usar la palabra reservada scoped, este atributo nos permite definir estilos que solo se mantienen en el ámbito del componente.

Debido a que todos los microfront son cargados dentro de una “aplicación principal” u orquestador, definir estilos globales puede sobreescribir los estilos ya definidos por el propio orquestador, causando comportamientos no deseados. En el peor de los casos, podrías estropear estilos usados por otros microfront.

```bash
+------------------+                  +-----------------+
| Micro1           |                  | Micro2          |
| +--------------+ |                  | +-------------+ |
| | Income       | |                  | | Reports     | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
          |                                     |
          |------------------------------------ |
                            |
                   +------------------+
                   |                  |
                   | +--------------+ |
                   | |     Main     | |
                   | |              | |
                   | +--------------+ |
                   +------------------+
```

## Usar solo tailwind en la medida de lo posible

Una de las destacadas novedades de la nueva arquitectura es la integración del framework CSS Tailwind. Por esta razón, es imperativo que tanto los componentes de Smile como los microfronts generados hagan uso de estos estilos.

Estos estilos son generados durante el tiempo de compilación. Para aplicarlos en tus componentes, simplemente incluye la etiqueta class y asigna la clase deseada.

Esta práctica evita la necesidad de crear clases personalizadas que puedan generar un exceso de hojas de estilo, ya que Tailwind está disponible a nivel global en todos los microfronts.

```vue
<template>
  <div class="w-full bg-white border border-slate-200 rounded-[12px]">
    <div class="h-12 border-b border-slate-200 flex items-center px-8 font-semibold text-slate-700">
      <slot name="header"></slot>
    </div>
    <div class="px-8 pt-4 pb-5">
      <slot></slot>
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
```

## Uso de tailwind en la etiqueta style

Para poder usar tailwind dentro de la etiqueta style en tu single file component solo debes de generar la clase y utilizar la palabra reservada `@apply` esto compilara los estilos deseados en tu servidor de desarrollo y en el bundle generado para producción.

```vue
<style lang="scss" scoped>
.xml-container {
  &__card {
    @apply p-4;
    @apply flex items-center flex-col;
  }
  &__form {
    @apply grid grid-cols-2 gap-2;
    @apply my-5;
  }
  img {
    @apply w-24 h-24;
  }
}
</style>
```

## No reinventes la rueda

Tailwind cuenta con una gran cantidad de estilos que hacen muy díficil un escenario en el cual tengas que generar los propios. Pongamos el siguiente ejemplo.

```vue
<style lang="scss" scoped>
.xml-icon-container {
  display: flex;
  background-color: white;
  border-radius: 9999px;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  margin-right: 1rem;
}
</style>
```

```vue
<style lang="scss" scoped>
.xml-icon-container {
  @apply flex bg-white rounded-full items-center;
  @apply justify-center h-[2.5rem] w-[2.5rem] mr-4;
}
</style>
```

Compara el primer ejemplo con el segundo, además de que resulta más simple, ahorra mucho tiempo de desarrollo y lo más importante, no generas estilos que ya existen.

## No generes clases innecesarias

Es importante que trates de usar las clases css de Tailwind en línea dentro de los componentes. De esta forma evitas que al generar el código a producción se generen archivos que podrían ser prescindibles.

<div class="card-warn">
  <strong>NOTA:</strong> No es una regla general, en algunos casos es conveniente hacer uso de clases para encapsular estilos, sobretodo en aquellos en los que se mejore la legibilidad. Queda a criterio del desarrollador y del equipo en que casos es conveniente usar clases o estilos en línea.
</div>

## Agrega Prefijo a Tus Clases Personalizadas

En en el caso de que generes tus propias clases para los estilos de tus componentes, es de suma importancia que agregues un prefijo. Esto con el fin de evitar un escenario en el que tus estilos coincidan con los de otro microfront y haya un empalme que estropee ambos. Si bien el uso de scoped evita esto, es una medida preventida en caso de que olvides colocar el atributo. A su vez, es de gran ayuda al momento de revisar tus estilos en la consola del navegador, ya que te ayuda a identificarlos más rápidamente.

```vue
<style lang="scss" scoped>
.xml-icon-container {
}
.xml-input-label {
}
.xml-card-shadow {
}
</style>
```
