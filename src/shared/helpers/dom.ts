export const getWindow = () => {
  if (typeof window !== 'undefined') {
    return window as Window & typeof globalThis;
  }
  return null;
};
