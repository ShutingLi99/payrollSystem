<template>
  <div class="all">
    <div id="fivetPie"  >

    </div>
    <div id="onePie" >

    </div>
    <div id="onetPie" >

    </div>
    <div id="twoPie" >

    </div>
  </div>

</template>

<script>
  import echarts from 'echarts';
    export default {
        name: "DepSal",
      data() {
        return {
          fivetPie: null,
          onePie:null,
          onetPie:null,
          twoPie:null,
          legendData:[],
          seriesOne:[],
          seriesTwo:[],
          seriesThr:[],
          seriesFour:[]
        }
      },
      methods: {
        drawPieChartOne() {
          this.fivetPie = echarts.init(document.getElementById('fivetPie'));
          this.fivetPie.setOption({
            title: {
              text: '0-5000元',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}人 ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: this.legendData
            },
            series: [
              {
                name: '0-5000元',
                type: 'pie',
                radius: '55%',//半径
                center: ['50%', '60%'],
                data: this.seriesOne,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    textStyle:{
                      fontSize:'25'
                    }
                  }
                }
              }
            ],
            color: ['rgb(214,54,53)','rgb(12,49,189)','rgb(62,129,199)','rgb(20,175,136)','rgb(89,88,199)','rgb(248,144,92)','rgb(158,157,154)']
          });
        },
          drawPieChartTwo()
          {
            this.onePie = echarts.init(document.getElementById('onePie'));
            this.onePie.setOption({
              title: {
                text: '5000-10000元',
                x: 'center'
              },
              tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}人 ({d}%)"
              },
              legend: {
                orient: 'vertical',
                left: 'left',
                data: this.legendData
              },
              series: [
                {
                  name: '5000-10000元',
                  type: 'pie',
                  radius: '55%',//半径
                  center: ['50%', '60%'],
                  data: this.seriesTwo,
                  itemStyle: {
                    emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)',
                      textStyle:{
                        fontSize:'28'
                      }
                    }
                  }
                }
              ],
              color: ['rgb(214,54,53)','rgb(12,49,189)','rgb(62,129,199)','rgb(20,175,136)','rgb(89,88,199)','rgb(248,144,92)','rgb(158,157,154)']
            });
          },
        drawPieChartThr(){
          this.onetPie = echarts.init(document.getElementById('onetPie'));
          this.onetPie.setOption({
            title: {
              text: '10000-20000元',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}人 ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: this.legendData
            },
            series: [
              {
                name: '10000-20000元',
                type: 'pie',
                radius: '55%',//半径
                center: ['50%', '60%'],
                data: this.seriesThr,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    textStyle:{
                      fontSize:'25'
                    }
                  }
                }
              }
            ],
            color: ['rgb(214,54,53)','rgb(12,49,189)','rgb(62,129,199)','rgb(20,175,136)','rgb(89,88,199)','rgb(248,144,92)','rgb(158,157,154)']
          });
        },
        drawPieChartFour(){
          this.twoPie = echarts.init(document.getElementById('twoPie'));
          this.twoPie.setOption({
            title: {
              text: '20000元以上',
              x: 'center'
            },
            tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {c}人 ({d}%)"
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: this.legendData
            },
            series: [
              {
                name: '20000元以上',
                type: 'pie',
                radius: '55%',//半径
                center: ['50%', '60%'],
                data: this.seriesFour,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                    textStyle:{
                      fontSize:'25'
                    }
                  }
                }
              }
            ],
            color: ['rgb(214,54,53)','rgb(12,49,189)','rgb(62,129,199)','rgb(20,175,136)','rgb(89,88,199)','rgb(248,144,92)','rgb(158,157,154)']
          });
        },
          drawCharts(){
            this.drawPieChartOne();
            this.drawPieChartTwo();
            this.drawPieChartThr();
            this.drawPieChartFour();
          },
        getDep:function() {
          this.$axios.get('/api/getDep')
            .then(res => {
              let resp = res.data;
              var len=resp.length;
              for(var i=0;i<len;i++){
                this.legendData.push(resp[i].dep_name);
              }
            }).catch(err => {
            console.log(err);

          });
        },
        getData:function() {
          let data = new Date();
          var salTime;
          if (data.getMonth() < 10) {
            salTime = `${data.getFullYear()}` + '-0' + `${data.getMonth()}`;
          }else{
            salTime = `${data.getFullYear()}` + '-' + `${data.getMonth()}`;
          }

          this.$axios.post('/api/getFivet',{
            salTime:salTime
          })
            .then(res=>{
             let resp = res.data;

             var len=resp.length;
             for(var i=0;i<len;i++){
               this.seriesOne.push({value:resp[i].empNum,name:resp[i].dep_name});
             }
              this.drawPieChartOne();
            }).catch(err=>{
            console.log(err);

          });
          this.$axios.post('/api/getOne',{
            salTime:salTime
          })
            .then(res=>{
              let resp = res.data;
              var len=resp.length;
              for(var i=0;i<len;i++){
                this.seriesTwo.push({value:resp[i].empNum,name:resp[i].dep_name});
              }
              this.drawPieChartTwo();
            }).catch(err=>{
            console.log(err);
          });
          this.$axios.post('/api/getOnet',{
            salTime:salTime
          })
            .then(res=>{
              let resp = res.data;
              var len=resp.length;
              for(var i=0;i<len;i++){
                this.seriesThr.push({value:resp[i].empNum,name:resp[i].dep_name});
              }
              this.drawPieChartThr();
            }).catch(err=>{
            console.log(err);
          });
          this.$axios.post('/api/getTwo',{
            salTime:salTime
          })
            .then(res=>{
              let resp = res.data;
              var len=resp.length;
              for(var i=0;i<len;i++){
                this.seriesFour.push({value:resp[i].empNum,name:resp[i].dep_name});
              }
              this.drawPieChartFour();
            }).catch(err=>{
            console.log(err);
          });
        }
        },
      created:function() {
        this.getDep();
        this.getData();

      }
    }
</script>

<style scoped>
.all{
  left:0%;
  top: 0%;
  height: 100%;
  width:100%;
  position: absolute;
}
  #fivetPie{
    left:0%;
    top:0%;
    height:50%;
    width:50%;
    margin-top: 1%;
    margin-left: 1%;
    position: absolute;
  }
#onePie{
  left:50%;
  top:0%;
  height:50%;
  width:50%;
  margin-top: 1%;

  position: absolute;
}
#onetPie{
  left:0%;
  top:50%;
  height:50%;
  width:50%;

  margin-left: 1%;
  position: absolute;
}
#twoPie{
  left:50%;
  top:50%;
  height:50%;
  width:50%;
  position: absolute;
}
</style>
