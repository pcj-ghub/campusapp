<template>
  <div id="c_navbar">
    <div class="c_head">
      <div class="c_re" @click="getActsList()"><span class="glyphicon glyphicon-star-empty" style="color:red;"></span>&nbsp;&nbsp;&nbsp;热门</div>
      <ul class="c_wenzi">
        <li @click="getActsList('竞技')">竞技</li>
        <li @click="getActsList('娱乐')">娱乐</li>
        <li @click="getActsList('科技')">科技</li>
        <li @click="getActsList('文艺')">文艺</li>
      </ul>
    </div>
    <div class="c_main">
      <div class="c_left">
        <span v-if="goodsList.length === 0" class="nowno">暂时还没有活动哦！！！</span>
        <div class='c_good' v-for="item in goodsList" :key="item._id">
          <span>{{item.actName}}</span>
          <img :src="item.img" alt="tupian">
          <p>举办人：{{ item.name }}
            <span class="c_small">
              <span><span class="glyphicon glyphicon-thumbs-up"></span>{{item.zan}}</span>
              <span><span class="glyphicon glyphicon-thumbs-down"></span>{{item.cai}}</span>
              <span :class="(item.collectName.includes(name))?'active':''" @click="addCollect(item._id,$event)"><span class="glyphicon glyphicon-star"></span></span>
            </span>
          </p>
          <p>地点：{{ item.actPlace }}</p>
          <p>时间：{{ item.actTime }}</p>
          <p>可报名人数：{{ item.num }}</p>
          <p>简介：{{item.jianj.replace(/\n|\r\n/g,'<br>')}}</p>
        </div>
      </div>
      <div class="c_right">
        <div class="c_act" @click="toAct()">活动发布</div>
        <div class="c_pl" @click="toXxgl()">消息管理</div>
        <div class="c_cjcx">活动论坛</div>
      </div>
    </div>
    <div class="c_head">
      <div class="c_re"><span class="glyphicon glyphicon-star-empty" style="color:red;"></span>&nbsp;&nbsp;&nbsp;活动级别</div>
      <ul class="c_wenzi">
        <li @click="getActsJbList('校级')">校级</li>
        <li @click="getActsJbList('院级')">院级</li>
      </ul>
    </div>
    <div class="c_main">
      <div class="c_left">
        <span v-if="goodsJbList.length === 0" class="nowno">暂时还没有活动哦！！！</span>
        <div class='c_good' v-for="item in goodsJbList" :key="item._id">
          <span>{{item.actName}}</span>
          <img :src="item.img" alt="tupian">
          <p>举办人：{{ item.name }}
            <span class="c_small">
              <span><span class="glyphicon glyphicon-thumbs-up"></span>{{item.zan}}</span>
              <span><span class="glyphicon glyphicon-thumbs-down"></span>{{item.cai}}</span>
              <span :class="(item.collectName.includes(name))?'active':''" @click="addCollect(item._id,$event)"><span class="glyphicon glyphicon-star"></span></span>
            </span>
          </p>
          <p>地点：{{ item.actPlace }}</p>
          <p>时间：{{ item.actTime }}</p>
          <p>可报名人数：{{ item.num }}</p>
          <p>简介：{{ item.jianj }}</p>
        </div>
      </div>
    </div>
    <div class="c_head">
      <div class="c_re"><span class="glyphicon glyphicon-star-empty" style="color:red;"></span>&nbsp;&nbsp;&nbsp;活动类型</div>
      <ul class="c_wenzi">
        <li @click="getActsLxList('传统')">传统活动</li>
        <li @click="getActsLxList('新鲜')">新鲜活动</li>
      </ul>
    </div>
    <div class="c_main">
      <div class="c_left">
        <span v-if="goodsLxList.length === 0" class="nowno">暂时还没有活动哦！！！</span>
        <div class='c_good' v-for="item in goodsLxList" :key="item._id">
          <span>{{item.actName}}</span>
          <img :src="item.img" alt="tupian">
          <p>举办人：{{ item.name }}
            <span class="c_small">
              <span><span class="glyphicon glyphicon-thumbs-up"></span>{{item.zan}}</span>
              <span><span class="glyphicon glyphicon-thumbs-down"></span>{{item.cai}}</span>
              <span :class="(item.collectName.includes(name))?'active':''" @click="addCollect(item._id,$event)"><span class="glyphicon glyphicon-star"></span></span>
            </span>
          </p>
          <p>地点：{{ item.actPlace }}</p>
          <p>时间：{{ item.actTime }}</p>
          <p>可报名人数：{{ item.num }}</p>
          <p>简介：{{ item.jianj }}</p>
        </div>
      </div>
    </div>

    <!-- 侧栏推荐热门活动 -->
    <div class="c_main c_aside">
      热门活动推荐：
      <hr>
      <div class="c_left">
        <span v-if="goodsRmtjList.length === 0" class="nowno">暂时还没有活动哦！！！</span>
        <div class='c_good' v-for="item in goodsRmtjList" :key="item._id">
          <span>{{item.actName}}</span>
          <img :src="item.img" alt="tupian">
          <p>举办人：{{ item.name }}
            <span class="c_small">
              <span><span class="glyphicon glyphicon-thumbs-up"></span>{{item.zan}}</span>
              <span><span class="glyphicon glyphicon-thumbs-down"></span>{{item.cai}}</span>
              <span :class="(item.collectName.includes(name))?'active':''" @click="addCollect(item._id,$event)"><span class="glyphicon glyphicon-star"></span></span>
            </span>
          </p>
          <p>地点：{{ item.actPlace }}</p>
          <p>时间：{{ item.actTime }}</p>
          <p>可报名人数：{{ item.num }}</p>
          <p>简介：{{ item.jianj }}</p>
        </div>
      </div>
    </div>


    <div class="f2">
				关于我们|联系我们|站点地图|移动商城ICP备案证书号：津ICP备1234567号<br>
				文字图片等版权所有，不可盗用
		</div>
  </div>
</template>

<script>
import Bus from './bus'
import axios from 'axios'
export default {
  name:'c_er_nav',
  data:function(){
    return  {
      goodsList:[],
      name:"",
      id:'',
      status:"",
      lieb:"",
      goodsLxList:[],
      goodsJbList:[],
      goodsRmtjList:[]
    }
  },
  computed:{
  },
  methods:{
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
    getActsList(lieb){
      axios.get('/api/getGoods').then((result) => {
        if(result.data.status === 10000){
          if(lieb){
            this.goodsList = result.data.actsList.filter(item => {
              if(item.lieb === lieb){
                return item
              }
            })
          }else{
            this.goodsList = result.data.actsList
          }
        }else(
          console.log('还没有活动！！！')
        )
      })
    },
    getActsLxList(Lx){
      axios.get('/api/getGoods').then((result) => {
        if(result.data.status === 10000){
          if(Lx){
            this.goodsLxList = result.data.actsList.filter(item => {
              if(item.Lx === Lx){
                return item
              }
            })
          }else{
            this.goodsLxList = result.data.actsList
          }
        }else(
          console.log('还没有活动！！！')
        )
      })
    },
    getActsJbList(Jb){
      axios.get('/api/getGoods').then((result) => {
        if(result.data.status === 10000){
          if(Jb){
            this.goodsJbList = result.data.actsList.filter(item => {
              if(item.Jb === Jb){
                return item
              }
            })
          }else{
            this.goodsJbList = result.data.actsList
          }
        }else(
          console.log('还没有活动！！！')
        )
      })
    },
    getActsRmtjList(){
      axios.get('/api/getGoods').then((result) => {
        if(result.data.status === 10000){
          this.goodsRmtjList = result.data.actsList.filter(item => {
            if(item.isrmtj === true){
              return item
            }
          })
        }else(
          console.log('还没有活动！！！')
        )
      })
    },
    toAct(){
      if(this.status !== '审核通过'){
        alert('您还没有进行认证，不能发布活动')
        return
      }else if(this.lieb === 'single'){
        alert('您属于个人用户，不能发布活动')
        return
      }
      this.$router.push('/act')
    },
    toXxgl(){
      if(this.status !== '审核通过'){
        alert('您还没有进行认证，没有可管理消息')
        return
      }
      this.$router.push('/xxgl')
    },
    addCollect(id,e){
      if(this.status !== '审核通过'){
        alert('您还没有进行认证，不能收藏活动')
        return
      }
      // console.log(e.target.parentElement.classList)
      if(e.target.parentElement.classList.value =='active'){
        this.delCollect(id)
        e.target.parentElement.classList.remove('active')
        return
      }
      axios.post('/api/getGoods/addCollect',{
        name:this.name,
        id
      }).then(result => {
        if(result.data.status === 10000){
          e.target.parentElement.classList.add('active')
        }else{
          alert('出错了')
        }
      })
    },
    delCollect(id){
      var name = this.getCookie("name");
      axios.post("/api/getGoods/delCollect", {
          name,
          id
        }).then(result => {
          if(result.data.status === 10000){

          }else{
            alert(result.data.msg)
          }
        })
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
  created(){
    this.getActsList()
    this.getActsLxList('传统')
    this.getActsJbList('校级')
    this.getActsRmtjList()
    this.name = this.getCookie('name')
  },
  mounted(){
    Bus.$on('actList',data => {
      this.goodsList = data
    })
    this.id = this.getCookie('id')
    this.lieb = this.getCookie('lieb')
    this.getStudent()
  }
}
</script>

<style scoped>
#c_navbar{
  width: 94%;
  margin-left: 50%;
  transform: translateX(-50%);
  position: relative;
}
.c_head{
  width: 70%;
  height: 30px;
  border-bottom: 1px solid #ccc;
}
.c_re{
  width: 100px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #ccc;
  float: left;
  border-bottom: none;
  text-align: center;
}
.c_wenzi{
  float: left;
  margin: 0;
}
@media (max-width:600px){
  .c_wenzi li{
    width: 35px;
  }
}
@media (min-width:600px) and (max-width:840px){
  .c_wenzi li{
    width: 50px;
  }
}
@media (min-width:840px){
  .c_wenzi li{
    width: 100px;
  }
}
.c_wenzi li{
  list-style: none;
  float: left;
  height: 30px;
  text-align: center;
  line-height: 30px;
  /* margin-left: 50px; */
}
.c_re,.c_wenzi li{
  cursor: pointer;
}
.c_re:hover,.c_wenzi li:hover{
  background-color: rgb(238, 238, 238);
}
.c_main{
  width: 100%;
  overflow: hidden;
}
.c_left{
  width: 70%;
  border-right:1px solid #ccc;
  float: left;
}
.c_left>.c_good{
  margin: 5%;
  width: 40%;
  border: 1px solid #ccc;
  float:left;
  cursor: pointer;
}
.c_left>.c_good:hover{
  box-shadow: 0 0 5px 5px #ccc;
}
.c_left>.c_good>span{
  display: block;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
}
.c_left>.c_good>img{
  width: 100%;
  height: 235px;
}
.c_left>.c_good>p{
  margin: 0;
  padding: 0;
  height: 30px;
  line-height: 30px;
  color:#736e6e;
  font-size: 12px;
  overflow: hidden;
}
.c_left>.c_good>div{
  margin: 0;
  padding: 0;
  line-height: 30px;
  color:#736e6e;
  font-size: 12px;
  overflow: hidden;
}
.c_left>.c_good>p,.c_left>.c_good>span{
  padding-left: 10px;
}
.c_left>.c_good>p>.c_small{
  display: block;
  float: right;
  margin-right: 10px;
}
.c_left>.c_good>p>.c_small>span{
  display: block;
  float: left;
  margin-right: 5px;
}
.c_left>.c_good>p>.c_small>span>span{
  color: #83cdff;
}
.c_left>.c_good>p>.c_small>.active>span{
  color:red
}
.c_right{
  float: left;
  width: 30%;
  border-top:1px solid #ccc;
  margin-top: -1px;
  padding: 5%;
}
.c_cjcx,.c_act,.c_pl{
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #fff282;
  border-bottom:1px solid #ccc;
  padding-left: 10px;
  cursor: pointer;
}
.nowno{
  margin-left: 50%;
  transform: translateX(-50%);
  display: block;
  margin-top: 80px;
}
#c_navbar>.f2{
  border-top: 1px solid #ccc;
  padding-top: 20px;
	text-align: center;
  margin-bottom: 100px;
}
.c_aside{
  position: absolute;
  width: 30%;
  right: 0px;
  top: 300px;
  padding: 20px;
}
.c_aside>.c_left{
  width: 100%;
  border: none;
}
.c_aside>.c_left>.c_good{
  width: 100%;
}
</style>