<template>
  <div id="box">
    <input type="button" id="goback" class="btn" value="返回主页" @click="goback()" />
    <div class="left">
      <ul>
        <li @click="toWodeCollect()" ref="collect">
          <a href="#">
            <span class="glyphicon glyphicon-star" style="color:red;"></span>&nbsp;&nbsp;我的收藏
          </a>
        </li>
        <li @click="toWodeIssue()" ref="issue">
          <a href="#">
            <span class="glyphicon glyphicon-pencil" style="color:#184d63;"></span>&nbsp;&nbsp;我的发布
          </a>
        </li>
        <li @click="toWodeGame()" ref="game">
          <a href="#">
            <span class="glyphicon glyphicon-th" style="color:#deaa00;"></span>&nbsp;&nbsp;我的比赛
          </a>
        </li>
      </ul>
    </div>
    <div class="main">
      <template v-if="lieb==='zuzhi'&&status ==='审核通过'">
      <div class="issue_main er_amin" v-if="isissue">
        <span id="issuespan" v-if="!IssueActList.length">您还没有发布活动哦！！去发布吧</span>
        <table class="table table-hover table-striped" v-for="item in IssueActList" :key="item._id">
          <tbody class="tbody">
            <tr>
              <td rowspan="4">
                <img :src="item.img" width="200px" height="160px" alt="活动图" />
              </td>
              <td>活动名称：{{item.actName}}</td>
              <td rowspan="4">
                <input @click="update(item._id)" type="button" class="btn btn-warning" value="修改信息" />
              </td>
              <td rowspan="4">
                <input
                  @click="torecord(item._id)"
                  type="button"
                  class="btn btn-primary"
                  value="成绩录入"
                />
              </td>
            </tr>
            <tr>
              <td>活动时间：{{item.actTime}}</td>
            </tr>
            <tr>
              <td>活动地点：{{item.actPlace}}</td>
            </tr>
            <tr>
              <td>活动简介：{{item.jianj}}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <span>已过期的发布</span>
        </div>
        <span id="timeoutspan" v-if="!IssueTimeoutActList.length">还没有过期的活动哦</span>
        <table
          class="table table-hover table-striped"
          v-for="item in IssueTimeoutActList"
          :key="item._id"
        >
          <tbody class="tbody">
            <tr>
              <td rowspan="4">
                <img :src="item.img" width="200px" height="160px" alt="活动图" />
              </td>
              <td>活动名称：{{item.actName}}</td>
              <td rowspan="4">
                <input @click="delAct(item._id)" type="button" class="btn btn-danger" value="删除活动" />
              </td>
              <td rowspan="4">
                <input @click="tock(item._id)" type="button" class="btn btn-primary" value="成绩查询" />
              </td>
            </tr>
            <tr>
              <td>活动时间：{{item.actTime}}</td>
            </tr>
            <tr>
              <td>活动地点：{{item.actPlace}}</td>
            </tr>
            <tr>
              <td>活动简介：{{item.jianj}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      </template>
      <template v-else>
        <div class="issue_main er_amin" v-if="isissue">
          您还没有获得发布活动的许可，请联系管理员处理！！！
        </div>
      </template>
      

      <div class="collect_main er_amin" v-if="iscollect">
        <span id="issuespan" v-if="!collectActList.length">您还没有收藏活动哦！！快去看看吧</span>
        <table
          class="table table-hover table-striped"
          v-for="item in collectActList"
          :key="item._id"
        >
          <tbody class="tbody">
            <tr>
              <td rowspan="4">
                <img :src="item.img" width="200px" height="160px" alt="活动图" />
              </td>
              <td>活动名称：{{item.actName}}</td>
              <td rowspan="4">
                <input
                  @click="delCollect(item._id)"
                  type="button"
                  class="btn btn-danger"
                  value="取消收藏"
                />
              </td>
              <td rowspan="4">
                <template v-if="item.applyName.includes(name)">
                  <input type="button" class="btn btn-primary" value="已报名参加" disabled />
                </template>
                <template v-else>
                  <input
                    id="apply"
                    @click="apply(item._id,item.actName,item.name,item.applyName)"
                    type="button"
                    class="btn btn-primary"
                    value="报名参加"
                  />
                </template>
              </td>
            </tr>
            <tr>
              <td>活动时间：{{item.actTime}}</td>
            </tr>
            <tr>
              <td>活动地点：{{item.actPlace}}</td>
            </tr>
            <tr>
              <td>活动简介：{{item.jianj}}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <span>已过期的收藏</span>
        </div>
        <span id="timeoutspan" v-if="!collectTimeoutActList.length">还没有过期的活动哦</span>
        <table
          class="table table-hover table-striped"
          v-for="item in collectTimeoutActList"
          :key="item._id"
        >
          <tbody class="tbody">
            <tr>
              <td rowspan="4">
                <img :src="item.img" width="200px" height="160px" alt="活动图" />
              </td>
              <td>活动名称：{{item.actName}}</td>
              <td rowspan="4">
                <input
                  @click="delCollect(item._id)"
                  type="button"
                  class="btn btn-danger"
                  value="删除活动"
                />
              </td>
              <td rowspan="4"></td>
            </tr>
            <tr>
              <td>活动时间：{{item.actTime}}</td>
            </tr>
            <tr>
              <td>活动地点：{{item.actPlace}}</td>
            </tr>
            <tr>
              <td>活动简介：{{item.jianj}}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="game_amin er_amin" v-if="isgame">
        <span id="issuespan" v-if="!applyActList.length">您还没有参加比赛哦！！快去看看吧</span>
        <table class="table table-hover table-striped" v-for="item in applyActList" :key="item._id">
          <tbody class="tbody">
            <tr>
              <td rowspan="4">
                <img :src="item.img" width="200px" height="160px" alt="活动图" />
              </td>
              <td>活动名称：{{item.actName}}</td>
              <td rowspan="4">
                <input
                  @click="delApply(item._id)"
                  type="button"
                  class="btn btn-danger"
                  value="取消比赛"
                />
              </td>
              <td rowspan="4">
                <input @click="tock(item._id)" type="button" class="btn btn-primary" value="成绩查询" />
              </td>
            </tr>
            <tr>
              <td>活动时间：{{item.actTime}}</td>
            </tr>
            <tr>
              <td>活动地点：{{item.actPlace}}</td>
            </tr>
            <tr>
              <td>活动简介：{{item.jianj}}</td>
            </tr>
          </tbody>
        </table>

        <div>
          <span>已过期的比赛</span>
        </div>
        <span id="timeoutspan" v-if="!applyTimeoutActList.length">还没有过期的比赛哦</span>
        <table
          class="table table-hover table-striped"
          v-for="item in applyTimeoutActList"
          :key="item._id"
        >
          <tbody class="tbody">
            <tr>
              <td rowspan="4">
                <img :src="item.img" width="200px" height="160px" alt="活动图" />
              </td>
              <td>活动名称：{{item.actName}}</td>
              <td rowspan="4">
                <input
                  @click="delApply(item._id)"
                  type="button"
                  class="btn btn-danger"
                  value="删除比赛"
                />
              </td>
              <td rowspan="4">
                <input @click="tock(item._id)" type="button" class="btn btn-danger" value="成绩查询" />
              </td>
            </tr>
            <tr>
              <td>活动时间：{{item.actTime}}</td>
            </tr>
            <tr>
              <td>活动地点：{{item.actPlace}}</td>
            </tr>
            <tr>
              <td>活动简介：{{item.jianj}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <template v-if="isrecord">
      <div class="recordBox">
        <span class="close" @click="close()">+</span>
        <span>成绩录入</span>
        <div>
          <p>比赛信息：</p>
          <p>
            <span>名称：{{act.actName}}</span>
            <span>举办人：{{act.name}}</span>
          </p>
          <p>
            参赛人数：
            <input type="number" value="10" v-model="n" @change="tianpalyer()" />
          </p>
        </div>
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <td>序号</td>
              <td>姓名</td>
              <td>成绩</td>
              <td>备注</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in palyer" :key="item.id">
              <td>{{item.id}}</td>
              <td class="first">
                <input type="text" v-model="item.name" />
              </td>
              <td class="second">
                <input type="text" v-model="item.chenj" />
              </td>
              <td class="three">
                <input type="text" v-model="item.tip" />
              </td>
            </tr>
          </tbody>
        </table>
        <input type="button" class="btn btn-primary" @click="record()" value="提交" />
      </div>
    </template>
    <template v-else>
      <div class="recordBox">
        <span class="close" @click="close()">+</span>
        <span>成绩录入</span>
        <div>
          <p>比赛信息：</p>
          <p>
            <span>名称：{{act.actName}}</span>
            <span>举办人：{{act.name}}</span>
          </p>
          <p>参赛人数：{{n}}</p>
        </div>
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <td>序号</td>
              <td>姓名</td>
              <td>成绩</td>
              <td>备注</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in palyer" :key="item.id">
              <td>{{item.id}}</td>
              <td class="first">{{item.name}}</td>
              <td class="second">{{item.chenj}}</td>
              <td class="three">{{item.tip}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>

<script>
import $ from "jquery";
import axios from "axios";
export default {
  name: "c_wode",
  data: function() {
    return {
      isissue: false,
      iscollect: false,
      isgame: false,
      IssueActList: [],
      IssueTimeoutActList: [],
      isrecord: true,
      collectActList: [],
      collectTimeoutActList: [],
      applyActList: [],
      applyTimeoutActList: [],
      name: "",
      palyer: [],
      n: "",
      id: "",
      userid:"",
      act: [],
      lieb:'',
      status:""
    };
  },
  methods: {
    record() {
      axios
        .post("api/getGoods/addRecord", {
          id: this.id,
          palyer: this.palyer
        })
        .then(result => {
          if (result.data.status === 10000) {
            alert("成绩上传成功");
            $(".recordBox").slideUp();
          } else {
            alert(result.data.msg);
          }
        });
    },
    tianpalyer() {
      this.palyer = [];
      if (this.n) {
        for (let i = 0; i < this.n; i++) {
          var item = { id: i + 1 };
          this.palyer.push(item);
        }
      }
    },
    torecord(id) {
      axios
        .post("api/getGoods/getName", {
          id
        })
        .then(result => {
          if (result.data.status === 10000) {
            this.act = result.data.data.act;
            this.id = id;
            this.isrecord = true;
            $(".recordBox").slideDown();
          } else {
            alert(result.data.msg);
          }
        });
    },
    tock(id) {
      axios
        .post("api/getGoods/getName", {
          id
        })
        .then(result => {
          if (result.data.status === 10000) {
            this.act = result.data.data.act;
          } else {
            alert(result.data.msg);
          }
        });
      axios
        .post("api/getGoods/ckRecord", {
          id
        })
        .then(result => {
          if (result.data.status === 10000) {
            this.isrecord = false;
            this.palyer = result.data.data.palyer;
            this.n = this.palyer.length
            $(".recordBox").slideDown();
          } else {
            alert(result.data.msg);
          }
        });
    },
    close() {
      $(".recordBox").slideUp();
    },
    toWodeCollect() {
      this.$refs.collect.classList.add("active");
      this.$refs.issue.classList.remove("active");
      this.$refs.game.classList.remove("active");
      this.isissue = false;
      this.iscollect = true;
      this.isgame = false;
      this.getCollectActList();
    },
    toWodeIssue() {
      this.$refs.issue.classList.add("active");
      this.$refs.collect.classList.remove("active");
      this.$refs.game.classList.remove("active");
      this.isissue = true;
      this.iscollect = false;
      this.isgame = false;
      if(this.lieb==='zuzhi'){
        this.getIssueActList();
      }
      
    },
    toWodeGame() {
      this.$refs.game.classList.add("active");
      this.$refs.collect.classList.remove("active");
      this.$refs.issue.classList.remove("active");
      this.isissue = false;
      this.iscollect = false;
      this.isgame = true;
      this.getApplyActList();
    },
    getIssueActList() {
      var name = this.getCookie("name");
      axios
        .post("/api/issue/getIssueActList", {
          name
        })
        .then(result => {
          if (result.data.status === 10000) {
            this.IssueActList = result.data.IssueActList.filter(item => {
              let yourtime = item.actTime;
              yourtime = yourtime.replace(/-/g, "/");
              yourtime = yourtime.replace("T", " ");
              let d2 = new Date();
              let d1 = new Date(Date.parse(yourtime));
              if (d1 >= d2) {
                return item;
              }
            });
            this.IssueTimeoutActList = result.data.IssueActList.filter(item => {
              let yourtime = item.actTime;
              yourtime = yourtime.replace(/-/g, "/");
              yourtime = yourtime.replace("T", " ");
              let d2 = new Date();
              let d1 = new Date(Date.parse(yourtime));
              if (d1 < d2) {
                return item;
              }
            });
          } else {
            alert(result.data.msg);
          }
        });
    },
    getCollectActList() {
      var name = this.getCookie("name");
      axios
        .post("/api/issue/getCollectActList", {
          name
        })
        .then(result => {
          // console.log(result)
          // result.data.collectActList
          if (result.data.status === 10000) {
            this.collectActList = result.data.collectActList.filter(item => {
              let yourtime = item.actTime;
              yourtime = yourtime.replace(/-/g, "/");
              yourtime = yourtime.replace("T", " ");
              let d2 = new Date();
              let d1 = new Date(Date.parse(yourtime));
              if (d1 >= d2) {
                return item;
              }
            });
            this.collectTimeoutActList = result.data.collectActList.filter(
              item => {
                let yourtime = item.actTime;
                yourtime = yourtime.replace(/-/g, "/");
                yourtime = yourtime.replace("T", " ");
                let d2 = new Date();
                let d1 = new Date(Date.parse(yourtime));
                if (d1 < d2) {
                  return item;
                }
              }
            );
          } else {
            alert(result.data.msg);
          }
        });
    },
    getApplyActList() {
      var name = this.getCookie("name");
      axios
        .post("/api/issue/getApplyActList", {
          name
        })
        .then(result => {
          // console.log(result)
          if (result.data.status === 10000) {
            this.applyActList = result.data.applyActList.filter(item => {
              let yourtime = item.actTime;
              yourtime = yourtime.replace(/-/g, "/");
              yourtime = yourtime.replace("T", " ");
              let d2 = new Date();
              let d1 = new Date(Date.parse(yourtime));
              if (d1 >= d2) {
                return item;
              }
            });
            this.applyTimeoutActList = result.data.applyActList.filter(item => {
              let yourtime = item.actTime;
              yourtime = yourtime.replace(/-/g, "/");
              yourtime = yourtime.replace("T", " ");
              let d2 = new Date();
              let d1 = new Date(Date.parse(yourtime));
              if (d1 < d2) {
                return item;
              }
            });
          } else {
            alert(result.data.msg);
          }
        });
    },
    apply(id,actName,name,applyName) {
      var uname = this.getCookie("name");
      // document.getElementById('apply').disabled = true
      axios
        .post("/api/getGoods/apply", {
          uname,
          id
        })
        .then(result => {
          // console.log(result)
          if (result.data.status === 10000) {
            document.getElementById("apply").disabled = true;
          } else {
            alert("出错了");
          }
        });
      
      axios
        .post("/api/act/addbm", {
          actName,
          name,
          applyName,
          userid:this.userid
        })
        .then(result => {
          // console.log(result)
          if (result.data.status === 10000) {
            document.getElementById("apply").disabled = true;
          } else {
            alert("出错了");
          }
        });
    },
    delApply(id) {
      var name = this.getCookie("name");
      axios
        .post("/api/getGoods/delApply", {
          name,
          id
        })
        .then(result => {
          if (result.data.status === 10000) {
            alert("删除比赛成功");
            this.getApplyActList();
          } else {
            alert(result.data.msg);
          }
        });
    },
    delCollect(id) {
      var name = this.getCookie("name");
      axios
        .post("/api/getGoods/delCollect", {
          name,
          id
        })
        .then(result => {
          if (result.data.status === 10000) {
            alert("删除收藏成功");
            this.getCollectActList();
          } else {
            alert(result.data.msg);
          }
        });
    },
    delAct(id) {
      axios
        .post("/api/getGoods/delAct", {
          id
        })
        .then(result => {
          if (result.data.status === 10000) {
            alert("删除活动成功");
            this.getIssueActList();
          } else {
            alert(result.data.msg);
          }
        });
    },
    update(id) {
      this.$router.push("/act?id=" + id);
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
    },
    getStudent(){
      axios.post('/api/student/getStatus',{
        id:this.userid
      }).then(result => {
        if(result.data.status === 10000){
          this.status = result.data.studentstatus
        }else{
          alert(result.data.msg)
        }
      })
    }
  },
  mounted() {
    if (this.$route.params.index === ":collect") {
      this.toWodeCollect();
    } else if (this.$route.params.index === ":issue") {
      this.toWodeIssue();
    } else {
      this.toWodeGame();
    }
    this.userid = this.getCookie('id')
    this.name = this.getCookie("name");
    this.lieb = this.getCookie('lieb')
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
#box {
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 50px;
  margin-bottom: 100px;
  position: relative;
}
#box > .recordBox {
  position: absolute;
  margin-left: 50%;
  transform: translateX(-50%);
  width: 400px;
  background-color: white;
  display: none;
  border: 1px solid #ccc;
  box-shadow: 0px 0px 3px 3px #ccc;
}
#box > .recordBox > input {
  margin-left: 50%;
  transform: translateX(-50%);
}
#box > .recordBox > .close {
  display: block;
  position: absolute;
  top: 1px;
  right: -178px;
  transform: rotateZ(45deg);
}
#box > .recordBox > span {
  display: block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-bottom: 30px;
  font-size: 20px;
  text-align: center;
}
#box > .recordBox > div {
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
  border: 1px solid #ccc;
}
#box > .recordBox > div > p {
  color: #918989;
}
#box > .recordBox > div > p > input {
  width: 50px;
  border: 1px solid #ccc;
  margin-left: 10px;
}
#box > .recordBox > table {
  width: 90%;
  margin-left: 50%;
  transform: translateX(-50%);
  margin-top: 30px;
}
#box > .recordBox > table tr td {
  text-align: center;
}
#box > .recordBox > table > tbody > tr > td.first > input {
  width: 100px;
  border: 1px solid #a9a9a9;
}
#box > .recordBox > table > tbody > tr > td.second > input {
  width: 50px;
  border: 1px solid #a9a9a9;
}
#box > .recordBox > table > tbody > tr > td.three > input {
  width: 100px;
  border: 1px solid #a9a9a9;
}
#box > #goback {
  position: absolute;
  top: -60px;
  right: 0px;
}
#box > .left {
  width: 15%;
  float: left;
}
#box > .left > ul {
  width: 100%;
}
#box > .left > ul > li {
  width: 100%;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-left: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
}
#box > .left > ul > li:hover {
  background-color: #ebedf2;
  border-right: none;
}
#box > .left > ul > li > a {
  color: black;
  text-decoration: none;
}
#box > .left > ul > li > a:hover {
  color: red;
  text-decoration: none;
}
#box > .left > ul > li:first-of-type {
  border-top: 1px solid #ccc;
}
#box > .left > ul > li.active {
  background-color: #ebedf2;
  border-right: none;
}
#box > .main {
  width: 85%;
  float: left;
  background-color: #ebedf2;
}
#box > .main > .er_amin > table {
  width: 90%;
  margin-bottom: 50px;
  margin: 5%;
}
#box > .main > .er_amin > div {
  width: 100%;
  border-bottom: 1px solid #ccc;
}
#box > .main > .er_amin > div > span {
  display: block;
  width: 100px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  border-bottom: none;
}
#box > .main > .er_amin > #timeoutspan {
  display: block;
  margin-top: 20px;
  margin-bottom: 50px;
  margin-left: 40%;
}
</style>