// my-gallery/src/utils/determineFilterUtils.ts

export function determineFilter(filter: string) {
    if (filter.length === 6) {
      return 'date';
    } else if (filter.length <= 3) {
      return 'series';
    } else {
      return 'number';
    }
  }