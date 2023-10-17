<template>
  <div class="s-user-menu">
    <div class="s-user-menu__avatar" @click="onAvatarClicked()">
      <s-avatar :text="userName" size="sm" />
    </div>
    <s-overflow-menu
      v-if="showUserMenu"
      class="s-user-menu__dropdown"
      right="0"
      top="50px"
      @click-outside="showUserMenu = false"
    >
      <div class="s-user-menu__user">
        <h4>{{ userName }}</h4>
        <p>ID: {{ userId }}</p>
      </div>
      <div v-if="showElectronicInvoicingStatus" class="s-user-menu__electronic-invoicing">
        <span>{{ electronicInvoicingText.label }}</span>
        <div class="s-user-menu__electronic-invoicing__badge">
          {{ electronicInvoicingText.active }}
        </div>
      </div>
      <ul class="s-user-menu__items">
        <template v-for="item in items" :key="`userMenu_${item.id}`">
          <li @click="emit('optionClick', item.id)">
            <s-menu-item :title="item.text" :icon="item.icon">
              <template #trailing>
                <sm-icon v-if="item.external" icon="arrow-up-right" />
              </template>
            </s-menu-item>
          </li>
        </template>
      </ul>
      <ul v-if="hasLogout" class="s-user-menu__items">
        <li @click="emit('logout')">
          <s-menu-item title="Cerrar sesión" icon="logout" />
        </li>
      </ul>
    </s-overflow-menu>
  </div>
</template>

<script setup lang="ts">
import type { sUserMenu } from '../../interfaces/sm-wizard.interface';

const props = withDefaults(defineProps<sUserMenu>(), {
  hasLogout: true,
  electronicInvoicingText: () => ({
    active: 'Activa',
    label: 'Facturación electrónica',
  }),
});
const emit = defineEmits<{
  (event: 'logout'): void;
  (event: 'avatarClick'): void;
  (event: 'optionClick', value: string): void;
}>();

const showUserMenu = ref(false);
const onAvatarClicked = () => {
  if (props.onlyAvatar) {
    emit('avatarClick');
  } else {
    showUserMenu.value = true;
  }
};
</script>

<style lang="scss" scoped>
.s-user-menu {
  @apply relative;

  &__avatar {
    @apply flex justify-center items-center;
    @apply h-10 w-10 rounded-lg mr-2;
    @apply cursor-pointer hover:bg-slate-200/[0.45];
  }
  &__dropdown {
    @apply text-sm text-slate-900 w-[264px];

    &:deep(.s-menu__body) {
      @apply p-0;
    }
  }
  &__user {
    @apply p-4;

    h4 {
      @apply font-semibold text-slate-900;
    }
    p {
      @apply text-xs;
    }
  }
  &__electronic-invoicing,
  &__items {
    @apply border-solid border-t border-slate-200;
  }
  &__items {
    @apply p-2;
  }
  &__electronic-invoicing {
    @apply flex justify-between p-4;

    &__badge {
      @apply h-5 leading-5 w-[53px] bg-green-100 text-green-700 text-center text-xs rounded-[4px];
    }
  }
}
</style>
