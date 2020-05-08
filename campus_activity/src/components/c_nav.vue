<template>
  <nav class="navbar navbar-default c_nav">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="#">校园活动</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav" style="margin-left:20px">
        <li v-if="!name"><a href="#" @click.prevent="toLogin('log')">登录</a></li>
        <li v-if="name"><a>欢迎你！！</a></li>
        <li v-if="!name"><a href="#" @click.prevent="toLogin('reg')">注册</a></li>
        <li v-if="name"><a>{{name}}</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-user" style="color:blue;"></span>&nbsp;&nbsp;我的 <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li @click="toWode('collect')"><a href="#"><span class="glyphicon glyphicon-star" style="color:red;"></span>&nbsp;&nbsp;我的收藏</a></li>
            <li @click="toWode('issue')"><a href="#"><span class="glyphicon glyphicon-pencil" style="color:#184d63;"></span>&nbsp;&nbsp;我的发布</a></li>
            <li @click="toWode('game')"><a href="#"><span class="glyphicon glyphicon-th" style="color:#deaa00;"></span>&nbsp;&nbsp;我的比赛</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><span class="glyphicon glyphicon-cog" style="color:red;"></span>&nbsp;&nbsp;设置 <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li @click="toSet('ac')"><a href="#"><span class="glyphicon glyphicon-list-alt" style="color:red;"></span>&nbsp;&nbsp;校园认证</a></li>
            <li @click="toSet('safety')"><a href="#"><span class="glyphicon glyphicon-lock" style="color:red;"></span>&nbsp;&nbsp;账号与安全</a></li>
            <li @click="toSet('service')"><a href="#"><span class="glyphicon glyphicon-headphones" style="color:red;"></span>&nbsp;&nbsp;客服中心</a></li>
            <li @click="toSet('about')"><a href="#"><span class="glyphicon glyphicon-paperclip" style="color:red;"></span>&nbsp;&nbsp;关于我们</a></li>
            <li @click="logout()"><a href="#"><span class="glyphicon glyphicon-remove-sign" style="color:red;"></span>&nbsp;&nbsp;退出登录</a></li>
          </ul>
        </li>
      </ul>
      <form class="navbar-form navbar-center">
        <div class="form-group">
          <div class="input-group">
            <input type="text" class="form-control" v-model="key" placeholder="Search campus activity">
            <span @click="search()" style="cursor:pointer" class="input-group-addon" id="basic-addon1"><span class="glyphicon glyphicon-search" style="font-size:12px;" aria-hidden="true"></span><span style="font-size:16px;margin-left:5px;">搜索</span></span>
          </div>
        </div>
        
      </form>
      
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
</template>

<script>
import axios from 'axios'
import Bus from './bus'
export default {
  name: 'c_nav',
  data:function(){
    return{
      name:'',
      key:"",
      actList:[]
    }
  },
  methods:{
    search(){
      axios.post('/api/login/search',{
        key:this.key
      }).then(result => {
        if(result.data.status === 10000){
          // console.log(result)
          Bus.$emit('actList',result.data.actsList,)
        }else{
          alert(result.data.msg)
        }
      })
    },
    logout(){
      this.delCookie('name')
      this.$router.push('/login:log')
    },
    toLogin(x){
      // console.log('ok')
      // console.log(this.$router)
      this.$router.push(`/login:${x}`)
    },
    toWode(x){
      this.$router.push(`/wode:${x}`)
    },
    toSet(x){
      this.$router.push(`/setting:${x}`)
    },
    getCookie(key){//获取cookie
      var arr1 = document.cookie.split(';')
      for(var i = 0;i < arr1.length;i++){
        var arr2 = arr1[i].split('=')
        if(arr2[0] ==key || arr2[0] == ' '+key){
          return arr2[1]
        }
      }
    },
    setCookie(name,value,iDay){          //分别代表cookie名称、cookie值、过期时间
      var oDate=new Date();                    //当前时间
      oDate.setDate(oDate.getDate()+iDay);      //当前月的日期+过期时间
      document.cookie=name+'='+value+';expires='+oDate;
    },
    delCookie(key) {
      this.setCookie(key, '', -1);  //cookie的过期时间设为昨天
    }
  },
  created(){
    this.name = this.getCookie('name')
  },
  mounted(){
    // console.log(this.$route)

    // 以下是访问参数的两种方法。
    // 可以返回查询字符串的信息，这是通过 ？name=name&&password=passwprd 的方法进行设置的
    // console.log(this.$route.query)
    // 可以使用 this.$route.params 来访问参数，这里是通过 url 地址来访问的，首先在配置路由中加上 /:id/:name ，然后在 url 书写栏上进行查询字符串。例如：http:www.baidu.com/123/pcj
    // console.log(this.$route.params)
  }
  
}
</script>

<style>

#bs-example-navbar-collapse-1{
  position: relative;
}
.navbar-center{
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>