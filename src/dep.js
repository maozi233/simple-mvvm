
import { getValue } from './utils';

export class Dep {
  constructor() {
    // 存放依赖(watcher 每个属性都会有一个watcher  )
    this.deps = [];
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  notify() {
    this.deps.forEach(dep => dep.update())
  }
}

export class Watcher {
  constructor(vm, key, callback) {
    this.vm = vm;
    this.key = key;
    this.callback = callback;
    // 把当前属性的watcher挂载到Dep的静态属性target下
    Dep.target = this;
    getValue(this.vm, key); // 触发defineReactive下当前属性（key）的getter
    // this.vm[this.key]; // 触发defineReactive下当前属性（key）的getter
    Dep.target = null;
  }

  update() {
    // console.log('属性更新了')
    this.callback.call(this.vm, getValue(this.vm, this.key));
    // this.callback.call(this.vm, this.vm[this.key]);
  }
}