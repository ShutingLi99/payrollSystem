<template>
  <div class="allside">
  <div class="asidename">
    <img id="logo" src="../../../assets/images/asidelogo.png" >
    <span class="title">工资管理系统</span>
  </div>
  <div class="menu">
  <el-menu
    class="el-menu-vertical-demo"
    :default-active="$route.path" :unique-opened=true @open="handleOpen" @close="handleClose" router
  >
<!--    @select="handleSelect"-->
    <template v-for="(item, index) in asideGroup">
      <template v-if="item.children[0]">
        <el-submenu :index="item.index">
          <template slot="title" >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </template>
          <el-menu-item :index="child.index" v-for="(child, i) in item.children" :key="i"  :route="{path: child.path,query: child.query}">
            <i :class="child.icon"></i>
            {{ child.title }}</el-menu-item>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :index="item.index" :route="{path: item.path,query: item.query}">
          <i :class="item.icon"></i>
          <span slot="title">{{ item.title }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
  </div>
  </div>
</template>

<script>
    export default {
        name: "AsideCon",
      props:[
        "user_name","user_id","user_dep"
      ],
      data(){
        return{
          asideGroup:[
            {
              title:'公告',
              index:'1',
              icon:'pay gonggao',
              path:'/front/fannouncement',
              query:{emp_name:this.user_name,emp_id:this.user_id},
              children:[]
            },
            {
              title:'我的部门',
              index:'2',
              icon:'pay bumen',
              path:'/front/mydep',
              query:{emp_name:this.user_name,emp_id:this.user_id,dep_id:this.user_dep},
              children:[]
            },

            {
              title:'考勤管理',
              index:'3',
              icon:'pay kaoqin',
              path:'',
              children:[
                {
                  title:'签到签退',
                  index:'3-1',
                  icon:'pay yuangong',
                  path:'/front/empAttend',
                  children:[]
                },
                {
                  title:'请假',
                  index:'3-2',
                  icon:'pay qingjia',
                  path:'/front/leave',
                  children:[]
                },
                {
                  title:'扣除款项',
                  index:'3-3',
                  icon:'pay fakuan',
                  path:'/front/penalty',
                  children:[]
                }
              ]
            },
            {
              title:'津贴管理',
              index:'4',
              icon:'pay jintie',
              path:'/front/allowanceMan',
              children:[]
            },
            {
              title:'工资管理',
              index:'5',
              icon:'pay gongzi',
              path:'/front/mysal',
              query:{emp_name:this.user_name,emp_id:this.user_id,dep_id:this.user_dep},
              children:[
              ]
            }
          ]
        }
      }
      ,methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      }
    }
</script>

<style>
  .el-submenu__icon-arrow{
    font-size: 20px;

  }
  .el-submenu__title i {
    color:white;

  }
  .el-submenu__title{
    padding-left: 20px;
    color: white;
    background:transparent;
    font-size: 30px;
  }
  .el-submenu__title:hover {
    background-color: rgba(62, 129, 199, 0.32);
  }
  .el-submenu .el-menu{
    background-color:rgba(0,0,0,0);
  }

</style>
<style scoped>
  .gonggao,
  .bumen,
  .yuangong,.jintie,.jiangli,.kaoqin,.gongzi,.renshi{
    font-size: 20px;
    color:white;
  }
  .fakuan,.qingjia{
    font-size: 25px;
    color:white;
  }
  .el-menu{
    border:0;
    padding: 15px;
    background-color: rgba(0, 0, 0, 0);
    font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';
    margin-top: 5%;
  }
  .el-menu-item{
    padding-left: 20px;
    color: rgb(255, 255, 255);
    background-color:rgba(0,0,0,0);
    font-size: 30px;
  }
  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: rgba(62, 129, 199, 0.5);
  }
  #logo{
    position: absolute;
    left:7%;
    width: 21%;
    top: 7%;
    height: 80%;
  }
  .title{
    font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';
    font-size: 30px;
    color: white;
left:29%;
    top:24%;
    position: absolute;
  }
  .allside{
    height: 100%;
    width: 100%;
    position: absolute;
  }
  .asidename{
    background-color: rgba(36, 104, 162, 0.27);
    height: 8%;
    width: 100%;
position: absolute;
  }
  .menu{
    top:8%;
    height: 92%;
    width: 100%;
    position: absolute;
  }
</style>
