//文章管理接口
const express = require('express');
const path = require('path');
const db = require(path.join(__dirname,'../common/self-operateData-Promise'));
const router = express.Router();

//获取文章列表接口-----------------------------------------------------------
router.get('/list', async (req,res) => {
    let param = req.query;
    param.pagenum = parseInt(param.pagenum);
    param.pagesize = parseInt(param.pagesize);
    //动态拼接查询条件
    //param = {pagenum: 1,pagesize: 1,cate_id: 1,state: '草稿'}
    let condition = '';
    for(let key in param){
        if(key === 'cate_id' && param[key]){
            condition += key + '=' + param[key] + ' and ';
        }else if(key === 'state' && param[key]){
            condition += key + '= "' + param[key] + '" and';
        };
    };
    //去掉最后一个and
    //condition = condition.substring(0,condition.lastIndexOf('and'));1

    let sql = 'select * from article where is_delete = 0 limit ?, ?';
    let totalSql = 'select count(*) as total from article where is_delete = 0';
    if(condition){
        condition += ' is_delete = 0 ';
        sql = 'select * from article where '+ condition +' limit ?, ?';
        totalSql = 'select count(*) as total from article where ' + condition;
    };
    let ret = await db.operateData(sql,[param.pagesize*(param.pagenum-1),param.pagesize]);
    let countRet = await db.operateData(totalSql);
    if(ret && ret.length > 0){
        res.json({
            status: 0,
            message: '获取文章列表成功',
            data: ret,
            total: countRet[0].total
        });
    }else{
        res.json({
            status: 1,
            message: '获取文章列表失败'
        });
    };
});

//删除文章-----------------------------------------------------------------
router.get('/delete/:id', async (req,res) => {
    let id = req.params.id;
    let sql = 'update article set is_delete = 1 where id = ?';
    let ret = await db.operateData(sql,id);
    if(ret && ret.affectedRows > 0){
        res.json({
            status: 0,
            message: '删除成功'
        });
    }else{
        res.json({
            status: 1,
            message: '删除失败'
        });
    };
});

//发表文章------------------------------------------------------------------
router.post('/add', async (req,res) => {
    let param = req.body;
});

//根据id查询文章-----------------------------------------------------------
router.get('/:id', async (req,res) => {
    let id = req.params.id;
    let sql = 'select * from article where is_delete = 0 and id = ?';
    let ret = await db.operateData(sql,id);
    if(ret && ret.length > 0){
        res.json({
            status: 0,
            message: '查询成功',
            data: ret[0]
        });
    }else{
        res.json({
            status: 1,
            message: '查询失败'
        });
    };
});

//更新文章-----------------------------------------------------------------
router.post('/edit', async (req,res) => {
    let param = req.body;
});


module.exports = router