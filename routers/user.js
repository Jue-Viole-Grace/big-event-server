//用户 /my 相关接口

const express = require('express');
const path = require('path');
const utils = require('utility');
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

//更改用户信息接口------------------------------------------------------------
router.post('/userinfo', async (req,res) => {
    //获取请求参数
    let param = req.body;
    let sql = 'update user set ? where id = ?';
    let ret = await db.operateData(sql,[{nickname: param.nickname,email: param.email},param.id]);
    if(ret && ret.affectedRows > 0){
        res.json({
            status: 0,
            message: '修改用户信息成功'
        });
    }else{
        res.json({
            status: 1,
            message: '修改用户信息失败'
        });
    };
});

//更改用户密码接口------------------------------------------------------------
router.post('/updatepwd', async (req,res) => {
    //获取请求参数
    let param = req.body;
    //新旧密码加密
    param.oldPwd = utils.md5(param.oldPwd);
    param.newPwd = utils.md5(param.newPwd);
    //获取用户id
    let id = req.user.id;
    let sql = 'update user set password = ? where id = ? and password = ?';
    let ret = await db.operateData(sql,[param.newPwd,id,param.oldPwd]);
    if(ret && ret.affectedRows > 0){
        res.json({
            status: 0,
            message: '修改密码成功'
        });
    }else{
        res.json({
            status: 1,
            message: '修改密码失败'
        });
    };
});

//更新用户头像接口------------------------------------------------------------
router.post('/update/avatar', async (req,res) => {
    //获取请求参数
    let param = req.body;
    let id = req.user.id;
    let sql = 'update user set user_pic = ? where id = ?';
    let ret = await db.operateData(sql,[param.avatar,id]);
    if(ret && ret.affectedRows > 0){
        res.json({
            status: 0,
            message: '更新头像成功'
        });
    }else{
        res.json({
            status: 1,
            message: '更新头像失败'
        });
    };
});



module.exports = router