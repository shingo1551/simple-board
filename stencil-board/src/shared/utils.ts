export const loading = (comp: { loading: boolean }, h: any) =>
  comp.loading ? timeout(comp) : h;

const timeout = (comp: { loading: boolean }) => {
  setTimeout(() => (comp.loading = false), 0);
  return null;
}
