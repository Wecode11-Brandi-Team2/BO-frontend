import Vue from 'vue';
import VueRouter from 'vue-router';
import ProductRegist from '../pages/ProductRegist';
import MemberLookup from '../pages/MemberLookup';
import SellerModify from '../pages/SellerModify';
import Lookup from '../pages/Lookup';
import Login from '../pages/Login';
import Join from '../pages/Join.vue';
import Signup from '../pages/Signup.vue';
import CouponLookup from '../pages/CouponLookup';

Vue.use(VueRouter);

const requireAuth = () => (to, from, next) => {
  if (localStorage.getItem('access_token')) {
    return next();
  }
  next('/admin/login');
};

const isAuth = () => (to, from, next) => {
  if (localStorage.getItem('access_token')) {
    return next('/');
  }
  next();
};

export const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/account/member'
    },
    {
      path: '/product/regist',
      name: 'ProductRegist',
      beforeEnter: requireAuth(),
      component: ProductRegist
    },
    {
      path: '/account/seller/modify',
      name: 'SellerModify',
      beforeEnter: requireAuth(),
      component: SellerModify
    },
    {
      path: '/promotion/:subMenu',
      name: 'CouponLookup',
      beforeEnter: requireAuth(),
      component: CouponLookup
    },
    {
      path: '/account/:subMenu',
      name: 'MemberLookup',
      beforeEnter: requireAuth(),
      component: MemberLookup
    },
    {
      path: '/admin/login',
      name: 'Login',
      beforeEnter: isAuth(),
      component: Login
    },
    {
      path: '/admin/agreement',
      name: 'Join',
      beforeEnter: isAuth(),
      component: Join
    },
    {
      path: '/admin/signup',
      name: 'Signup',
      beforeEnter: isAuth(),
      component: Signup
    },
    {
      path: '/:mainMenu/:subMenu',
      name: 'Lookup',
      beforeEnter: requireAuth(),
      component: Lookup
    }
  ]
});
