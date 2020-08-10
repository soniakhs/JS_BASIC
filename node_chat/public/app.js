window.onload = ()=>{
    let socket = io(); //서버에 소켓으로 연결. 자동으로 들어옴
    //io함수는 socket.io/socket.io.js에 들어있음.

    const msg = document.querySelector("#msg");  //채팅 메시지 박스
    
    msg.addEventListener("keydown",e=>{
        if(e.keyCode == 13){
            document.querySelector("#btnSend").click();
        }
    });

    document.querySelector("#btnSend").addEventListener("click", e => {
        if(msg.value != ""){
            //emit == 생성, 신호기같은거.
            //emit하면 서버로 (소켓)에다가 메시지를 보내는것. 
            //행동구호라고 생각하면됨.
            socket.emit('chat message',msg.value);

            //서버로 char message 라는 이벤트를 보내고 해당 이벤트에 사용자가 입력한 값을 보낸다.
            msg.value ="";
        }
    });
    
    const msgBox = document.querySelector("#msgBox");
    socket.on('receive',data=>{
        let msg = document.createElement('div');
        msg.classList.add("msg");
        msg.innerHTML = data.msg;
        if(data.user == socket.id){
            msg.classList.add("my");
            let idx= data.msg.indexOf(":");
            msg.innerHTML = data.msg.substring(idx+1);
        }

        msgBox.appendChild(msg);
    });
    const nick = document.querySelector("#nickname");
    document.querySelector("#btnRegister").addEventListener("click",e=>{
        if(nick.value!=""){
            socket.emit('login',nick.value);
        }
    });
    const popup = document.querySelector("#popup");
    socket.on("login-ok",data=>{
        popup.remove();
    });
    let userList = [];
    const user = document.querySelector("#user");
    socket.on("user-list",data=>{
        user.innerHTML = "";
        data.forEach(u => {
            let div = document.createElement("div");
            div.classList.add("user");
            div.innerHTML = u.nickname;
            if(u.id == socket.id){
                div.classList.add("my");
            }
            user.appendChild(div);
        });
    });
}