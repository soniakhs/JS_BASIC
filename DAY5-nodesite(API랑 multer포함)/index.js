// npm i --save express ejs body-parser mysql express-session multer

// express-session = 세션을 익스프레스에서 사용가능하게 함
// multer = 파일 업로드 (인풋창으로 파일 업로드하면 알아서해줌)
const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
        
const app = express();

const {con,register,login,writeBoard ,list,query} = require('./db/DB');


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
    if(req.session.user !== undefined){
        res.locals.user = req.session.user;
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

app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/login',(req,res)=>{
    login(req,res,req.body);
});

app.get('/logout',(req,res)=>{
    delete req.session.user;
    req.session.flashMsg = {type:'success',msg:'로그아웃 됨'};
    res.redirect('/');
});

app.get('/board',(req,res)=>{
    list(req,res);
});

app.get('/board/write', (req,res)=>{
    //로그인 체크 로직 필요
    res.render('board/write'); 
});

app.post('/board/write',(req,res)=>{
    writeBoard(req,res,req.body);
});

//이것도 한번 써보는 ㅈ다른방식
app.get('/board/view/:id',async(req,res)=>{
    let id = req.params.id;
    try {
        let result = await query("SELECT * FROM boards WHERE id=?",[id]);
        if(result.length == 1){
            res.render('board/view',{data:result[0]});
        }else{
            console.log(result);
            res.render('error',{title:'존재하지 않는 글',msg:'해당 글은 존재하지 않습니다.'});
        }
    } catch (err) {
        console.log(err);
        res.render('error',{title:'DB ERR',msg:err.code});
    }
});

app.get('/movie',(req,res)=>{
    if(req.query.word !== undefined){
        const client_id = 'jXo4LFaHBDG9h8eaa8WC';
        const client_secret = 'U9EBh0N_tu';

        let api_url = `https://openapi.naver.com/v1/search/shop.json?query=${encodeURI(req.query.word)}&display=100`; // json 결과
            //   var api_url = 'https://openapi.naver.com/v1/search/blog.xml?query=' + encodeURI(req.query.query); // xml 결과
        var options = {
            url: api_url,
            headers: { 'X-Naver-Client-Id': client_id, 'X-Naver-Client-Secret': client_secret }
        };

        // request.get("주소","옵션","콜백") || request.get(옵션","콜백")
        request.get(options,(error, response, body) => {
            if (!error && response.statusCode == 200) {
                let json = JSON.parse(body);
                //console.log(json.items);
               res.render('movie/search',{list:json.items});
            } else {
                console.log('error = ' + response.statusCode);
            }
        });

    }else{
        res.render('movie/search');
    }
    
});

const multer = require('multer');
const uploadFolder = multer({storage:multer.diskStorage({destination:(req,file,cb)=>{
                            cb(null,'upload/');
                },filename:(req,file,cb)=>{
                    cb(null,new Date().valueOf() + file.originalname);
                }}),limits:{fileSize: 5 * 1024 * 1024}}); // 5메가 제한으로 upload 폴더에 저장
app.get('/upload', (req,res)=>{
    res.render('movie/upload');
});;

//uploadFolder.single('img') = 하나의 폴더를 받는것. 여러개는 array 로 받아오면 됨
//'img'는 내가 준 name
app.post('/upload',uploadFolder.single('img'),(req,res)=>{
    console.log(req.file);
    res.redirect('index');
});

app.get('/movie/buy', (req,res)=>{
    console.log(req.query.price);
})

server.listen(app.get('port'), ()=>{
    console.log(`Express 엔진이 ${app.get('port')}번 포트에서 실행중`);
});
