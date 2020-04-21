<template>
  <el-dialog title="修改信息" :visible.sync="showDialog" width="40%" :show-close="false">
    <el-form :model="tmpNodeData" size="small" label-position="right"  label-width="80px">
      <el-form-item label="部门名" v-if="tmpNodeData.jobAble===1">
        <el-input v-model="tmpNodeData.label"  ></el-input>
      </el-form-item>
      <el-form-item label="职位名" v-if="tmpNodeData.jobAble===0">
        <el-input v-model="tmpNodeData.job_name" ></el-input>
      </el-form-item>
      <el-form-item label="基础工资" v-if="tmpNodeData.jobAble===0">
        <el-input v-model="tmpNodeData.sal" ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer">
        <el-button type="primary" class="quxiao"  size="small" @click="showDialog=false" round>取  消</el-button>
        <el-button type="primary" size="small" class="queding" @click="submitUpdate()" round>确  定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import axios from "axios";
    export default {
        name: "UpdateDialogBox",
      data() {
        return {
          showDialog: false,
          tmpNodeData:{},
          confirmNodeData:{},
        };
      },
      methods:{
        changeDialogStatus(node){
          this.showDialog = true;
          for(let key in node.data){
            this.$set(this.tmpNodeData,key,node.data[key])
          }
          console.log(this.tmpNodeData)
        },
        submitUpdate(){
          this.showDialog = false;
         if(this.tmpNodeData.jobAble==1){
           axios.post('/api/updateDep',
             {
               dep_id:this.tmpNodeData.dep_id,
               dep_name:this.tmpNodeData.label
             }
           ).then(res=>{
             this.$emit("listenToChild");
             this.$message.success("更新成功！");

           }).catch(err=>{
             console.log(err);
             this.$message.error("更新失败！");

           });
         }else{
           axios.post('/api/updateJob',
             {
               job_id:this.tmpNodeData.job_id,
              job_name:this.tmpNodeData.job_name,
               bas_salary:this.tmpNodeData.sal
             }
           ).then(res=>{
             this.$message.success("更新成功！");
             this.$emit("listenToChild");
           }).catch(err=>{
             console.log(err);
             this.$message.error("更新失败！");

           });
         }
        }
      }
    }
</script>

<style scoped>

</style>
