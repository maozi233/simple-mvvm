import { Vue } from './mvvm';

const app = new Vue({
  data: {
    name: 'yaowei',
    age: 18,
    family: {
      father: '文全',
      mother: '翠平'
    }
  }
});

app.$data.name = 'yaowei test';
app.$data.family.father = '姚文全';
console.log(app.$data);