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
  getDep(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.depSal.getDep;
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
  getFivet(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.depSal.getFivet;
      connection.query(sql, [req.body.salTime], (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
        connection.release();
      })
    })
  },
  getOne(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.depSal.getOne;
      connection.query(sql, [req.body.salTime], (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
        connection.release();
      })
    })
  },
  getOnet(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.depSal.getOnet;
      connection.query(sql, [req.body.salTime], (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
        connection.release();
      })
    })
  },
  getTwo(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.depSal.getTwo;
      connection.query(sql, [req.body.salTime], (err, result) => {
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
