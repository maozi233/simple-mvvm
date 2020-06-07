import { Compile } from './compile';
import { Dep } from './dep';


export class Vue {
  constructor(options) {
    this.$options = options;
    // 绑定数据
    this.$data = options.data;
    this.observe(this.$data);

    new Compile(this.$options.el, this);

    if (options.created && typeof options.created === 'function') {
      options.created.call(this);
    }
  }

  observe(data) {
    if (!data ||typeof data !== "object") {
      return;
    }
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key]);
      // 把data下的属性代理到this下
      this.proxyData(key);
    })
  }

  defineReactive(obj, key, val) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
      get() {
        // console.log(`dep 将 ${key}添加到了队列中`)
        Dep.target && dep.addDep(Dep.target);
        return val;
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal;
          dep.notify();
        }
      },
    })
    if (typeof val === 'object') {
      this.observe(val)
    }
  }

  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal;
      }
    })
  }
}


