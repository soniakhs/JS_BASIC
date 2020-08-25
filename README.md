# INTRODUCTION
> node.js 에 관해 새롭게 알게된 공부 내용을 작성하는 공간이다.<br/>
> 참고 블로그 => zerocho 
> node.js에 대한 API 문서 공간=> https://nodejs.org/api/fs.html <br/>
> express API 문서 공간 => https://expressjs.com/ko/api.html (response,request 객체에 대한 것도 있음)<br/>
> vue js 문서 공간 =>https://kr.vuejs.org/v2/guide/index.html

## DAY 1 (DATE : 2020-08-07)
### ☆ 느낀 점
> 첫 수업이었는데 개인적으로 한번에 많은 내용을 공부하다보니 이해가 안되는 것도 있었다.<br/>
> 그러나 개인적으로 되게 재밌게 수업했고, 뭔가 진짜로 웹서버에 대해 공부하는 느낌이라서 재밌었다.<br/>
> 아직은 너무.. 부족한게 많고... 계속 하고 있는 수업을 그냥 뒤처지지만 않고 잘만 해갔으면 좋겠다.<br/>
### ▶ node 란?
#### 서버에서 돌아가는. 또는 브라우저 밖에서 돌아가는 Javascript엔진이다
### ▶ node만을 이용한 간단한 작업
#### ⊙ node 에 있는(기본적인) 모듈을 갖고오는 키워드 require
> <b>ex) const http = require('http') -> ('http')는 node에 있는 모듈이다.</b><br/>
> 이런 것들을 <b>'코어 모듈'</b>이라고 한다!<br/>
> http 이외에도 file system(fs),path 등등 다양하다...<br/>
> <b>※코어모듈,파일모듈,npm모듈등 다양한 목록은 https://tutorialpost.apptilus.com/code/posts/nodejs/nodejs-modules/ 여기를 참고하자</b>
#### ⊙ 파일을 읽고 쓸 수 있는 fs.readFile(path[, options], callback),fs.writeFile(file, data[, options], callback)
> <b>ex1)fs.readFile('data.txt',(err,data)=> console.log(data));</b><br/>
> <b>ex2)fs.writeFile('data.txt','Hello,world',(err)=>console.log('기록완료'))</b><br/>
> 말그대로 readFile은 지정한 file에서 값을 가져온 것이고, writeFile은 내가 입력한 값을 지정한 파일에 쓰는 것을 말한다.
#### ⊙ 서버를 만드는 문법 http.createServer()
> <b>ex)const server = http.createServer((req,res)=>{<br/>
>    fs.readFile('index.html','utf-8',(err,data)=>{<br/>
>        res.writeHead(200,{'Content-Type': 'text/html'});<br/>
>        res.end(data);<br/>
>    })<br/>
>});</b><br/>
> 클라이언트가 요청을 보내면 응답할 수 있도록 제어할 수 있다.<br/>
> 위에 <b>res.writeHead</b> 는 클라이언트 요청에 대해서 응답을 해주는 부분이다.<br/>
> 앞에 숫자 '200'의 경우는 현재 상태코드임. ex)err 코드 404<br/>
> <b>end()</b>는 data를 전송하고 끝내라는 의미이다.
#### ⊙ 서버구동 server.listen()
> <b>ex)server.listen(55000,()=>{ console.log("서버가 55000번 포트에서 구동을 시작했습니다.");});</b><br/>
> http 서버를 시작하게하며 여기서 사용자가 요청을 받도록 대기<br/>
> 쉽게 말해서 55000번 포트에서 서버를 구동하라고 하는 것.
#### ⊙ 이벤트 처리 server.on()
> <b>ex)server.on('request',e=> console.log("클라이언트가 연결을 요청하였습니다"));</b><br/>
> 이벤트가 올때 처리를 해주는 역할<br/>
> addEventListener()와 같은 역할
### ▶ node.js 에 express를 이용한 간단한 작업
#### express 모듈 사용
> <b>ex)const app = express();</b><br/>
> 간단하게 app이라는 상수에 express모듈 지정
#### ⊙ 요청에 대한 응답
> <b>app.get();</b><br/>
> <b>ex)app.get('/world', function (req, res) {res.send('hello world')})</b><br/>
> localhost:55000/world 로 요청을 넣으면 응답으로 hello world를 찍어주는 역할
#### ⊙ 값 지정
> <b>app.set();</b><br/>
> <b>ex) app.set('view engine','ejs');</b><br/>
> view 엔진을 ejs로 지정해주는 구문
#### ⊙ 디렉토리를 언어에 따라(리눅스) 찾아가는 방법을 자동으로 달리해주는 path.join()
> <b>ex) path.join('all','right');</b><br/>
> 이렇게 하면 사실상 let path = 'all/right'; 과 다른건 없지만 리눅스의 경우 디렉토리를 찾아갈때 (\)를 <br/>
> 쓰기 때문에 그에 따라 <b>자동</b>으로 달리해준다.
#### ⊙ 정적인 파일을 서비스해주는 static 선언 !
> <b>ex) express.static(path.join('all','public'));</b><br/>
> <b>all/public</b> 파일안에 있는 것들은 모두 다 <br>static</br> 선언이 된다!<br/>
> <b>정적인 파일(img,css등)</b>을 서비스해주어서 나오지 않던게 나오게 된다.<br/>
> 정적인 파일들을 요청하면 public 파일에서 찾는것 !
### ★ webpack 에 대한 정의!(오늘자 정리하는. 미완성,완벽한 정의는 아니다.)
> 여러개의 파일들을 하나로 묶어 모듈화 시켜준다!<br/>
> 코드 또한 난독화시켜서 해킹에 대해 예방도 가능하다.
### ★ npm을 활용한 모듈 다운
> npm init -y => package.json 생성<br/>
> express 다운 : npm install --save express<br/>
> ejs 다운 : npm install --java ejs




## DAY 2 (DATE : 2020-08-10)
### ☆ 느낀 점
> 오늘은 <b>SOCKET</b>을 이용해서 <b>실시간 채팅</b>을 만들어보았다. </b><br/>
> 디자인이 되게 기본으로 만들어서 별로긴하지만 실시간으로 만드는 방법을 알아서 신기했고 앞서 배웠던 코드보다 조금은 간결해진게 보여서 신기했다.<br/>
> 간단하게 만든 <b>실시간 채팅</b> 프로그램은 가다듬고 새로운 기능들을 추가해서 <b>내것으로 만들 예정</b>이다.<br/>
> 그외에도 JS의 <b>비동기식</b>에 대해 배웠다.<br/>
> ↓ 정~말 간단하고 심플한 그런... 채팅 시스템이다. 꾸민 건 아직 없다. <b>추후 업데이트 예정</b>
>![캡처](https://user-images.githubusercontent.com/58199479/89799705-c667e200-db68-11ea-8fd4-e2e6ccd44f15.PNG)
### ▶ SOCKET이란?
#### 쉽게 말하자면 프로그램이 네트워크에서 데이터를 통신할 수 있도록 연결해주는 연결부라고 한다.
### ▶ SOCKET을 이용한 실시간 채팅 사이트
#### ⊙ socket.io 선언
> <b>server.js : const socket = require('socket.io');</b><br>
> <b>app.js : let socket = io();</b><br/>
> → 여기서 <b>io()</b> 는  <b>'socket.io/socket.io.js'</b>안에 있는 함수이다.<br/>
> → 서버에 소켓을 연결하는 것이다.<br/>
> <b>chat.ejs : <script src="/socket.io/socket.io.js"></script></b><br/>
#### ⊙ 이벤트를 보내는 soscket.emit();
> <b>ex) socket.emit('chat message',msg.value);</b><br>
> 위에 구문을 실행하게 되면 'chat message'라는 이름을 찾아가 (실질적으로 이벤트를 발생하는 socket.on()) 그곳에 data를 집어넣어준다.  <br/>
> 여기서 data값은 뒤에 msg.value이니 msg.value의 값이 넘어가는 것이다.
> 쉽게 말하자면 on은 e.eventAddListener의 역할을 하고 emit은 ajax의 역할을 한다.
#### ⊙ socket의 대한 여담
> socket은 서버에 접속하게 되면 자신의 고유의 키값(id)을 가지고 있다.<br>
> 새로고침을 하게 되면 그 키값(id)은 다른 키값으료  교체가 된다.
### ▶ 비동기식 처리에 대한 내용
#### ⊙ 비동기식 처리란?
> 자바 스크립트의 비동기식 처리란 특정 코드의 연산이 끝나지 않았음에도 불구하고, 그걸 멈추지 않은채 계속해서 다음 코드를 처리하는 특성을 뜻한다.
>![hh3Mawr](https://user-images.githubusercontent.com/58199479/90027860-f68fbc00-dcf3-11ea-8874-8931ace6feb3.png)
#### ⊙ 알아야하는 이유?
> 자바스크립트 언어는 <b>싱글 스레드 프로그래밍 언어</b>이기 때문에 비동기식으로 처리가 되는데, 비동기식으로 처리가 된다면 <b>실행 순서</b>가 보장 받지 못하고 굉장히 뒤죽박죽이게 되어버린다.<br>
>그렇게 된다면 대체 어디서 값이 반환되고, 대체 어디서부터 잘못된 것인지 알 수 없어진다
> 비동기식에 대한 내용은 굉장히 짧게 배워서 아직은 자세하겐 모르겠으나 쉽게 보자면 자바스크립트의 경우 setTimeout()함수를 사용하였을 때<br>
> 예를 들어 <b>JAVA</b>처럼 순차적으로 처리를 하지 못하고 모든 구문이 끝나고나서 setTimeout()함수가 호출되기 때문에 그 점을 해결하기 위해서 사용하는 것이다.<br/>
> 그래서 이런 것들을 해결하기 위해 대표적으로 <b>콜백함수,promise,setTimeout</b> 등을 사용할 수 있으나, 문제점이 있다.<br/>
> 밑 사진은 콜백의 문제점중 하나인데... 이러한 지옥에 빠지게 될 수도 있기 때문이다...<br/>
>![1_SngveBEO1YHhBZmRn6PDJw](https://user-images.githubusercontent.com/58199479/89799408-65400e80-db68-11ea-92ba-08560f41191e.jpeg)
> 이런 느낌으로다 말이다..<br>
> 아무튼 이 처리 방식은 무조건! 알아야한다! 알수 없는 오류에 빠질 수 있기 때문이다.
#### ⊙ promise 함수 와 then
> 앞서 말한 대표적인 비동기 처리 방식인 <b>콜백함수,promise,setTimeout</b> 등의 문제점을 보완함과 동시에 한층 더 간결하게 사용할 수 있는 동기식으로 처리하는 기법이다.<br>
> <b>ex)const promise1 = new Promise((resolve, reject) => {<br/>
>   resolve('Success!');<br/>
> });<br/>
> 
> promise1.then((value) => {<br/>
>   console.log(value);<br/>
>   // expected output: "Success!"<br/>
> });</b><br/>
> promise에는 성공시 resolve로 값이 들어오고, 에러가 날시 reject로 값이 들어온다..<br/>
> then 은 promise에 값이 들어올때까지 가만히 잠정을 타다가 프로미스에서 값이 들어오고 실행이 끝나면 <br/>
> 값(value)이 들어오게 된다. <br/>
> 이때 이 값을 이용해서 순차적으로 실행하는 것.

#### ⊙ async 함수 와 await
> 앞서 말한 대표적인 비동기 처리 방식인 <b>콜백함수,promise,setTimeout</b> 등의 문제점을 보완함과 동시에 한층 더 간결하게 사용할 수 있는 동기식으로 처리하는 기법이다.<br>
><b>async function f() {<br/>
>  let promise = new Promise((resolve, reject) => {<br/>
>    setTimeout(() => resolve("완료!"), 1000)<br/>
>  });<br/>
>  let result = await promise; // 프미스가 이행될 때까지 기다림 (*)<br/>
 > alert(result); // "완료!"<br/>
>}<br/>
>f();</b><br/>
> ▲ promise 와 async를 이런식으로 함께 사용하면 좋다!
> 여기서 주의할 점은 <b>await</b>는 async 함수 내에서만 작동한다! 그외에는 작동하지 않음.


## DAY 3 (DATE : 2020-08-12)
### ☆ 느낀 점
> 오늘은 간단하게 <b>CSS</b>를 이용해서 <b>그리드 레이아웃</b>을 확인해보고, </b><br/>
> 사이트에서 정보를 파싱해오는 <b>SELENIUM</b>에 대해서 알아보았다.<br/>
> 옛날에 고등학교 1학년때 자바를 이용해 jsoup으로 정보를 파싱해와서 무언가를 만들었던 기억이 새록새록 나서 신기했다.<br/>
> 다만 그때와 지금이 많이 다르다고 느낀 것은 지금은 조금 더 이해하기 쉬웠고, 자바스크립트를 통해 더욱 편하게 가져올 수 있었다.<br/>
> 지금껏 배워온 것들보다 가장 재밌다고 느낀 부분이었고 이걸 이용하면 꽤 괜찮은 프로젝트를 할 수 있을 것 같다.<br>
> ↓ selenium을 이용해서 학교 급식정보를 파싱해봄
>![111133](https://user-images.githubusercontent.com/58199479/90027454-884af980-dcf3-11ea-9a87-ed1947c2d203.PNG)

### ▶ GRID 레이아웃
#### ⊙ 템플릿 지정
> <b>1.grid-template-columns</b><br>
> <b>2.grid-template-rows</b><br>
추후수정...
### ▶ 사이트 파싱
#### ⊙ selenium-webdriver
><b>관련 문서: https://www.selenium.dev/documentation/ko/</b><br>
> selenium이란 드라이버 매니저를 뜻함!<br>
> 쉽게 말하자면 자바에서 파싱할때 쓰던 jsoup 같은 건데 jsoup의 경우 HTML 파일만 뜯어와서 ajax 서버를 사용하는 사이트는 쓸 수가 없다.<br>
> 여기서 ajax 란 웹페이지의 이동없이 서버를 전송해주는 그런 역할을 한다. ex)유튜브<br>
>1. npm i selenium-webdriver<br
>2.... => 도움말 => 정보 => 업데이트 정보확인<br>
>3.크롬 버전에 따라 chrome webdriver 다운 ㄱㄱ<br>

#### ⊙ selenium-webdriver의 여러가지 기능들
>const { <b>Builder , By ,Key , until</b>} = require('selenium-webdriver');<br>
>Builder == 셀레니움과 크롬과 연결해주는 친구 = let driver = await new Builder().forBrowser('chrome').build();<br>
>(크롬 브라우저에 로드하란 뜻. 이 순간부터 크롬 브라우저를 제어할수 있음)<br>
>By == ~로 부터 이 값을 가져오게 함 = By.css(".sp_website .go_more") <br>
>key == 키 입력을 위해서 만들어놈 = Key.RETURN(엔터키)<br>
>until == ~까지 기다리게 함 =driver.wait(until.elementLocated(By.css("#nxfr_htp")),1000)


#### ⊙ body-parser
> body-parser 란 <b>post</b>로 들어온 값을 json 의 형태로 ( {key:"value"} ) 바꿔주는 그런 역할을 한다.<br>
> body-parser를 깔게 되면 post로 넘어온 값은 <b>req.body</b> 로 가져올 수 있다. 


#### ⊙ body-parser 의 미들웨어 셋팅
> ▽ body-parser 의 <b>필수 셋팅</b><br>
>  <b>ex) app.use(express.urlencoded({ extended: true }));</b><br>
> 값이 true => 외부 파서를 사용할 경우 , false => 내장 파서를 사용할 경우 <br>
> ▽ <b>json</b> 형태로 가져오기 <br>
>  <b>ex) app.use(bodyParser.json())</b><br>


### ▶ 모듈화
#### ⊙ 모듈이란?
> 모듈이란 독립적으로 재활용할 수 있는 소프트웨어 덩어리라고 볼 수 있다. 
#### ⊙ 모듈화를 해야하는 이유?
> 1. 재사용성 늘어남. (좋은 프로그램은 재사용성이 좋다)<br>
> 2. 유지보수하기 편하다.<br>
#### ⊙ 모듈화에 필요한 exports
> <b>참고로 DAY3 에서 하는 방식은 common 방식이고 최근에는 EMA방식으로 많이 한다고 한다.</b><br>
> <b>ex)module.exports.lunch = lunch;</b><br>
> 이런식의 구문을 써주면 lunch 라는 이름으로 모듈을 생성한다.<br>
####  ⊙ 본인이 만든 모듈 사용법
> <b>ex)const {lunch} = require('./lunch');</b><br>
> 유의할 점은 앞에 "./"를 꼭 붙혀주는 것이다.<br>




## DAY 4 (DATE : 2020-08-13)
### ☆ 느낀 점
> 오늘은 드디어 그동안 배운 것을 토대로 <b>node</b>를 이용한 <b>사이트</b>를 만들었다.<br/>
> 엄청나게 많은 걸 하진 않았지만  <b>session</b>과 <b>sql</b>을 node에서 사용하는 방법을 배웠고 그것을 이용해 로그인을 하는 것까지 만들었다.<br/>
> php를 활용해서 사이트를 만들어 봐서 그런지 node에서 session하고 sql을 사용하는 방법만 익숙치 않았고 그 이후로는 쉬웠다.<br>
> 아직은 감이 덜 잡혀서 어렵지만 점점 아는 것이 생긴다는 느낌에 너무 기분이 좋았다.<br/>
> 더 열심히 해야겠다...<br/>
> 아 그리고 <b>주의할 점</b>이 있는데, 여기서 사용한 session 방식은 조금 구식인거고, <b>비동기식으로 (async)를 이용해서 할 session은 다른 모듈이 있다!</b> <br>
> ↓ node를 이용해 만든 회원가입창
>![111122](https://user-images.githubusercontent.com/58199479/90403518-0fc1af80-e0dc-11ea-8192-40a0e949f57f.PNG)

### ▶ session 사용
#### ⊙ express-session 미들웨어 셋팅 및 시작(sessionStart)
> <b>ex) app.use(session({<br>
    resave:false, //요청이 변경이 안되었어도 세션정보를 계속 저장할지 말지<br>
    saveUninitialized:false, //초기화되지 않은 세션들을 저장할 것인지<br>
    secret:cookieSecret //쿠키에 서명할 함호화 키<br>
}));</b><br>
### ▶ mysql 사용
#### ⊙ mysql, 내 DB사용하기
> <b>const connectionInfo = {<br>
    user:'내 아이디',<br>
    password :'내 패스워드',<br>
    host:'gondr.asuscomm.com'<br>
};<br>

const con = mysql.createConnection(connectionInfo);<br>
con.query('USE 내 아이디');<br></b>
> 이렇게 하면 내 DB를 사용하라는 구문이 된다! 
> DB커넥션 완료!



## DAY 5 (DATE : 2020-08-19)
### ☆ 느낀 점
> 오늘은 배운 node를 사용해 <b>API(나는 네아버 API를 가져다가 썼다)</b>와 <b>multer</b> 사용하는 것을 배우고 그것으로 <b>사이트</b>를 완성하였다.<br/>
> 또한 vue js에 대해서 배웠는데, <b>vue</b>에 대한 기본 문법과 <b>webpack</b>을 사용하여서 하나의 파일로 만드는 작업도 하였다.<br/>
> 이제 본격적으로 수업한 내용을 토대로 프로젝트를 진행하는데 매우 떨리는 심정이다. <br/>
> 나도 하나의 커뮤니티 사이트를 만들까 생각 중이다.<br/>
> vue는 오늘 처음 배웠는데 되게 신기하고 재미있는 언어 인 것 같다.<br/>
> 그냥 일반 스크립트에서는 절대로 쉽게 못하는 것들을 vue를 사용하면 정말 간단하고 쉽게 한다는 점이 매력적이었다.<br/>

### ▶ multer
#### ⊙ multer란?
> multer를 사용하면 <b>파알 업로드</b>를 쉽게 할 수 있다! 사실 이부분은 제대로 배운 것이 아닌 프로젝트를 위해 잠깐 파일 업로드 부분만 한 것이므로 자세하게는 모른다.<br>
> 참고자료 : https://www.zerocho.com/category/NodeJS/post/5950a6c4f7934c001894ea83<br>
> 추후에 더 공부해서 업데이트 해야겠다..<br>
### ▶ Vue
#### ⊙ Vue 란?
> vue는 <b>사용자 인터페이스를 위한 프레임워크</b>이다! <br>
> 확실히 vue를 이용해 만든 사이트와 그렇지 않은 사이트는 개발할때 쉽고 안쉽고의 차이가 있는 것 같다.<br>
#### ⊙ Vue 시작하기
> Vue를 시작하기 위해선 일단 vue를 깔거나 CDN으로 코드를 가져와야 한다.<br>
> 일단 나는 편의를 위해 초반에 CDN을 갖고 와서 한 html에다가 script까지 넣어서 시작했다.<br>
> ▽Vue를 알려주기 위해서는 일단 script에 이를 추가해야한다.<br>
> <b>new Vue({<br>
> el:" ",<br>
> data:{ },<br>
> methods : {}<br>
> }) </b><br>
> 등등... 이것 말고도 다양한 속성이 존재하나 이것들이 제일 기본적인 부분인 것 같다.<br><br>
> 우선 여기에 있는 기본적인 부분들에 대해서 자세히 보자면 <br>
 > <b>1. el</b> : " " → 이 속성 안에는 <b>html코드에서 사용자가 vue를 이용해 사용할 객체부분을 셀렉터로 가져오는 부분</b><br>
 > <b>2. data</b>: {} -> <b>vue에서 사용하는 데이터 값들(변수)</b>을 집어 넣는 공간이다.<br>
 > <b>3. methods </b>: {} -> <b>vue에서 이뤄지는 function들을 집어넣는다</b><br>

 #### ⊙ Vue 기본 문법
> 그렇다면 html태그에서 vue를 연동시키는 작업을 하는 것들을 알아보자!<br>
> 다양한 것들이 있지만 제일 간단하게 <b>v-model , v:on( @ ) , v:bind( : ) , v-for , v-if</b> 를 보자<br><br>
> <b>1.v-model</b> -> <b>양방향 통신</b>을 위한 것으로 <b>input 타입(사용자가 값을 입력하는) 에서만 사용이 가능</b>하다. 이를 사용하면 사용자가 입력한 값이 그대로 vue안에 데이터 변수에 값이 담긴다.<br><br>
> <b>2.v:on( @ )</b> -> 사용자가 v:on 뒤에 오는 이벤트를 일으켰을때 <b>이벤트 발생</b>을 처리하게 하는 부분이다. 예를 들어 <b>@click="a()" 이렇게 하면 (@는 축약 형태이다) 사용자가 클릭을 했을 때 a() methods를 실행하라는 의미</b>다. 이외에 <b>keyDown이나 이런 이벤트도 당연 가능</b>하다. <br><br>
> 참고로 <b>@keyup.13.exact="a()"</b>  여기서 <b>13번은 엔터 키</b>이고 <b>exact는 이것만. 정확하게, 라는 의미로 이게 없으면 엔터키와 다른 키를 함께 눌러도 전송이 된다면 exact 는 무조건 엔터키만 눌러야 실행이 되는 구조</b>이다. 이외에도 <b>a태그에 preventDefault()를 주고 싶을때 간단하게 @click.prevent</b> 만 주면 끝이다.<br>
> <b>※이벤트 수식어는 공식 문서에 https://kr.vuejs.org/v2/guide/events.html#%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EC%88%98%EC%8B%9D%EC%96%B4 이곳에 있다.</b><br>
> <b>3.v-bind(:) </b> -> <b>HTML 태그의 속성 값을 바인딩</b> 해줄때 사용하는 것이다! 예를 들어서 img 에 src=" " , class =" ", style=" " 등 이들의 값을 어떻게 넣어 주느냐의 문제인데, 이곳에 그냥 :src = "imgUrl" 이렇게 넣고 vue 의 data에 imgUrl을 설정해놓으면 가볍게 바인드가 되는 것이다!<br><br>
> <b>4.v-for</b> -> v-for는 말그대로 <b>for문을 도는 것</b>인데, 예를 들어 vue안에 list라는 속성에서 item을 뽑아와 html을 여러번 작성하는게 아닌 하나의 코드로 여러개의 카드들을 만들어 낼 수가 있다. <br><br>
> <b>5.v-if</b> -> 이 또한 말그대로 <b>if문을 도는 것</b>이다. <b>true이면 그 엘리먼트가 나오고 false이면 나오지 않는다.</b><br>

 #### ⊙ Vue의 생명주기(LIfe Cycle)
 >▽ 아래 사진이 <b>생명주기</b>이다<br>
 > ![lifecycle](https://user-images.githubusercontent.com/58199479/91042896-823b0e00-e64d-11ea-9040-0de62276cc99.png)
 >생명주기는 vue를 할때 <b>중요한 개념</b>이다.<br>
 >아직 제대로 공부하지 않은 부분이라 추후 다시 공부할 예정<br>
 
  #### ⊙ computed 속성
 > computed 속성은 <b>존재하지 않는 속성인데 가상으로 필요할때마다 돌려주는 속성</b>이 computed이다. <br>
 > computed의 경우 <b>참조하고 있는 값이 변경 될때마다 실행</b>을 시켜주므로 주로 좀 쓸데없는 상황에서도 돌아갈 수 있으니 그럴 땐 watch를 사용한다.<br>

### ▶ axios
#### ⊙ axios 란?
 > <b>node.js와 브라우저를 위한 http통신 javascript 라이브러리</b><br>
 > <b>Promise 기반의 HTTP 통신 라이브러리</b>이다.<br>
#### ⊙ axios 를 이용한 값 보내기와 값 받기
 > <b>ex)axios.get('/getData').then(res=>{<br>
                this.items = res.data;<br>
            });</b><br>
 > 위 코드는 get 방식으로 서버에 getData로 items속성에 받아온 값들을 저장해주는 코드이다<br><br>
 > 값을 보내기 위해서는<br>
 ><b>ex)axios.get('/getData',{id:this.id}).then(res=>{<br>
                this.items = res.data;<br>
            });</b><br>
  >위 코드처럼 주소 옆에 값을 같이 넣어 보내주면 된다!<br><br>
  > <b>post로 보낼 거면 똑같이 axios.post()</b>이렇게 써주면 된다.<br>
  

## DAY 6 (DATE : 2020-08-20)
### ☆ 느낀 점
> 어제 만든 vue를 조금 더 배웠고, webpack을 사용해서 문서를 하나로 통일 시키는 작업을 하였다.

### ▶ webpack
 #### ⊙ webpack이란? 사용해야하는 이유?
 > 코딩을 하다보면 굉장히 많은 문서들이 생기고 나중에는 결국 많은 문서들을 가지고 와서 코드가 지저분하게 보인다.<br>
 > 그런 많은 문서들을 하나의 문서로 만들어주는 것이 webpack이다.<br>
 > 솔직히 webpack은 나도 아직 어려워서 힘들긴하다 하하... 더 공부해야한다.<br>
  #### ⊙ webpack 사용을 위한 환경 설정
 > <b>㉠ 일단 webpack을 위해 깐 것들이다.<br>
 > 1.npm i --save-dev webpack webpack-cli<br>
 > 2.npm i --save-dev css-loader file-loader style-loader url-loader vue-loader vue-template-compiler<br>
 > 3.npm i --save vue axios<br>
 > 여기서 --save-dev는 개발자 용으로 깐 것들이다.<br><br>
 > ㉡ package.json 으로 들어가준다.<br>
 > webpack 사용을 위해 "scripts" 부분에 "dev":"webpack --mode=development", "prod" : "webpack --mode=production" 이 것들을 추가 시켜준다.<br>
 > 이것들을 실행 시키는 법은 npm run dev 나 npm run prod등 npm run [name] 을 주면 된다.<br><br>
 > ㉢ webpack.config.js를 만들어주고 그 안을 채운다<br>
 >  entry => 파일들을 묶을 공간을 설정 해주는 곳<br>
 >  output => 묶은 녀석들을 어떤 파일 이름으로 어떤 공간에 넣을 지.<br>
 >  module => 어떤 파일은 어떻게 동작하고 어떤 파일은 이렇게 동작하고..동작을 설정해주는 곳. 이 안에 rules 설정<br>
 >  resolve => 자주 사용하는 것들을 단축어로 만들어서 넣는 곳<br>
 >  plugins => 노드하는데 필요한 플러그인들을 집어 넣는 곳</b><br>
 ### ★ watch와 nodemon!
> index.js (서버쪽 js가 바뀌면 계속해서 node index.js로 실행 시켜주고 <br>
> webpack을 사용하면 또 npm run dev(package.json에다가 지정해논 사용자 임의 설정이름) 을 해줘야하고.,.귀찮으니<br>
> <b>watch를 이용하면 run dev가 알아서 실행</b>되고<br>
> <b>nodemon 을 이용하면 알아서 node index.js 를 실행</b>해준다!<br>



## DAY 7 (DATE : 2020-08-24)
### ☆ 느낀 점
> 오늘은 그동안 만든 vue들을 component 들로 만들어보고 webpack으로 문서를 깔끔하게 정리하는 것들을 배웠다.

### ▶ component
#### ⊙ componet란?
> 컴포넌트를 사용하면 계속해서 <b>사용했던 코드들의 재활용성을 높이고</b>, 보다 <b>효율성</b> 있고 <b>빠르게</b> <b>일괄적인 패턴</b>으로 코딩을 할 수 있다.<br>
> 사실 컴포넌트 부분은 배운게 많이 없어서 어떻게 채워야할 지ㅜ 모르겠다<br>
> ㅇ,ㅁ..... template...? 추후에 계속 채워나가야지..<br>


## DAY 8 (DATE : 2020-08-25)
### ☆ 느낀 점
> 오늘은 어제 만든 vueComponent를 활용해서 DB에 연동해서 리스트 뿌려주는 화면과 삭제, 글쓰기 컴포넌트까지 만들었다.<br>
> 솔직히 말해서 아직 component가 이해가 안된다.<br>
> 조금 어려운 개념이고 더 내가 공부해야할 부분이라고 생각한다...<br>
> 홧팅....!<br>
> 그리고 오후에는 그동안 배운 vue 기본 문법들로 복습 겸해서 여러가지 게임들을 만들어 보았다.<br>
> 그리고 무엇보다 computed 속성에 대해 더욱 더 심도 있게 배우게 되어서 좋았다.<br>

### ▶ component
#### ⊙ 
> 이 부분도 조금 더 배워서 채우겠다.. 
