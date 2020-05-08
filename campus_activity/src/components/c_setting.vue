<template>
  <div id="setbox">
    <input type="button" id="goback" class="btn" value="返回主页" @click="goback()" />
    <div class="left">
      <ul>
        <li @click="toSetAc()" ref="ac">
          <a href="#">
            <span class="glyphicon glyphicon-list-alt" style="color:red;"></span>&nbsp;&nbsp;校园认证
          </a>
        </li>
        <li @click="toSetSafety()" ref="safety">
          <a href="#">
            <span class="glyphicon glyphicon-lock" style="color:#184d63;"></span>&nbsp;&nbsp;账号与安全
          </a>
        </li>
        <li @click="toSetService()" ref="service">
          <a href="#">
            <span class="glyphicon glyphicon-headphones" style="color:#deaa00;"></span>&nbsp;&nbsp;客服中心
          </a>
        </li>
        <li @click="toSetAbout()" ref="about">
          <a href="#">
            <span class="glyphicon glyphicon-paperclip" style="color:#deaa00;"></span>&nbsp;&nbsp;关于我们
          </a>
        </li>
      </ul>
    </div>
    <div class="main">
      <template v-if="status==='审核通过'">
        <div class="er_main" v-if="isac">
          您已经认证成功了！！！
        </div>
      </template>
      <template v-else-if="lieb==='zuzhi'">
        <div class="er_main c_ac" v-if="isac">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">
                <span>*</span>社团名称：
              </label>
              <div class="col-sm-3">
                <input type="text" class="form-control" v-model="student.name" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">
                <span>*</span>所属学院：
              </label>
              <div class="col-sm-3">
                <select class="form-control" v-model="student.xueyuan">
                  <option>信息工程学院</option>
                  <option>理学院</option>
                  <option>生物化学学院</option>
                  <option>法学院</option>
                  <option>美术学院</option>
                  <option>音乐学院</option>
                  <option>经济学院</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">
                <span>*</span>社团所在地：
              </label>
              <label class="col-sm-3 control-label">
                <input type="text" class="form-control" v-model="student.address" />
              </label>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">
                <span>*</span>负责人姓名：
              </label>
              <label class="col-sm-3 control-label">
                <input type="text" class="form-control" v-model="student.leadername" />
              </label>
              <label class="col-sm-2 control-label">
                <span>*</span>职位：
              </label>
              <label class="col-sm-3 control-label">
                <input type="text" class="form-control" v-model="student.leaderzhiw" />
              </label>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">
                <span>*</span>电话：
              </label>
              <label class="col-sm-3 control-label">
                <input type="text" class="form-control" v-model="student.phone" />
              </label>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">
                <span>*</span>邮箱：
              </label>
              <label class="col-sm-3 control-label">
                <input type="text" class="form-control" v-model="student.email" />
              </label>
            </div>
            <div class="form-group">
              <div class="col-sm-offset-3 col-sm-3">
                <input @click="addStudent()" type="button" class="btn btn-primary" value="提交" />
              </div>
              <div class="col-sm-3">
                <input @click="delStudent()" type="button" class="btn btn-warning" value="取消" />
              </div>
            </div>
          </form>
        </div>
      </template>
      <template v-else>
        <div class="er_main c_ac" v-if="isac">
          <form class="form-horizontal">
            <div class="form-group">
              <label class="col-sm-2 control-label">
                <span>*</span>姓名：
              </label>
              <div class="col-sm-3">
                <input type="text" class="form-control" v-model="student.name" />
              </div>
              <label class="col-sm-2 control-label">
                <span>*</span>性别：
              </label>
              <div class="col-sm-3">
                <label class="radio-inline">
                  <input type="radio" name="sex" value="man" v-model="student.sex" />男
                </label>
                <label class="radio-inline">
                  <input type="radio" name="sex" value="woman" v-model="student.sex" />女
                </label>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">
                <span>*</span>电话：
              </label>
              <label class="col-sm-3 control-label">
                <input type="text" class="form-control" v-model="student.phone" />
              </label>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">
                <span>*</span>身份证号：
              </label>
              <div class="col-sm-3">
                <input type="text" class="form-control" v-model="student.personID" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">
                <span>*</span>所属学院：
              </label>
              <div class="col-sm-3">
                <select class="form-control" v-model="student.xueyuan">
                  <option>信息工程学院</option>
                  <option>理学院</option>
                  <option>生物化学学院</option>
                  <option>法学院</option>
                  <option>美术学院</option>
                  <option>音乐学院</option>
                  <option>经济学院</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">
                <span>*</span>专业班级：
              </label>
              <div class="col-sm-3">
                <input type="text" class="form-control" v-model="student.classname" />
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2 control-label">
                <span>*</span>校园卡号：
              </label>
              <div class="col-sm-3">
                <input type="text" class="form-control" v-model="student.camID" />
              </div>
            </div>
            <div class="form-group">>
              <div class="col-sm-offset-3 col-sm-3">
                <input @click="addStudent()" type="button" class="btn btn-primary" value="提交" />
              </div>
              <div class="col-sm-3">
                <input @click="delStudent()" type="button" class="btn btn-warning" value="取消" />
              </div>
            </div>
          </form>
        </div>
      </template>
      

      <div class="er_main" v-if="issafety">
        <form class=" form-horizontal">
          <div class="form-group">
            <label class="col-sm-2">昵称</label>
            <div class="col-sm-3">
              {{user.name}}
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2">手机号码</label>
            <div class="col-sm-3">
              {{user.phone}}
            </div>
          </div>
          <template v-if="isUpdatePassword">
            <div class="form-group">
              <label class="col-sm-2">修改密码</label>
              <div class="col-sm-3" @click="update()"><a style="cursor: pointer;">></a></div>
            </div>
          </template>
          <template v-else>
            <div class="form-group">
              <label class="col-sm-2">原密码</label>
              <div class="col-sm-3">
                <input type="password" v-model="password">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2">新密码</label>
              <div class="col-sm-3">
                <input type="password" v-model="newPassword">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-2">确认密码</label>
              <div class="col-sm-3">
                <input type="password" v-model="vertifyPassword">
              </div>
            </div>
            <div class="form-group">
              <div class=" col-sm-offset-2 col-sm-3">
                <input type="button" @click="updatePassword()" value="确认修改">
              </div>
            </div>
          </template>
        </form>
      </div>

      <div class="er_main" v-if="isservice">
        <p>常见问题：</p>
        <div class="question">
          <p><a>为什么巴拉巴拉？？</a></p>
          <p>因为这样这样那样哪呀！！！</p>
        </div>
        <div class="question">
          <p><a>为什么巴拉巴拉？？</a></p>
          <p>因为这样这样那样哪呀！！！</p>
        </div>
        <div class="question">
          <p><a>为什么巴拉巴拉？？</a></p>
          <p>因为这样这样那样哪呀！！！</p>
        </div>
        <div class="question">
          <p><a>为什么巴拉巴拉？？</a></p>
          <p>因为这样这样那样哪呀！！！</p>
        </div>
        <div class="question">
          <p><a>为什么巴拉巴拉？？</a></p>
          <p>因为这样这样那样哪呀！！！</p>
        </div>
        
      </div>

      <div class="er_main" v-if="isabout">
        <form class=" form-horizontal">
          <div class="form-group">
            <label class="col-sm-2">版本</label>
            <div class="col-sm-3">
              1.0.0
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2">意见反馈</label>
            <div class="col-sm-3">
              >
            </div>
          </div>
          <div class="form-group">
            <label class="col-sm-2">去评分</label>
            <div class="col-sm-3">
              >
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  name: "c_wode",
  data: function() {
    return {
      user:{},
      student:{},
      name: "",
      id:'',
      password:"",
      newPassword:"",
      vertifyPassword:'',
      isac: false,
      issafety: false,
      isservice: false,
      isabout: false,
      isUpdatePassword:true,
      lieb:"",
      status:""
    };
  },
  methods: {
    toSetAc() {
      this.$refs.ac.classList.add("active");
      this.$refs.safety.classList.remove("active");
      this.$refs.service.classList.remove("active");
      this.$refs.about.classList.remove("active");
      this.isac = true;
      this.issafety = false;
      this.isservice = false;
      this.isabout = false;
    },
    toSetSafety() {
      this.$refs.ac.classList.remove("active");
      this.$refs.safety.classList.add("active");
      this.$refs.service.classList.remove("active");
      this.$refs.about.classList.remove("active");
      this.isac = false;
      this.issafety = true;
      this.isservice = false;
      this.isabout = false;
      this.isUpdatePassword = true
    },
    toSetService() {
      this.$refs.ac.classList.remove("active");
      this.$refs.safety.classList.remove("active");
      this.$refs.service.classList.add("active");
      this.$refs.about.classList.remove("active");
      this.isac = false;
      this.issafety = false;
      this.isservice = true;
      this.isabout = false;
    },
    toSetAbout() {
      this.$refs.ac.classList.remove("active");
      this.$refs.safety.classList.remove("active");
      this.$refs.service.classList.remove("active");
      this.$refs.about.classList.add("active");
      this.isac = false;
      this.issafety = false;
      this.isservice = false;
      this.isabout = true;
    },
    getUser(){
      axios.post('/api/login/getUser',{
        id:this.id
      }).then(result => {
        if(result.data.status === 10000){
          this.user = result.data.user
        }else{
          alert(result.data.mag)
        }
      })
    },
    addStudent(){
      this.student.userid = this.id
      this.student.status = '未审核'
      this.student.isdj = false
      if(this.lieb === 'zuzhi'){
        this.student.lieb ='zuzhi'
      }else{
        this.student.lieb = 'single'
      }
      if(this.vertifyID !== this.id){
        axios.post('/api/student/add',{
        student:this.student
      }).then(result => {
        if(result.data.status === 10000){
          alert('添加认证信息成功！请等待管理员审核')
          this.delStudent()
        }
      })
      }else{
        alert('此用户已经认证过了！！')
      }
      
    },
    getStudent(){
      axios.post('/api/student/getStatus',{
        id:this.id
      }).then(result => {
        if(result.data.status === 10000){
          this.status = result.data.studentstatus
        }else{
          alert(result.data.msg)
        }
      })
    },
    delStudent(){
      this.student = {}
    },
    update(){
      this.isUpdatePassword = false
    },
    updatePassword(){
      if(this.password === this.user.password){
        if(this.newPassword === this.vertifyPassword){
          axios.post('api/login/updatePassword',{
            password:this.newPassword,
            id:this.user._id
          }).then(result => {
            if(result.data.status === 10000){
              alert('修改成功')
              this.isUpdatePassword = true
              this.password = ""
              this.newPassword = ""
              this.vertifyPassword = ""
            }else{
              alert(result.data.msg)
            }
          })
        }else{
          alert('密码输入不一致')
        }
      }else{
        alert('原始密码错误')
      }
    },
    goback() {
      this.$router.push("/");
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
  created(){},
  mounted() {
    if (this.$route.params.index === ":ac") {
      this.toSetAc();
    } else if (this.$route.params.index === ":safety") {
      this.toSetSafety();
    } else if (this.$route.params.index === ":service") {
      this.toSetService();
    } else {
      this.toSetAbout();
    }
    this.name = this.getCookie("name");
    this.id = this.getCookie('id')
    this.lieb = this.getCookie('lieb')
    this.getUser()
    this.getStudent()
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  
}
#setbox {
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 50px;
  margin-bottom: 100px;
  position: relative;
}
#setbox > #goback {
  position: absolute;
  top: -60px;
  right: 0px;
}
#setbox > .left {
  width: 15%;
  float: left;
}
#setbox > .left > ul {
  width: 100%;
}
#setbox > .left > ul > li {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
#setbox > .left > ul > li:hover {
  background-color: #ebedf2;
  border-right: none;
}
#setbox > .left > ul > li > a {
  color: black;
  text-decoration: none;
}
#setbox > .left > ul > li > a:hover {
  color: red;
  text-decoration: none;
}
#setbox > .left > ul > li:first-of-type {
  border-top: 1px solid #ccc;
}
#setbox > .left > ul > li.active {
  background-color: #ebedf2;
  border-right: none;
}
#setbox > .main {
  width: 85%;
  float: left;
  background-color: #ebedf2;
}
#setbox > .main > .er_main {
  width: 90%;
  margin: 5%;
}
#setbox > .main > .er_main>.form-horizontal>.form-group>label>span{
  color:red;
  font-size: 16px;
}
</style>