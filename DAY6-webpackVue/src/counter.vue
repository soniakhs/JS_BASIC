<template>
    <div>
        <p>{{count}} / {{abc}}</p>
        <button @click="inc">증가</button>
    </div>
</template>

// scoped는 이 컴포넌트 안에서만 작동이 되고
// scoped가 없으면 그냥 모든 태그에 작동이 됨.
<style scoped>
    p{
        color:#fff;
        background-color: rgb(176, 176, 255);
    }
</style>

<script>
export default {
    name:'counter',
    props:['abc'],    
    data(){
        return{
            count:0
        }
    },
    methods : {
        inc(){
            this.count++;
            this.$emit("aaa");
        }
    }    
}
</script>