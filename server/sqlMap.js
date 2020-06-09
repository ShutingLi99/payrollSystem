//SQL语句映射文件，供api逻辑调用，api里面的接口文件定义操作时使用这里已经封装好的sql语句
var sqlMap = {
  mysal:{
    getMySal:'SELECT s_total FROM salary WHERE emp_id=? AND s_time LIKE "2020%" ORDER BY s_time;',
    getsal:'SELECT s_total FROM salary WHERE emp_id=? AND s_time=?;'
  },
  mydep:{
    getMyDep:'SELECT emp_id,emp_name,job_name,DATE_ADD(hire_time,INTERVAL 1 DAY) as hire_time,sex,phone_num FROM employee NATURAL JOIN job NATURAL JOIN department where dep_id=?;'
  },
  person:{
    modifyPer:'update employee set emp_name=?,phone_num=? where emp_id=?;',
    modifyPas:'update employee set passwd=? where emp_id=?;',
    getEmp:'SELECT emp_id,emp_name,dep_name,job_name,DATE_ADD(hire_time,INTERVAL 1 DAY) as hire_time,sex,phone_num,passwd,bas_salary FROM employee NATURAL JOIN job NATURAL JOIN department where emp_id=?;'
  },
  empBonus:{
    getBonus:'SELECT emp_id,emp_name,dep_name,job_name, ROUND((sala.ss_total+allow.allowan)/12,2) AS b_total FROM employee NATURAL JOIN job NATURAL JOIN department NATURAL JOIN  (SELECT emp_id,SUM(s_total) AS ss_total FROM salary WHERE s_time LIKE ? GROUP BY emp_id) AS sala NATURAL JOIN (SELECT emp_id,SUM(all_total) AS allowan FROM allowance WHERE all_time LIKE ? GROUP BY emp_id) AS allow ORDER BY emp_id;'
  },
  empSal:{
    getSalary:'select * from employee natural join job natural join department natural join salary order by s_time;'
  },
  depSal:{
    getDep:'SELECT dep_name FROM department;',
    getFivet:'SELECT IFNULL(num,0) AS empNum,department.dep_name FROM department LEFT JOIN(SELECT dep_name,COUNT(emp_id) AS num FROM employee NATURAL JOIN salary NATURAL JOIN department WHERE salary.s_time=? AND salary.s_total BETWEEN 0 AND 5000 GROUP BY dep_name) AS newa ON newa.`dep_name`=department.`dep_name`;',
    getOne:'SELECT IFNULL(num,0) AS empNum,department.dep_name FROM department LEFT JOIN (SELECT dep_name,COUNT(emp_id) AS num FROM employee NATURAL JOIN salary NATURAL JOIN department WHERE salary.s_time=? AND salary.s_total BETWEEN 5000 AND 10000 GROUP BY dep_name) AS newa ON newa.`dep_name`=department.`dep_name`; ',
    getOnet:'SELECT IFNULL(num,0) AS empNum,department.dep_name FROM department LEFT JOIN (SELECT dep_name,COUNT(emp_id) AS num FROM employee NATURAL JOIN salary NATURAL JOIN department WHERE salary.s_time=? AND salary.s_total BETWEEN 10000 AND 20000 GROUP BY dep_name) AS newa ON newa.`dep_name`=department.`dep_name`; ',
    getTwo:'SELECT IFNULL(num,0) AS empNum,department.dep_name FROM department LEFT JOIN (SELECT dep_name,COUNT(emp_id) AS num FROM employee NATURAL JOIN salary NATURAL JOIN department WHERE salary.s_time=? AND salary.s_total > 20000 GROUP BY dep_name) AS newa ON newa.`dep_name`=department.`dep_name`; '
  },
  empAllow:{
    getAllow:'SELECT all_time,emp_id,emp_name,job_name,dep_name,all_total,o_name,o_rules FROM employee NATURAL JOIN allowance NATURAL JOIN job NATURAL JOIN department NATURAL JOIN overwork ORDER BY all_time;'
  },
  empFine:{
    getFine:'SELECT DATE_ADD(f_time,INTERVAL 1 DAY) AS f_time,emp_id,emp_name,job_name,dep_name,f_total,f_name,f_rule FROM employee NATURAL JOIN fine NATURAL JOIN job NATURAL JOIN department NATURAL JOIN finerules ORDER BY f_time;'
  },
  empLeave:{
    getLeave:'SELECT DATE_ADD(a_time,INTERVAL 1 DAY) AS a_time,emp_id,emp_name,job_name,dep_name,a_explain FROM employee NATURAL JOIN absence NATURAL JOIN job NATURAL JOIN department ORDER BY a_time;'
  },
  empAttend:{
    getEmpAttend:'SELECT DATE_ADD(a_time,INTERVAL 1 DAY) AS a_time,emp_id,emp_name,job_name,dep_name,start_time,end_time FROM employee NATURAL JOIN attendance NATURAL JOIN job NATURAL JOIN department ORDER BY attendance.a_time;'
  },
empManager:{
  deleteEmp:'delete from employee where emp_id=?',
  getEmpData:'SELECT emp_id,emp_name,dep_name,job_name,DATE_ADD(hire_time,INTERVAL 1 DAY) as hire_time,sex,phone_num FROM employee NATURAL JOIN job NATURAL JOIN department order by emp_id',
  updateEmp:'update employee set  emp_name=?,dep_id=?,job_id=?,phone_num=? where emp_id=?',
  addEmp:'insert into employee(emp_id,emp_name,job_id,dep_id,phone_num,hire_time,sex) values(?,?,?,?,?,?,?)'
},
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
    // getDj:'select * from job natural join department'
    getDj:'SELECT * FROM job RIGHT JOIN department ON job.`dep_id`=department.`dep_id`;'
  }
}

module.exports = sqlMap;
