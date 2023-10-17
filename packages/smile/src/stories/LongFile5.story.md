---
group: 'general'
title: '5.-Actualización'
---

<div class="sidebar-r-doc">
  <div>En esta página</div>
  <ul>
    <li><a href="#conflictos">Conflictos</a></li>
  </ul>
</div>

# Actualizar Microfronts

Para llevar a cabo la actualización del proyecto en el que estamos trabajando a partir del proyecto base, se requiere seguir los siguientes pasos:

- `Creación de una rama desde "develop"`: Desde la rama `develop`, crear una nueva rama específica para esta actualización.
- `Realizar un Pull del Proyecto Base`: Asegurarse de obtener la versión más actualizada del proyecto base desde el repositorio.

Estos pasos garantizan una actualización efectiva y organizada del proyecto en curso a partir de la base existente.

```bash
git pull base master
```

### Conflictos

Durante el proceso de actualización de dependencias, es probable que surjan conflictos. Se recomienda identificar los cambios entre la versión local y la obtenida del proyecto base.

En tales situaciones, se sugiere seguir estos pasos:

- Utilizar el sentido común: Asegurarse de actualizar las dependencias del proyecto local a las versiones más recientes (según lo obtenido con el comando git pull base master del proyecto base). Además, es fundamental incluir todas las dependencias previamente existentes en el proyecto local pero ausentes en la base.

- Finalmente, proceder con la instalación/actualización de las dependencias pertinentes y realizar un commit que refleje los cambios locales.

```bash
npm install
git add .
git commit -m "merge commit"
```

Otro conflicto que puede llegar a darse, es en el archivo de configuración "vue.config.js", en el apartado `assetsDir`. El conflicto se puede dar si en su proyecto ya actualizaron el `assetsDir` para colorcar la ruta de deploy correspondiente. Inicialmente, este apartado está vacío. Al momento de hacer el deploy de su proyecto, este apartado debe contener el path de la URL donde va a ser deployado. Cuando intenten actualizar su proyecto a partir del proyecto base, se van a encontrar con un conflicto. Entonces, en el mismo, se debe mantener la config de deploy adecuada a su proyecto: por ejemplo, si su proyecto va a la URL de /items, entonces el `assetsDir` debe ser `items`.
