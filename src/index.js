import { Vue } from './mvvm';

const app = new Vue({
  el: '#app',
  data: {
    name: 'yaowei',
    age: 18,
    family: {
      father: '文全',
      mother: '翠平'
    },
    html: '<p>测试html</p>'
  },
  created() {
    this.name = 'yaowei test';
    this.family.father = '姚文全';
  },
  methods: {
    changeAge() {
      this.age = 26;
    }
  }
});

console.log(app);