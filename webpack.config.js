const path = require('path')
const webpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')  
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //추가 1111


module.exports = {  //module.exports부터 쓰기 ! 
    name:'firstWebpack', //webpack의 이름  
    mode:'development', //어떤 용도로 개발
    devtool:'eval',   // eval -> 개발용 , hidden-source-map -> 배포용 

    resolve:{
        extensions:['.js', '.jsx']
    },

    entry:{
        app:['./index.jsx']
    },

    module:{
        rules:[{
            test:/\.jsx?$/,  //확장자 .js .jsx 가능하게
            loader:'babel-loader', // webpack - babel 이해해주는 아이
            options:{
                presets:[
                    ['@babel/preset-env', {
                        targets:{
                            browsers:['>5% in KR','last 2 chrome versions']
                        },
                        debug:true,
                    }], 
                    '@babel/preset-react'
                ],
                plugins:[
                    'react-refresh/babel'
                ]
            }
        },{
            test:/\.css$/, 
            use:[MiniCssExtractPlugin.loader,'css-loader']  /////  수정    11111
        }]
    },


    plugins:[
        new webpackPlugin(),
        new webpack.LoaderOptionsPlugin({debug:true}),
        //() 매서드 실행시켜주기 
        // app.css 파일 명으로 만들어서 하나로 묶어 주겠다. 
        new MiniCssExtractPlugin({filename:'app.css'}) /////     수정 222
        // 그럼 아래에 output 경로로 css 가 생긴다. 
    ],

    output:{
        path:path.join(__dirname,'dist'),
        filename:'app.js', 
        //정적 파일로 바꾼다. 
        publicPath:'/dist'
    },

    // 실행할 때 
    devServer:{
        publicPath:'/dist',
        hot:true, 
    }
}