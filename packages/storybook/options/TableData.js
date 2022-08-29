export const columnConfigTable = [
  {
    name: 'age',
    label: 'edad',
    format: s => s.toUpperCase(),
    filterable: false,
    width: '70px',
    order: true,
  },
  {
    name: 'skills',
    label: 'Aptitudes',
    headerAlign: 'center',
    bodyAlign: 'right',
    width: '270px',
    bodyClass: 'PRUEBA',
    filterable: true,
  },
  {
    name: 'name',
    label: 'nombre:',
    firstToUpper: true,
    bodyAlign: 'right',
    filterable: true,
    order: true,
  },
  { name: 'id', firstToUpper: true, order: false, headerClass: 'TEST' },
]
export const dataTable = [
  { id: 1, name: 'Nacho', age: 33, skills: ['Vue', 'Php'] },
  { id: 2, name: 'Lian', age: 25, skills: ['Vue', 'React'] },
  { id: 3, name: 'Seba', age: 60, skills: ['Node'] },
  { id: 4, name: 'Martin', age: 54, skills: ['Php'] },
  { id: 5, name: 'Carlos', age: 18, skills: ['Python'] },
  { id: 6, name: 'Ariana', age: 23, skills: ['Javascript'] },
  { id: 7, name: 'Juan', age: 46, skills: ['Php'] },
  { id: 8, name: 'Pedro', age: 55, skills: ['Python'] },
  { id: 9, name: 'Diana', age: 66, skills: ['Javascript'] },
  { id: 10, name: 'Zeta', age: 21, skills: ['Php'] },
  { id: 11, name: 'Guillermo', age: 19, skills: ['Python'] },
  { id: 12, name: 'Edgardo', age: 57, skills: ['Javascript'] },
  { id: 13, name: 'Nacho', age: 33, skills: ['Vue', 'Php'] },
  { id: 14, name: 'Lian', age: 25, skills: ['Vue', 'React'] },
  { id: 15, name: 'Seba', age: 60, skills: ['Node'] },
  { id: 16, name: 'Martin', age: 54, skills: ['Php'] },
  { id: 17, name: 'Carlos', age: 18, skills: ['Python'] },
  { id: 18, name: 'Ariana', age: 23, skills: ['Javascript'] },
  { id: 19, name: 'Juan', age: 46, skills: ['Php'] },
  { id: 20, name: 'Pedro', age: 55, skills: ['Python'] },
  { id: 21, name: 'Diana', age: 66, skills: ['Javascript'] },
  { id: 22, name: 'Zeta', age: 21, skills: ['Php'] },
  { id: 23, name: 'Guillermo', age: 19, skills: ['Python'] },
  { id: 24, name: 'Edgardo', age: 57, skills: ['Javascript'] },
]
export const filterConfigTable = {
  age: {
    type: 'input',
    attrs: {
      placeholder: 'Escribe edad a filtrar',
    },
  },
  name: {
    type: 'checkbox',
  },
  skills: {
    type: 'datepicker',
    attrs: {
      range: true,
    },
  },
  id: {
    type: 'select',
    attrs: {
      multiple: true,
    },
    options: [
      { text: '1', value: '1' },
      { text: '2', value: '2' },
      { text: '3', value: '3' },
    ],
  },
}
