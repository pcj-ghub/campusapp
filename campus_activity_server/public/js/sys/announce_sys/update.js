var vm = new  Vue({
  el:'#sysapp',
  data:{
    student:{}
  },
  methods:{
    updateStudent(lieb){
      axios.post('/students/update',{
        lieb,
        student:this.student
      }).then(function(result){
        if(result.data.status != 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          layer.alert('修改信息成功',{icon:6})
          
        }
      })
    },
    getUser(){
      this.student = parent.vm.user
      // console.log(this.user)
    }
  },
  created(){
    this.getUser()
  },
  updated(){

  }
})