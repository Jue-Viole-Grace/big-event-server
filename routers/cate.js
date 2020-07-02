//文章分类接口
const express = require('express');
const path = require('path');
const db = require(path.join(__dirname,'../common/self-operateData-Promise'));
const router = express.Router();

//获取文章分类
router.get('/cates', async (req,res) => {
    res.send('cates');
});

//添加文章分类
router.get('/addcates', async (req,res) => {
    res.send('addcates');
});

//删除文章分类
router.get('/deletecate/:id', async (req,res) => {
    res.send('delete');
});

//
router.get('/cates/:id', async (req,res) => {
    res.send('delete');
});

//更新文章分类
router.get('/updatecate', async (req,res) => {
    res.send('update');
});


module.exports = router