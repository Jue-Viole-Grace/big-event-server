//1.导入模块
const express = require('express');
const cors = require('cors');
//2.创建服务器
const app = express();

//post请求参数处理
// for parsing application/json
app.use(express.json());
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//解决跨域
app.use(cors());

//3.开启服务器
app.listen(8888,() => {
    console.log('running');
});
//4.处理请求
app.get('/data',(req,res) => {
    res.send('hello');
});