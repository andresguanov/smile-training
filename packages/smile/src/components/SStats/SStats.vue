<template>
  <div class="s-stats">
    <div v-for="item in items" class="s-stats-item">
      <div v-if="item.icon" class="s-stats-icon">
        <sm-icon :icon="item.icon" size="medium"></sm-icon>
      </div>
      <div>
        <div class="s-stats-label">
          {{ item.label }}

          <s-tooltip v-if="item.help" :content="item.help">
            <sm-icon type="primary" size="small"></sm-icon>
          </s-tooltip>
        </div>

        <div class="s-stats-content">
          <div class="s-stats-value">
            {{ item.value }}
          </div>
          <div v-if="item.trend" :class="getClass(item.trend)">
            <sm-icon
              :icon="getIcon(item.trend)"
              :color="getColor(item.trend)"
              size="small"
            ></sm-icon>
            {{ item.trend }}%
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { sStatItem } from '../../interfaces';

defineProps<{
  items: sStatItem[];
}>();

const getIcon = (trend: number) => (trend > 0 ? 'arrow-up' : 'arrow-down');
const getColor = (trend: number) => (trend > 0 ? '#15803D' : '#E85E42');
const getClass = (trend: number) => (trend > 0 ? 's-stats-trend' : 's-stats-trend-error');
</script>

<style scoped lang="scss" src="./SStats.scss"></style>
