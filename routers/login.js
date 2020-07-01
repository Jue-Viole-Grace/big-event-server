//统一管理路由信息
const express = require('express');
const path = require('path');
//导入密码加密包
const utils = require('utility');
const db = require(path.join(__dirname,'../common/self-operateData-Promise'));
const router = express.Router();

//用户登录接口 ------------------------------------------------------------
router.post('/login',async (req,res) => {
    //获取前端传递过来的参数
    let param = req.body;
    //密码加密,方便与数据库对比验证
    param.password = utils.md5(req.body.password);
    //根据用户名和密码查询数据
    let sql = 'select id from user where username = ? && password = ?';
    let ret = await db.operateData(sql,[param.username, param.password]);
    //查询操作ret是数组,增删改操作ret是对象
    if(ret && ret.length > 0){
        res.json({
            status: 0,
            message: '登录成功'
        });
    }else{
        res.json({
            status: 1,
            message: '登录失败'
        });
    };
});

/*登录流程: 
  1 客户端输入用户名和密码-->2 调用登录接口把信息传给服务器
  -->3 客户端收到用户名和密码与数据库里的进行比对,如果用户名密码正确,
  则生成一个token返回给客户端,如果用户名密码错误,则返回错误信息
  -->4 客户端收到token后需要缓存下来-->5 如果客户端调用别的接口需要携带该token
  -->6 服务器验证token是否合法,如果合法则返回正常数据,否则提示错误
*/

//用户注册接口 --------------------------------------------------------------
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

//测试接口 ---------------------------------------------------------------
router.get('/test', async (req,res) => {
    let sql = 'select * from user';
    let ret = await db.operateData(sql,null);
    res.json({
        status: 0,
        data: ret
    });
});

module.exports = router