<template >
        <el-dialog title="新增员工" :visible.sync="showDialog" width="70%" :show-close="false">
            <el-form :model="tmpStaffInfo" size="small" label-position="right"  label-width="80px" ref="addEmp" :rules="rules">
               <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="姓名" prop="emp_name">
                          <el-input v-model="tmpStaffInfo.emp_name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="职位" >
                            <el-cascader
                              :props="{ expandTrigger: 'hover' }"
                            :options="postCascader"
                            v-model="createPostCascader"
                            @change="handleChange"
                            separator=" - "
                            clearable
                            filterable></el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系方式" prop="phone_num">
                          <el-input v-model="tmpStaffInfo.phone_num"></el-input>
                        </el-form-item>
                    </el-col>
               </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="工号" prop="emp_id">
                            <el-input v-model="tmpStaffInfo.emp_id" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="性别" prop="sex">
                            <el-select v-model="tmpStaffInfo.sex" placeholder="请选择性别">
                                <el-option v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                  <el-col :span="8">
          <el-form-item label="入职时间" prop="hire_time">
          <el-date-picker style="width:100%"
           v-model="tmpStaffInfo.hire_time"
         type="date" placeholder="请选择时间"  value-format="yyyy-MM-dd" ref="birthdayDom">
          </el-date-picker>
          </el-form-item>
                  </el-col>
                </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="showDialog=false"> 取 消</el-button>
                <el-button type="primary" size="small" @click="submitCreate('addEmp')">确 定</el-button>
          </div>
        </el-dialog>
</template>
<script>
  import axios from "axios";
    import { mapState } from 'vuex'
    export default {

        data() {
            return {
              options: [{
                value: '女',
                label: '女'
              }, {
                value: '男',
                label: '男'
              }],
              defaultPostMapDepartment:[],
                createPostCascader: [],
                postMapDepartment:[],
                showDialog: false,
              flag:'0',
                tmpStaffInfo: {
                emp_id:'',
                  hire_time: '',
                  phone_num:'',
                  sex:'',
                  dep_id:'',
                  job_id:'',
                  emp_name:''
                },
              postCascader:[],
              rules: {
                emp_name: [{required:true,message:"姓名不能为空",trigger:"blur"},
                  {message: "账号长度不能超过18个字符",type:"string",max:18,trigger: "blur"}
                ],
                phone_num:[
                  {required:true,message: "联系方式不能为空",trigger: "blur"},
                  {message: "长度不能超过11个字符",type:"string",max:11,trigger: "blur"}
                ],
                hire_time: [{required:true,message: "入职时间不能为空",trigger: "blur"}
                ],
                sex: [{required:true,message: "性别不能为空",trigger: "blur"}
                ]
              }
            };
        },
        methods: {
          getDj:function(){
            axios.get('/api/getEmpData').then(response=>{
              let data = response.data;
              let len = data.length;
             this.tmpStaffInfo.emp_id=data[len-1].emp_id+1;

            });
            axios.get('/api/getDj').then(response=>{
              let data = response.data;
              let len = data.length;
              var depLen;
              for (var i = 0; i < len; i++) {
                if (i == 0) {
                  this.postCascader.push({
                    label: data[i].dep_name,
                    value: data[i].dep_id,
                    children: []
                  });
                  this.postCascader[0].children.push({
                    label:data[i].job_name,
                    value: data[i].job_id
                  });
                } else {
                  depLen = this.postCascader.length;
                  if (data[i].dep_id === data[i - 1].dep_id) {
                    this.postCascader[depLen - 1].children.push({
                      label:data[i].job_name,
                      value: data[i].job_id
                    });
                  } else {
                    this.postCascader.push({
                      label: data[i].dep_name,
                      value: data[i].dep_id,
                      children: []
                    });
                    depLen++;
                    this.postCascader[depLen - 1].children.push({
                      label:data[i].job_name,
                      value: data[i].job_id
                    });
                  }
                }
              }
            });
          },
            createStaff() {
                this.showDialog = true;
            },
            handleChange(val) {
                //console.log(val);
            },
            submitCreate(formName) {
              this.$refs[formName].validate((valid) => {
                if(valid){
                  if(this.createPostCascader[0]!=null){
                    this.showDialog = false;
                    this.tmpStaffInfo.dep_id=this.createPostCascader[0];
                    this.tmpStaffInfo.job_id=this.createPostCascader[1];
                    console.log(this.tmpStaffInfo);
                    axios.post('/api/addEmp', this.tmpStaffInfo
                    )
                      .then(res=>{
                        this.$emit("listenToChildC");
                        this.$message.success("增加成功！");
                        this.tmpStaffInfo.emp_id=this.tmpStaffInfo.emp_id+1;

                      }).catch(err=>{
                      console.log(err);
                      this.$message.error("增加失败！");

                    });
                  }else{
                    this.$message.error("职位不可为空！");
                  }

                }
                else {
                  console.log('error submit!!');
                  return false;
                }
              });
            },


         }
            ,
        created:function() {
        this.getDj();
      }
    }
</script>

<style scoped>
    .el-select,.el-cascader{
        width:100%;
    }
</style>
