//统一管理路由信息
const express = require('express');
const router = express.Router();

//路由配置

//获取用户信息接口--------------------------------------------------------
router.get('userinfo', (req,res) => {
    res.send('userinfo');
});

//更新用户信息------------------------------------------------------------
router.post('userinfo', (req,res) => {
    res.send('userinfo');
});

//更新用户密码------------------------------------------------------------
router.post('updatepwd', (req,res) => {
    res.send('userinfo');
});

//更新用户头像------------------------------------------------------------
router.post('update/avatar', (req,res) => {
    res.send('userinfo');
});



module.exports = router;