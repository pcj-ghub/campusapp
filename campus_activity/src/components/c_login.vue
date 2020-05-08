<template>
  <div class="box">
    <span class="header active" @click="log()" id="log">登录</span>
    <span class="header" @click="reg()" id="reg">注册</span>
    <div class="log_main" v-if="!isregbox">
      <form class="form-horizontal">
        <div class="form-group">
          <label for class="col-sm-2 control-label">昵称</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" @blur="isname()" v-model="user.name" />
          </div>
          <label class="col-sm-4 control-label tip">
            <span :class="nameClass"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;{{nameMsg}}
          </label>
        </div>
        <div class="form-group">
          <label for class="col-sm-2 control-label">密码</label>
          <div class="col-sm-6">
            <input
              type="password"
              class="form-control"
              @blur="ispassword()"
              v-model="user.password"
            />
          </div>
          <label class="col-sm-4 control-label tip">
            <span :class="passwordClass"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;{{passwordMsg}}
          </label>
        </div>
        <div class="form-group">
          <label for class="col-sm-2 control-label">验证码</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" @blur="isvertify()" v-model="vertify" />
          </div>
          <label class="col-sm-4 control-label tip">
            <span :class="vertifyClass"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;{{vertifyMsg}}
          </label>
        </div>
        <div class="form-group">
          <div class="col-sm-6 col-sm-offset-2">
            <a href="#" @click="upcaptcha()">
              <img src="/api/login/captcha" alt="验证码" ref="imgyzm" width="256px" height="60px" />
            </a>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-6 col-sm-offset-2">
            <input
              type="button"
              class="btn btn-primary"
              style="width:100%"
              @click="login()"
              value="登录"
            />
          </div>
        </div>
      </form>
    </div>

    <div class="reg_main" v-if="isregbox">
      <form class="form-horizontal">
        <div class="form-group">
          <label class="col-sm-2 control-label">昵称</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" @blur="isname()" v-model="user.name" />
          </div>
          <label class="col-sm-4 control-label tip">
            <span :class="nameClass"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;{{nameMsg}}
          </label>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">密码</label>
          <div class="col-sm-6">
            <input
              type="password"
              class="form-control"
              @blur="ispassword()"
              v-model="user.password"
            />
          </div>
          <label class="col-sm-4 control-label tip">
            <span :class="passwordClass"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;{{passwordMsg}}
          </label>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">确认密码</label>
          <div class="col-sm-6">
            <input
              type="password"
              class="form-control"
              @blur="isVertifyPassword()"
              v-model="vertifyPassword"
            />
          </div>
          <label class="col-sm-4 control-label tip">
            <span :class="vertifyPasswordClass"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;{{vertifyPasswordMsg}}
          </label>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">手机号</label>
          <div class="col-sm-6">
            <input type="tel" class="form-control" @blur="isPhone()" v-model="user.phone" />
          </div>
          <label class="col-sm-4 control-label tip">
            <span :class="regPhoneClass"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;{{regPhoneMsg}}
          </label>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">邮箱</label>
          <div class="col-sm-6">
            <input type="email" class="form-control" @blur="isEmail()" v-model="user.email" />
          </div>
          <label class="col-sm-4 control-label tip">
            <span :class="regEmailClass"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;{{regEmailMsg}}
          </label>
        </div>
        <div class="form-group">
          <label for class="col-sm-2 control-label">验证码</label>
          <div class="col-sm-6">
            <input type="text" class="form-control" @blur="isvertify()" v-model="vertify" />
          </div>
          <label class="col-sm-4 control-label tip">
            <span :class="vertifyClass"></span>
            &nbsp;&nbsp;&nbsp;&nbsp;{{vertifyMsg}}
          </label>
        </div>
        <div class="form-group">
          <div class="col-sm-6 col-sm-offset-2">
            <a href="#" @click="upcaptcha()">
              <img src="/api/login/captcha" alt="验证码" ref="imgyzm" width="256px" height="60px" />
            </a>
          </div>
        </div>
        <div class="form-group">
          <label for class="col-sm-2 control-label">注册类别</label>
          <div class="col-sm-3">
            <div class="checkbox">
              <label>
                <input type="radio" name="lieb" value="single" v-model="user.lieb" />个人
              </label>
            </div>
          </div>
          <div class="col-sm-3">
            <div class="checkbox">
              <label>
                <input type="radio" name="lieb" value="zuzhi" v-model="user.lieb" />组织
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <div class="col-sm-6 col-sm-offset-2">
            <input
              type="button"
              class="btn btn-primary"
              style="width:100%"
              @click="register()"
              value="注册"
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import $ from "jquery";

export default {
  name: "c_login",
  data: function() {
    return {
      user: {},
      vertify: "",
      vertifyPassword: "",
      isName: false,
      isPssword: false,
      isVertify: false,
      isregPhone: false,
      isregEmail: false,
      isregVertifyPassword: false,
      isregbox: false,
      event: ""
    };
  },
  computed: {
    nameMsg() {
      return this.isName ? "" : "请输入正确的昵称";
    },
    nameClass() {
      return this.isName
        ? "glyphicon glyphicon-ok green"
        : "glyphicon glyphicon-remove red";
    },
    passwordMsg() {
      return this.isPssword ? "" : "请输入正确的密码";
    },
    passwordClass() {
      return this.isPssword
        ? "glyphicon glyphicon-ok green"
        : "glyphicon glyphicon-remove red";
    },
    vertifyMsg() {
      return this.isVertify ? "" : "请输入正确的验证码";
    },
    vertifyClass() {
      return this.isVertify
        ? "glyphicon glyphicon-ok green"
        : "glyphicon glyphicon-remove red";
    },
    vertifyPasswordMsg() {
      return this.isregVertifyPassword ? "" : "两次密码输入不一致！";
    },
    vertifyPasswordClass() {
      return this.isregVertifyPassword
        ? "glyphicon glyphicon-ok green"
        : "glyphicon glyphicon-remove red";
    },
    regEmailMsg() {
      return this.isregEmail ? "" : "请输入正确的邮箱";
    },
    regEmailClass() {
      return this.isregEmail
        ? "glyphicon glyphicon-ok green"
        : "glyphicon glyphicon-remove red";
    },
    regPhoneMsg() {
      return this.isregPhone ? "" : "请输入正确的电话号码";
    },
    regPhoneClass() {
      return this.isregPhone
        ? "glyphicon glyphicon-ok green"
        : "glyphicon glyphicon-remove red";
    }
  },
  methods: {
    log() {
      var e = $("#log");
      e[0].classList.add("active");
      e[0].nextElementSibling.classList.remove("active");
      this.isregbox = false;
      this.upcaptcha();
    },
    reg() {
      var e = $("#reg");
      e[0].classList.add("active");
      e[0].previousElementSibling.classList.remove("active");
      this.isregbox = true;
      this.upcaptcha();
    },
    isname() {
      if (!this.user.name) {
        this.isName = false;
      } else if (this.user.name !== "" && this.user.name.length < 8) {
        this.isName = true;
      } else {
        this.isName = false;
      }
    },
    ispassword() {
      if (!this.user.password) {
        this.isPssword = false;
      } else if (this.user.password !== "" && this.user.password.length < 20) {
        this.isPssword = true;
      } else {
        this.isPssword = false;
      }
    },
    isvertify() {
      var captcha = this.getCookie("captcha");
      if (!this.vertify) {
        this.isVertify = false;
      } else if (this.vertify === captcha) {
        this.isVertify = true;
      } else {
        this.isVertify = false;
      }
    },
    isVertifyPassword() {
      if (!this.vertifyPassword) {
        this.isregVertifyPassword = false;
      } else if (this.user.password === this.vertifyPassword) {
        this.isregVertifyPassword = true;
      } else {
        this.isregVertifyPassword = false;
      }
    },
    isPhone() {
      if (!this.user.phone) {
        this.isregPhone = false;
      } else if (/^1[34578]\d{9}$/.test(this.user.phone)) {
        this.isregPhone = true;
      } else {
        this.isregPhone = false;
      }
    },
    isEmail() {
      // console.log('执行了')
      if (!this.user.email) {
        this.isregEmail = false;
      } else if (
        this.user.email.search(
          /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        ) != -1
      ) {
        // console.log('ok')
        this.isregEmail = true;
      } else {
        // console.log('zhixingle')
        this.isregEmail = false;
      }
    },
    login() {
      //登录代码
      // console.log('执行了')
      if (this.isName && this.isPssword && this.isVertify) {
        // console.log('zhixingle1')
        axios
          .post("/api/login", {
            user: this.user
          })
          .then(result => {
            // console.log(result)
            if (result.data.status === 10000) {
              // console.log('gai跳转了')
              this.setCookie("token", result.data.token);
              this.setCookie("name", result.data.name);
              this.setCookie('id',result.data.id)
              this.setCookie('lieb',result.data.lieb)
              this.$router.push("/");
            } else {
              alert(`${result.data.msg}`);
            }
          });
      } else {
        alert("请输入正确的信息进行登录");
      }
    },
    register() {
      if (
        this.isName &&
        this.isPssword &&
        this.isVertify &&
        this.isregPhone &&
        this.isregEmail &&
        this.isregVertifyPassword
      ) {
        axios
          .post("/api/login/register", {
            user: this.user
          })
          .then(result => {
            // console.log(result)
            if (result.data.status === 10000) {
              alert("注册成功。点击确认后跳转登录界面");
              this.log();
            } else {
              alert(`${result.data.msg}`);
            }
          });
      } else {
        alert("请在完善信息后进行注册");
      }
    },
    upcaptcha() {
      //获取验证码
      this.$refs.imgyzm.src = "/api/login/captcha?d=" + Math.random();
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
    },
    //document.cookie="name=value;expires=date";
    setCookie(name, value, iDay) {
      //分别代表cookie名称、cookie值、过期时间
      var oDate = new Date(); //当前时间
      oDate.setDate(oDate.getDate() + iDay); //当前月的日期+过期时间
      document.cookie = name + "=" + value + ";expires=" + oDate;
    }
  },
  mounted() {
    // console.log(this.$route)
    if (this.$route.params.index === ":log") {
      this.log();
    } else {
      this.reg();
    }
  }
};
</script>

<style>
@media (min-width: 768px) {
  .form-horizontal .tip {
    text-align: left;
  }
  .form-horizontal .tip .green {
    color: green;
  }
  .form-horizontal .tip .red {
    color: red;
  }
}

.box {
  width: 60%;
  margin-left: 50%;
  margin-top: 100px;
  transform: translateX(-50%);
  border: 1px solid #ccc;
  box-shadow: 5px 5px 5px 10px #e5e5e5;
  margin-bottom: 100px;
}
.box > span.header {
  display: block;
  width: 50%;
  float: left;
  box-sizing: border-box;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
  background-color: #ccc;
}
.box > .log_main {
  margin-top: 100px;
}
.box > .reg_main {
  margin-top: 100px;
}
.box > span.active {
  background-color: #fff;
}
</style>