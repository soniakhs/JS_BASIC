import Vue from 'vue';
import Router from 'vue-router';
import ListCompo from '@/components/ListComponent';
import WriteCompo from '@/components/WriteComponent';

Vue.use(Router);//vue가 SPA를 위해 라우팅을 사용하겠다는 뜻


//주소와 매칭되는 컴포넌트들을 여기에 적어 주어야함.
export default new Router({
    mode:'history',
    routes:[
        {
            path:'/',
            name:'list-page',
            component:ListCompo
        },
        {
            path:'/write',
            name:'write-page',
            component:WriteCompo
        }
    ]
})