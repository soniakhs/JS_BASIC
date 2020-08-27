const express = require('express');
const http = require('http');
const path = require('path');

const app = new express();
const server = http.createServer(app);
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieSecret = "kibcs1212";

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
    resave : false,
    saveUninitialized:false,
    secret:cookieSecret
}));


const {query} = require('./DB');

app.get('/', (req, res) => {
    res.render('main');
}); 

app.get('/api/todo', async (req, res)=> {
    if(req.session.user === undefined){
        res.json([]);    
        return;
    }

    let {id} = req.session.user;
    
    list = await query("SELECT * FROM todos WHERE owner=? ORDER BY id DESC", [id]);
    
    console.log(id);
    res.json(list);
});

app.post('/todoWrite', async(req,res)=>{
    if(req.session.user === undefined){
        res.json({msg:'권한 없음', success:false});
        return;
    }
    let {title,content,date,id} = req.body;
    let owner = req.session.user.id;
    try {
        if(id===undefined){
            console.log(id);
            await query("INSERT INTO todos (title,content,date,owner) VALUES (?,?,?,?)",[title,content,date,owner]);
             res.json({msg:'글쓰기 완료 ', success:true });
        }else{
            await query("UPDATE todos SET title= ?, content=?,date=? WHERE id=?",[title,content,date,id]);
             res.json({msg:'글업데이트 완료 완료 ', success:true });
        }
    } catch (err) {
        console.log(err);
        res.json({msg:'글쓰기 오류 ', success:false});
    }  
});

app.delete('/api/todo',async(req,res)=>{
    let id = req.query.id;
    try {
        await query("DELETE FROM todos WHERE id = ?",[id]);
        res.json({msg:'삭제완료',success:true, id:id});
    } catch (err) {
        console.log(err);
        res.json({msg:'글쓰기 오류 ', success:false});
    }  
});

app.get('/api/todo/view',async(req,res)=>{
    let id = req.query.id;
    try {
        let data = await query("SELECT * FROM todos WHERE id=?",[id]);
        res.json({msg:'성공적으로 글을 가져왔습니다.',success:true,todo:data[0]}); 
    } catch (error) {
       console.log(error);
    //    res.status(500).json({msg:'오류발생'});
       res.json({msg:'글 보기 오류 발생',success:false}); 
    }
});

app.post('/api/user',async(req,res)=>{
    const {id,password} = req.body;
    let result = await query("SELECT * FROM users WHERE id=? AND password= PASSWORD(?)",[id,password]);
    if(result.length ==0){
        res.json({msg:'로그인 정보가 바르지 않습니다.',success:false});
    }else{
        req.session.user = result[0];
        res.json({msg:'로그인 성공',success:true,user:result[0]});
    }
});

app.get('/api/user',(req,res)=>{
    if(req.session.user !== undefined){
        res.json({success:true,user:req.session.user});
    }else{
        res.json({success:false});
    }
});

app.delete('/api/user',(req,res)=>{
    if(req.session.user !== undefined){
        req.session.user =  undefined;
    }
    res.json({success:true, msg:'로그아웃되었습니다'});
})

app.get('/*',(req,res)=>{
    res.render('main');
});


server.listen(54000, ()=>{
    console.log("서버가 54000포트에서 구동중입니다.");
});