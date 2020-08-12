const express = require('express');
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser')

//내가 만든건 무조건 ./를 쳐줘야함
const {lunch} = require('./lunch');

const app = express();
const server = http.createServer(app);

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

//바디 파서는 post로 넘어오는 정보를 json으로 넘겨주는 역할을 함
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json()); //express에서 post 전송을 위해 사용


app.get('/lunch',(req,res)=>{
    res.render('lunch');
});

app.post('/lunch',(req,res)=>{ //get은 req.query를 보면 된다.
    console.log(req.body);
    let date = req.body.date.split('-').join('');
    lunch(date).then(data=>{
        res.render('lunchresult',data);        
    });
});


server.listen(54000,()=>{
    console.log("서버 시작");
});