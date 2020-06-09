<template >
        <el-dialog title="员工信息修改" :visible.sync="showDialog" width="70%" :show-close="false">
            <el-form :model="tmpStaffInfo" size="small" label-position="right"  label-width="80px" :rules="rules" ref="addForm">
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
                            v-model="defaultPostMapDepartment"
                            @change="handleChange"
                            separator="-"
                            clearable
                            filterable></el-cascader>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="联系方式" prop="phone_num" >
                            <el-input v-model="tmpStaffInfo.phone_num"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="showDialog=false">取 消</el-button>
                <el-button type="primary" size="small" @click="submitChange('addForm')" >确 定</el-button>
            </div>

        </el-dialog>
</template>
<script>
  import axios from "axios";
    export default {
        data() {
            return {
                defaultPostMapDepartment:[],
                showDialog: false,
                departmentID:'',
                confirmedStaffInfo:{},
                tmpStaffInfo:{},
              postCascader:[],
              rules: {
                emp_name: [{required:true,message:"姓名不能为空",trigger:"blur"},
                ],
                phone_num:[
                  {required:true,message: "联系方式不能为空",trigger: "blur"}
                ]
              }
            };
        },
        methods: {
          getDj:function(){
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
          editStaffInfo(row) {
            this.showDialog = true;
            for (let key in row) {
              //直接赋值是，vue不能监听到对象的增删，用this.$set(obj,key,val)方法；
              this.$set(this.tmpStaffInfo, key, row[key]);
            }
          },
          handleChange(val) {
            //console.log(val);
          },
          submitChange(formName) {
            this.$refs[formName].validate((valid) => {
                if(valid){
                  if(this.defaultPostMapDepartment[0]!=null){
                    this.showDialog = false;
                    axios.post('/api/updateEmp', {
                        emp_id:this.tmpStaffInfo.emp_id,
                        emp_name:this.tmpStaffInfo.emp_name,
                        dep_id:this.defaultPostMapDepartment[0],
                        job_id:this.defaultPostMapDepartment[1],
                        phone_num: this.tmpStaffInfo.phone_num
                      }
                    )
                      .then(res=>{
                        this.$emit("listenToChild");
                        this.$message.success("修改成功！");

                      }).catch(err=>{
                      console.log(err);
                      this.$message.error("修改失败！");

                    });
                  }else{
                    this.$message.error("职位不能为空！");
                    return false;
                  }
          }
                else {
                  console.log('error submit!!');
                  return false;
                }
            });
            }
        },
      created:function() {
        this.getDj();
      },
        watch:{
        },
        //异步请求
        mounted(){
        }
    };
</script>
<style>
  .el-input__inner{
    color: black;
  }
</style>
<style scoped>
    .el-select,.el-cascader{
        width:100%;
    }
</style>
