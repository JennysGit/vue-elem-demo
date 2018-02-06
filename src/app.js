import './common/stylus/index.styl';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './Main';

import goods from './components/goods/goods.vue';

console.log('goods', goods);

Vue.use(VueRouter);
Vue.use(VueResource);

let routes = [{
  path: '/',
  name: 'index',
  component: App,
  children: [
    { path: '/goods', component: goods }
  ]
}];

let router = new VueRouter({
  'linkActiveClass': 'active',
  routes
});

let app = new Vue({
  router
}).$mount('#app');

router.push('/goods');

console.log('Hello Vue');

export default app;
