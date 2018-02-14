import './common/stylus/index.styl';

import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App.vue';

import goods from './components/goods/goods.vue';
import ratings from './components/ratings/ratings.vue';
import seller from './components/seller/seller.vue';

Vue.use(VueRouter);
Vue.use(VueResource);

let routes = [{
  path: '/',
  name: 'index',
  component: App,
  children: [
    { path: '/goods', component: goods },
    { path: '/ratings', component: ratings },
    { path: '/seller', component: seller }
  ]
}];

// let routes = [{
//   path: '/',
//   component: App,
//   children: [
//     { path: '/goods', component: { template: '<div>goods</div>' } },
//     { path: '/ratings', component: { template: '<div>ratings</div>' } },
//     { path: '/seller', component: { template: '<div>seller</div>' } }
//   ]
// }];

let router = new VueRouter({
  'linkActiveClass': 'active',
  routes
});

let app = new Vue({
  router
}).$mount('#app');

router.push('/goods');

export default app;
