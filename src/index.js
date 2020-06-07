import { Vue } from './mvvm';

const app = new Vue({
  el: '#app',
  data: {
    name: 'yaowei',
    age: 18,
    family: {
      father: '文全',
      mother: '翠平'
    }
  },
  created() {
    console.log(this)
    this.$data.name = 'yaowei test';
    this.$data.family.father = '姚文全';
  },
});

// console.log(app.$data);