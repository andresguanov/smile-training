import {
  SmForm,
  SmInput,
  SmCheckbox,
  SmTextarea,
  SmToggle,
  SmSelect,
  SmButton,
  SmRadio,
  SmDatepicker,
} from '@alegradev/smile-ui-next'

export default {
  title: 'Smile UI/SmForm',
  component: SmForm,
  argTypes: {},
}

const Template = args => ({
  components: {
    SmForm,
    SmInput,
    SmCheckbox,
    SmTextarea,
    SmToggle,
    SmSelect,
    SmButton,
    SmRadio,
    SmDatepicker,
  },
  setup() {
    args.firstRules = [
      v => !!v || 'Valor es requerido',
      v => (v && v.length <= 10) || 'Valor debe tener menos de 10 caracteres',
    ]
    args.secondRules = [
      v => {
        return !!v || 'Valor es requerido'
      },
    ]
    args.thirdRules = [
      v => {
        return !!v || 'Valor es requerido'
      },
      v => {
        return v === 'B' || 'Valor debe ser B'
      },
    ]
    return { args }
  },
  data() {
    return {
      input: '',
      toggle: false,
      select: '',
      radio: '',
      datepicker: '',
      checkbox: false,
      textarea: '',
    }
  },
  template: `<div style="width: 400px;">
    <sm-form validation-mode="on-type">
      <h4>On Type</h4>
      <sm-input v-model="input" label="Nombre" :rules="args.firstRules" />
      <sm-toggle v-model="toggle" label="Nombre" :rules="args.secondRules" />
      <sm-select v-model="select" label="Nombre" :rules="args.thirdRules" :options="['A', 'B', 'C']" />
      <template #footer="{ isValid }">
        <sm-button native-type="submit" :disabled="!isValid">Submit</sm-button>
      </template>
    </sm-form>
    <sm-form style="margin-top: 40px" validation-mode="on-focusout">
      <h4>On Focusout</h4>
      <sm-checkbox v-model="checkbox" label="Nombre" :rules="args.secondRules" />
      <sm-textarea v-model="textarea" label="Nombre" :rules="args.firstRules" />
      <template #footer="{ isValid }">
        <sm-button native-type="submit" :disabled="!isValid">Submit</sm-button>
      </template>
    </sm-form>
    <sm-form style="margin-top: 40px" validation-mode="on-submit">
      <h4>On Submit</h4>
      <sm-radio v-model="radio" label="Nombre A" native-value="A" :rules="args.thirdRules" />
      <sm-radio v-model="radio" label="Nombre B" native-value="B" :rules="args.thirdRules" />
      <sm-radio v-model="radio" label="Nombre C" native-value="C" :rules="args.thirdRules" />
      <sm-datepicker v-model="datepicker" label="Nombre" :rules="args.secondRules" />
      <template #footer="{ isValid }">
        <sm-button native-type="submit" :disabled="!isValid">Submit</sm-button>
      </template>
    </sm-form>
  </div>`,
})

export const Form = Template.bind({})
