<template>
  <div class="alld">
    <el-tree :data="tmpData"
             :props="valueName"
    node-key="id"
    expand-on-click-node
    :highlight-current="true"
             :default-expanded-keys="[1]"
    :expand-on-click-node="false"
    :render-content="renderContent"
    :indent="20"
    >
    </el-tree>
    <UpdateDialogBox ref="updateDialogBox" v-on:listenToChild="getTmpdata"></UpdateDialogBox>
  </div>
</template>

<script>
  import axios from "axios";
  import UpdateDialogBox from './UpdateDialogBox.vue'
    export default {
        name: "DepManager",
      components:{
        UpdateDialogBox
      },
      data(){
          return{
            valueName:{
             value:'id', label:'label',children: 'children'
            },
            maxjob:10,
            maxid:1,
            dep:[],
            tmpData: [{
              id:1,
              label:'部门 职位 基本工资',
              depAble:1,
              jobAble:0,
              modAble:0,
              children:[]
            }]
          };
      },
      methods:{
        appendDep(data, node) {
          if(data.depAble===1){
            this.$prompt('请输入<strong><span style="color:#ff7825">部门</span></strong>名', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true
            }).then( inputContent => {
              this.maxid++;
              console.log(inputContent.value);
            axios.post('/api/addDep',
               {
                 // dep_name:newChild.label
                 dep_name:inputContent.value,
                 dep_id:this.tmpData[0].children.length+100
               }
              ).then(res=>{
                  this.$message.success("新增部门成功！");
                  // this.tmpData[0].children.push(newChild);
              this.tmpData[0].children.push({
                id: this.maxid+1,
                label: inputContent.value,
                depAble: 0,
                jobAble: 1,
                modAble: 1,
                dep_id: this.tmpData[0].children.length+100,
                children: []
              });
                }).catch(err=>{
                console.log(err);
                this.$message.error("新增部门失败！");

              });

            }).catch(() => {
            });
          }else{
            this.$notify.error({
              title: '此项目不可添加部门！',
              duration:4000,
            });
          }
        },

        appendJob(data, node) {
          if(data.jobAble===1){
            this.$prompt('请输入<strong><span style="color:#ff7825">职位</span></strong>名', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              dangerouslyUseHTMLString: true
            }).then((inputContent) => {
             var strr = `${inputContent.value} 0`;
             this.maxid++;
             axios.post('/api/addJob',
                {
                 bas_salary:'0',
                  job_name:inputContent.value,
                  dep_id:data.dep_id,
                  job_id:this.maxjob
                }
              ).then(res=>{
                data.children.push({
               id: this.maxid+1,
               label: strr,
               depAble: 0,
               jobAble: 0,
               modAble: 1,
               sal:0,
               job_name:inputContent.value,
               job_id: this.maxjob
             });
                this.$message.success("新增职位成功！");
              }).catch(err=>{
                console.log(err);
                this.$message.error("新增职位失败！");
              });
            }).catch(() => {
            });
          }else{
            this.$notify.error({
              title: '此项目不可添加职位！',
              duration:4000,
            });
          }
        },
        openDialog(data,node) {
          if(data.modAble==1){
            this.$refs.updateDialogBox.changeDialogStatus(node);
          }else{
            this.$notify.error({
              title: '此项目不可修改信息！',
              duration:4000,
            });
          }

        },
        getTmpdata:function(){
          this.tmpData[0].children.length=0;
          this.maxjob=10;
            this.maxid=1,
            this.dep.length=0;
          axios.get('/api/getDj').then(response=>{
              let data = response.data;
              let len = data.length;
              this.maxjob=parseInt(len)+this.maxjob;
              // 数据分类
              var strr;
              var depLen;
              for (var i = 0; i < len; i++) {
                this.maxid += 1;
                if (i == 0) {
                  this.dep.push({
                    id: this.maxid,
                    label: data[i].dep_name,
                    depAble: 0,
                    jobAble: 1,
                    modAble: 1,
                    dep_id: data[i].dep_id,
                    children: []
                  });
                  this.maxid += 1;
                  var str = `${data[i].job_name}  ${data[i].bas_salary}`;
                  this.dep[0].children.push({
                    id: this.maxid,
                    label: str,
                    depAble: 0,
                    jobAble: 0,
                    modAble: 1,
                    job_name:data[i].job_name,
                    sal:data[i].bas_salary,
                    job_id: data[i].job_id
                  });
                } else {
                  depLen = this.dep.length;
                  if (data[i].dep_id === data[i - 1].dep_id) {
                    strr = `${data[i].job_name}  ${data[i].bas_salary}`;
                    this.dep[depLen - 1].children.push({
                      id: this.maxid,
                      label: strr,
                      depAble: 0,
                      jobAble: 0,
                      modAble: 1,
                      job_name:data[i].job_name,
                      sal:data[i].bas_salary,
                      job_id: data[i].job_id
                    });
                  } else {
                    this.dep.push({
                      id: this.maxid,
                      label: data[i].dep_name,
                      depAble: 0,
                      jobAble: 1,
                      modAble: 1,
                      dep_id: data[i].dep_id,
                      children: []
                    });
                    if (data[i].job_name != null){
                      this.maxid += 1;
                    depLen++;
                    strr = `${data[i].job_name}  ${data[i].bas_salary}`;
                    this.dep[depLen - 1].children.push({
                      id: this.maxid,
                      label: strr,
                      depAble: 0,
                      jobAble: 0,
                      job_name: data[i].job_name,
                      modAble: 1,
                      sal: data[i].bas_salary,
                      job_id: data[i].job_id
                    });
                  }
                  }
                }
              }
              for(var item in this.dep){
                this.tmpData[0].children.push(this.dep[item]);
              }
            });
          },
        renderContent(h,{ node, data, store }) {
          return(
            <span class="custom-tree-node">
            <span>{node.label}</span>
            <span>
            <el-button type="text" size="medium" icon="el-icon-circle-plus-outline" on-click={() => this.appendDep(data,node)}>部门</el-button>
          <el-button type="text" size="medium" icon="el-icon-circle-plus-outline" on-click={ () => this.appendJob(data,node)}>职位</el-button>
          <el-button type="text" size="medium" icon="el-icon-edit" on-click={ () => this.openDialog(data,node) }>修改</el-button>
          </span>
          </span>);
        }
      },
      created:function() {
      this.getTmpdata();
        }
      // ,mounted() {
      //   this.tmpData = JSON.parse(JSON.stringify(this.postCascader));
      // },
      // watch:{
      //   postCascader(newValue,oldValue){
      //     this.tmpData = JSON.parse(JSON.stringify(newValue));
      //   }
      // }
    }
</script>
<style>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 8px;
    font-size: 28px;
    font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';

  }

  .el-tree-node:focus > .el-tree-node__content,
  .el-tree-node__content:hover {
    background-color: rgba(114, 169, 224, 0.5);
  }
  .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
    background-color: rgba(114, 169, 224, 0.5);
  }
  .el-tree {
    background: transparent;
    color: #fff;

  }

  .el-tree-node__expand-icon{
    color: white;
  }
  .el-icon-edit,
  .el-icon-circle-plus-outline{
    font-size: 15px;
  }


  .el-tree-node__content{
    height: 40px;
  }
  .alld .el-button--text{
    color:#fff;
    font-size: 28px;
    font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';
  }
  </style>
<style scoped>
.alld{
  position: absolute;
  width: 70%;
  height: 98%;
  top: 2%;
  left: 1.5%;

}
</style>
