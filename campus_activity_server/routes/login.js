var express = require('express');
var router = express.Router();

var ObjectId = require('mongodb').ObjectID

//获取svg
var captcha = require('svg-captcha')
//获取数据库
const { getStoreDB } = require('./resource/mongo')
//获取token
const { encryToken , decodeToken } = require('./resource/token')


//生成随机字母验证
router.get("/captcha",function(req,res,next){
  var cap = captcha.create({
    inverse:false,//翻转颜色
    fontSize:48,
    noise:3,
    width:256,
    height:60,
    size:4,
    ignoreChars:'0o1i'
  })
  //将验证码保存到session中，忽略大小写
  req.session = cap.text.toLowerCase()
  console.log(req.session)
  res.cookie('captcha',req.session)
  res.setHeader('Content-Type','image/svg+xml')
  res.write(String(cap.data))
  res.end()
})

//加密token
router.post('/encry',function(req,res,next){
  // console.log(req.body)
  res.send(encryToken(req.body))
  
})

//登录
router.post('/',function(req,res,next){
  try {
    var admin = decodeToken(req.body.token)//当时间过长，已经不能解密此 token 会报错！！！
  // console.log(admin)
  var adminName = admin.adminName
  var adminPassword = admin.adminPassword
  var nadmin = {adminName:adminName,adminPassword:adminPassword}
  getStoreDB(function(storeDB){
    storeDB.collection('admins').find(nadmin).toArray(function(err,result){
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员'
        })
        return
      }
      if(result.length !== 0){
        res.send({
          status:10000,
          adminName:result[0].adminName
        })
        return
      }else{
        res.send({
          status:10002,
          msg:'请输入正确的用户名和密码后重新登录！！！'
        })
        return
      }
    })
  })
  } catch (error) {
    res.send({
      status:10004,
      msg:'登录时间过长，请重新登录'
    })
  }
  
})

//修改密码
router.post('/rePassword',function(req,res,next){
  var admin = {}
  admin.adminName = req.body.adminName
  admin.adminPassword = req.body.adminPassword
  // console.log(admin)
  var newPassword = req.body.newPassword
  // console.log(newPassword)
  getStoreDB(function(storeDB){
    storeDB.collection('admins').find(admin).toArray(function(err,result){
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员'
        })
        return
      }
      if(result.length !== 0){
        storeDB.collection('admins').updateOne({adminName:admin.adminName},{$set:{adminPassword:newPassword}},function(err,r){
          if(err){
            res.send({
              status:10001,
              msg:'查询数据库出错，请联系管理员'
            })
            return
          }
          if(r.result.ok === 1){
            res.send({
              status:10000,
              msg:'修改成功'
            })
          }
        })
        return
      }else{
        res.send({
          status:10002,
          msg:'系统查询不到您的身份信息，请正确输入密码后重试！！'
        })
        return
      }
    })
  })
})

//搜索用户
router.post('/postUserList',function(req,res,next){//此接口作用，判断传入的 username 和 userid 以及 cur 进行数据库查询，返回查到的十条数据和总页数。
  var username = req.body.username
  var userid = req.body.userid
  var cur = req.body.cur
  // console.log(username,userid)
  if(!username&& !userid){
    getStoreDB(function(store){
      store.collection('users').find({}).toArray(function(err,result){
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
        store.collection('users').find({_id:new ObjectId(userid)}).toArray(function(err,result){
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
      store.collection('users').find({name:username}).toArray(function(err,result){
        console.log(result)
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
        store.collection('users').find({name:username,_id:new ObjectId(userid)}).toArray(function(err,result){
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


//删除用户
router.post('/delUser',function(req,res,next){
  var id = req.body.id
  // console.log(username)
  // console.log('1...........ok')
  getStoreDB(function(store){
    store.collection('users').remove({_id:new ObjectId(id)},err => {
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

//添加用户
router.post('/addUser',function(req,res,next){
  var user = req.body.user
  // console.log(user)
  getStoreDB(function(store){
    store.collection('users').insertOne(user,function(err,result){
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

//更新用户信息
router.post('/updataUser',function(req,res,next){
  var user = req.body.user
  // console.log(user)
  getStoreDB(function(store){
    store.collection('users').updateOne({_id:new ObjectId(user._id)},{$set:{name:user.name,lieb:user.lieb,phone:user.phone,email:user.email}},err => {
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

module.exports = router;
