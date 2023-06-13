export const transformAnchorURL = (value: string): string => {
  if (value) {
    if (value.indexOf('http') === -1) {
      return `https://${value}`;
    }
  }
  return value;
};
