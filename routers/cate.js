//文章分类接口
const express = require('express');
const path = require('path');
const db = require(path.join(__dirname,'../common/self-operateData-Promise'));
const router = express.Router();

//获取文章分类-----------------------------------------------------------
router.get('/cates', async (req,res) => {
    let sql = 'select * from category';
    let ret = await db.operateData(sql,null);
    if(ret && ret.length > 0){
        res.json({
            status: 0,
            message: '获取文章分类成功',
            data: ret
        });
    }else{
        res.json({
            status: 1,
            message: '获取文章分类失败'
        });
    };
});

//添加文章分类-----------------------------------------------------------
router.post('/addcates', async (req,res) => {
    //获取参数
    let param = req.body;
    let sql = 'insert into category set ?';
    let ret = await db.operateData(sql,param);
    if(ret && ret.affectedRows > 0){
        res.json({
            status: 0,
            message: '添加成功'
        });
    }else{
        res.json({
            status: 1,
            message: '添加失败'
        });
    };
});

//删除文章分类-----------------------------------------------------------
router.get('/deletecate/:id', async (req,res) => {
    let id = req.params.id;
    let sql = 'delete from category where id = ?';
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

//更新文章分类-------------------------------------------------------------
router.post('/updatecate', async (req,res) => {
    let param = req.body;
    let sql = 'update category set ? where id = ?';
    let ret = await db.operateData(sql,[{name: param.name,alias: param.alias},param.id]);
    if(ret && ret.affectedRows > 0){
        res.json({
            status: 0,
            message: '修改成功'
        });
    }else{
        res.json({
            status: 1,
            message: '修改失败'
        });
    };
});

//
router.get('/cates/:id', async (req,res) => {
    res.send('delete');
});


module.exports = router