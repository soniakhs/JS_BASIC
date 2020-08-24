<template>
    <div>
        <h1>여기는 {{title}} 컴포넌트입니다.</h1>
        <p>대충 컴포넌트인것 같은 문장</p>
    </div>
</template>

<style scoped>

</style>

<script>
export default {
    name:'writeCompo',
    data(){
        return{
            title:'글쓰기'
        }
    }
}
</script>
