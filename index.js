//1.导入模块
const express = require('express');
//2.创建服务器
const app = express();
//3.开启服务器
app.listen(8888,() => {
    console.log('running');
});
//4.处理请求
app.get('/data',(req,res) => {
    res.send('hello');
});