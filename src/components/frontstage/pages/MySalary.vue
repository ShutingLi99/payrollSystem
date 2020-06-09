<template>
  <div class="all">
    <div id="sal"  >
    </div>
    <div class="search">
      <el-form ref="perForm" :model="user" status-icon >
        <el-row :gutter="10">
          <el-col :span="5">
            <el-form-item  label="年月">
              <el-date-picker
                v-model="user.s_time"
                type="month"
                value-format="yyyy-MM"
                placeholder="请选择年月">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item  label="工资金额">
              <el-input v-model="user.s_total"  class="hh2"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="4">
            <el-form-item>
              <el-button type="primary"  class="logbut" @click="doS()"  round>提  交</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts';
    export default {
      name: "MySalary",
      data() {
        return {
          sal: null,
          series: [8000],
          user: {
            s_time: "",
            s_total:""
          }
        }
      },
      methods: {
        doS(){
          if(this.user.s_time !=null){
            console.log(this.$route.query.emp_id);
          this.$axios.post('/api/getEmpSal',{emp_id:this.$route.query.emp_id,s_time:this.user.s_time})
            .then(res => {
              if(res.data.length==0){
                this.$message.error("该时间并未有工资！");
              }
              let resp = res.data[0];
            this.user.s_total=resp.s_total;

            }).catch(err => {
            console.log(err);

          });
          }
        },
        drawSal() {
          this.sal = echarts.init(document.getElementById('sal'));
          this.sal.setOption({
            // title: {
            //   text: '本年度各月工资折线图',
            //   left: 'center'
            // },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}元"
            },
            legend: {
              // orient: 'vertical',
              left: 'center',
              data: ['工资金额'],
              textStyle:{
                fontSize: 20
              }

            },
            xAxis:{
              data:["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"],
              axisLabel:{
                textStyle:{
                  fontSize: 17
                }
              }
            },
            yAxis: {
              axisLabel:{
                textStyle:{
                  fontSize: 17
                }
              }
            },
            series: [
              {
                name: '工资金额',
                type: 'line',
                data: this.series,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    textStyle: {
                      fontSize: '25'
                    }
                  }
                }
              }
            ]
          });
        },
        getData:function() {
          this.$axios.post('/api/getSal',{emp_id:this.$route.query.emp_id})
            .then(res => {
              let resp = res.data;
              var len=resp.length;
              for(var i=0;i<len;i++){
                this.series.push(resp[i].s_total);
              }
              this.drawSal();
            }).catch(err => {
            console.log(err);

          });
        }
      },
      created:function() {
        this.getData();
      }
    }
</script>
<style>
  .search .el-input__inner{
    font-size: 18px;
    border-width: 1px;
    border-radius:4px;
    color: black;
  }
</style>
<style scoped>
  .all{
    left:0%;
    top: 0%;
    height: 100%;
    width:100%;
    position: absolute;
  }
  .search{
    left: 11%;
    top:75%;
    width: 87%;
    height: 8%;
    position: absolute;
  }
  #sal{
    left:0%;
    top:0%;
    height:75%;
    width:98%;
    margin-top: 1%;
    margin-left: 1%;
    position: absolute;
  }
</style>
