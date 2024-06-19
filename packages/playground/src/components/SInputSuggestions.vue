<template>
  <p class="text-slate-900 text-xl my-3">Sugerencias en SInput</p>
  <details>
    <summary class="text-slate-500 text-lg mb-3 cursor-pointer hover:bg-slate-400/10">
      Nuevas props:
    </summary>
    <div class="mb-3">
      <div class="font-bold">suggestion</div>
      Recibe un número as string o number (no debe incluir símbolos de moneda o comas separando
      miles). Si está presente la prop, cuando el input reciba el foco, se mostrará la sugerencia
      debajo del input. Al hacer click sobre la sugerencia, el input tomará el valor de la
      sugerencia.
    </div>
    <div class="mb-3">
      <div class="font-bold">suggestionText</div>
      Es el texto que se mostrará debajo del valor de la sugerencia, por defecto toma el valor de
      "Monto por pagar".
    </div>
    <div class="mb-3">
      <div class="font-bold">currencySymbol</div>
      Símbolo de la moneda, por defecto es '$', se utiliza para mostrarse junto a la sugerencia.
    </div>
    <div class="mb-3">
      <div class="font-bold">currencyDecimals</div>
      Número de decimales que debe tener la sugerencia, por defecto toma el valor de 2.
    </div>
  </details>

  <SForm
    id="form"
    ref="form"
    class="sm:grid grid-cols-3 gap-2 sm:space-y-0 space-y-5 mt-5"
    validate-on="focusout"
  >
    <div class="col-span-3 sm:grid grid-cols-2 gap-2 sm:space-y-0 space-y-5 mt-5">
      <SDropdown
        label="Contacto *"
        v-model="selectedClient"
        :options="clientOptions"
        @update:modelValue="handleClient"
        object
      />
      <SDropdown
        label="Cuenta bancaria *"
        v-model="selectedBank"
        :options="bankOptions"
        :magic="isMagic"
        object
      />
    </div>
    <SInput
      v-model="debt"
      label="Total"
      size="medium"
      :leading="{
        inline: true,
        label: '$',
      }"
      readonly
    />
    <SInput
      v-model="paid"
      label="Pagado"
      size="medium"
      :leading="{
        inline: true,
        label: '$',
      }"
    />
    <SInput
      v-model="amount_to_pay"
      label="Monto a pagar"
      size="medium"
      :suggestion="suggestion"
      :rules
      :leading="{
        inline: true,
        label: '$',
      }"
    />

    <div class="col-span-3">
      <s-button type="submit" class="mt-5 float-end" @click="validate()">Pagar</s-button>
    </div>
  </SForm>
</template>

<script setup lang="ts">
// Importaciones
import { SInput, SButton, SForm, SDropdown } from '@alegradev/smile-ui-next';
import { ref, computed, watch, onMounted } from 'vue';
import type { ComponentPublicInstance } from 'vue';
import type { MenuOption } from '@alegradev/smile-ui-next';

// Definiciones y variables reactivas
const debt = ref<string>('0');
const paid = ref<string>('0');
const amount_to_pay = ref<string>('0');
const selectedClient = ref<MenuOption | string>();
const selectedBank = ref<MenuOption | string>();
const isMagic = ref(false);

const form = ref<
  ComponentPublicInstance & {
    validateForm: () => {
      valid: boolean;
      results: {
        id: string;
        errorMessages: string[];
      }[];
    };
  }
>();

// Opciones de menú
const clientOptions = <MenuOption[]>[
  { text: 'Adriana Restrepo López', code: 1 },
  { text: 'Cristina Fuentes Díaz', code: 2 },
  { text: 'Oscar Emilio González Fernandez', code: 3 },
];

const bankOptions = <MenuOption[]>[
  { text: 'Banco ABC', code: 1 },
  { text: 'Banco Falso', code: 2 },
  { text: 'Banco Imaginario', code: 3 },
];

// Funciones y reglas de validación
const moneyToNumber = (amount: string): number => {
  const number = Number(amount.replace(/[^\d.-]/g, ''));
  return parseFloat(number.toFixed(2));
};

const suggestion = computed(() =>
  // '321,000.50' // Sugerencia como string
  parseFloat((moneyToNumber(debt.value) - moneyToNumber(paid.value)).toFixed(2))
);

const rules = [
  (value: string) => {
    const total_to_pay = (moneyToNumber(debt.value) - moneyToNumber(paid.value)).toFixed(2);
    return moneyToNumber(value) <= Number(total_to_pay)
      ? true
      : `La cantidad a pagar excede la deuda`;
  },
  (value: string) => {
    return Number(value) != 0 ? true : `Tienes que introducir una cantidad`;
  },
];

const validate = () => {
  if (form.value) {
    console.log(form.value.validateForm());
  }
};

// Métodos
const handleClient = async () => {
  isMagic.value = true;
  setTimeout(() => {
    isMagic.value = false;
    selectedBank.value = bankOptions[1]; // Banco Falso
    debt.value = '214,205.55';
    paid.value = '163,000.00';
  }, 3000);
};
</script>
