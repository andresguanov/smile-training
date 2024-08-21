<template>
  <Story title="s-overflow-menu" auto-props-disabled>
    <Variant title="default">
      <template #default>
        <s-overflow-menu v-bind="initState" @clickOutside="logEvent('clickOutside')">
          <template #header>
            <h1 style="text-align: center; font-size: 24px"><b>Slot Header</b></h1>
          </template>
          <img
            src="https://api.dicebear.com/6.x/bottts/svg?seed=John"
            alt="avatar"
            style="width: 100%"
          />
          <div>
            <h4><b>John Doe</b></h4>
            <p>Architect & Engineer</p>
          </div>
          <template #footer>
            <p style="text-align: center"><small>Slot Footer</small></p>
          </template>
        </s-overflow-menu>
      </template>
      <template #controls>
        <template v-for="control in controls">
          <component
            v-model="initState[control.key]"
            :is="`Hst${control.input}`"
            :title="control.key"
            v-bind="control.props"
          />
        </template>
      </template>
    </Variant>
    <Variant title="user-menu">
      <template #default>
        <s-overflow-menu
          style="width: 20em"
          v-bind="initState"
          @clickOutside="logEvent('clickOutside')"
        >
          <template #header>
            <h6 style="text-align: center; font-size: 14px">Mi perfil</h6>
          </template>
          <s-menu-item v-for="item in menuItemsExample" v-bind="item"></s-menu-item>
          <s-divider></s-divider>
          <s-menu-item v-for="item in menuItemsExample" v-bind="item"></s-menu-item>
          <s-divider></s-divider>
          <s-menu-item
            v-bind="{ title: 'Eliminar', icon: 'delete', destructive: true }"
          ></s-menu-item>
          <template #footer>
            <p style="text-align: center"><small>Slot Footer</small></p>
          </template>
        </s-overflow-menu>
      </template>
      <template #controls>
        <template v-for="control in controls">
          <component
            v-model="initState[control.key]"
            :is="`Hst${control.input}`"
            :title="control.key"
            v-bind="control.props"
          />
        </template>
      </template>
    </Variant>
  </Story>
</template>

<script setup>
import { logEvent } from 'histoire/client';
import { ref, reactive } from 'vue';

const initState = reactive({
  top: '20px',
});

const controls = [
  {
    key: 'top',
    input: 'Text',
    props: {},
  },
  {
    key: 'bottom',
    input: 'Text',
    props: {},
  },
  {
    key: 'left',
    input: 'Text',
    props: {},
  },
  {
    key: 'right',
    input: 'Text',
    props: {},
  },
  {
    key: 'bubbling',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'detectIframe',
    input: 'Checkbox',
    props: {},
  },
  {
    key: 'maxHeight',
    input: 'Text',
    props: {},
  },
];

const menuItemsExample = [
  {
    title: 'Home',
    icon: 'home',
    description: 'Description 1',
  },
  {
    title: 'Item 2',
    icon: 'user',
    description: 'Description 2',
  },
];
</script>
