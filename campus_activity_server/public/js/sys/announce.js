var vm = new Vue({
  el:'#sysapp',
  data:{
    adminName:'',
    user:{},
    userList:[],
    fyList:[],
    n:'',
    cur:1,
    iszuzhi:true,
    p:""
  },
  methods:{
    upstatus(id){
      axios.post('/students/updateStatus',{
        id
      }).then(result => {
        if(result.data.status === 10000){
          alert('审核成功！！')
          this.searchUser(this.p)
        }else{
          alert('出错了')
        }
      })
    },
    searchUser(p){
      this.p = p
      // console.log(p)
      if(p === 'zuzhi'){
        console.log('ok')
        this.iszuzhi = true
      }else{
        this.iszuzhi = false
      }
      var username = this.user.username
      var userid = this.user.userid
      var cur = this.cur
      axios.post('/students/search',{
        username:username,
        userid:userid,
        cur:cur,
        p
      }).then(function(result){
        if(result.data.status != 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          vm.userList = result.data.data.userList
          vm.n = result.data.data.n
          // console.log(result.data.data.n)
          vm.setFy(1)
        }
      })
    },
    toDjUser(){
      parent.vm.sysHtml = '../../sys/djUser.html'
      parent.vm.secondLevel = '查看冻结用户'
      parent.vm.arr.push({id:2,sysHtml:parent.vm.sysHtml})
    },
    toAdd(){
      parent.vm.sysHtml = '../../sys/announce_sys/add.html'
      parent.vm.secondLevel = '添加学生用户'
      parent.vm.arr.push({id:2,sysHtml:parent.vm.sysHtml})
    },
    toUpdate(user){
      console.log(user)
      parent.vm.sysHtml = '../../sys/announce_sys/updata.html'
      parent.vm.secondLevel = '编辑学生信息'
      parent.vm.arr.push({id:2,sysHtml:parent.vm.sysHtml})
      parent.vm.user = user
    },
    del(id){
      // console.log(id)
      axios.post('/students/del',{
        id
      }).then(function(result){
        if(result.data.status != 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          layer.alert('冻结用户成功',{icon:6})
        }
      })
    },
    getUserList(cur){
      var username = this.user.username
      var userid = this.user.userid
      // console.log('1............ok')
      // console.log(typeof cur)
      if(typeof cur == 'number'&&vm.n){
        // console.log('2............ok')
        axios.post('/students/search',{
          username:username,
          userid:userid,
          cur:cur,
          p:this.p
        }).then(function(result){
          if(result.data.status != 10000){
            layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
            return
          }else{
            vm.userList = result.data.data.userList
            vm.n = result.data.data.n
            // console.log(result.data.data.n)
            vm.setFy(cur)
          }
        })
      }
      
    },
    setFy(cur){//分页代码，需要传入一个参数，当前在那一页
      if(vm.n <= 5){
        vm.fyList = []
        for(var i = 1;i<=vm.n;i++){
          vm.fyList.push({id:i,text:i})
        }
        return
      }
      if(vm.n>5&&cur<=3){
        vm.fyList = []
        vm.fyList = [
          {id:1,text:1},
          {id:2,text:2},
          {id:3,text:3},
          {id:4,text:4},
          {id:5,text:'...'}
        ]
        return
      }
      if(vm.n>5&&cur>3&&cur<vm.n-2){
        vm.fyList = []
        vm.fyList = [
          {id:1,text:'...'},
          {id:2,text:cur-1},
          {id:3,text:cur},
          {id:4,text:cur+1},
          {id:5,text:'...'}
        ]
        return
      }
      if(vm.n>5&&cur>3&&cur==vm.n-2){
        vm.fyList = []
        vm.fyList = [
          {id:1,text:'...'},
          {id:2,text:cur-1},
          {id:3,text:cur},
          {id:4,text:cur+1},
          {id:5,text:cur+2}
        ]
        return
      }
      if(vm.n>5&&cur>3&&cur>vm.n-2){
        vm.fyList = []
        vm.fyList = [
          {id:1,text:'...'},
          {id:2,text:vm.n-2-1},
          {id:3,text:vm.n-2},
          {id:4,text:vm.n-2+1},
          {id:5,text:vm.n-2+2}
        ]
        return
      }
    },
    getAdminName(){//检测是否登录需要用到 getCookie()
      var token = this.getCookie('token')//请求adminName
      // console.log(token)
      if(!token){
        layer.alert('您还没有登录，点击去登录吧！！')
        return
      }
      axios.post('/adminLogin',{
        token:token
      }).then(function(result){
        if(result.data.status != 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          vm.adminName = result.data.adminName
        }
      })
    },
    getCookie(key){
      // console.log(key)
      var arr1 = document.cookie.split(';')
      // console.log(arr1)
      for(var i = 0;i < arr1.length;i++){
        var arr2 = arr1[i].split('=')
        // console.log(arr2[0]+'.....'+arr2[0].length)
        if(arr2[0] ==key || arr2[0] == ' '+key){
          return arr2[1]
        }
      }
    }
  },//methods方法结束
  created(){
    this.getAdminName()
    this.searchUser('single')
  }
})