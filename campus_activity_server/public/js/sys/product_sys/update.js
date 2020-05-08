var vm = new  Vue({
  el:'#sysapp',
  data:{
    act:{}
  },
  methods:{
    getUser(){
      this.act = parent.vm.user
      // console.log(this.user)
    },
    updata(){
      // console.log(this.act)
      axios.post('/act/update',{
        act:vm.act
      }).then(function(result){
        if(result.data.status != 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          layer.alert('修改信息成功',{icon:6})
          
        }
      })
    },
    addphoto(){
      var target = document.getElementById('photo')
      var file = target.files[0]
      if(file){
        // console.log(file)
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload=function(e){
        // console.log(e)
        // console.log(this.result)
        vm.act.img = this.result
        // console.log(vm.user.photo)
      }
      }else{
        return
      }
      
    }
  },
  created(){
    this.getUser()
  },
  updated(){

  }
})