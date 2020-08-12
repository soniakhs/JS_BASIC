//node 를 이용한 서버 구동
const http = require('http');
const fs = require('fs');
const server = http.createServer((req,res)=>{
    fs.readFile('index.html','utf-8',(err,data)=>{
        console.log(req);
        //200 => 상태코드, 404같은 코드임,200이 나오면 정상적으로 보내고 있다고 하는것.
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end(data);
    })
    //end = 이 값을 보내고 끝내
    //npm init -y 를 하면 package.json 이 나옴. 그후 npm install --save express하면 설치완료
    
    //node 저장소 = mvn repository
    //express

});


//addEventListener 랑 같은 아이, request요청을 받으면 이걸 해라 라는 의미!
server.on('request',e=>{
    console.log("클라이언트가 연결을 요청하였습니다");

});

//서버를 구동하는거임 54000번 포트를 구동시작해! 라는 메서드임.
server.listen(55000,()=>{
    console.log("서버가 55000번 포트에서 구동을 시작했습니다.");
});