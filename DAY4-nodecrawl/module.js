//여기서ㅕ lunch.js를 사용하고 싶움 중요 js는 생략가능
const {lunch} = require('./lunch'); 

lunch().then(data=>{
    console.log(data);
});


//이 방식은 common.js모듈
//ESM 은 최신 방식 !!!
//모듈을 써야하는 이유 : 재사용성 늘어남, 유지보수하기 편하다.
//모듈이란? : 