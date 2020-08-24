const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    entry:{
        //파일들을 이곳에 묶겠다
        app : path.join(__dirname,'src/app.js')
    },
    output:{
        //묶은 녀석들을 어디에다가 넣을 것인지
        filename : '[name].js',
        path:path.join(__dirname,'public')
    },
    module:{
        //어떤 파ㅏ일은 어떻게 동작하는지..동작하는 구문
        rules:[
            {
                test:/\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test:/\.vue$/,
                loader: 'vue-loader'
            }
        ]
    },
    resolve:{
        //단축어들을 만들어 넣는곳
        alias:{
            "vue$":"vue/dist/vue.esm.js",
            "@":path.join(__dirname,'src/')
        },
        extensions:['*','.js','.vue','.json']
    },
    plugins:[
        //노드하는데 필요한 플러그인 들을 집어넣는것
        new VueLoaderPlugin()
    ]
}