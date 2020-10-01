import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'
import VueAxios from 'vue-axios'

// ленивая загрузка маршрутов
const HomePage = () => Promise.resolve(import('../views/homePage/components/HomePage.vue'));


Vue.use(Router);
Vue.use(VueAxios, axios);

const router = new Router({
    mode: 'history',
    routes: [

        {
            path: '/',
            name: 'Новогодняя',
            component: HomePage
        }
    ]
})
export default router;
