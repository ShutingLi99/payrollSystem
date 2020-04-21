//接口，然后使用api里面定义的操作
const express = require('express');
const router = express.Router();
const loginApi = require('./api/loginapi');
const announceApi =require('./api/back/announceApi');
const DepManagerApi =require('./api/back/DepManagerApi');
const updateDialogApi=require('./api/back/updateDialogApi');

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
