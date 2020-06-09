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
  getSal(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.mysal.getMySal;
      connection.query(sql, [req.body.emp_id], (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
        connection.release();
      })
    })
  },
  getEmpSal(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.mysal.getsal;
      connection.query(sql, [req.body.emp_id,req.body.s_time], (err, result) => {
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
