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


function query(sql,data){
    return new Promise((res,rej)=>{
        con.query(sql,data,(err,result)=>{
            if(err) rej(err);
            else res(result);
        });
    });
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

module.exports.register = register;
module.exports.con = con;