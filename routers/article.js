//文章管理接口
const express = require('express');
const path = require('path');
const db = require(path.join(__dirname,'../common/self-operateData-Promise'));
const router = express.Router();

//获取文章列表接口-----------------------------------------------------------
router.get('/cates', async (req,res) => {
    let sql = 'select * from article';
    let ret = await db.operateData(sql,null);
    if(ret && ret.length > 0){
        res.json({
            status: 0,
            message: '获取文章列表成功',
            data: ret
        });
    }else{
        res.json({
            status: 1,
            message: '获取文章列表失败'
        });
    };
});


module.exports = router