<template>
  <div class="sm-pagination">
    <div class="sm-pagination-left">
      <button class="sm-pagination-button" :disabled="isAtStart" @click="goTo(1)">
        <img :src="isAtStart ? firstDisabled : first" />
      </button>
      <button class="sm-pagination-button" :disabled="isAtStart" @click="goTo(page - 1)">
        <img :src="isAtStart ? prevDisabled : prev" />
      </button>
      <div class="sm-pagination-vr"></div>
      <div class="sm-pagination-page">
        <label class="sm-pagination-wrapper">
          {{ text?.page }}
          <input
            :value="currentPage"
            :disabled="total <= itemsPerPage"
            class="sm-pagination-input"
            @beforeinput="testGoTo"
          />
        </label>
        <div class="sm-pagination-lastpage">{{ text?.of }} {{ lastPage }}</div>
      </div>
      <div class="sm-pagination-vr"></div>
      <button class="sm-pagination-button" :disabled="isAtEnd" @click="goTo(page + 1)">
        <img :src="isAtEnd ? nextDisabled : next" />
      </button>
      <button class="sm-pagination-button" :disabled="isAtEnd" @click="goTo(lastPage)">
        <img :src="isAtEnd ? lastDisabled : last" />
      </button>
      <div class="sm-pagination-vr" v-if="refresh"></div>
      <button v-if="refresh" class="sm-pagination-button" @click="emit('refresh')">
        <img :src="re" />
      </button>
    </div>
    <div class="sm-pagination-right">
      <p class="sm-pagination-showing">
        {{ `${text?.showing} ${showingItemsRange.join('-')} ${text?.of} ${total}` }}
      </p>
      <div class="sm-pagination-vr"></div>
      <p class="sm-pagination-results">
        {{ text?.resultsPerPage }}
      </p>
      <sm-select
        v-model="limit"
        :options="selectLimitOptions"
        class="sm-pagination-select"
        size="small"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import last from '../../assets/page-last.png'
import lastDisabled from '../../assets/page-last-disabled.png'
import next from '../../assets/page-next.png'
import nextDisabled from '../../assets/page-next-disabled.png'
import prev from '../../assets/page-prev.png'
import prevDisabled from '../../assets/page-prev-disabled.png'
import first from '../../assets/page-first.png'
import firstDisabled from '../../assets/page-first-disabled.png'
import re from '../../assets/refresh.png'
import { SmSelect } from '../index'
import { usePagination, paginationEmits } from '../../composables'
import { smPaginationText } from '../../interfaces/sm-pagination.interface'

const props = withDefaults(
  defineProps<{
    page?: number
    itemsPerPage?: number
    total?: number
    text?: smPaginationText
    itemLimitOptions?: Array<number>
    refresh?: boolean
  }>(),
  {
    text: () => ({
      page: 'Página',
      of: 'de',
      showing: 'Mostrando',
      resultsPerPage: 'Resultados por página',
    }),
    itemsPerPage: 10,
    itemLimitOptions: () => [10, 20, 30],
    total: 1,
    page: 1,
    refresh: true,
  }
)
const emit = defineEmits([...paginationEmits, 'refresh'])
const { goTo, isAtEnd, isAtStart, lastPage, showingItemsRange, limit, currentPage } = usePagination(
  props,
  emit
)

const selectLimitOptions = computed(() => {
  return props.itemLimitOptions.map(v => ({ text: v.toString(), value: v }))
})

const testGoTo = (event: Event) => {
  if ((event as InputEvent).inputType !== 'insertLineBreak') {
    return
  }
  const target = event.target as HTMLInputElement
  const page = Number(target?.value)
  if (isValidPageValue(page)) {
    goTo(page)
  } else {
    target.value = currentPage.value.toString()
  }
}
const isValidPageValue = (value: number) => {
  const lastPageValue = Math.ceil(props.total / limit.value)
  return !isNaN(value) && value > 0 && value <= lastPageValue
}
</script>

<style lang="scss" scoped>
@import './SmPagination.scss';
</style>
