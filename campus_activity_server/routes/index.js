var express = require('express');
var router = express.Router();
var {getStoreDB} = require('./resource/mongo')

var ObjectId = require('mongodb').ObjectID

//主页获取活动列表
router.get('/', function(req, res, next) {
  getStoreDB(function(storeDB){
    storeDB.collection('acts').find({}).toArray(function(err,result){
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
          actsList:result
        })
      }else{
        res.send({
          status:10002,
          msg:'未找到活动信息'
        })
      }
    })
  })
});

//添加收藏
router.post('/addCollect',function(req,res,next){
  var name = req.body.name
  var id = req.body.id
  getStoreDB(storeDB => {
    storeDB.collection('acts').find({_id:new ObjectId(id)}).toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员！！！'
        })
        return
      }
      if(result.length!==0){
        result[0].collectName.push(name)
        // console.log(result[0].collectName)
        getStoreDB(storeDB => {
          storeDB.collection('acts').updateOne({_id:new ObjectId(id)},{$set:{collectName:result[0].collectName}},err => {
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
       }
      
    })
  })
  
  // console.log(gList)
  
})

//删除收藏
router.post('/delCollect',function(req,res,next){
  var name = req.body.name
  var id = req.body.id
  // console.log(id+"........"+name)
  getStoreDB(storeDB => {
    storeDB.collection('acts').find({_id:new ObjectId(id)}).toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员！！！'
        })
        return
      }
      var index = result[0].collectName.findIndex(item => {
        // console.log(item+'................1')
        return item === name
        })
      // console.log(index+'............2')
      result[0].collectName.splice(index,1)
      // console.log(result[0].collectName+'............3')
      getStoreDB(storeDB => {
        storeDB.collection('acts').updateOne({_id:new ObjectId(id)},{$set:{collectName:result[0].collectName}},err => {
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
  })
})

// 报名，添加比赛
router.post('/apply',function(req,res,next){
  // console.log('ok..................0')
  var name = req.body.uname
  // console.log(name+'..................1')
  var id = req.body.id
  // console.log(id+'..................2')
  getStoreDB(storeDB => {
    storeDB.collection('acts').find({_id:new ObjectId(id)}).toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员！！！'
        })
        return
      }
      if(result.length!==0){
        // console.log(result+'..................3')
        // console.log(result[0].applyName+'..................4')
        result[0].applyName.push(name)
        // console.log(result[0].applyName+'..................5')
        getStoreDB(storeDB => {
          storeDB.collection('acts').updateOne({_id:new ObjectId(id)},{$set:{applyName:result[0].applyName}},err => {
            // console.log('ok....................')
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
       }
      
    })
  }) 
})


//删除比赛，取消参加
router.post('/delApply',function(req,res,next){
  var name = req.body.name
  var id = req.body.id
  // console.log(id+"........"+name)
  getStoreDB(storeDB => {
    storeDB.collection('acts').find({_id:new ObjectId(id)}).toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员！！！'
        })
        return
      }
      var index = result[0].applyName.findIndex(item => {
        // console.log(item+'................1')
        return item === name
        })
      // console.log(index+'............2')
      result[0].applyName.splice(index,1)
      // console.log(result[0].applyName+'............3')
      getStoreDB(storeDB => {
        storeDB.collection('acts').updateOne({_id:new ObjectId(id)},{$set:{applyName:result[0].applyName}},err => {
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
  })
})

//删除活动，太烦了
router.post('/delAct',function(req,res,next){
  var id = req.body.id
  getStoreDB(storeDB => {
    storeDB.collection('acts').removeOne({_id:new ObjectId(id)},err => {
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

//addRecord录入成绩
router.post('/addRecord', function(req, res, next) {
  var id = req.body.id
  var palyer = req.body.palyer
  getStoreDB(function(storeDB){
    storeDB.collection('chenjs').insertOne({actId:id,palyer:palyer},(err,result) => {
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


//查看成绩
router.post('/ckRecord',function(req,res,next){
  var id = req.body.id
  getStoreDB(storeDB => {
    storeDB.collection('chenjs').find({actId:id}).toArray((err,result) => {
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
            palyer:result[0].palyer
          }
       })
      }else{
        res.send({
          status:10002,
          msg:'此比赛还没录入成绩！！！'
        })
      }
      
    })
  })
})

//getName
router.post('/getName',function(req,res,next){
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
            act:result[0]
          }
       })
      }else{
        res.send({
          status:10002,
          msg:'没有查找到比赛信息'
        })
      }
      
    })
  })
})

module.exports = router;
