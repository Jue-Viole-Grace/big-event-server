//1.导入模块
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('express-jwt');
const loginRouter = require(path.join(__dirname,'routers/login.js'));
const userRouter = require(path.join(__dirname,'routers/user.js'));
const cateRouter = require(path.join(__dirname,'routers/cate.js'));
const articleRouter = require(path.join(__dirname,'routers/article.js'));
//2.创建服务器
const app = express();

//启动静态资源服务，把上传的图片变成静态资源
app.use('/uploads',express.static('uploads'));

//post请求参数处理
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//解决跨域
app.use(cors());

//通过中间件统一处理(反解)token
//unless排除一些不需要token解析的路径
app.use(jwt({secret: 'big-event'}).unless({path:/^\/api/}));

//设置路由
app.use('/api',loginRouter);
app.use('/my',userRouter);
app.use('/my/article',cateRouter);
app.use('/my/article',articleRouter);

//统一处理不存在的路由
//app.all表示处理所有形式的请求
app.all('*', (req,res) => {
    res.status(404).json({
        status: 404,
        message: '请求的资源不存在'
    });
});

//异常信息处理中间件
app.use((err,req,res,next) => {
    if(err.status === 401){
        //token验证失败,status的参数401是http协议的状态码
        res.status(401).json({
            status: 401,
            message: err.message
        });
    }else{
        res.json({
            status: 500,
            message: '服务器错误' + err.message
        });
    };
});

//3.开启服务器
app.listen(8888,() => {
    console.log('running');
});

