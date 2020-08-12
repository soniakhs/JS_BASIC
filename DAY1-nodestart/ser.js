//node에서 express 를 가지고 와서 이용한 서버 구동

//npm install --java ejs
//꼭 알아야하는것 web pack! => 만든 웹페이지를 난독화 시켜서 사람들이 내가 만든 것을 못보게 만듬.
const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

//views라는 값을 현재 실행중인 디렉토리 밑에 views폴더로 지정한다.
//path.join => 
//ex) path.join(__dirname,'views') == let path = __dirname + "/views";
//인데 해주는 이유는 리눅스나 이런 언어에 따라 디렉토리 찾아가는 방법이 달라서 리눅스는 ('\') 이기 때문에.
//그래서 그거에 따라 달리 해주는게 path.join 임
app.set('views',path.join(__dirname,'views'));
//주로 사용 = ejs,pug 등등.
//ejs로 뷰 엔진을 지정한다.
app.set('view engine','ejs');


//동적으로 움직이기 위해서는 static을 선언해줘야햐ㅏㅁ
//정적인 파일 img나 script..등등 파일들있잖음 그런 정적인 파일을 다 'public'에 모아두라는갓
//그러면 서비스해줌
//이미지나css파일을 요청하면ㄹpublic에서 찾는 것임.
//app.use(express.static('public'));
//path.join 안에 있는 값 디렉토리에 static을 하라고 알려주는 것.
app.use(express.static(path.join(__dirname,'public')));

//render는 앞에 html 파일을 가지고 와서 뒤에 값을 보내는 역할을 함.
//ReactDOM.render(element, container[, callback])
//get 뒤에 '/world'  = url 주소, 클라이언트가 요청하는 값
//render 뒤에 element 는 world.ejs 파일을 찾으라는 의미
app.get('/world',(req,res)=>{
    res.render('world',{gondr:"안녕하세요"});
});

//localhost:54000/hello 로 접속
app.get('/hello',(req,res)=>{
    res.render('hello',{msg:'Hello wolrd'});
});

const server = http.createServer(app);
server.listen(54000, ()=>{
    console.log('서버가 54000포트에서 구동중입니다');
})