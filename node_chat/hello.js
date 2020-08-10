const fs = require('fs');
// require == 모듈을 가져오는거임

// fs.readFile('data.txt', 'utf-8', (err,data) =>{
//     console.log(data);
// });

let str = `Hello World`;
fs.writeFile('data.txt', str, (err)=>{
    if(err) console.log(err);
    console.log("기록완료");
});