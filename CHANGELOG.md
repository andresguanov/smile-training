## [0.0.36-beta.4] (2023-07-27)

### :warning: BREAKING CHANGES:

- **Todos los inputs**: Se ha modificado las propiedades para 'leading' | 'trailing', en donde la propiedad 'icon' pasa a dividirse en 'leadingIcon' y 'trailingIcon'.
- **SNumberInput**: Se removió la prop 'iconLeft' en favor de usar InputAddon.

### :bug: Bug fixes

- **SmSelect**:
  - Se soluciona error al comparar el valor de value (https://github.com/alegradev/smile-ui-next/pull/2).

### :rocket: Features:

- **SNumberInput**:

  - Props:
    Prop | Descripción
    ---- | ------------
    leading | Permite usar el addon InputAddon.
  - Slots:
    Slot | Descripción
    ---- | ------------
    leading | Permite sobreescribir el contenido de InputAddon.

- **SDropdown**:
  - Slots:
    Slot | Descripción
    ---- | ------------
    leading | Permite sobreescribir el contenido de InputAddon.

## [0.0.36-beta.4] (2023-07-13)

### :warning: BREAKING CHANGES:

- **Todos los inputs**: La prop showMark pasa a llamarse markType y acepta dos valores 'required' | 'optional';

### :bug: Bug fixes

- **SDropdown**:
  - Se soluciona error con la prop object

## [0.0.36-beta.3] (2023-07-13)

### :lipstick: Styles:

- Clase s-appended-item para slot append-item
- Clase s-prepend-item para slot prepend-item

## [0.0.36-beta.2] (2023-07-13)

### :rocket: Features:

- **SDropdown**:
  - Props:
    Prop | Descripción
    ---- | ------------
    hideLoadingText | Permite ocultar mensaje de carga cuando se agrega la prop loading, especialmente útil si se quiere evitar un re-renderizado

### :rocket: Features:

- **SDropdown**:
  - Props:
    Prop | Descripción
    ---- | ------------
    hideLoadingText | Permite ocultar mensaje de carga cuando se agrega la prop loading, especialmente útil si se quiere evitar un re-renderizado

## [0.0.36-beta.1] (2023-07-13)

### :bug: Bug fixes

- **SDropdown**:
  - Error al seleccionar elementos deshabilitados

### :rocket: Features:

- **SDropdown**:
  - Slot prepend-item
  - Slot append-item
  - Props: description, level
  - Renderizado jerárquico de items al pasar el atributo level
  - ModelValue como prop opcional
  - Renderizado condicional del componente en base a errores

### :wrench: Code Refactoring:

- **SDropdown**: Se realiza segmentación del componente en bloques
- **validation**: Se mejora composable de validación para permitir modelValue opcional
