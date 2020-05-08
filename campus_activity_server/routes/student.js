var express = require('express');
var router = express.Router();
var {getStoreDB} = require('./resource/mongo')

var ObjectId = require('mongodb').ObjectID

//添加学生认证
router.post('/add',function(req,res,next){
  var student = req.body.student
  getStoreDB(storeDB => {
    storeDB.collection('students').insertOne(student,(err,result) => {
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
})

//get
router.post('/getStatus',function(req,res,next){
  var id = req.body.id
  getStoreDB(storeDB => {
    storeDB.collection('students').find({userid:id}).toArray((err,result) => {
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
          studentstatus:result[0].status
        })
      }else{
        res.send({
          status:10002,
          msg:'您还没有进行认证，请进行认证吧！！'
        })
      }
    })
  })
})

module.exports = router;
