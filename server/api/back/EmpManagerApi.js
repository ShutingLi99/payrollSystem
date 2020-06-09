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
  addEmp(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.empManager.addEmp;
      console.log(req.body);
      connection.query(sql, [req.body.emp_id,req.body.emp_name,req.body.job_id,req.body.dep_id,req.body.phone_num,req.body.hire_time,req.body.sex], (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
        connection.release();
      })
    })
  },
  updateEmp(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.empManager.updateEmp;
      connection.query(sql, [req.body.emp_name,req.body.dep_id,req.body.job_id,req.body.phone_num,req.body.emp_id], (err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
        connection.release();
      })
    })
  },
  getEmpData(req, res, next) {
    pool.getConnection((err, connection) => {
      var sql = sqlMap.empManager.getEmpData;
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
  deleteEmp(req, res, next) {
    pool.getConnection((err, connection) => {
      var str='delete from employee where emp_id in (',a=[];
      a.push(str);
      var data=req.body.selectArra;
      a.push(data);
      var sql=a.join('');
      sql=sql+');';
      a=null;
      connection.query(sql, [], (err, result) => {
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
