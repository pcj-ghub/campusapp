<template>
  <div class="xxgl">
    <h3>消息管理</h3>
    <hr>
    <div>
      <template v-if="lieb === 'single'">
        <div v-for="item in bm" :key="item._id">
          <p>报名进度：</p>
          <p v-if="item.status ==='未审核'">您报名参加的由<span>{{item.name}}</span>举办的<span>{{item.actName}}</span>比赛正在处理中！请耐心等待</p>
          <p v-else>您已经成功报名参加的由<span>{{item.name}}</span>举办的<span>{{item.actName}}</span>比赛</p>
        </div>
      </template>
      <template v-else>
        
          <table class=" table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <td colspan="2">比赛信息</td>
                <td colspan="5">参赛者信息</td>
                <td colspan="2">操作</td>
              </tr>
              <tr>
                <td>比赛名</td>
                <td>举办组织</td>
                <td>姓名</td>
                <td>电话</td>
                <td>学院</td>
                <td>班级</td>
                <td>学生卡号</td>
                <td>审核状态</td>
                <td>操作</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in bm" :key="item._id">
                <td>{{item.actName}}</td>
                <td>{{item.name}}</td>
                <td>{{item.bmName}}</td>
                <td>{{item.phone}}</td>
                <td>{{item.xueyuan}}</td>
                <td>{{item.classname}}</td>
                <td>{{item.camID}}</td>
                <td>{{item.status}}</td>
                <td><input type="button" class=" btn btn-primary" value="通过审核" @click="tonggBm(item.actName,item._id)"></td>
              </tr>
            </tbody>

          </table>
       
      </template>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name:'c_xxgl',
  data:function(){
    return {
      bm:[],
      id:"",
      lieb:"",
      name:''
    }
  },
  methods:{
    tonggBm(name,id){
      axios.post('/api/act/updateBm',{
        name,
        id
      }).then(result => {
        if(result.data.status === 10000){
          alert(result.data.msg)
        }else{
          alert(result.data.msg)
        }
      })
      this.getBm()
    },
    getBm(){
      if(this.lieb ==='single'){
        axios.post('/api/act/getBm',{
        id:this.id
      }).then(result => {
        if(result.data.status === 10000){
          this.bm = result.data.bm
        }else{
          alert(result.data.msg)
        }
      })
      }else{
        axios.post('/api/act/getBm',{
        name:this.name
      }).then(result => {
        if(result.data.status === 10000){
          this.bm = result.data.bm
        }else{
          alert(result.data.msg)
        }
      })
      }
      
    },
    getCookie(key) {
      //获取cookie
      var arr1 = document.cookie.split(";");
      for (var i = 0; i < arr1.length; i++) {
        var arr2 = arr1[i].split("=");
        if (arr2[0] == key || arr2[0] == " " + key) {
          return arr2[1];
        }
      }
    }
  },
  created(){
    this.id = this.getCookie('id')
    this.lieb = this.getCookie('lieb')
    this.name = this.getCookie('name')
    this.getBm()
  }
}
</script>

<style>
.xxgl{
  width: 70%;
  margin-left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 0 3px 3px #ccc;
  margin-top: 100px;
  padding: 20px;
}
.xxgl>div>div>p>span{
  padding: 0 10px;
  color: red;
}
</style>