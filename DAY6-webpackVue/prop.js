import Vue from 'vue';
import Counter from './src/Counter'; 

Vue.component('counter',Counter);


window.onload = function(){
    new Vue({
        el:"#app",
        components:{
            counter:Counter
        },
        data:{
            total:0
        },
        methods:{
            incTotal(){
                this.total++;
            }
        }
    })
}