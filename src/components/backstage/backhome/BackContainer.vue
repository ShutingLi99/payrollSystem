<template>
  <div class="allcon">
    <el-container class="sallcon">
      <el-aside class="asidel" style="width: 20%;height: 100%;position: absolute;" >
        <AsideCon :user_name="user_name" :user_id="user_id"></AsideCon>
      </el-aside>
      <el-container class="ssallcon">
        <el-header class="head" style="width: 100%;height: 8%;position: absolute;">
          <HeaderCon :user_name="user_name" :user_id="user_id"></HeaderCon>
        </el-header>
          <el-main style="width: 100%;height: 92%;position: absolute;top:8%;">
            <router-view></router-view>
           </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  import AsideCon from './AsideCon.vue'
  import  HeaderCon from './HeaderCon.vue'
    export default {
    components: {
      AsideCon,
      HeaderCon
    },
        name: "BackContainer",
      data() {
        return {
          user_name: this.$route.query.emp_name,
          user_id:this.$route.query.emp_id
        };
      }

    }
</script>

<style scoped>
  .sallcon{
    position: absolute;
    left:0%;
    top: 0%;
    height: 100%;
    width:100%;
  }
.allcon{
  left:0%;
  top: 0%;
  height: 100%;
  width:100%;
  background: url("../../../assets/images/f3.jpg");
  background-size: cover;
  position: absolute;
}
.asidel {
  background-color: rgba(28, 92, 170, 0.3);
}
.ssallcon{
  height: 100%;
  width: 80%;
  left: 20%;
  position: absolute;
}
.head {
  background-color: rgba(114, 169, 224, 0.3);
  justify-content:start;
  align-items:center;
padding: 0px;
}
.el-main {
  background-color: rgba(170, 170, 170, 0.4);
}
</style>
