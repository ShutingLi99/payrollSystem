<template>
  <div class="all">
    <el-card shadow="always" class="card" body-style="width:90%;height:100%;padding:0;">
  <div class="title">
<h3>基本资料</h3>

  </div>
    <hr class="hh" />
  <div class="allTab">
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="个人信息" name="first">
      <div class="form">
          <el-form ref="perForm" :model="user" status-icon  :rules="rules">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item  label="工号">
                  <el-input v-model="user.id" :disabled="true" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="name" label="姓名">
                  <el-input v-model="user.name" clearable ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item  label="性别">
                  <el-input v-model="user.sex" :disabled="true" ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="phone" label="手机号码">
                  <el-input v-model="user.phone" clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item  label="部门">
                  <el-input v-model="user.dep" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item  label="职位">
                  <el-input v-model="user.job" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item  label="基础工资">
                  <el-input v-model="user.sal" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item  label="入职时间">
                  <el-input v-model="user.hire" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
              <el-row :gutter="20">
              <el-col :span="8">
            <el-form-item>
              <el-button type="primary"  class="logbut" @click="doMod('perForm')"  round>修  改</el-button>
              <el-button type="primary"  class="rebut"  v-on:click="resetForm('perForm')" round>重  置</el-button>
            </el-form-item>
              </el-col>
              </el-row>
          </el-form>
      </div>
    </el-tab-pane>
    <el-tab-pane label="修改密码" name="second">
      <div class="pform">
          <el-form ref="passForm" :model="userPas" status-icon :rules="pasRules">
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item prop="passwd" label="原密码">
                  <el-input v-model="userPas.passwd" show-password clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="newPass" label="新密码">
                  <el-input v-model="userPas.newPass" show-password clearable></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="cpass" label="确认新密码">
                  <el-input v-model="userPas.cpass"  show-password clearable></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item>
                  <el-button type="primary"  class="logbut" @click="doPas('passForm')"  round>修  改</el-button>
                  <el-button type="primary"  class="rebut"  v-on:click="resetForm('passForm')" round>重  置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
      </div>
    </el-tab-pane>

  </el-tabs>
  </div>
    </el-card>
  </div>
</template>

<script>
    export default {
        name: "Personality",
      data() {
        return {
         emp_name: this.$route.query.emp_name,
          emp_id:this.$route.query.emp_id,
          activeName: 'second',
          password:'',
          user: {
            id: "",
            name: "",
            sex: "",
            phone: "",
            dep: "",
            job: "",
            sal: "",
            hire:""
          },
          userPas: {
            passwd: "",
            cpass: "",
            newPass: ""
          },
          rules: {
            name: [{required:true,message:"姓名不能为空",trigger:"blur"},
              {message: "姓名长度不能超过18个字符",type:"string",max:18,trigger: "blur"}
            ],
            phone: [{required:true,message: "电话号码不能为空",trigger: "blur"}
              ,{message: "电话号码长度需为11个字符",type:"string",max:11,min:11,trigger: "blur"}
            ]
          },
          pasRules:{
            passwd: [{required:true,message:"密码不能为空",trigger:"blur"},
              {message: "密码长度不能超过14个字符",type:"string",max:14,trigger: "blur"}
            ],
            newPass: [{required:true,message: "新密码不能为空",trigger: "blur"}
              ,{message: "新密码长度需为14个字符",type:"string",max:14,trigger: "blur"}
            ]
          }
        };
      },
      methods: {
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        handleClick(tab, event) {
          console.log(tab, event);
        },
        doMod(formName) {
          this.$refs[formName].validate((valid) =>{
            if(valid){
              // 接口
              this.$axios.post('/api/modifyPer', {
                emp_id:this.emp_id,
               name:this.user.name,
                phone:this.user.phone
              })
                .then(res=>{
                    this.$message.success("修改成功！");
                }).catch(err=>{
                this.$message.error("修改失败！");
                console.log(err);

              });
            }
            else {
              console.log('error submit!!');
              this.$message.error("修改失败！");
              return false;
            }
          });
        },
        doPas(formName) {
          this.$refs[formName].validate((valid) =>{
            if(valid){
              if(this.password!=this.userPas.passwd){
                this.$message.error("原密码不正确，无法进行修改！");
              }else if(this.userPas.newPass!=this.userPas.cpass){
                this.$message.error("两次输入的密码不相同，无法进行修改！");
              }else{ // 接口
                this.$axios.post('/api/modifyPas', {
                  passwd:this.userPas.newPass,
                  emp_id:this.emp_id
                })
                  .then(res=>{
                    this.password=this.userPas.newPass;
                    this.$message.success("修改成功！");
                  }).catch(err=>{
                  this.$message.error("修改失败！");
                  console.log(err);
                });}
            }
            else {
              console.log('error submit!!');
              this.$message.error("修改失败！");
              return false;
            }
          });
        },
        getEmp:function(){
          this.$axios.post('/api/getEmp',{
            emp_id:this.emp_id
            }
          )
            .then(res=>{
              this.user.phone = res.data[0].phone_num;
              this.user.name=res.data[0].emp_name;
              this.user.id=res.data[0].emp_id;
              this.user.dep=res.data[0].dep_name;
              this.user.job=res.data[0].job_name;
              this.user.sal=res.data[0].bas_salary;
              this.password=res.data[0].passwd;
              this.user.sex=res.data[0].sex;
this.user.hire=res.data[0].hire_time.substring(0,10);
            }).catch(err=>{
            console.log(err);
          });
        }
      },
      created:function() {
        this.getEmp();
      }

    }
</script>
<style>
  .pform .el-input.is-disabled .el-input__inner,
  .pform .el-input__inner{
    background: transparent;
    font-size: 1.6em;
    border-width: 1px;
    height:2.1em;
    border-radius:4px;
    border-color: #1c5caa;
    font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';
    color: white;
  }
  .form .el-input.is-disabled .el-input__inner,
  .form .el-input__inner{
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

.all{
  top: 0%;
  left: 0%;
  width: 100%;
  position: absolute;
  height: 100%;
}
.card{
  top: 2%;
  left:5%;
  width:90%;
  height:90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0);
  box-shadow: 10px 10px 30px #222;
  position: absolute;
}
  .title{
    top:2%;
    left:5%;
    right:5%;
    position: absolute;
    height: 8%;
    width:90%;
  }
  .hh{
    top:7.5%;
    left:5%;
    position: absolute;
    width: 90%;
  color: rgba(255, 255, 255, 0.52);
  }
  .allTab{
    top:8.5%;
    left:5%;
    right:5%;
    position: absolute;
    height: 91.5%;
    width:90%;
  }
</style>
