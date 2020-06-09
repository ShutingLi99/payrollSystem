//接口，然后使用api里面定义的操作
const express = require('express');
const router = express.Router();
const loginApi = require('./api/loginapi');
const announceApi =require('./api/back/announceApi');
const DepManagerApi =require('./api/back/DepManagerApi');
const updateDialogApi=require('./api/back/updateDialogApi');
const  EmpManagerApi=require('./api/back/EmpManagerApi');
const empAttendApi=require('./api/back/empAttendApi');
const empLeaveApi=require('./api/back/empLeaveApi');
const empFineApi=require('./api/back/empFineApi');
const empAllowApi=require('./api/back/empAllowApi');
const depSalApi=require('./api/back/depSalApi');
const empSalApi=require('./api/back/empSalApi');
const empBonusApi=require('./api/back/empBonusApi');
const personApi=require('./api/back/personApi');
const mydepApi=require('./api/front/myDepApi');
const mysqlApi=require('./api/front/mySalApi');
router.post('/getEmpSal', (req, res, next) => {
  mysqlApi.getEmpSal(req, res, next);
});
router.post('/getSal', (req, res, next) => {
  mysqlApi.getSal(req, res, next);
});
router.post('/getDepEmp', (req, res, next) => {
  mydepApi.getMyDep(req, res, next);
});
router.post('/getEmp', (req, res, next) => {
 personApi.getEmp(req, res, next);
});
router.post('/modifyPer', (req, res, next) => {
  personApi.modifyPer(req, res, next);
});
router.post('/modifyPas', (req, res, next) => {
  personApi.modifyPas(req, res, next);
});
router.post('/getBonus', (req, res, next) => {
  empBonusApi.getBonus(req, res, next);
});
router.get('/getSalary', (req, res, next) => {
  empSalApi.getSalary(req, res, next);
});
router.post('/getFivet', (req, res, next) => {
  depSalApi.getFivet(req, res, next);
});
router.post('/getOne', (req, res, next) => {
  depSalApi.getOne(req, res, next);
});
router.post('/getOnet', (req, res, next) => {
  depSalApi.getOnet(req, res, next);
});
router.post('/getTwo', (req, res, next) => {
  depSalApi.getTwo(req, res, next);
});
router.get('/getDep', (req, res, next) => {
  depSalApi.getDep(req, res, next);
});
router.get('/getAllow', (req, res, next) => {
  empAllowApi.getAllow(req, res, next);
});
router.get('/getFine', (req, res, next) => {
  empFineApi.getFine(req, res, next);
});
router.get('/getLeave', (req, res, next) => {
  empLeaveApi.getLeave(req, res, next);
});
router.get('/getEmpAttend', (req, res, next) => {
  empAttendApi.getEmpAttend(req, res, next);
});
router.post('/addEmp', (req, res, next) => {
  EmpManagerApi.addEmp(req, res, next);
});
router.post('/updateEmp', (req, res, next) => {
  EmpManagerApi.updateEmp(req, res, next);
});
router.get('/getEmpData', (req, res, next) => {
  EmpManagerApi.getEmpData(req, res, next);
});
router.post('/deleteEmp', (req, res, next) => {
  EmpManagerApi.deleteEmp(req, res, next);
});
router.post('/updateJob', (req, res, next) => {
  updateDialogApi.updateJob(req, res, next);
});
router.post('/updateDep', (req, res, next) => {
  updateDialogApi.updateDep(req, res, next);
});
router.get('/getDj', (req, res, next) => {
  DepManagerApi.getDj(req, res, next);
});
router.post('/addJob', (req, res, next) => {
  DepManagerApi.addJob(req, res, next);
});
router.post('/addDep', (req, res, next) => {
  DepManagerApi.addDep(req, res, next);
});
router.get('/getNotice', (req, res, next) => {
  announceApi.getNotice(req, res, next);
});
router.post('/submitNotice', (req, res, next) => {
  announceApi.submitNotice(req, res, next);
});
router.post('/checkLogin', (req, res, next) => {
  loginApi.getPasswd(req, res, next);
});
module.exports = router;
