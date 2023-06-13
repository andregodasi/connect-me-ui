export const usePagination = (
  pageCount: number,
  current: number,
): (string | number)[] => {
  const delta = 2;
  const hasLeft = current - delta;
  const hasRight = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let aux;

  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= hasLeft && i < hasRight)) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (aux) {
      if (i - aux === 2) {
        rangeWithDots.push(aux + 1);
      } else if (i - aux !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    aux = i;
  }

  return rangeWithDots;
};
