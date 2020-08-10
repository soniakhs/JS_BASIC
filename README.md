# INTRODUCTION
> node.js 에 관해 새롭게 알게된 공부 내용을 작성하는 공간이다.<br/>
> node.js에 대한 API 문서 공간=> https://nodejs.org/api/fs.html <br/>
> express API 문서 공간 => https://expressjs.com/ko/api.html<br/>
## DAY 1 (DATE : 2020-08-07)
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
#### 요청에 대한 응답
> <b>app.get();</b><br/>
> <b>ex)app.get('/world', function (req, res) {res.send('hello world')})</b><br/>
> localhost:55000/world 로 요청을 넣으면 응답으로 hello world를 찍어주는 역할
#### 값 지정
> <b>app.set();</b><br/>
> <b>ex) app.set('view engine','ejs');</b><br/>
> view 엔진을 ejs로 지정해주는 구문
#### 디렉토리를 언어에 따라(리눅스) 찾아가는 방법을 자동으로 달리해주는 path.join()
> <b>ex) path.join('all','right');</b><br/>
> 이렇게 하면 사실상 let path = 'all/right'; 과 다른건 없지만 리눅스의 경우 디렉토리를 찾아갈때 (\)를 <br/>
> 쓰기 때문에 그에 따라 <b>자동</b>으로 달리해준다.
#### 정적인 파일을 서비스해주는 static 선언 !
> <b>ex) express.static(path.join('all','public'));</b><br/>
> <b>all/public</b> 파일안에 있는 것들은 모두 다 <br>static</br> 선언이 된다!<br/>
> <b>정적인 파일(img,css등)</b>을 서비스해주어서 나오지 않던게 나오게 된다.<br/>
> 정적인 파일들을 요청하면 public 파일에서 찾는것 !
### ★ webpack 에 대한 정의!
> 여러개의 파일들을 하나로 묶어 모듈화 시켜준다!<br/>
> 코드 또한 난독화시켜서 해킹에 대해 예방도 가능하다.
### ★ npm을 활용한 모듈 다운
> npm init -y => package.json 생성<br/>
> express 다운 : npm install --save express<br/>
> ejs 다운 : npm install --java ejs
### ☆ 느낀 점
> 첫 수업이었는데 개인적으로 한번에 많은 내용을 공부하다보니 이해가 안되는 것도 있었다.<br/>
> 그러나 개인적으로 되게 재밌게 수업했고, 뭔가 진짜로 웹서버에 대해 공부하는 느낌이라서 재밌었다.<br/>
> 아직은 너무.. 부족한게 많고... 계속 하고 있는 수업을 그냥 뒤처지지만 않고 잘만 해갔으면 좋겠다.<br/>

