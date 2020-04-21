//定义接口执行什么方法操作
const mysql = require('mysql');
const dbConfig = require('../../database/db');
const sqlMap = require('../../sqlMap');
const pool = mysql.createPool({
  host: dbConfig.mysqlConfig.host,
  user: dbConfig.mysqlConfig.user,
  password: dbConfig.mysqlConfig.password,
  database: dbConfig.mysqlConfig.database,
  port: dbConfig.mysqlConfig.port,
  multipleStatements: true    // 多语句查询
});
module.exports = {
  getNotice(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.announcement.getNotice;
      connection.query(sql, [], (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
        connection.release();
      })
    })
  },
  submitNotice(req, res, next) {
    let addNotice = req.body;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.announcement.submitNotice;
      connection.query(sql, [addNotice.emp_id,addNotice.time,addNotice.text,addNotice.type,addNotice.title], (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
        connection.release();
      })
    })
  }
}
