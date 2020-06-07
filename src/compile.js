import { Watcher } from './dep';

export class Compile {
  constructor(el ,vm) {
    this.$el = document.querySelector(el);
    this.$vm = vm;
    if (this.$el) {
      // 转换内容为片段fragment
      this.$fragment = this.node2Fragment(this.$el);
      // 编译为dom元素
      this.compile(this.$fragment);
      // 插入到el下
      this.$el.appendChild(this.$fragment);
    }
  }

  node2Fragment(el) {
    const fragment = document.createDocumentFragment();
    // 将el中的元素移到fragment中
    let child;
    while(child = el.firstChild) {
      // 每添加一次el中的child就少一个
      fragment.appendChild(child)
    }
    return fragment;
  }

  compile(fragment) {
    const childNodes = fragment.childNodes;
    Array.from(childNodes).forEach(node => {
      if (this.isElement(node)) {
        // console.log('编译元素')
      } else if (this.isInterpolation(node)) {
        this.compileText(node);
      }
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    })
  }

  compileText(node) {
    this.update(node, this.$vm ,RegExp.$1, 'text');
  }

  // 更新函数
  update(node, vm, exp, dir) {
    const updateFn = this[`${dir}Updater`];
    updateFn && updateFn(node, vm[exp]);
    // 依赖收集
    new Watcher(vm, exp, function(val) {
      updateFn && updateFn(node, val);
    })
  }

  textUpdater(node, value) {
    node.textContent = value;
  }

  isElement(node) {
    return node.nodeType === 1;
  }

  isInterpolation(node) {
    const text = node.innerText;
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}