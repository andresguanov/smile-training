---
group: 'general'
title: '4.-Traducción'
---

<div class="sidebar-r-doc">
  <div>En esta página</div>
  <ul>
    <li><a href="#uso">Uso</a></li>
    <li><a href="#helpers">Helpers</a></li>
  </ul>
</div>

# Traducción

La funcion `$trans` brinda el soporte necesario para implementar internationalization.

```vue
<script setup>
import { $transF } from 'app_alegra_commons/translate';
</script>
```

## Uso

Los argumentos de la función son:

- `key`: Clave en el diccionario por la cual buscar
- `fallback`: String que mostrará si no lo encuentra
- `data`: Objeto que contiene pares de clave-valor para reemplazar en el string final (esto sería para traducciones que contienen "variables")
- `transform`: Acepta 4 string y es para hacerle una transformación al string final: "UPPER", "LOWER", "FIRST" y "TITLE".

La función `$trans` y sus derivados, también se le puede pasar los argumentos como un objeto:

```js
$transF({
  key,
  fallback,
  data,
  transform,
});
```

Ejemplos

```vue
<template>
  <sm-input :label="label" size="small" />
  <sm-input :label="$transF('email')" size="small" />

  <sm-button type="primary">
    {{ $transF('submit') }}
  </sm-button>
</template>

<script setup>
import { $transF } from 'app_alegra_commons/translate';

const label = computed(() => $transF('name'));
</script>
```

En el archivo de diccionario: `src/languages/es/common.js`

```js
export default {
  hello: 'Default Page',
  name: 'nombre',
  email: 'correo',
  submit: 'Guardar',
};
```

## Helpers

Los siguientes `helpers` tiene la misma signatura que `$trans` excepto por la exclusión del parámetro transform el cuál, tiene un valor predeterminado para cada helper

- `$transU`: Muestra el texto traducido en UPPERCASE
- `$transL`: Muestra el texto traducido en lowercase
- `$transF`: Muestra la primera letra del texto en Uppercase
- `$transT`: Muestra el texto traducido con el formato de Un Título.
