// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* globals localStorage */
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import auth from './auth';

Vue.use(VueRouter);
Vue.use(VueResource);

/* eslint-disable no-new */
const storage = localStorage.getItem('gruff_token');
let token = '';

if (storage !== null) {
  token = JSON.parse(storage).token;
  Vue.http.headers.common.Authorization = `Bearer ${token}`;
}

function requireAuth(to, from, next) {
  if (!auth.loggedIn()) {
    next({
      path: '/login',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: App.components.Home },
    { path: '/gruff/:id', component: App.components.Gruff },
    { path: '/user', component: App.components.User, beforeEnter: requireAuth },
    { path: '/login', component: App.components.Login },
    { path: '/signup', component: App.components.Signup },
    { path: '/logout',
      beforeEnter(to, from, next) {
        auth.logout();
        next('/');
      },
    },
  ],
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
});

export default router;

