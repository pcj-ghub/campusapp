var express = require('express');
var router = express.Router();
var {getStoreDB} = require('./resource/mongo')

var ObjectId = require('mongodb').ObjectID

//发布活动
router.post('/', function(req, res, next) {
  var act = req.body.act
  act.collectName = ['admin']
  act.applyName = ['admin']
  act.isrmtj = false
  getStoreDB(function(storeDB){
    storeDB.collection('acts').insertOne(act,(err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员进行处理！！'
        })
        return
      }
      res.send({
        status:10000,
        msg:'ok',
        data:{
          _id:result.insertedId
        }
      })
    })
  })
});

//获取发布信息列表，接受一个参数为id
router.post('/getIssue',function(req,res,next){
  var id = req.body.id
  getStoreDB(storeDB => {
    storeDB.collection('acts').find({_id:new ObjectId(id)}).toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员进行处理！！'
        })
        return
      }
      if(result.length !== 0){
        res.send({
          status:10000,
          msg:'ok',
          data:{
            issue:result[0]
          }
       })
      }
      
    })
  })
})

//修改发布信息。获取参数id
router.post('/updateIssue',function(req,res,next){
  var id = req.body.id
  var act = req.body.act
  // console.log(id)
  // console.log(act)
  getStoreDB(storeDB => {
    storeDB.collection('acts').updateOne({_id:new ObjectId(id)},{$set:{actName:act.actName,actTime:act.actTime,actPlace:act.actPlace,phone:act.phone,jianj:act.jianj,lieb:act.lieb,Lx:act.Lx,Jb:act.Jb,num:act.num,img:act.img}},err => {
      // console.log(err)
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员！！！'
        })
        return
      }
      res.send({
        status:10000,
        msg:'ok'
      })
    })
  })
})

//获取发布列表，接受一个参数为name
router.post('/getIssueActList',function(req,res,next){
  var name = req.body.name
  getStoreDB((storeDB) => {
    storeDB.collection('acts').find({name:name}).toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员进行处理！！'
        })
        return
      }
      if(result.length !== 0){
        res.send({
          status:10000,
          msg:'ok',
          IssueActList:result
        })
      }else{
        res.send({
          status:10002,
          msg:'您还没有发布活动哦，点击发布活动去发布一个活动吧！！'
        })
      }
    })
  })
})

//获取收藏的列表
router.post('/getCollectActList',function(req,res,next){
  var name = req.body.name

  getStoreDB((storeDB) => {
    storeDB.collection('acts').find().toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员进行处理！！'
        })
        return
      }
      if(result.length !== 0){
        var collectActList =  result.filter(item => {
        //   console.log(item.collectName+'.............1')
        //   console.log(item.collectName.length+'.............2')
        //   console.log(typeof item.collectName+'.............3')
        //   console.log(name+'.............4')
        //   console.log(typeof name+'.............5')
          if(item.collectName.includes(name)){
            return item
          }
        })
        // console.log(collectActList+'...........6')
        // console.log(collectActList.length+'...........6')
        // console.log(collectActList[0]+'...........6')
        res.send({
          status:10000,
          collectActList:collectActList
        })
      }else{
        res.send({
          status:10002,
          msg:'您还没有发布活动哦，点击发布活动去发布一个活动吧！！'
        })
      }
    })
  })
})

// getApplyActList
//获取报名列表，接受yi个参数name
router.post('/getApplyActList',function(req,res,next){
  var name = req.body.name

  getStoreDB((storeDB) => {
    storeDB.collection('acts').find().toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员进行处理！！'
        })
        return
      }
      if(result.length !== 0){
        var applyActList =  result.filter(item => {
        //   console.log(item.collectName+'.............1')
        //   console.log(item.collectName.length+'.............2')
        //   console.log(typeof item.collectName+'.............3')
        //   console.log(name+'.............4')
        //   console.log(typeof name+'.............5')
          if(item.applyName.includes(name)){
            return item
          }
        })
        // console.log(collectActList+'...........6')
        // console.log(collectActList.length+'...........6')
        // console.log(collectActList[0]+'...........6')
        res.send({
          status:10000,
          applyActList:applyActList
        })
      }else{
        res.send({
          status:10002,
          msg:'您还没有参加任何比赛，快去看看吧！！'
        })
      }
    })
  })
})


module.exports = router;
