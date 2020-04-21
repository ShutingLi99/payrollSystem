<template>
    <div class="alla">
      <el-button  icon="el-icon-edit" round class="addbut" @click="showDialog=true" >发布</el-button>
      <div class="ag">
     <el-alert v-for="(value,key,index) in this.getNoticeRes" :key="value.aid"
      :title="value.title"
      :type="value.type"
      :description="value.text">
     </el-alert>
    </div>
      <el-dialog title="编写公告" :visible.sync="showDialog" width="40%" :show-close="false">
        <el-form :model="addNotice" label-position="right" label-width="80px" :rules="rules" ref="addForm">
          <el-form-item label="标题" prop="title">
            <el-input v-model="addNotice.title" ></el-input>
          </el-form-item>
          <el-form-item label="公告属性" prop="type">
            <el-select v-model="addNotice.type" placeholder="请选择">
              <el-option v-for="item in level" :key="item.tag" :label="item.des" :value="item.tag" ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容" prop="text">
            <el-input v-model="addNotice.text" type="textarea"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="showDialog = false">取 消</el-button>
          <el-button type="primary" @click="submitNotice('addForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
  import axios from "axios";
    export default {
        name: "Announcement",
      data() {
        return {
          showDialog:false,
          addNotice:{title:'',type:'',text:'',time:'',emp_id:''},
          level:[{tag:"success",des:"成功"},{tag:"info",des:"信息"},{tag:"warning",des:"警告"},{tag:"error",des:"错误"}],
          getNoticeRes:[],
          rules: {
            type: [{required:true,message:"属性不能为空",trigger:"blur"},
            ],
            title: [{required:true,message: "标题不能为空",trigger: "blur"}
            ],
            text:[
              {required:true,message: "内容不能为空",trigger: "blur"}
            ]
          }
        }

      },
      methods:{
        submitNotice(formName){
          this.$refs[formName].validate((valid) => {
            if(valid){
              this.showDialog = false;
              this.addNotice.emp_id=this.$route.query.emp_id;
              this.addNotice.time = new Date();
              this.addNotice.title = `${this.addNotice.title} ----用户 ${this.$route.query.emp_name} 发布于 ${this.addNotice.time}`;
              axios.post('/api/submitNotice', this.addNotice
              )
                .then(res=>{
                    this.$message.success("新增公告成功！");
                    this.getAnnouncement();
                }).catch(err=>{
                console.log(err);
                this.$message.error("新增公告失败！");

              });
            }
          else {
              console.log('error submit!!');
              return false;
            }
          });
          },
        getAnnouncement:function(){
          axios.get('/api/getNotice'
          )
            .then(res=>{
              if(res.data.length==0){
                this.$message.error("目前没有任何公告！");
              }
              this.getNoticeRes = res.data;
              console.log(this.getNoticeRes);
            }).catch(err=>{
            console.log(err);
          });
        }
        },
      created:function() {
          this.getAnnouncement();
      }

    }
</script>
<style>
  .addbut{
   background: #94ACD4;
    border-width: 0;
    color: #222222;
    top: 2%;
    left:1.5%;
    position: absolute;
  }
  .el-alert .el-alert__description,
   .el-alert__title{
     font-size: 23px;
    font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';
   }
</style>
<style scoped>
.alla{
  top: 0%;
  left: 0%;
  width: 100%;
  position: absolute;
  height: 100%;
}
  .ag{
    left:1.5%;
    top:8%;
    position: absolute;
    width: 83%;
    height: 92%;


  }
.el-alert{
  margin-top: 10px;
}

</style>
