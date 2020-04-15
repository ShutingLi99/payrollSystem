//接口，然后使用api里面定义的操作
const express = require('express');
const router = express.Router();
const loginApi = require('./api/loginapi');

router.post('/checkLogin', (req, res, next) => {
  loginApi.getPasswd(req, res, next);
});
// router.post('/setValue', (req, res, next) => {
//   testapi.setValue(req, res, next);
// });

module.exports = router;
