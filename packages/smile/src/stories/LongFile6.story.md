---
group: 'general'
title: '3.-Commons'
---

<div class="sidebar-r-doc">
  <div>En esta página</div>
  <ul>
    <li><a href="#traduccion">Traducción</a></li>
    <li><a href="#request">Request</a></li>
    <li><a href="#useeventsgtm">useEventsGtm</a></li>
    <li><a href="#libs">Libs</a></li>
  </ul>
</div>

# Alegra commons

<div class="card-title">
Es un proyecto dedicado a la exportación de funciones, bibliotecas y almacenes comunes para los microfronts.

El propósito de `Alegra Commons` es proporcionar un conjunto centralizado de recursos que pueden ser utilizados de manera consistente por los microfrontends en el ecosistema del proyecto.

</div>

Además de proporcionar funciones y librerías comunes, Alegra Commons se encarga de dos tareas fundamentales:

#### Cargado de Microfrontends en el Orquestador:

`Alegra Commons` es responsable de gestionar el proceso de carga de los microfrontends en el orquestador. Esto garantiza una integración fluida y eficiente de los componentes front-end en la aplicación.

#### Store Global:

`Alegra Commons` administra un store global que proporciona un estado compartido entre los diferentes microfrontends. Esto facilita la comunicación y la sincronización de datos en toda la aplicación.

---

## Traducción

La funcion `$trans` brinda el soporte necesario para implementar internationalization.

```vue
<script setup>
import { $transF } from 'app_alegra_commons/translate';
</script>
```

### Uso

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

### Helpers

Los siguientes `helpers` tiene la misma signatura que `$trans` excepto por la exclusión del parámetro transform el cuál, tiene un valor predeterminado para cada helper

- `$transU`: Muestra el texto traducido en UPPERCASE
- `$transL`: Muestra el texto traducido en lowercase
- `$transF`: Muestra la primera letra del texto en Uppercase
- `$transT`: Muestra el texto traducido con el formato de Un Título.

---

## Request

La instancia de axios denominada `service` es una configuración predefinida para realizar peticiones al API en nombre del usuario logueado. Esta configuración incorpora la funcionalidad de obtener automáticamente el token del usuario autenticado, lo que simplifica el proceso de realizar pedidos al API.

```js
import request from 'app_alegra_commons/request';

const url = 'v1/company';

export function getCompany() {
  return request({
    url: url,
    method: 'get',
    params: {
      fields: 'mandateSignatureUrl,manifestSignature',
    },
  });
}

export function getManifest(body) {
  return request.post(`${baseURL}api/stamp-mex/v1/company/getManifest`, body);
}
```

---

## useEventsGtm

`useEventsGtm` es un composable que facilita el envío de eventos a Google Tag Manager (GTM) al proporcionar una [configuración base](https://docs.google.com/document/d/1QN13ApSTfCdnwZrOr321hBu7adxBK2oK0vOUAKUZQXY/edit#heading=h.anf4ziedw2ax) predefinida.

```js
import useEventsGtm from 'app_alegra_commons/useEventsGtm';

const { sendEvent } = useEventsGtm();

const params = {
  event: 'name-event',
  ...
};

sendEvent(params);
```

`params`: Objeto donde puedes proporcionar datos adicionales que se incluirán junto con el evento.

---

## Libs

Este módulo permite la exportación de diversas librerías que pueden ser utilizadas en tus microfrontends sin necesidad de instalación adicional.

### Librerías Disponibles

El módulo federado de libs ofrece acceso a las siguientes librerías:

- `axios` Librería para realizar peticiones HTTP.

- `js-cookie` Librería para el manejo de cookies

```js
import { axios, Cookies } from 'app_alegra_commons/libs';

const { data } = await axios.post(url, body);

Cookies.get('NAME_COOKIE');
```
