import Vue from 'vue';
import axios from 'axios';

window.onload=()=>{
    Vue.component('my-hello',{
        template:`<div id="hello">
                    <header><slot name="header"></slot></header>
                    <section><slot></slot></section>
                    <p>{{count}}</p>
                    <button @click="inc">+</button>
                    <footer><slot name="footer"></slot></footer>
                    </div>`,
        data(){
            return{
                count:0
            };
        },
        methods:{
            inc(){
                this.count++;
            }
        }
    });
    
    new Vue({
        el: "#app",
        data:{
            items:[],
            colors:["#ff0000","#ff0f0f","#00fff0"],
            idx:0,
            colorSet:'',
            red:false,
            green:false,
            boxStyleObj:{
                color : '#fff',
                'border-radius' : '5px'
            }
        },
        beforeMount(){
            axios.get('/getData').then(res=>{
                this.items = res.data;
            });
        },
        methods:{
            
        },
        mounted(){
            setInterval(() => {
                this.colorSet = `background-color:${this.colors[this.idx]}`;
                this.idx = (this.idx+1) % this.colors.length;
            }, 1000);
        },computed:{
            boxClassObj(){
                return{
                    red:this.red,
                    green:this.green
                };   
            }
        }
    });
}