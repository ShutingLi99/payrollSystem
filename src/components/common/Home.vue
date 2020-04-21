<template>
        <div class="time">
          <div class="stime">
            <strong>{{hour|fillDecade}}:{{minute|fillDecade}}</strong>
          </div>
          <div class="sdate">
            {{year}}-{{month|fillDecade}}-{{day|fillDecade}}
          </div>
          <div class="sweek">
            {{week|formatWeek}}
          </div>
          <div class="title">
            Hello,&nbsp;{{this.user_name}}&nbsp;!
          </div>
        </div>
</template>

<script>
    export default {
        name: "Home",
      data() {
        return {
          user_name: this.$route.query.emp_name,
          user_id:this.$route.query.emp_id,
          timer:0,
          year :'',
          month:'',
          day :'',
          hour :'',
          minute:'',
          week:''
        };
      },
      methods:{
        init(){
          let date=new Date();
          this.year = `${date.getFullYear()}`;
          this.month= `${date.getMonth()+1}`;
          this.day = `${date.getDate()}`;
          this.hour = `${date.getHours()}`;
          this.minute= `${date.getMinutes()}`;
          this.week= `${date.getDay()}`;
          setInterval(()=>++this.timer,1000);
        }
      },
      mounted:function () {
        this.init();
      },
      filters: {
        fillDecade: function (value) {
          return value.length===2?value:`0${value}`;
        },
        formatWeek: function (value) {
          value = Number(value);
          switch(value){
            case 0:
              return 'Sunday';
            case 1:
              return 'Monday';
            case 2:
              return 'Tuesday';
            case 3:
              return 'Wednesday';
            case 4:
              return 'Thursday';
            case 5:
              return 'Friday';
            case 6:
              return 'Saturday'
          }
        },
      },
    watch:{
      timer(oldVal,newVal){
        let date=new Date();
        this.year = `${date.getFullYear()}`;
        this.month= `${date.getMonth()+1}`;
        this.day = `${date.getDate()}`;
        this.hour = `${date.getHours()}`;
        this.minute= `${date.getMinutes()}`;
        this.week= `${date.getDay()}`;
      }
    }
    }
</script>

<style scoped>
.time{
  left:0%;
  top: 0%;
  height: 100%;
  width:100%;
  background: url("../../assets/images/hometimer.png");
  background-size: cover;
  position: absolute;
}
.stime{
  top:38%;
  left:35%;
  font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';
  font-size: 64px;
  color: rgba(254, 254, 254, 0.75);
  position: absolute;
}
  .sdate{
    top:37%;
    left:52%;
    color: rgba(254, 254, 254, 0.75);
    position: absolute;
    font-size: 32px;
    font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';
  }
  .sweek{
    top:42%;
    left:54.7%;
    color: rgba(254, 254, 254, 0.75);
    position: absolute;
    font-size: 32px;
    font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';
  }
  .title{
    top:56%;
    left:33%;
    color: rgba(254, 254, 254, 0.75);
    position: absolute;
    font-size: 48px;
    font-family: '华文新魏 Bold', '华文新魏 Regular', '华文新魏';
  }
</style>
