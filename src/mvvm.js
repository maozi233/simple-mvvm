export class Vue {
  constructor(options) {
    this.$options = options;
    // 绑定数据
    this.$data = options.data;
    this.observe(this.$data);
  }

  observe(data) {
    if (!data ||typeof data !== "object") {
      return;
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }

  defineReactive(obj, key, val) {
    Object.defineProperty(obj, key, {
      get() {
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal;
          console.log(`${key}属性更新为: ${val}`)
        }
      },
    })
    if (typeof val === 'object') {
      this.observe(val)
    }
  }
}