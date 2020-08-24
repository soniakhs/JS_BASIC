import Vue from 'vue';
//alias에 의해 src를 @로 놓기로 했기 때문에
import Main from '@/Main'
import axios from 'axios';

import router from '@/router/route.js';

window.axios = axios;

window.onload = ()=>{
    new Vue({
        el:"#app",
        router,
        render:h=>h(Main)
    })
}