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
      component: ProductRegist
    },
    {
      path: '/account/seller/modify',
      name: 'SellerModify',
      component: SellerModify
    },
    {
      path: '/promotion/:subMenu',
      name: 'CouponLookup',
      component: CouponLookup
    },
    {
      path: '/account/:type',
      name: 'MemberLookup',
      component: MemberLookup
    },
    {
      path: '/admin/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/admin/agreement',
      name: 'Join',
      component: Join
    },
    {
      path: '/admin/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/:mainMenu/:subMenu',
      name: 'Lookup',
      component: Lookup
    }
  ]
});
