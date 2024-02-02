import type { Ref } from 'vue';
import { ref } from 'vue';

export const useBooleanState = (initialValue?: boolean): [Ref<boolean>, () => void, () => void, () => void] => {
  const flag = ref(Boolean(initialValue));

  return [
    flag,
    () => {
      flag.value = true;
    },
    () => {
      flag.value = false;
    },
    () => {
      flag.value = !flag.value;
    },
  ];
};
