---
group: 'general'
title: '1.-Proyecto base'
---

<div class="sidebar-r-doc">
  <div>En esta página</div>
  <ul>
    <li><a href="#clonando-el-proyecto">Clonando el Proyecto</a></li>
    <li><a href="#instalando-las-dependencias">Instalando las dependencias</a></li>
    <li><a href="#configuracion-inicial">Configuración inicial</a></li>
    <li><a href="#corriendo-el-servidor-de-desarrollo">Corriendo el servidor de desarrollo</a></li>
    <li><a href="#correr-microfront-en-testing">Microfront en testing</a></li>
    <li><a href="#microfrontend-en-el-orquestador">Microfrontend en el Orquestador</a></li>
  </ul>
</div>

# Proyecto base

Proyecto base Frontend construído con la librería `Vue.js`, pre-configurado con la librería smile-ui

Créditos

- `Derian Rosado (Developer)`: derian.rosado@alegra.com
- `Carlos Quispe (Developer)`: carlos.quispe@alegra.com
- `Bernardo Bernal (Developer)`: bernardo.bernal@alegra.com

---

## Clonando el Proyecto

Para iniciar un proyecto nuevo, el primer paso es clonar el [repositorio](https://github.com/alegradev/app-alegra-template). Para hacer esto, es necesario seguir los siguientes pasos:

- `Solicitar Acceso a la Organización @alegradev en GitHub`
  Antes de clonar el repositorio, es obligatorio ser miembro de la organización @alegradev en GitHub. Para solicitar acceso, comuníquese con Andrea Hoyos o Felipe Calad a través del Slack de Alegra.

- `Creación de Repositorio para el Nuevo Proyecto`
  Cada miembro tiene la capacidad de crear un nuevo repositorio privado para su proyecto. Todos los proyectos de Frontend deben ser privados y alojados dentro de la organización Alegra en GitHub.

Antes de comenzar con la clonación, es importante tener en cuenta lo siguiente:

- Si no se tiene activada la opción [Credentials Helper](https://docs.github.com/es/get-started/getting-started-with-git/caching-your-github-credentials-in-git) y se intenta clonar el proyecto desde GitHub, se solicitará el nombre de usuario y la contraseña de GitHub.

- Si se tiene activado el Autenticación de Doble Factor (2FA), el campo de contraseña deberá ser completado con un [Personal Access Token](https://docs.github.com/es/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

Una vez que se haya tomado en cuenta lo anterior, proceda a clonar el proyecto. Por ejemplo, si el nombre del nuevo proyecto es 'app-alegra-banks', siga los siguientes pasos:

```bash
git clone https://github.com/alegradev/app-alegra-template.git app-alegra-banks
cd app-alegra-banks
git remote rename origin base
```

Con el último comando, se renombra el `remote` `origin` (de donde fue clonado originalmente) a `base`. Luego se debe añadir el nuevo remote `origin` y subir el código. Siguiendo el ejemplo anterior, la URL de nuevo proyecto sería https://github.com/alegradev/app-alegra-banks, entonces:

```bash
git remote add origin https://github.com/alegradev/app-alegra-banks.git
git push -u origin main
```

---

## Instalando las dependencias

Para empezar a utilizar el proyecto, se deben instalar las dependencias y para esto se debe estar **logueado** en el registro de paquetes de Github. Para **loguearse** se debe utilizar el usuario de Github personal que previamente se añadió a la organización @alegradev y el **Personal Access Token** como password. Para **loguearse**, en la consola escribimos:

Ejemplos

```bash
npm login --registry=https://npm.pkg.github.com/
# Usuario: [TU USUARIO DE GITHUB]
# Password: [TU PERSONAL ACCESS TOKEN]
# Mail: [TU CORREO DE ALEGRA]

# Una vez logueado:
npm i
```

---

## Configuración inicial

Antes de correr el proyecto, se debe configurar el archivo `.env`. A efectos de desarrollo se debe copiar y renombrar el archivo `.env.example` a `.env.local` con el siguiente comando:

```bash
cp .env.example .env.local
```

También se puede simplemente crear un nuevo archivo `.env.local` en la raíz del proyecto. Lo importante es que en el mismo se deben escribir el valor para la key: **VUE_APP_ENVIROMENT**. Las keys escritas en `.env.local` sobrescribirán a las especificadas en `.env`. **Para desarrollo, la key del enviroment debe tener el valor** `"local"`, resultando:

```js
VUE_APP_ENVIROMENT = 'local';
```

Además, es necesario agregar al archivo `.env.local` el dominio:

```js
VUE_APP_DOMAIN = 'http://dev.alegra.com:1026/';
```

<div class="card-warn">
  Realizar estas dos modificaciones es crucial; de no hacerlo, la característica de recarga automática ("hot reload") no funcionará correctamente.
</div>

### Modificar archivo host en Windows, Mac o Linux.

Para tu entorno de desarrollo local, es necesario realizar una modificación en el archivo de hosts.

Para llevar a cabo este proceso, simplemente ejecuta el Bloc de Notas o el editor de texto de tu preferencia como administrador y abre el archivo ubicado en C:\Windows\System32\drivers\etc\hosts (en Windows). Luego, agrega la siguiente línea:

```bash
127.0.0.1   dev.alegra.com
```

### Package.json

Para asegurar el correcto funcionamiento de la arquitectura **module federation** es esencial llevar a cabo ajustes en el archivo `package.json`.

Se requiere modificar el valor de la clave "name" en este archivo, asegurándose de que coincida con el nombre del repositorio que alberga el proyecto. A continuación, se muestra un ejemplo ilustrativo.

### Config/index.js

Al igual que hicimos con el archivo anterior, es fundamental cambiar el valor de una variable dentro del archivo `config/index.js`. Para llevar a cabo este ajuste, localizamos la propiedad **"project_name"** y le asignamos el mismo nombre del proyecto, pero con guión bajo, de modo que coincida con el formato mostrado en el siguiente ejemplo.

```js
module.exports = {
  proyect_port: 1026,
  proyect_name: 'app_alegra_xml_administrator_mex',
};
```

### Router

Al realizar modificaciones en las rutas de tu microfrontend, es importante tener en cuenta que el path se configura en el orquestador. Todas las rutas de tu microfrontend serán subrutas del path especificado.

```js
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomeView.vue"),
  },
];
```

A continuación se presenta un ejemplo de cómo se configuran las rutas en el orquestador para el microfrontend "Report":

```js
const routes = [
  {
    path: '/report',
    name: 'app_alegra_reports_frontend_vue3',
    domain: `https://${prefixEnvironment}reports-v3.alegra.com`,
  },
];
```

---

## Corriendo el servidor de desarrollo

A partir de este momento, ya se puede correr la app en modo desarrollo con el siguiente comando:

```bash
npm run serve
```

## Correr microfront en testing

Si deseas probar tu desarrollo dentro de Hopper, sigue estos sencillos pasos:

- Accede al siguiente [sitio](https://almost-single-spa.alegra.com/add/microfront).
- Cambia el valor de la clave **VUE_APP_ENVIRONMENT** (dentro del archivo .env.local que generamos previamente) por "testing" y **VUE_APP_DOMAIN** por "localhost:port/".
- En tu proyecto, en la terminal, ejecuta el siguiente comando:

```bash
npm run test
```

Este paso te proporcionará una URL que utilizaremos en el siguiente paso.

- En el sitio, encontrarás tres campos que debes completar de la siguiente manera:

  - `Name`: Ingresa el nombre de proyecto que definimos en el archivo `config/index.js`.

  - `Route`: Coloca aquí la ruta con la que accederemos al microfont.

  - `Domine`: Llena este campo con la URL obtenida en el paso anterior.

- Haz clic en el botón "Save".

Si has seguido correctamente todos estos pasos, ya puedes acceder al microfrontend desde el dominio que asignamos.

```js
# Enviroment Configuration
# possible values: "local", "testing", "production"
VUE_APP_ENVIROMENT="testing"
VUE_APP_DOMAIN="http://localhost:1026/"
```

Actualmente, el formulario para dar de alta el microfrontend no cuenta con validaciones, por lo que es crucial seguir las siguientes recomendaciones para garantizar el funcionamiento.

- Los campos no deben contener espacios.

- El campo `"Route"` requiere el símbolo `"/"` al inicio y no debe llevarlo al final, por ejemplo: "/mi-ruta"..

- El campo `"Dominio"` debe llevar el símbolo "/" al final, por ejemplo: "http://localhost:1026/".

Es importante tener en cuenta que se debe usar `"http://localhost:1026"` en lugar de `"http://dev.alegra.com:1026"` para evitar problemas de CORS. Esto se logra comentando la variable de entorno VUE_APP_DOMAIN o sustituyendo la URL por `"localhost"`.

En caso de que por alguna razón no puedas visualizar el resultado, es necesario borrar la cookie `mf-module-testing` y volver a intentarlo siguiendo las recomendaciones detalladas. Si el problema persiste, por favor contacta a Derian Rosado.

---

# Microfrontend en el Orquestador

## ⛔ Editar archivos no usados por el orquestador

Como norma general, se deben editar únicamente los archivos utilizados desde `router/index.ts` y sus dependencias, así como los archivos de idiomas. Estos son los únicos archivos que se envían al orquestador. Por ejemplo, puedes modificar las rutas, vistas y componentes del microfrontend, así como los stores utilizados por estos.

Por otro lado, se recomienda evitar modificar los archivos `App.vue`, `bootstrap.ts` o `layouts/DefaultLayout.vue`, ya que, aunque los cambios se reflejarán localmente, no serán enviados al orquestador.

Si necesitas agregar lógica que debe ejecutarse como parte de la inicialización del microfrontend y deseas evitar que se repita cada vez que se cambia de ruta, puedes utilizar rutas anidadas. Por ejemplo:

```js
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    // En este component se realizaría la lógica requerida para la inicialización del microfrontend
    component: BaseLayout,
    children: [
      {
        path: "",
        component: HomeView,
      },
      {
        path: "configuration",
        component: ConfigView,
      },
    ],
  },
];
```

## ⛔ Usar una ruta base “/” junto a un redireccionamiento

En el siguiente ejemplo, no se debería usar la primera ruta:

```js
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    // No se debe incluir el siguiente parámetro
    redirect: "/invoice",
  },
  {
    path: "/invoice",
    component: HomeView,
  },
];
```

## ⛔ Incluir la ruta base del microfront

No se debe incluir la ruta base del microfront en la definición de las rutas. Este es añadido por el orquestador automáticamente.

Por ejemplo, si la ruta base del microfront es `invoice` y se tiene registrada la ruta `/configuration`, en el orquestador se registrará la ruta `/invoice/configuration`.

## ⛔ Usar rutas nombradas

No registrar ni usar rutas nombradas, tales como:

```js
route.push({ name: 'configuration-page' });
```

En su lugar, se deben usar directamente las rutas. Por ejemplo:

```js
route.push({ path: '/microfront/configuration' });
```
