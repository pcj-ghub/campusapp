var vm = new Vue({
  el:'#sysapp',
  data:{
    grList:[],
    stList:[]
  },
  methods:{
    getDjUser(){
      axios.get('/students/getDjUser').then(result => {
        if(result.data.status != 10000){
          layer.alert(`错误代码：${result.data.status}<br>错误信息：${result.data.msg}`)
          return
        }else{
          this.grList = result.data.students.filter(item => {
            if(item.lieb === 'single'){
              return item
            }
          })
          this.stList = result.data.students.filter(item => {
            if(item.lieb === 'zuzhi'){
              return item
            }
          })
        }
      })
    }
  },//methods方法结束
  created(){
    this.getDjUser()
  }
})