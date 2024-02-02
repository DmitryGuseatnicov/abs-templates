import { computed } from 'vue';
import { useViewport } from '#imports';

export const useMediaSizes = () => {
  const { isGreaterOrEquals, isLessThan } = useViewport();

  const isMobile = computed(() => isLessThan('tabletSmall'));
  const isTablet = computed(() => isGreaterOrEquals('tabletSmall') && isLessThan('tablet'));
  const isDesktop = computed(() => isGreaterOrEquals('desktop'));

  return {
    isDesktop,
    isMobile,
    isTablet,
  };
};
