# INTRODUCTION
> node.js 에 관해 새롭게 알게된 공부 내용을 작성하는 공간이다.<br/>
> node.js에 대한 API 문서 공간=> https://nodejs.org/api/fs.html <br/>
> express API 문서 공간 => https://expressjs.com/ko/api.html<br/>
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
> 그외에도 JS의 <b>비동기식</b>에 대해 배웠다.
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
#### ⊙ socket.io 선언
> 비동기식에 대한 내용은 굉장히 짧게 배워서 아직은 잘 모르겠으나 쉽게 보자면 자바스크립트의 경우 setTimeout()함수를 사용하였을 때<br>
> <b>JAVA</b>처럼 순차적으로 처리를 하지 못하고 모든 구문이 끝나고나서 setTimeout()함수가 호출되기 때문에 그 점을 해결하기 위해서 사용하는 것이다.<br/>
> 이런 것을 사용하는 이유는 단 한가지. 굉장한 지옥에 빠지게 될 수도 있기 때문이다...<br/>
