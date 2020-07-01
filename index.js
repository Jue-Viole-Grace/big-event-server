//1.导入模块
const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('express-jwt');
const loginRouter = require(path.join(__dirname,'routers/login.js'));
const userRouter = require(path.join(__dirname,'routers/user.js'));
//2.创建服务器
const app = express();

//post请求参数处理
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//解决跨域
app.use(cors());

//通过中间件统一处理token
//unless排除一些不需要token解析的路径
//app.use(jwt({secret: 'big-event'}).unless({path:['/api/login','/api/register']}));

//设置路由
app.use('/api',loginRouter);
app.use('/my',userRouter);

//3.开启服务器
app.listen(8888,() => {
    console.log('running');
});

