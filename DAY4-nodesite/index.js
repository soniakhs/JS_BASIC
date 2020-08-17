// npm i --save express ejs body-parser mysql express-session multer

// express-session = 세션을 익스프레스에서 사용가능하게 함
// multer = 파일 업로드 (인풋창으로 파일 업로드하면 알아서해줌)
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const {con,register} = require('./db/DB');

const server = http.createServer(app);

const session = require('express-session');
const cookieSecret = 'kibcs1212';


app.set('port', 54000);
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


//미들웨어 셋팅
app.use(session({
    resave:false, //요청이 변경이 안되었어도 세션정보를 계속 저장
    saveUninitialized:false, //초기화되지 않은 세션들을 저장할 것인지
    secret:cookieSecret //쿠키에 서명할 함호화 키
}));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use((req,res,next)=>{
    //next = 뒤로 보낼지 안보낼지임. next()를 호출하면 다음 줄을 실행.  호출안하면 여기서 코드가 끝남.
    if(req.session.flashMsg !== undefined){
        //모든 뷰에다가 정의를 하는 것.
        //locals는 ejs에서 사용할 수 있는 그런 공간임.
        res.locals.flash = req.session.flashMsg;
        delete req.session.flashMsg;
    }
    next();
});

//라우팅 작성
app.get('/',(req,res)=>{
    res.render('index');
});
app.get('/register',(req,res)=>{
    res.render('join');
});

app.post('/register',(req,res)=>{
    register(req,res,req.body);
});

server.listen(app.get('port'), ()=>{
    console.log(`Express 엔진이 ${app.get('port')}번 포트에서 실행중`);
});
