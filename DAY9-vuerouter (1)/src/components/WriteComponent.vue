<template>
    <div>
        <h1>여기는 {{title}} 컴포넌트입니다.</h1>
        <div class="row">
            <div class="col-10 offset-1">
                <form>
                    <input type="hidden" :value="id" v-if="mode !== 'write'">
                    <div class="form-group">
                        <label for="title">제목</label>
                        <input type="text" v-model="todoData.title" id="title" class="form-control" placeholder="제목을 입력하세요">
                    </div>
                    <div class="form-group">
                        <label for="date">날짜</label>
                        <input type="date" v-model="todoData.date" id="date" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="content">일정 내용</label>
                        <textarea class="form-control" v-model="todoData.content" id="content" rows="3"></textarea>
                    </div>
                    <button class="btn btn-outline-info btn-sm" @click.prevent="cl">작성</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>

<script>
export default {
    name:'writeCompo',
    props:["id"],
    data(){
        return {
            title:'글쓰기',
            mode:'write',
            todoData:{
                owner:this.$parent.loginUser.id,
                title:'',
                content:'',
                date:''
            }
        }
    },
    beforeMount(){
        this.$parent.pageRender('로그인되어있지 않습니다.');
        this.changeForm();
        if(this.mode === 'mod'){
            axios.get(`/api/todo/view?id=${this.id}`).then(res=>{
                if(res.data.success){
                    const data = res.data;
                    let {title,content,date} = data.todo;
                    date = date.formatDate();
                    this.todoData = {title,content, date};
                }
            });
        }
    },
    beforeUpdate(){
        this.changeForm();
    }
    ,methods:{
        changeForm(){
            if(this.id !== undefined){
                this.mode = 'mod';
                this.title = '수정';
            }else{
                this.mode = 'write';
                this.title = '글쓰기';
            }
        },
        cl(){
            let {title,content,date,owner } = this.todoData;
             let sendData = {title,content,date,owner};
            if(this.id !== undefined){
                sendData.id = this.id;
            }
            axios.post('/todoWrite',sendData).then(res=>{
                const data = res.data;
                if(data.success){
                    this.$router.push('/');
                }
                this.$parent.openToast(data.msg);
            });
        }
    }
}
</script>