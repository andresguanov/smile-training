import { ref, computed } from 'vue';

export const useIntersectionObserver = (initDif: number = 10, list: Array<any>) => {
  // Cantidad cargada
  const loadedCount = ref(initDif);

  // Lista final
  const loadedList = computed(() => list.slice(0, loadedCount.value));

  // Referencia de los items
  const itemsRef = ref([]);

  // Último item
  const lastItemRef = computed(() => itemsRef.value[loadedCount.value - 1]);

  // Intersection Observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!itemsRef.value.length) return;
      if (entry.isIntersecting) {
        if (loadedCount.value === list.length) return stopObserving();
        loadedCount.value += initDif;
        startObserving();
      }
    });
  });

  const startObserving = async (target = lastItemRef) => {
    await nextTick();
    observer.observe(target.value);
  };

  const stopObserving = () => observer.disconnect();

  const setLoadedCount = (count: number) => {
    loadedCount.value = count;
  };
  // onMounted(async () => {
  //   startObserving();
  // });
  return {
    itemsRef,
    loadedList,
    setLoadedCount,
    stopObserving,
    startObserving,
  };
};
