<template>
  <div class="allatt">
    <div class="searchEmp">
      <el-input prefix-icon="el-icon-search" placeholder="搜索姓名" v-model="searchValue" size="mini" class="serach"></el-input>
    </div>
    <div class="table">
      <el-table
        :data="pagingStaffInfo" border size="mini"
         :row-style="rowStyle" :cell-style="cellStyle" :header-row-style="headerRowStyle" class="stable"
        style="table-layout: fixed;"
      >
        <!--        row-dblclick:双击行事件(row,event),row当前行对象；select:手动勾选box事件，selection：选中的对象数组,row，本次勾选行对象；-->
        <el-table-column prop="a_time" label="日期" ></el-table-column>
        <el-table-column prop="emp_id" label="工号" width="90"></el-table-column>
        <el-table-column prop="emp_name" label="姓名"  ></el-table-column>
        <el-table-column prop="dep_name" label="部门" :filters="this.filters_department_name" :filter-method="filterDepartmentName" ></el-table-column>
        <el-table-column prop="job_name" label="职位" :filters="this.filters_post_name" :filter-method="filterPostName" ></el-table-column>
        <el-table-column prop="a_explain" label="请假原因" ></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[10, 20, 50, 100]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="staffCount"
                       class="sp">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "_axios@0.19.2@axios/index";
  import qs from 'qs';
  export default {
    name: "EmpLeave",
    computed:{
      staffCount () {
        return this.staffInfo.length;
      },
      pageCount(){
        return parseInt(this.staffCount/this.pageSize)+1;
      },
      //计算当前分页的数据
      pagingStaffInfo(){
        let currentPageStaffInfo=[];
        if(this.searchValue===''){
          this.init();
          let currentPageHeaderIndex=(this.currentPage-1)*this.pageSize;
          let currentPageTailIndex='';
          if(this.currentPage===this.pageCount){
            currentPageTailIndex = currentPageHeaderIndex + this.staffCount % this.pageSize - 1;
          }else{
            currentPageTailIndex=currentPageHeaderIndex+this.pageSize-1;
          }
          let tmpIndex=0;
          for(let index=currentPageHeaderIndex;index<currentPageTailIndex+1;index++){
            currentPageStaffInfo[tmpIndex++]=this.allStaffInfo[index];
          }
        }else{

          let tmp = this.allStaffInfo.filter(this.searchFilter);
          currentPageStaffInfo=[...tmp];
          this.staffInfo=[...tmp];
        }
        return currentPageStaffInfo;
      }
    },
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        searchValue:'',
        staffInfo:[],
        employee_name_arr:[],
        filters_post_name:[],
        filters_department_name:[],
        emptyStaff:{},
        allStaffInfo:[],
        postInfo:[],
        departmentInfo:[]
      }
    },
    methods:{
      rowStyle(){
        return 'background:transparent'
      },
      cellStyle(){
        //return 'color:red'
        return 'background:transparent'
      },
      headerRowStyle(){
        return 'background:transparent'
        //return 'background-color:rgba(0,0,0,0)'
      },
      searchFilter(val) {
        return val['emp_name'].indexOf(this.searchValue) > -1;
      },
      handleSizeChange (val) {
        this.pageSize=val;
      },
      handleCurrentChange(val) {
        this.currentPage=val;
      },
      filterPostName(value, row, column) {

        return row['job_name'] === value;
      },
      filterDepartmentName(value, row, column) {
        return row['dep_name'] === value;
      },
      getEmp:function(){
        this.allStaffInfo=[];
        this.departmentInfo=[];
        this.postInfo=[];
        axios.get('/api/getLeave').then(response=>{
          let data = response.data;
          let len = data.length;
          var str;
          // 数据分类
          for (var i = 0; i < len; i++) {
           str=data[i].a_time.substring(0,10);
            this.allStaffInfo.push({emp_id:data[i].emp_id,emp_name:data[i].emp_name,dep_name:data[i].dep_name,job_name:data[i].job_name,a_time:str,a_explain:data[i].a_explain});
          }
        });
        axios.get('/api/getDj').then(response=>{
          let data = response.data;
          let len = data.length;
          // 数据分类
          for (var i = 0; i < len; i++) {
            if (i == 0) {
              this.departmentInfo.push({
                dep_name: data[i].dep_name,
                dep_id: data[i].dep_id
              });
              this.postInfo.push({
                job_name:data[i].job_name,
                job_id: data[i].job_id
              });
            } else {
              if (data[i].dep_id === data[i - 1].dep_id) {
                this.postInfo.push({
                  job_name:data[i].job_name,
                  job_id: data[i].job_id
                });
              } else {
                this.departmentInfo.push({
                  dep_name: data[i].dep_name,
                  dep_id: data[i].dep_id
                });
                this.postInfo.push({
                  job_name:data[i].job_name,
                  job_id: data[i].job_id
                });
              }
            }
          }
        });
      },
      init(){
        this.staffInfo=this.allStaffInfo;
        //初始化表头过滤器 :filters
        this.filters_post_name.length=0;
        for(let i=0;i<this.postInfo.length;i++){
          this.filters_post_name.push({text:this.postInfo[i].job_name, value:this.postInfo[i].job_name});
        }
        this.filters_department_name.splice(0);
        for(var tmp=0;tmp<this.departmentInfo.length;tmp++){
          this.filters_department_name.push({text:this.departmentInfo[tmp].dep_name,value:this.departmentInfo[tmp].dep_name});
        }
      }
    },
    created:function() {
      this.getEmp();
    }
  }
</script>
<style>
  .pagination  .el-input__inner{
    color: white;
  }
  .el-checkbox__label{
    color:#606266;
  }
  .el-table,
  .el-table__empty-text,
  .el-table thead{
    color: white;
    font-size: 20px;
    font-family: '楷体';
  }
  .el-table__column-filter-trigger i,
  .el-pager .number,
  .el-pagination > .el-pager > .el-icon-more {
    color: #fff;
  }
  .el-table th,
  .el-table tr {
    background: transparent;
  }
  .el-table,
  .el-table__expanded-cell {
    background: transparent;
  }
  .el-pager li,
  .el-pagination button.disabled {
    background: transparent;
  }
  .el-pagination button:disabled,
  .el-pager li.active,
  .el-input__inner,
  .el-pagination__total{
    color: white;
    background-color: transparent;
  }
  .el-pagination .btn-next,.el-pagination .btn-prev,
  .serach .el-input__inner::-webkit-input-placeholder{
    color: white;
    background: transparent;
    font-size: 12.5px;
  }
  .serach .el-input__inner {
    background: transparent;
    color: white;
    font-size: 14px;
    border-color: white;
  }
  .el-pagination__jump,
  .serach .el-icon-search,.el-icon-arrow-up:before{
    color: white;
  }
  .el-checkbox__input.is-disabled .el-checkbox__inner, .el-pagination .el-select .el-input__inner{
    background: transparent;
  }
  .el-checkbox__inner{
    background-color: transparent;
  }
  .el-checkbox{
    color:transparent;
    border-color: white;
  }

</style>
<style scoped>

  .allatt{
    position: absolute;
    top:0%;
    left:0%;
    width:100%;
    height: 100%;
  }
  .searchEmp{
    left:1%;
    position: absolute;
    top:3%;
    width:30%;
    height: 15%;
  }
  .table{
    left:1%;
    position: absolute;
    top:9%;
    right: 5%;
    width:94%;
    height: 75%;
  }
  .pagination{
    left:45%;
    position: relative;
    top:2%;
    width:55%;
    height: 10%;
  }
</style>
