/**
 * Intersection Observer: En este caso estaremos usando un observador de los elementos
 * que se encuentran en el DOM para saber cuando se está llegando al final de la lista y agregar más
 * elementos a la lista cargada. De esta forma evitamos cargar todo el contenido de las opciones y así
 * disminuir el tiempo de carga inicial y el consumo de recursos.
 */

import { ref, computed } from 'vue';

export const useIntersectionObserver = (initDif: number = 10) => {
  // Lista original
  const totalList = ref<Array<any>>([]);

  // Cantidad cargada
  const loadedCount = ref(initDif);

  // Lista final
  const loadedList = computed(() => totalList.value.slice(0, loadedCount.value));

  // Referencia de los items
  const itemsRef = ref<Array<any>>([]);

  // Último item
  const lastItemRef = computed(() => itemsRef.value[loadedCount.value - 1]);

  // Intersection Observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!itemsRef.value.length) return;
      if (entry.isIntersecting) {
        if (loadedCount.value === totalList.value.length) return stopObserving();
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

  const setTotalList = (val: Array<any>) => {
    totalList.value = [...val];
  };

  const setItemsRef = (val: any) => {
    itemsRef.value.push(val);
  };

  return {
    totalList,
    itemsRef,
    loadedList,
    setTotalList,
    setItemsRef,
    setLoadedCount,
    stopObserving,
    startObserving,
  };
};
