//统一管理路由信息
const express = require('express');
const path = require('path');
const db = require(path.join(__dirname,'../common/self-operateData-Promise'));
const router = express.Router();

router.post('/login',(req,res) => {
    res.send('login');
});

//用户注册接口
router.post('/register',async (req,res) => {
    //获取前端传递过来的参数
    let param = req.body;
    //调用数据库相关的sql语句
    let sql = 'insert into user set ?';
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

router.get('/test', async (req,res) => {
    let sql = 'select * from user';
    let ret = await db.operateData(sql,null);
    res.json({
        status: 0,
        data: ret
    });
});

module.exports = router