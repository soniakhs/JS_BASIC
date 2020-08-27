<template>
    <div>
        <div class="row">
            <div class="col-8 offset-2">
                <div class="card w-100">
                    <div class="card-header">
                        {{todo.title}}
                    </div>
                    <div class="card-body">
                        {{todo.content}}
                    </div>
                    <div class="card-footer">
                        <router-link :to="`/mod/${todo.id}`" class="btn btn-outline-info btn-sm mx-2" >수정</router-link>
                        <router-link to="/" class="btn btn-outline-info btn-sm">목록</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'viewComponent',
    props:['id'],
    data(){
        return{
            todo:{}
        }
    },
    beforeMount(){
        axios.get(`/api/todo/view?id=${this.id}`).then(res=>{
            const data = res.data;
            console.log(data);
            this.$parent.openToast(data.msg);
            if(!data.success){
                this.$router.push('/');
            }else{
                this.todo = data.todo;
            }
        })
    }
    ,methods:{
        
    }
}
</script>

<style scoped>

</style>