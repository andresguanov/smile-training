<template>
  <div
    class="s-user-menu"
    tabindex="-1"
    @click="showUserMenu = !showUserMenu"
    @blur="showUserMenu = false"
  >
    <s-avatar :text="avatar" size="sm" />
    <ul :class="['s-user-menu__dropdown', { 'opacity-0 invisible': !showUserMenu }]">
      <div class="p-4">
        <div v-if="userFullName" class="font-normal text-slate-700">{{ userFullName }}</div>
        <p class="text-slate-500 text-xs m-0">
          {{ shorten(userMail, 28) }}
        </p>
      </div>
      <div
        v-if="isActiveElectronicInvoicing"
        class="border-solid border-0 border-t border-slate-200 p-4 flex justify-between"
      >
        <span class="text-slate-900">Facturación electrónica</span>
        <div
          class="h-5 leading-5 w-[53px] bg-green-100 text-green-700 text-center text-xs rounded-[4px]"
        >
          Activa
        </div>
      </div>

      <div class="border-solid border-0 border-y border-slate-200 p-2">
        <template v-for="(menu, i) in menuStandart" :key="`userMenu_${i}`">
          <a
            v-if="userMenuOptions[menu.id]"
            :href="menu.link"
            :title="menu.title"
            :target="menu.target"
          >
            <li class="flex justify-between">
              <div>
                <app-icon :icon="menu.icon" class="icon"></app-icon>
                {{ menu.text }}
              </div>
              <app-icon v-if="menu.target" icon="arrow-up-right" class="icon icon-up"></app-icon>
            </li>
          </a>
        </template>
      </div>
      <div class="p-2">
        <a :href="`${BASE_URL}/user/log-out`">
          <li id="logout" @click="doLogout">
            <app-icon icon="logout" class="mr-1.5 icon"></app-icon>
          </li>
        </a>
      </div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import AppIcon from '@/micro/components/SmIcon/SmIcon.vue';
import { IUserMenuOptions } from '@/micro/interfaces/menu.interface';

const SESSION = useSessionStore();

const props = withDefaults(
  defineProps<{
    avatar: string;
    baseUrl?: string;
    userMenuOptions: IUserMenuOptions;
    onlyAvatar?: boolean;
  }>(),
  {
    baseUrl: '',
    onlyAvatar: false,
  }
);

const showUserMenu = ref(false);

const userFullName = computed((): string => SESSION.userFullName);
const userMail = computed((): string => SESSION.user.email);
const BASE_URL = computed((): string => props.baseUrl || getEnv('BASE_URL'));
const isActiveElectronicInvoicing = computed(
  (): boolean => SESSION.company?.settings?.electronicInvoicing
);

const userMailAndName = computed(() => {
  const fullName = SESSION.user.name;
  if (fullName?.length) {
    return `${userMail.value} - ${fullName}`;
  }
  return userMail;
});

const menuStandart = computed(
  (): {
    id: string;
    link: string;
    title: string | any;
    icon: string;
    text: string | ComputedRef<string>;
    target?: string;
    newSection?: boolean;
  }[] => [
    {
      id: 'consumption',
      link: `${BASE_URL.value}plan/consumption`,
      title: undefined,
      icon: 'chart-bar',
      text: $transF('topbar.planConsumption'),
      newSection: true,
    },
    {
      id: 'configuration',
      link: `${BASE_URL.value}configuration`,
      title: undefined,
      icon: 'settings',
      text: $transF('topbar.configuration'),
    },
    {
      id: 'profile',
      link: `${getEnv('BASE_URL_MY_ALEGRA')}profile`,
      title: userMailAndName.value,
      text: $transF('topbar.myProfile'),
      icon: 'user-circle',
      target: '_blank',
    },
    {
      id: 'security',
      link: `${getEnv('BASE_URL_MY_ALEGRA')}security`,
      title: undefined,
      text: $transF('topbar.security'),
      icon: 'lock',
      target: '_blank',
    },
    {
      id: 'statusOfSolutions',
      link: 'https://alegrasatus.betteruptime.com/ ',
      title: undefined,
      text: $transF('topbar.statusSolutions'),
      icon: 'circle-green',
      target: '_blank',
    },
  ]
);

const doLogout = () => {
  localStorage.removeItem(tokenKeys['local']);
  localStorage.removeItem(getEnv('COOKIE_TOKEN'));
  (window as any).HubSpotConversations?.clear?.({ resetWidget: true });
};

const shorten = (word, lenght) => {
  if (word) {
    return word.length > lenght ? word.substring(0, lenght).trim() + '...' : word;
  }
};
</script>

<style lang="scss" scoped>
.new-user-menu {
  @apply z-[99];

  .menu-profile {
    @apply border border-solid border-slate-200;
    @apply w-[104px] h-10 p-2 rounded-md;
  }
  &__profile {
    @apply whitespace-nowrap;
    @apply inline-block;
    @apply ml-1 mt-1 mb-1 pt-2 pb-2;
    @apply pl-4 pr-4 no-underline;
    @apply cursor-pointer text-gray-600 text-sm;
    transition: all 0.2s ease-in-out;
  }

  &__logo {
    @apply min-w-[24px] min-h-[24px] bg-indigo-200 rounded-full text-center;
    @apply leading-6 text-slate-700 text-xs font-medium;
    @apply bg-cover bg-center bg-no-repeat;
  }

  ul {
    @apply bg-white rounded-lg;
    @apply border border-solid border-slate-100;
    @apply drop-shadow-xl text-sm;
    @apply min-w-[264px] pl-0;
    @apply absolute right-0;
    @apply mr-2.5  z-[99px] top-[60px];
    -webkit-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;

    li {
      @apply h-8 flex items-center px-2 rounded-md;

      &:hover {
        @apply hover:bg-slate-400/10;
      }

      &:active {
        @apply hover:bg-slate-400/20;
      }

      &:focus {
        @apply ring-2 ring-sm-primary-500;
      }
    }

    a {
      @apply no-underline;
      @apply text-slate-700;
    }
  }
  .icon {
    @apply w-4 h-4 mr-2 #{!important};

    &:hover {
      @apply text-slate-700;
    }
  }

  .icon-up {
    @apply text-slate-400;

    &:hover {
      @apply text-slate-400;
    }
  }
}
</style>
