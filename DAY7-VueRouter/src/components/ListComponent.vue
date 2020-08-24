<template>
    <div>
        <h1>여기는 {{title}} 컴포넌트입니다.</h1>
        <div class="list">
            <div class="item" v-for="item in list" :key="item.id">
                {{item.title}} <span class="date">{{item.date}}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .list{
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 100px;
        gap: 20px;
        width: 800px;
    }

    .item{
        display: flex;
        justify-content: center;
        flex-direction: column;
        padding: 10px;
        box-shadow: 0 0 5px 5px #000;
        border-radius: 5px;
    }
</style>

<script>
export default {
    name:'listCompo',
    data(){
        return{
            title:'리스트',
            list:[]
        }
    },
    beforeMount(){
            axios.get('/api/todo').then(res=>{
                this.list = res.data;
                console.log(this.list);
            });
        }
}
</script>
