import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './router';
import KingDot from 'kingdot';

import 'kingdot/lib/theme-default/index.css';
Vue.use(KingDot);

// import vueDragSelectPro from 'vue-drag-select-pro';
// import 'vue-drag-select-pro/lib/vueDragSelectPro.css';
// Vue.use(vueDragSelectPro);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);
Vue.config.productionTip = false;
const router = new VueRouter({
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.name) {
        document.title = to.meta.title;
    }
    next();
});

new Vue({
    render: (h) => h(App),
    router,
}).$mount('#app');
