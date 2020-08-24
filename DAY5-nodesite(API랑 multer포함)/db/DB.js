// mysql 시작
const mysql = require('mysql');

const connectionInfo = {
    user:'kibcs1212',
    password :'12345678',
    host:'gondr.asuscomm.com'
};

const con = mysql.createConnection(connectionInfo);
con.query('USE kibcs1212'); //kibcs1212 데이터 베이스를 사용하라는 뜻.
// mysql 끝
const {Pager} = require('./Paser');

function query(sql,data){
    return new Promise((res,rej)=>{
        con.query(sql,data,(err,result)=>{
            if(err) rej(err);
            else res(result);
        });
    });
}

async function login(req,res,{uid,upw}){
    if(uid.trim() === "" || upw.trim() === ""){
        req.session.flashMsg = {type:'danger', msg:'필숫값을 작성하세요.'};
        res.redirect('back'); 
        return;
    }
    let sql = "SELECT * FROM users WHERE id=? AND password = PASSWORD(?)";
    try{
        let result = await query(sql,[uid,upw]);
        if(result.length == 1){
            req.session.user = result[0];
            req.session.flashMsg = {type:'success',msg:'로그인 성공'};
            res.redirect('/');
        }else{
            req.session.flashMsg = {type :'warning',msg:'아이디 또는 비밀번호가 올바르지 않습니다.'};
            res.redirect('back');
        }
    }catch(err){
        res.render('error',{title:"데이터베이스 에러",msg:err.code});
        return;
    }
    
}

async function writeBoard(req,res,{title,content}){
    if(title.trim() === "" || content.trim() === ""){
        req.session.flashMsg = {type:'danger',msg:'필숫값이 누락되었습니다.'};
        res.redirect('back');
        return;
    }
    let sql = "INSERT INTO boards(title,content,writer) VALUES(?,?,?)";
    try {
        let result = await query(sql,[title,content , req.session.user.id]);

        if(result.affectedRows == 1){
            req.session.flashMsg = {type:'success',msg:'성공적으로 글이 작성되었습니다'};
            res.redirect('/board');
        }else{
            req.session.flashMsg = {type:'warning', msg:'글 작성 실패'};
            req.redirect('back');
        }
        return;
    } catch (err) {
        console.log(err);
        res.render('error',{title:'DB ERROR', msg:err.code});
        return;
    }
}


async function register(req,res,{uid,uname,upw,upwc}){
    if(uid.trim() === ""|| uname.trim() === "" || upw.trim() ==="" || upwc.trim() === ""){
        req.session.flashMsg = {type:'danger', msg:'필숫값을 작성하세요.'};
        res.redirect('back'); 
        return;
    }

    if(upw !== upwc){
        req.session.flashMsg = {type:'warning', msg:'비밀번호와 비밀번호 확인이 다릅니다.'};
        res.redirect('back'); //back = 예약어 ,이전의 주소로 이동하는 것임/
        return;
    }
    try {
        let sql = "SELECT * FROM users WHERE id = ?";
        result = await query(sql,[uid]);
        if(result.length > 0){
            req.session.flashMsg = {type:'danger', msg:'이미 존재하는 회원입니다.'};
            res.redirect('back'); //back = 예약어 ,이전의 주소로 이동하는 것임/
            return;
        }
        sql = "INSERT INTO users (id,name,password) VALUES (?,?,PASSWORD(?))";
        result = await query(sql,[uid,uname,upw]);
        req.session.flashMsg = {type:'success', msg:'성공적으로 회원가입되었습니다.'};
        res.redirect('/');
    } catch (err) {
        res.render('error',{title:"데이터베이스 에러",msg:err.code});
        return;   
    }
}

async function list(req,res){
    // http://localhost:54000/board?page=1  이런식으로 접근이 가능.
    let page = req.query.page;
    if(page === undefined || page < 1 || isNaN(page)){
        page = 1;
    }

    let sql = "SELECT * FROM boards ORDER BY id DESC LIMIT ?, 10";

    let result = await query("SELECT COUNT(*) as cnt FROM boards",[]);
    let cnt = result[0].cnt;
    let pager = Pager(page,cnt);
    try {
        let list = await query(sql,[(page-1)*10]);
        res.render('board/list',{list,pager});
    } catch (err) {
        console.log(err);
        res.render('error',{title:'DB ERROR', msg:err.code});
        return;
    }
}

module.exports.list = list;
module.exports.writeBoard = writeBoard;
module.exports.login = login;
module.exports.register = register;
module.exports.query = query;
module.exports.con = con;