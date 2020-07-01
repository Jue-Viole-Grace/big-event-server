//统一管理路由信息
const express = require('express');
const path = require('path');
//导入密码加密包
const utils = require('utility');
const db = require(path.join(__dirname,'../common/self-operateData-Promise'));
const router = express.Router();

//用户登录接口
router.post('/login',(req,res) => {
    res.send('login');
});

//用户注册接口
router.post('/register',async (req,res) => {
    //获取前端传递过来的参数
    let param = req.body;
    //对客户端传递过来的密码加密后进行数据库的插入
    param.password = utils.md5(req.body.password);
    //调用数据库相关的sql语句
    let sql = 'insert into user set ?';
    //ret为数据库操作的结果，如果操作成功则是一个对象
    let ret = await db.operateData(sql,param);
    if(ret && ret.affectedRows > 0){
        res.json({
            status: 0,
            message: '注册成功'
        });
    }else{
        res.json({
            status: 1,
            message: '注册失败'
        });
    };
});

//测试接口
router.get('/test', async (req,res) => {
    let sql = 'select * from user';
    let ret = await db.operateData(sql,null);
    res.json({
        status: 0,
        data: ret
    });
});

module.exports = router