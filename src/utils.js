export const getValue = (vm, keys) => {
  let val = vm;
  keys.split('.').forEach(key => {
    val = val[key]
  });
  return val;
}

export const setValue = (vm, keys, value) => {
  let val = vm;
  keys.split('.').forEach(key => {
    val = val[key]
  });
  val = value;
}