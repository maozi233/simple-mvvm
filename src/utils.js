export const getValue = (vm, keys) => {
  let val = vm;
  keys.split('.').forEach(key => {
    val = val[key]
  });
  return val;
}