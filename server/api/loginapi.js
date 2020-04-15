//定义接口执行什么方法操作
const mysql = require('mysql');
const dbConfig = require('../database/db');
const sqlMap = require('../sqlMap');
const pool = mysql.createPool({
  host: dbConfig.mysqlConfig.host,
  user: dbConfig.mysqlConfig.user,
  password: dbConfig.mysqlConfig.password,
  database: dbConfig.mysqlConfig.database,
  port: dbConfig.mysqlConfig.port,
  multipleStatements: true    // 多语句查询
});
module.exports = {
  getPasswd(req, res, next) {
    let id = req.body.a;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.login.select;
      connection.query(sql, [id], (err, result) => {
        if (err) {
          console.log("到底有没输出")
          res.json({'status':504,'message':'不存在','data':err})
        } else {
          res.json(result)
        }
        connection.release();
      })
    })
  }
}
