/**
* @description: 操作数据库函数封装promise版
* @param {type}: 参数 SQL语句
*/

function operateData (sql,param) {
    return new Promise((resolve,reject) => {
        //1 导入mysql
        const mysql = require('mysql');
        //2 创建一个到数据库的链接
        const link = mysql.createConnection({
            host: 'localhost',//IP地址或者域名,默认端口3306
            database: 'big-event-api',
            user: 'root',
            password: 'admin123'
        });
        //3 执行链接操作
        link.connect();
        //4 此时可以对数据库进行操作
        link.query(sql,param,(err, results) => {
            if(err){
                reject(err);
            }else{
                resolve(results);
            };
        });
        //5 关闭链接
        link.end();
    });
};

//导出这个模块
module.exports = {
    operateData
};