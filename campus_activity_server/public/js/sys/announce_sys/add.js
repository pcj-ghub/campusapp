var vm = new  Vue({
  el:'#sysapp',
  data:{
    student:{}
  },
  methods:{
    addUser(){
        axios.post('/students/add',{
          student:vm.student
        }).then(function(result){
          if(result.data.status != 10000){
            layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
            return
          }else{
            layer.alert('添加学生用户成功',{icon:6})
            
          }
        })
      this.student = {}
    }
  }
})