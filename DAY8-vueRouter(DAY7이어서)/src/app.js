import Vue from 'vue/dist/vue';
import Main from '@/Main';
import axios from 'axios';

import router from '@/router/route.js'

import 'bootstrap/dist/css/bootstrap.min.css';

window.axios = axios;

window.onload = ()=>{
    new Vue({
        el:"#app",
        router,
        render: h => h(Main)
    })
}