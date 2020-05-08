<template>
  <div class="act_box">
    <template v-if="id">
      <span>修改活动信息</span>
    </template>
    <template v-else>
      <span>发布活动</span>
    </template>

    <form class="form-horizontal">
      <div class="form-group">
        <label class="col-sm-2 control-label">活动名称</label>
        <div class="col-sm-5">
          <input type="text" class="form-control" id="actName" name="actName" v-model="act.actName" />
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">活动时间</label>
        <div class="col-sm-5">
          <input
            type="datetime-local"
            class="form-control"
            id="actTime"
            name="actTime"
            v-model="act.actTime"
          />
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">活动地点</label>
        <div class="col-sm-5">
          <input
            type="text"
            class="form-control"
            id="actPlace"
            name="actPlace"
            v-model="act.actPlace"
          />
        </div>
      </div>
      <div class="form-group">
        <label for="tel" class="col-sm-2 control-label">联系方式</label>
        <div class="col-sm-5">
          <input type="tel" class="form-control" id="tel" name="tel" v-model="act.phone" />
        </div>
      </div>
      <div class="form-group">
        <label for="tel" class="col-sm-2 control-label">活动简介</label>
        <div class="col-sm-6">
          <textarea
            name="jianj"
            id="jianj"
            cols="40"
            rows="5"
            maxlength="100"
            v-model="act.jianj"
            style="border-left:1px solid #ccc;"
          ></textarea>
        </div>
      </div>
      <div class="form-group">
            <label class="col-sm-2 control-label">活动类别</label>
            <label class="col-sm-2 control-label">
              <input type="radio" value="竞技" name="liebie" v-model="act.lieb" />竞技
            </label>
            <label class="col-sm-2 control-label">
              <input type="radio" value="娱乐" name="liebie" v-model="act.lieb" />娱乐
            </label>
            <label class="col-sm-2 control-label">
              <input type="radio" value="科技" name="liebie" v-model="act.lieb" />科技
            </label>
            <label class="col-sm-2 control-label">
              <input type="radio" value="文艺" name="liebie" v-model="act.lieb" />文艺
            </label>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">活动级别</label>
            <label class="col-sm-2 control-label">
              <input type="radio" value="校级" name="Jb" v-model="act.Jb" />校级
            </label>
            <label class="col-sm-2 control-label">
              <input type="radio" value="院级" name="Jb" v-model="act.Jb" />院级
            </label>
          </div>
          <div class="form-group">
            <label class="col-sm-2 control-label">活动新鲜度</label>
            <label class="col-sm-2 control-label">
              <input type="radio" value="传统" name="Lx" v-model="act.Lx" />传统
            </label>
            <label class="col-sm-2 control-label">
              <input type="radio" value="新鲜" name="Lx" v-model="act.Lx" />新鲜
            </label>
          </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">活动报名上限</label>
        <div class="col-sm-5">
          <input type="number" class="form-control" v-model="act.num">
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">图片选择</label>
        <div class="col-sm-5">
          <input type="file" id="img" name="img" ref="img" @change="readImg()" />
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label">图片预览</label>
        <div class="col-sm-5">
          <img :src="act.img" ref="imgyulan" width="200%" alt="活动图" />
        </div>
      </div>
      <div class="form-group">
        <div class="col-sm-3 col-sm-offset-2">
          <template v-if="id">
            <input type="button" class="btn btn-primary" value="确定修改" @click="update()" />
          </template>
          <template v-else>
            <input type="button" class="btn btn-primary" value="确定发布" @click="issue()" />
          </template>
          
        </div>
        <div class="col-sm-3">
          <input type="button" class="btn btn-primary" value="取消" @click="goback()" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "c_act",
  data: function() {
    return {
      act: {},
      id: ""
    };
  },
  computed: {},
  methods: {
    readImg() {
      var _this = this;
      var file = this.$refs.img.files[0];
      // console.log(file)
      if (file.size >= 70000) {
        alert("图片选择过大，请重新选择");
        return;
      }
      if (window.FileReader) {
        var fr = new FileReader();
        fr.readAsDataURL(file);
        fr.onload = function() {
          // console.log(this.result)
          _this.act.img = this.result;
          _this.$refs.imgyulan.src = this.result;
        };
      } else {
        alert("Not supported by your browser!");
      }
    },
    issue() {
      if (
        this.act.actName &&
        this.act.actPlace &&
        this.act.actTime &&
        this.act.img
      ) {
        // console.log(this)
        this.act.name = this.getCookie("name");
        if (!this.act.name) {
          alert("请登录后进行发布活动！！");
          return;
        }
        axios
          .post("/api/issue", {
            act: this.act
          })
          .then(result => {
            if (result.data.status === 10000) {
              alert("添加活动成功！！快去通知同学们来参加吧。");
              this.act = {};
              this.$router.push("/");
            } else {
              alert(result.data.msg);
            }
          });
      } else {
        alert("请完善信息后进行发布活动");
      }
    },
    getIssue() {
      axios
        .post("/api/issue/getIssue", {
          id: this.$route.query.id
        })
        .then(result => {
          // console.log(result);
          if (result.data.status === 10000) {
            this.act = result.data.data.issue;
          } else {
            console.log("chucuole");
          }
        });
    },
    update(){
      axios
        .post("/api/issue/updateIssue", {
          id: this.$route.query.id,
          act:this.act
        })
        .then(result => {
          // console.log(result);
          if (result.data.status === 10000) {
            alert('修改成功')
            this.$router.push('/wode:issue')
          } else {
            console.log("chucuole");
          }
        });
    },
    goback() {
      this.$router.go(-1);
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
  mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      this.getIssue();
    }
  }
};
</script>

<style>
.act_box {
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 50px;
  margin-bottom: 100px;
}
.act_box > span {
  display: block;
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}
.act_box > .form-horizontal {
  width: 80%;
  margin-left: 5%;
  margin-top: 50px;
}
</style>