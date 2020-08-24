// npm i --save-dev webpack webpack-cli
//npm i --save-dev css-loader file-loader style-loader url-loader vue-loader vue-template-compiler
//npm i --save vue axios
const express = require('express');
const http = require('http');
const path = require('path');

const {list} = require('./DB/db');

const app = express();
const server = http.createServer(app);

app.set('port', 54000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>{
    res.render('index');
});

app.get('/getData',(req,res)=>{
    list(req,res);
});

app.get('/props',(req,res)=>{
    res.render('props');
})

server.listen(app.get('port'),()=>{
    console.log("54000번 포트에서 서버 구동");
});