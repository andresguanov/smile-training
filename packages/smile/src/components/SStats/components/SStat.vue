<template>
  <div class="s-stats-item">
    <div v-if="icon" class="s-stats-icon">
      <sm-icon :icon="icon" size="medium" />
    </div>
    <div class="s-stats-body">
      <div class="s-stats-label">
        {{ label }}

        <s-tooltip v-if="help" :content="help">
          <sm-icon type="primary" size="small"></sm-icon>
        </s-tooltip>
      </div>

      <div class="s-stats-value">
        {{ value }}
      </div>
      <div v-if="trend" :class="getClass(trend)">
        <sm-icon :icon="getIcon(trend)" :color="getColor(trend)" size="small" />
        <p class="s-stats-supportive-text">
          {{ `${replaceTrend(String(trend))}% ${trendText ?? ''}` }}
        </p>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { sStatItem } from '../../../interfaces';

defineProps<sStatItem>();

const getIcon = (trend: number) => (trend > 0 ? 'arrow-up' : 'arrow-down');
const getColor = (trend: number) => (trend > 0 ? '#15803D' : '#E85E42');
const getClass = (trend: number) => (trend > 0 ? 's-stats-trend' : 's-stats-trend error');

const replaceTrend = (text: string) => text.replace('-', '');
</script>
<style lang="scss" scoped></style>
