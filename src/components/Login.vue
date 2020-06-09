<template>
  <div class="login clearfix" >
    <vue-particles
      color="#fff"
      :particleOpacity="0.7"
      :particlesNumber="58"
      :particleSize="3"
      linesColor="#fff"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :moveSpeed="2"
      clickMode="repulse"
    ></vue-particles>
    <el-card shadow="always" class="card" body-style="width:90%;height:100%;padding:0;">
    <div class="loginform">
      <div class="top">
        <img id="smsLogo" src="../assets/images/smsLogo.jpg">
        <h1>用 户 登 录</h1>
      </div>
      <div class="logform">
        <el-row type="flex" justify="center">
          <el-form ref="loginForm" :model="user" status-icon label-width="0%" :rules="rules">
            <el-form-item prop="account" label="">
              <el-input v-model="user.account" placeholder="账号" class="account-in"   clearable ><i slot="prefix" class="pay yonghu" ></i></el-input>
            </el-form-item>
            <el-form-item prop="password" label="">
              <el-input v-model="user.password" show-password placeholder="密码"  class="pass-in" @keyup.enter.native="doLogin('loginForm')"><i slot="prefix" class="pay mima"></i></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary"  class="logbut" @click="doLogin('loginForm')"  round>登  录</el-button>
              <el-button type="primary"  class="rebut"  v-on:click="resetForm('loginForm')" round>重  置</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
    </el-card>
  </div>

</template>

<script>
  import axios from "axios";
  export default {
    name: "Login",
    data() {
      return {
        user: {
          account: "",
          password: ""
        },
        rules: {
          account: [{required:true,message:"账号不能为空",trigger:"blur"},
            {message: "账号长度不能超过11个字符",type:"string",max:11,trigger: "blur"}
          ],
          password: [{required:true,message: "密码不能为空",trigger: "blur"}
          ,{message: "密码长度需为6-14个字符",type:"string",max:14,min:6,trigger: "blur"}
          ]
        }
      };
    },
    methods: {
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //登录按钮事件
      doLogin(formName) {
        this.$refs[formName].validate((valid) =>{
          if(valid){
            // 接口
            var a=this.user.account;
            if(a=='admin'){
              a='100001';
            }
            axios.post('/api/checkLogin', {
              a
            })
              .then(res=>{
                if(res.data.length==0){
                  this.$message.error("该用户不存在！");
                }
                let data = res.data[0];
                var cpasswd = data.passwd;
                let user_id=data.emp_id;
                let user_name=data.emp_name;
                let user_dep=data.dep_id;
                if(cpasswd!=this.user.password){
                  this.$message.error("密码不正确！");
                }else if(user_id=='100001'){
                  this.$message.success("登录成功！");
                  this.$router.push({ path:'/back' ,query:{emp_id:user_id,emp_name:user_name}});
                }else{
                  this.$message.success("登录成功！");
                  this.$router.push({ path:'/front' ,query:{emp_id:user_id,emp_name:user_name,dep_id:user_dep}});
                }
              }).catch(err=>{
              console.log(err);

            });
          }
        else {
          console.log('error submit!!');
          return false;
        }
      });
  }
    }
  };
</script>
<style>
  .yonghu {
    font-size: 22px;
    position: absolute;
  }
  .account-in .el-input__inner{
    background: transparent;
    font-size: 1.6em;
    border-width: 1px;
    height:2.1em;
    border-radius:4px;
    border-color: #1c5caa;
    font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';
    color: white;
  }
  .mima{
    font-size: 22px;
    position: absolute;

  }
  .pass-in .el-input__inner{
    background: transparent;
    font-size: 1.6em;
    border-width: 1px;
    height:2.1em;
    border-radius:4px;
    border-color: #1c5caa;
    font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';
    color: white;
  }
</style>
<style scoped>
  .login {
    left: 0%;
    top: 0%;
    width: 100%;
    height: 100%;
    background-size: cover;
    position: absolute;
    overflow: hidden;
    justify-content: center;
    flex-direction: row;
    background: linear-gradient(to bottom right , rgb(180, 194, 220), rgb(59, 106, 174));
  }
  .card{
    top: 25%;
    left:38%;
    width:24%;
    height:38%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.05);
    box-shadow: 10px 10px 30px #222;
    position: absolute;
  }
 .loginform {
   width: 95.6%;
   height: 100%;
    position: absolute;
  }
  .top{
    width: 95.6%;
    height: 15%;
    position: absolute;
  }
  #smsLogo{
    margin-top:4.2%;
    left:8%;
    height:100%;
    width:20%;
    position: absolute;
  }
  .top h1{
    left:28% ;
    font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';
    position: absolute;
    color: #EEEEEE;
  }
  .logform{
    top:27%;
    height:72%;
    width:95.6%;
    position: absolute;
  }
  .logbut{
    left:15%;
    position: absolute;
  }
  .rebut{
    left:60%;
    position: absolute;
  }
  </style>



