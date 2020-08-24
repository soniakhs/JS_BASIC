const mysql = require('mysql');

const info ={
    user : 'kibcs1212',
    password:'12345678',
    host:'gondr.asuscomm.com',
    database : 'kibcs1212'
};

const con = mysql.createConnection(info);

function query(sql,data){
    return new Promise((res,rej)=>{
        con.query(sql,data,(err,result)=>{
            if(err) rej(err)
            else res(result)
        })
    })
}

module.exports.con = con;
module.exports.query = query;