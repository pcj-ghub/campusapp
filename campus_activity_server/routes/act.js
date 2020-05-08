var express = require('express');
var router = express.Router();
var { getStoreDB } = require('./resource/mongo')
var ObjectId = require('mongodb').ObjectID//与数据库默认的 _id 进行匹配

router.post('/search',function(req,res,next){//此接口作用，判断传入的 username 和 userid 以及 cur 进行数据库查询，返回查到的十条数据和总页数。
  var username = req.body.username
  var userid = req.body.userid
  var cur = req.body.cur
  // console.log(username,userid)
  if(!username&& !userid){
    getStoreDB(function(store){
      store.collection('acts').find({}).toArray(function(err,result){
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
        store.collection('acts').find({_id:new ObjectId(userid)}).toArray(function(err,result){
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
      store.collection('acts').find({actName:username}).toArray(function(err,result){
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
        store.collection('acts').find({actName:username,_id:new ObjectId(userid)}).toArray(function(err,result){
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
  var act = req.body.act
  act.collectName = ['admin']
  act.applyName = ['admin']
  act.name = '官方'
  act.isrmtj = false
  getStoreDB(function(store){
    store.collection('acts').insertOne(act,function(err,result){
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


//修改活动信息
router.post('/update',function(req,res,next){
  var user = req.body.act
  // console.log(user)
  getStoreDB(function(store){
    store.collection('acts').updateOne({_id:new ObjectId(user._id)},{$set:{actName:user.actName,img:user.img,actPlace:user.actPlace,jianj:user.jianj,actTime:user.actTime,phone:user.phone,lieb:user.lieb,Lx:user.Lx,Jb:user.Jb,num:user.num,}},err => {
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


//updateRmtj修改活动是否热门推荐
router.post('/updateRmtj',function(req,res,next){
  var id = req.body.id
  var b = req.body.b
  // console.log(user)
  getStoreDB(function(store){
    store.collection('acts').updateOne({_id:new ObjectId(id)},{$set:{isrmtj:b}},err => {
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


router.post('/del',function(req,res,next){
  var id = req.body.id
  // console.log(username)
  // console.log('1...........ok')
  getStoreDB(function(store){
    store.collection('acts').remove({_id:new ObjectId(id)},err => {
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


// 报名：
    //比赛信息：举办人名、比赛名、报名状态
    //报名人信息：姓名、电话、学院、班级、学生卡号

//参加活动，将人姓名加入到比赛表中。
router.post('/addbm',function(req,res,next){
  var bm = {}
  var userid = req.body.userid
  var actName = req.body.actName
  var name = req.body.name
  var applyName = req.body.applyName
  bm.actName = actName
  bm.name = name
  bm.applyName = applyName
  bm.userid = userid
  getStoreDB(storeDB => {
    storeDB.collection('students').find({userid:userid}).toArray((err,result) => {
      console.log(result)
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员进行处理！！'
        })
        return
      }
      if(result.length !== 0){//报名人信息：姓名、电话、学院、班级、学生卡号
        bm.bmName = result[0].name
        bm.phone = result[0].phone
        bm.xueyuan = result[0].xueyuan
        bm.classname = result[0].classname
        bm.camID = result[0].camID
        bm.status = '未审核'
        console.log(bm)
        getStoreDB(function(store){
          store.collection('bms').insertOne(bm,function(err,result){
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
                bmid:result.insertedId
              }
            })
          })
        })
      }else{
        res.send({
          status:10002,
          msg:'没找到您的个人信息！'
        })
      }
    })
  })
  
  
})


//getBm
router.post('/getBm',function(req,res,next){
  var id = req.body.id
  var name = req.body.name
  if(id){
    getStoreDB(storeDB => {
      storeDB.collection('bms').find({userid:id}).toArray((err,result) => {
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
            bm:result
         })
        }else{
          res.send({
            status:10002,
            msg:'没有找到报名信息，请先去参加一个比赛吧！！'
         })
        }
        
      })
    })
  }else{
    getStoreDB(storeDB => {
      storeDB.collection('bms').find({name:name}).toArray((err,result) => {
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
            bm:result
         })
        }else{
          res.send({
            status:10002,
            msg:'没有找到报名信息，请先去参加一个比赛吧！！'
         })
        }
        
      })
    })
  }
  
})


//updateBm
router.post('/updateBm',function(req,res,next){
  var id = req.body.id
  var name = req.body.name
  // console.log(user)

  getStoreDB(storeDB => {
    storeDB.collection('acts').find({actName:name}).toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员进行处理！！'
        })
        return
      }
      if(result.length !== 0){
        let num = Number(result[0].num)-1
        console.log(num)
        getStoreDB(function(store){
          store.collection('bms').updateOne({_id:new ObjectId(id)},{$set:{status:'通过审核'}},err => {
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
              msg:'成功审核'
            })
          })
        })
        getStoreDB(function(store){
          store.collection('acts').updateOne({actName:name},{$set:{num:num}},err => {
            // console.log(err)
            if(err){
              res.send({
                status:10001,
                msg:'查询数据库出错，请联系管理员！！！'
              })
              return
            }
          })
        })
      }else{
        res.send({
          status:10002,
          msg:'没有找到比赛信息！！'
       })
      }
      
    })
  })

  
})




module.exports = router;