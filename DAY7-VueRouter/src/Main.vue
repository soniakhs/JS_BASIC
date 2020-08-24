<template>
    <div class="main">
        <header>
            <h1>{{msg}}</h1>
            <router-link to="/">리스트</router-link>
            <router-link to="/write">글쓰기</router-link>
        </header>
        <section class="content">
            <router-view></router-view>
        </section>
    </div>
</template>

<style scoped>
    .main{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }
</style>
    
<script>
export default {
    name:'MainApp',
    data(){
        return{
            msg:'Welcome Vue.js App'
        }
    },
    methods:{
        
    }
}
</script>