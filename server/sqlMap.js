//SQL语句映射文件，供api逻辑调用，api里面的接口文件定义操作时使用这里已经封装好的sql语句
var sqlMap = {
  login: {
    // 查询用户
    select: 'select * from employee where emp_id=?'
  }
}

module.exports = sqlMap;
