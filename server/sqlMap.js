//SQL语句映射文件，供api逻辑调用，api里面的接口文件定义操作时使用这里已经封装好的sql语句
var sqlMap = {

  updateDialog:{
    updateDep:'update department set dep_name=? where dep_id=?',
    updateJob:'update job set job_name=?,bas_salary=? where job_id=?'
  },
  login: {
    // 查询用户
    select: 'select * from employee where emp_id=?'
  },
  announcement:{
    submitNotice:'insert into announcement(emp_id,time,text,type,title) values(?,?,?,?,?)',
    getNotice:'select * from announcement'
  },
  depManager:{
    addDep:'insert into department(dep_name,dep_id) values(?,?)',
    addJob:'insert into job(job_name,dep_id,bas_salary,job_id) values(?,?,?,?)',
    getDj:'select * from job natural join department'
  }
}

module.exports = sqlMap;
