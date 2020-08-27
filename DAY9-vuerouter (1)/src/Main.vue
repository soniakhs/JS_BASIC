<template>
  <div class="main">
    <header>
      <h1>{{msg}}</h1>
      <div class="menu-box">
        <ul class="nav">
          <ul class="nav nav-pills">
            <li class="nav-item">
              <router-link to="/" class="nav-link">리스트</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/write" class="nav-link">글쓰기</router-link>
            </li>
            <li class="nav-item" v-if="loginUser == null">
              <router-link to="/login" class="nav-link">로그인</router-link>
            </li>
            <li class="nav-item" v-if="loginUser != null">
              <a class="nav-link" @click.prevent="logout">로그아웃</a>
            </li>
          </ul>
        </ul>
      </div>
    </header>

    <section class="content">
      <transition name="sc" mode="out-in">
        <router-view></router-view>
      </transition>
    </section>
    <div id="msgList">
      <transition name="rlmove">
        <div class="my-toast" v-if="showToast">{{toastMsg}}</div>
      </transition>
    </div>
  </div>
</template>

<style>
.sc-enter-active, .sc-leave-active{
  transition: opacity 0.5s, transform 0.5s;
}

.sc-enter{
  opacity: 0;
  transform: translateX(100%);
}
.sc-leave-to{
  opacity: 0;
  transform: translateX(-100%);
}

.main > * {
  width: 100%;
}
.main > header {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
}

.content {
  width: 80%;
  margin: 20px 0;
  overflow: hidden;
}
#msgList {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
}
.my-toast {
  position: absolute;
  right: 10px;
  bottom: 10px;
  background-color: rgb(180, 166, 38);
  color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 12px;
}
.rlmove-enter-active,
.rlmove-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.rlmove-enter,
.rlmove-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>

<script>
export default {
  name: "MainApp",
  data() {
    return {
      msg: "Welcome Vue.js App",
      showToast: false,
      toastMsg: "테스트 토스트메시지입니다 ",
      loginUser:null
    };
  },
  beforeMount(){
      this.checkLogin();
  },
  methods: {
     pageRender(msg){
      if(this.loginUser === null){
         Swal.fire({
          title:'입장불가',
          text:msg,
          icon:'warning'
        }).then(result=>{
          if(result){
             this.$router.push("/");
          }
          
        })
       
      }
    },
    setLogin(user){
        this.loginUser = user;
    },
    checkLogin(){
        //로그인이 되어있는지 체크
        axios.get('/api/user').then(res=>{
            const data = res.data;
            if(data.success){
                this.loginUser = data.user;
            }
        })
    },
    logout(){
      axios.delete('/api/user').then(res => {
        const data = res.data;
        if(data.success){
          this.loginUser = null;
          Swal.fire("알림",data.msg,"success");
          this.$router.push('/');
        }
      });
    },
    openToast(msg) {
      this.showToast = true;
      this.toastMsg = msg;

      setTimeout(() => {
        this.showToast = false;
      }, 2000);
    }
  }
};
</script>
