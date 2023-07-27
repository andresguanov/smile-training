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
