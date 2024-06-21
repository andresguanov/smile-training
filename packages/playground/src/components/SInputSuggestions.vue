<template>
  <p class="text-slate-900 text-xl my-3">Sugerencias en SInput</p>

  <SForm
    id="form"
    ref="form"
    class="sm:grid grid-cols-3 gap-2 sm:space-y-0 space-y-5 mt-5"
    validate-on="submit"
  >
    <div class="col-span-3 sm:grid grid-cols-2 gap-2 sm:space-y-0 space-y-5 mt-5">
      <SDropdown
        label="Contacto *"
        v-model="selectedClient"
        :options="clientOptions"
        @update:modelValue="fetchClientInfo"
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
      v-model="alreadyPaid"
      label="Pagado"
      size="medium"
      :leading="{
        inline: true,
        label: '$',
      }"
    />
    <SInput
      v-model="payment"
      label="Monto a pagar"
      size="medium"
      :suggestion="suggestion"
      :rules
      readonly
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
import type { MenuOption, Suggestion } from '@alegradev/smile-ui-next';

// Definiciones y variables reactivas
const debt = ref<string>('0');
const alreadyPaid = ref<string>('0');
const payment = ref<string>('0');
const selectedClient = ref<MenuOption | string>();
const selectedBank = ref<MenuOption | string>();
const isMagic = ref(false);
const suggestion = computed<Suggestion>(() => {
  const remaining = toNumber(debt.value) - toNumber(alreadyPaid.value);
  return {
    value: toCurrency(remaining),
    text: `$${toCurrency(remaining)}`,
    description: `Monto por pagar`,
  };
});
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

const rules = [
  (value: string) => {
    const payment = (toNumber(debt.value) - toNumber(alreadyPaid.value)).toFixed(2);
    return toNumber(value) <= Number(payment) ? true : `La cantidad a pagar excede la deuda`;
  },
  (value: string) => {
    return Number(value) != 0 ? true : `La cantidad no puede ser cero o negativa`;
  },
];

const validate = () => {
  if (form.value) {
    console.log(form.value.validateForm());
  }
};

const fetchClientInfo = async () => {
  isMagic.value = true;
  setTimeout(() => {
    isMagic.value = false;
    selectedBank.value = bankOptions[1]; // Banco Falso
    debt.value = '214,205.55';
    alreadyPaid.value = '163,000.00';
  }, 3000);
};

const toCurrency = (number: number): string => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formatter.format(Number(number))}`;
};

const toNumber = (amount: string): number => {
  const number = Number(amount.replace(/[^\d.-]/g, ''));
  return parseFloat(number.toFixed(2));
};
</script>
