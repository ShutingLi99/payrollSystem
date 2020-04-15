<template>
    <div class="allhead">
      <div class="homeimg" >
        <router-link to="/back/home">
          <img id="home" src="../../../assets/images/home.png" >
        </router-link>
      </div>
      <div class="portrait" >
        <el-dropdown id="portraitcon">
          <div  class="el-dropdown-link">
            <a href="#">
            <el-avatar shape="square"  :size="50" >
              <img id="tou" src="../../../assets/images/touxiang.jpg" >
            </el-avatar>
            </a>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/back/personalInfo">
                <i class="pay geren">&nbsp;&nbsp;个人信息</i>
              </router-link>
            </el-dropdown-item>
            <el-dropdown-item>
              <router-link to="/back/changepass">
                <i class="pay mima">&nbsp;&nbsp;修改密码</i>
              </router-link>
            </el-dropdown-item>

            <el-dropdown-item>
              <router-link to="/login">
                <i class="pay tuichu">&nbsp;&nbsp;退出系统</i>
              </router-link>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
</template>

<script>
    export default {
        name: "HeaderCon"
    }
</script>

<style scoped>
  #home{
    position: absolute;
left: 2%;
    top: 5.4%;
    width: 20%;
    height: 80%;
  }
#portraitcon{
  position: absolute;
  left:96.5%;
 top:8.8%;

}
  a{
    color: #878e8d;
    text-decoration:none;
  }
  a:hover{
    color: #99afca;
  }
.allhead{
  height: 98%;
  width: 98%;
  position: absolute;
}
  .homeimg{
    position: absolute;

    height: 100%;
    width: 25%;
  }
  .portrait{
    position: absolute;
    height: 100%;
    left:25%;
    width: 75%;

  }

</style>
