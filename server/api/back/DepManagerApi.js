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

  getDj(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.depManager.getDj;
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
  addJob(req, res, next) {
    let dep_name = req.body.dep_name ;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.depManager.addJob;
      connection.query(sql, [req.body.job_name,req.body.dep_id,req.body.bas_salary,req.body.job_id], (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
        connection.release();
      })
    })
  },
  addDep(req, res, next) {
    let dep_name = req.body.dep_name ;
    pool.getConnection((err, connection) => {
      var sql = sqlMap.depManager.addDep;
      connection.query(sql, [dep_name,req.body.dep_id], (err, result) => {
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
