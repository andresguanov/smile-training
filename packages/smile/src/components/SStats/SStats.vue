<template>
  <div class="s-stats">
    <div v-for="(item, i) in items" class="s-stats-item">
      <div v-if="countsIcon && i !== 0" class="s-stats-count-icon">
        <slot :name="`count-icon-${i}`">
          <sm-icon :icon="countsIcon[i - 1]" size="small" />
        </slot>
      </div>

      <div v-if="item.icon" class="s-stats-icon">
        <sm-icon :icon="item.icon" size="medium" />
      </div>
      <div class="s-stats-body">
        <div class="s-stats-label">
          {{ item.label }}

          <s-tooltip v-if="item.help" :content="item.help">
            <sm-icon type="primary" size="small"></sm-icon>
          </s-tooltip>
        </div>

        <div class="s-stats-value">
          {{ item.value }}
        </div>
        <div v-if="item.trend && !item.supportive" :class="getClass(item.trend)">
          <sm-icon :icon="getIcon(item.trend)" :color="getColor(item.trend)" size="small" />
          <p class="s-stats-supportive-text">{{ defineTrendRender(item) }}</p>
        </div>
        <div v-else class="s-stats-trend">
          <slot :name="`supportive-${item.key ?? i + 1}`">
            <sm-icon v-if="item.supportiveIcon" :icon="item.supportiveIcon" size="small" />
            <p class="s-stats-supportive-text">{{ item.supportive }}</p>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IconType, sStatItem } from '../../interfaces';

defineProps<{
  items: sStatItem[];
  countsIcon: Array<IconType>;
}>();

const getIcon = (trend: number) => (trend > 0 ? 'arrow-up' : 'arrow-down');
const getColor = (trend: number) => (trend > 0 ? '#15803D' : '#E85E42');
const getClass = (trend: number) => (trend > 0 ? 's-stats-trend' : 's-stats-trend error');

const replaceTrend = (text: string) => text.replace('-', '');

const defineTrendRender = (item: sStatItem) => {
  return `${replaceTrend(String(item.trend))}% ${item.trendText ?? ''}`;
};
</script>

<style scoped lang="scss" src="./SStats.scss"></style>
