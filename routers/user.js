//统一管理路由信息
const express = require('express');
const path = require('path');
const db = require(path.join(__dirname,'../common/self-operateData-Promise'));
const router = express.Router();

//路由配置

//使用postman测试接口时需要在header里携带 Authorization: token
//获取用户信息接口--------------------------------------------------------
router.get('/userinfo', async (req,res) => {
    let param = req.user;
    let sql = 'select id,username,nickname,email,user_pic from user where id = ?';
    let ret = await db.operateData(sql,param.id);
    if(ret && ret.length > 0){
        res.json({
            status: 0,
            message: '获取信息成功',
            data: ret[0]
        });
    }else{
        res.json({
            status: 1,
            message: '获取信息失败'
        });
    };
});

//更新用户信息------------------------------------------------------------
router.post('/userinfo', (req,res) => {
    res.send('update userinfo');
});

//更新用户密码------------------------------------------------------------
router.post('/updatepwd', (req,res) => {
    res.send('pwd');
});

//更新用户头像------------------------------------------------------------
router.post('/update/avatar', (req,res) => {
    res.send('pic');
});



module.exports = router