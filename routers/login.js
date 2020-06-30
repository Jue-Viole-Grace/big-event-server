//统一管理路由信息
const express = require('express');
const path = require('path');
const db = require(path.join(__dirname,'../common/self-operateData-Promise'));
const router = express.Router();

router.post('/login',(req,res) => {
    res.send('login');
});

router.post('/register',(req,res) => {
    res.send('register');
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