const express = require('express');
const http = require('http');
const path = require('path');
const socket = require('socket.io');

const app =  express();
const server = http.createServer(app);
const io = socket(server);

app.set('views', path.join(__dirname, 'views'));
//views 라는 값을 현재 실행되는 폴더 밑에 views폴더로 지정한다.
app.set('view engine', 'ejs');
// ejs로 뷰엔진을 지정한다.
app.use(express.static(path.join(__dirname, 'public')));
// 퍼블릭 폴더를 정적폴더로 지정한다.

app.get('/chat', (req, res)=>{
    res.render('chat');
});

app.get('/hello', (req, res)=>{
    res.render('hello', {msg:'Hello world'});
});

app.get('/world', (req, res)=>{
    res.render('world', {gondr:'안녕하세요'});
});




//소켓 규칙
let userList = [];
io.on('connect', (socket) => {
    console.log(socket.id + "이 접속했습니다.");

    socket.on('login',data=>{
        userList.push({id:socket.id,nickname:data});
        socket.emit('login-ok',{id:socket.id,nickname:data});
        io.emit('user-list',userList);

    });

    //엔터키 13번
    socket.on('disconnect',()=>{
        console.log(socket.id + "가 접속을 종료했습니다.");
        let idx = userList.findIndex(x=>x.id == socket.id); 
        io.emit('user-list',userList);
        userList.splice(idx,1);
    });

    socket.on('chat message',data=>{
        let userData = userList.find(x=>x.id == socket.id);

        io.emit('receive',{user:socket.id,msg:`${userData.nickname} : ${data}`});

    });
}); //io에 on에는 들어오는 이벤트의 종류와 해당 이벤트를 처리할 핸들러가 작성되면 됩니다.

server.listen(54000, ()=>{
    console.log("서버가 54000포트에서 구동중입니다.");
});


/*
    노드는 서버에서 돌아가는 또는 브라우저 밖에서 돌아가는 Javascript엔진
    node 자바스크립트 파일 
    여러가지 모듈을 조립해서 썼어. (fs - 파일읽고쓰고, http - 웹모듈)
    간단한 파일 웹서버 -> index.html
    npm을 이용해서 모듈을 다운받았어(express 라는 모듈)

    app을 만들어서 썼었고
    app에서 public폴더에 static resource  (.html, .js, .css)
    ejs (pug )  
    <%= %>

    app.post
*/