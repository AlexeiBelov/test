import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import HomePage from '../views/homePage/store/HomePage.js'

export default new Vuex.Store({
    // Включаем строгий режим только для разработки. Это гарантирует, что все мутации состояния будут явно отслеживаться через инструменты отладки.
    strict: process.env.NODE_ENV !== 'production',
    modules: {
        HomePage,
    }
})
