var express = require('express');
var router = express.Router();
var { getStoreDB } = require('./resource/mongo')
var ObjectId = require('mongodb').ObjectID//与数据库默认的 _id 进行匹配

router.post('/search',function(req,res,next){//此接口作用，判断传入的 username 和 userid 以及 cur 进行数据库查询，返回查到的十条数据和总页数。
  var username = req.body.username
  var userid = req.body.userid
  var cur = req.body.cur
  var lieb = req.body.p
  // console.log(username,userid)
  if(!username&& !userid){
    getStoreDB(function(store){
      store.collection('students').find({lieb:lieb,isdj:false}).toArray(function(err,result){
        // console.log(result)
        if(err){//数据库查询出错
          res.send({
            status:10001,
            msg:'查询数据库出错，请联系管理员！！！'
          })
          return
        }
        if(result.length === 0){//未查到
          res.send({
            status:10002,
            msg:'未查到用户信息！！'
          })
          return
        }else{
          var n = Math.floor(result.length/10)
            var y = result.length%10
            if(y !== 0){
              n = n+1
              // console.log(n)
            }
            res.send({
              status:10000,
              data:{
                n:n,
                userList:result.slice((cur-1)*10,cur*10)
              }
            })
        }
      })
    })
  }else if(!username && userid){
    try {
      getStoreDB(function(store){
        store.collection('students').find({_id:new ObjectId(userid),lieb:lieb,isdj:false}).toArray(function(err,result){
          // console.log(result)
          if(err){//数据库查询出错
            res.send({
              status:10001,
              msg:'查询数据库出错，请联系管理员！！！'
            })
            return
          }
          if(result.length === 0){//未查到
            res.send({
              status:10002,
              msg:'未查到用户信息！！'
            })
            return
          }else{
            var n = Math.floor(result.length/10)
              var y = result.length%10
              if(y !== 0){
                n = n+1
                // console.log(n)
              }
              res.send({
                status:10000,
                data:{
                  n:n,
                  userList:result.slice((cur-1)*10,cur*10)
                }
              })
          }
        })
      })
    } catch (error) {
      res.send({
        status:10002,
        msg:'未查到用户信息！！'
      })
      return
    }
    
  }else if(username && !userid){
    getStoreDB(function(store){
      store.collection('students').find({name:username,lieb:lieb,isdj:false}).toArray(function(err,result){
        // console.log(result)
        if(err){//数据库查询出错
          res.send({
            status:10001,
            msg:'查询数据库出错，请联系管理员！！！'
          })
          return
        }
        if(result.length === 0){//未查到
          res.send({
            status:10002,
            msg:'未查到用户信息！！'
          })
          return
        }else{
          var n = Math.floor(result.length/10)
            var y = result.length%10
            if(y !== 0){
              n = n+1
              // console.log(n)
            }
            res.send({
              status:10000,
              data:{
                n:n,
                userList:result.slice((cur-1)*10,cur*10)
              }
            })
        }
      })
    })
  }else{
    try {
      getStoreDB(function(store){
        store.collection('students').find({name:username,_id:new ObjectId(userid),lieb:lieb,isdj:false}).toArray(function(err,result){
          // console.log(result)
          if(err){//数据库查询出错
            res.send({
              status:10001,
              msg:'查询数据库出错，请联系管理员！！！'
            })
            return
          }
          if(result.length === 0){//未查到
            res.send({
              status:10002,
              msg:'未查到用户信息！！'
            })
            return
          }else{
            var n = Math.floor(result.length/10)
              var y = result.length%10
              if(y !== 0){
                n = n+1
                // console.log(n)
              }
              res.send({
                status:10000,
                data:{
                  n:n,
                  userList:result.slice((cur-1)*10,cur*10)
                }
              })
          }
        })
      })
    } catch (error) {
      res.send({
        status:10002,
        msg:'未查到用户信息！！'
      })
      return
    }
    
  }
})


//添加活动
router.post('/add',function(req,res,next){
  var student = req.body.student
  getStoreDB(function(store){
    store.collection('students').insertOne(student,function(err,result){
      if(err){
        res.send({
          status:10001,
          msg:`${err.message}`+'用户请求已成功，插入数据库失败，请联系管理员进行处理！！！'
        })
        return
      }
      //此时请求已经成功
      res.send({
        status:10000,
        msg:'ok',
        data:{
          userid:result.insertedId
        }
      })
    })
  })
})


//修改学生信息
router.post('/update',function(req,res,next){
  var student = req.body.student
  var lieb = req.body.lieb
  // console.log(user)
  if(lieb === 'single'){
    getStoreDB(function(store){
      store.collection('students').updateOne({_id:new ObjectId(student._id)},{$set:{name:student.name,sex:student.sex,phone:student.phone,personID:student.personID,camID:student.camID,xueyuan:student.xueyuan,classname:student.classname}},err => {
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
  }else{
    getStoreDB(function(store){
      store.collection('students').updateOne({_id:new ObjectId(student._id)},{$set:{name:student.name,phone:student.phone,xueyuan:student.xueyuan,address:student.address,leadername:student.leadername,leaderzhiw:student.leaderzhiw,email:student.email}},err => {
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
  }
  
})


router.post('/del',function(req,res,next){
  var id = req.body.id
  // console.log(user)
  getStoreDB(function(store){
    store.collection('students').updateOne({_id:new ObjectId(id)},{$set:{isdj:true}},err => {
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

//审核状态，修改状态
router.post('/updateStatus',function(req,res,next){
  var id = req.body.id
  getStoreDB(function(store){
    store.collection('students').updateOne({_id:new ObjectId(id)},{$set:{status:'审核通过'}},err => {
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



//获取冻结用户
router.get('/getDjUser',function(req,res,next){
  getStoreDB(storeDB => {
    storeDB.collection('students').find({isdj:true}).toArray((err,result) => {
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
          students:result
        })
      }else{
        res.send({
          status:10002,
          msg:'还没有冻结用户'
        })
      }
    })
  })
})


module.exports = router;