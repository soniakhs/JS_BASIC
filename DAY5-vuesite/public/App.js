window.onload=()=>{
    new Vue({
        el: "#app",
        data:{
            items:[],
            colors:["#ff0000","#ff0f0f","#00fff0"],
            idx:0,
            colorSet:''
        },
        beforeMount(){
            axios.get('/getData').then(res=>{
                this.items = res.data;
            });
            // let req = new XMLHttpRequest(); //ajax요청
            // req.addEventListener("readystatechange",()=>{
            //     if(req.readyState === XMLHttpRequest.DONE){
            //         this.items = JSON.parse(req.responseText);
            //     }
            // });

            // req.open('get','/getData');
            // req.send();
        },
        mounted(){
            setInterval(() => {
                this.colorSet = `background-color:${this.colors[this.idx]}`;
                this.idx = (this.idx+1) % this.colors.length;
            }, 1000);
        }
    });
}