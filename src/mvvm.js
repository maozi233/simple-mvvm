function Dep() {
  this.subs = [];
}

Dep.prototype.addSub = function(sub) {
  this.subs.push(sub)
}

Dep.prototype.notify = function() {
  this.subs.forEach((sub) => {
    sub.update();
  })
}

function Watcher(fn) {
  this.fn = fn;
}

Watcher.prototype.update = function() {
  this.fn();
}

class Mvvm {
  constructor(el, options) {
    this._el = el;
    this._options = options;
    this.observe(this._options.data);
    const { data } = this._options;

    // 把_options.data下的数据挂到data下
    for(let key in data) {
      let val = data[key];
      Object.defineProperty(this, key, {
        enumerable: true,
        get() {
          return val;
        },
        set(newVal) {
          data[key] = newVal;
        },
      })
    }

    this.compile(this._el, this);
  }

  observe(data) {
    if (typeof data !== 'object') return;
    const _this = this;
    for(let key in data) {
      let val = data[key];
      this.observe(val);
      Object.defineProperty(data, key, ({
        enumerable: true,
        get() {
          return val;
        },
        set(newVal) {
          if (newVal !== val) {
            val = newVal;
            _this.observe(val);
          }
        },
      }))
    }
  }

  compile(el, vm) {
    vm.$el = document.querySelector(el);
    let fragment = document.createDocumentFragment();
    Array.from(vm.$el.childNodes).forEach(el => {
      fragment.appendChild(el)
    })
    this.replace(fragment, vm);
    vm.$el.appendChild(fragment);
  }

  replace(fragment, vm) {
    Array.from(fragment.childNodes).forEach((node) => {
      const reg = /\{\{(.+)\}\}/;
      const text = node.textContent;
      if (node.nodeType === 3 && reg.test(text)) {
        // console.log(RegExp.$1);
        const arr = RegExp.$1.trim().split('.');
        let val = vm;
        arr.forEach(e => {
          val = val[e];
        });
        console.log(val)
        node.textContent = text.replace(reg, val);
      }
      if (node.hasChildNodes()) {
        this.replace(node, vm);
      }
    })
  }
}
window.mvvm = new Mvvm('#app', {
  data: {
    a: {
      b: 2
    },
    c: 3
  }
})
console.log(window.mvvm)