import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import LoginComponent from './components/layouts/LoginComponent.vue'
import RegisterComponent from './components/layouts/RegisterComponent.vue';
import DashboardComponent from './components/layouts/Dashboard.vue';
import Header from './components/layouts/Header.vue';
import NotFound from './components/layouts/NotFound.vue'

Vue.config.productionTip = false
Vue.use(VueRouter)
const routes = [{
        path: '/',
        component: Header,
        name: 'Header',
        props: true
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent,
        props: true
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterComponent,
        props: true
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        props: true
    },
    {
        path: '*',
        name: '*',
        component: NotFound,
        props: true
    }
];

const router = new VueRouter({
    routes,
    mode: 'history'
})
new Vue({
    render: h => h(App),
    router,
    data: {}
}).$mount('#app')