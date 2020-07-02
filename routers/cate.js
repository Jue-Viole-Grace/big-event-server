//文章分类接口
const express = require('express');
const path = require('path');
const db = require(path.join(__dirname,'../common/self-operateData-Promise'));
const router = express.Router();

router.get('/cates', async (req,res) => {
    res.send('cates');
});

router.get('/addcates', async (req,res) => {
    res.send('addcates');
});

router.get('/deletecate/:id', async (req,res) => {
    res.send('delete');
});

router.get('/cates/:id', async (req,res) => {
    res.send('delete');
});

router.get('/updatecate', async (req,res) => {
    res.send('delete');
});


module.exports = router