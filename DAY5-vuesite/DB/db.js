const mysql = require('mysql');

const connectionInfo = {
    user:'kibcs1212',
    password :'12345678',
    host:'gondr.asuscomm.com'
};
const con = mysql.createConnection(connectionInfo);
con.query('USE kibcs1212');

function query(sql,data){
    return new Promise((res,rej)=>{
        con.query(sql,data,(err,result)=>{
            if(err) rej(err);
            else res(result);
        });
    });
}


async function list(req,res){
    let sql = "SELECT * FROM items";
    try {
        let list = await query(sql,[]);
        res.json(list);
    } catch (err) {
        console.log(err);
        res.render('error',{title:'DB ERROR', msg:err.code});
        return;
    }
}

module.exports.list = list;

