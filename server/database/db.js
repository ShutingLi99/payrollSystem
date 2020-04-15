//引入包 mysql，创建连接池 mysql.createPool，sql语法和在命令中使用的形同，拼成字符串即可
const mysql = require('mysql');
const mysqlConfig = {
  host: 'localhost',  // 新建数据库连接时的 主机名或ID地址 内容
  user: 'root',
  password: 'qwe136828', // root 密码
  database: 'payrollsystem', // 数据库名
  port: '3306'
}
module.exports={
  mysqlConfig
};
