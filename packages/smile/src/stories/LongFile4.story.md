---
group: 'general'
title: '3.-Store'
---

<div class="sidebar-r-doc">
  <div>En esta página</div>
  <ul>
    <li><a href="#modulo-app">Módulo app</a></li>
    <li><a href="#modulo-session">Módulo session</a></li>
  </ul>
</div>

# STORE

Utilizamos Pinia como la librería principal para la gestión del estado global. Pinia proporciona una forma sencilla y eficiente de manejar y compartir el estado entre los diferentes componentes de la aplicación.

---

## Módulo app

El módulo app fue pensado para guardar información relativa a la aplicación.

```vue
<script setup>
import { useSessionStore } from 'app_alegra_commons/session';
const APP = useAppStore();
</script>
```

### Getters

- `appVersion`
  Devuelve el nombre de la versión en el cual está configurada la cuenta del usuario. Lo toma de `session/company` (campo applicationVersion). Si el usuario no está disponible, toma el ultimo lenguaje configurado (leyendo del localStorage). Si tampoco está disponible, devuelve 'other' (por la versión internacional)

  ```js
  const data = APP.appVersion;
  ```

- `userCountry`
  Devuelve el código del país (2 letras) en el cual está configurada la cuenta del usuario.

  ```js
  const data = APP.userCountry;
  ```

- `userLenguage`
  Devuelve el código del lenguaje (2 letras) en el cual está configurada la cuenta del usuario. Lo toma de `session/user` (campo language). Si el usuario no está disponible, toma el ultimo lenguaje configurado (leyendo del localStorage). Si tampoco está disponible, devuelve `'en'`

  ```js
  const data = APP.userLenguage;
  ```

## Módulo session

El módulo `session` fue pensado para guardar información relativa a la sesión del usuario logueado.

### Getters

- `user`
  Almacena la información del usuario, (obtenida del endpoint `/user/self`)

  ```js
  const data = APP.user;
  ```

- `company`
  Almacena la información de la compañía del usuario. Se obtiene del endpoint anterior, a través del flag `fields=company`

  ```js
  const data = APP.company;
  ```

- `userMail`
  Devuelve el email del usuario

  ```js
  const data = APP.userMail;
  ```

- `userFullName`
  Devuelve el nombre y apellido del usuario concatenado

  ```js
  const data = APP.userFullName;
  ```

- `userName`
  Devuelve el `userFullName` y si es vacío, el `userMail`

  ```js
  const data = APP.userName;
  ```

- `$hasUser`
  Devuelve `true` si existe un usuario seteado en `session/user`. Para esto, chequea que este declarado el `user.id`

  ```js
  const data = APP.$hasUser;
  ```

- `$hasAlegraShop`
  Devuelve `true` si el usuario tiene Alegra Shop habilitado. Esto lo obtiene a partir de la key: `company.shop.id`

  ```js
  const data = APP.$hasAlegraShop;
  ```

- `$hasDistributor`
  Devuelve `true` si el usuario posee un distribuidor asociado, es decir valida que la key `user.distributor.id` exista (esto es utilizado en el renderizado del Sidebar)

  ```js
  const data = APP.$hasDistributor;
  ```

- `membershipPlan`
  Devuelve la key: `company.membership.planKeyword` que denota el nombre del plan de Alegra contratado por el usuario.

  ```js
  const data = APP.membershipPlan;
  ```

- `$hasOnlyInvoicePlan`
  Devuelve `true` si el plan del usuario (membershipPlan) es un plan de Solo Facturación

  ```js
  const data = APP.$hasOnlyInvoicePlan;
  ```

### Actions

- `reloadUserInfo` En determinadas situaciones, es necesario actualizar la información del usuario. Un caso de uso común es cuando se edita el perfil de usuario desde un microfrontend y es necesario propagar estos cambios a nivel global en la aplicación.

  ```js
  APP.reloadUserInfo();
  ```
