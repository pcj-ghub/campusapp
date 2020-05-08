var express = require('express');
var router = express.Router();
var {getStoreDB} = require('./resource/mongo')

var ObjectId = require('mongodb').ObjectID

var captcha = require('svg-captcha')
var { encryToken,decodeToken} = require('./resource/token')

//设置验证码，将验证码保存到session中
router.get("/captcha",function(req,res,next){
  var cap = captcha.create({
    inverse:false,//翻转颜色
    fontSize:48,
    noise:5,
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
// router.post('/encry',function(req,res,next){
//   // console.log(req.body)
//   res.send(encryToken(req.body))
  
  
// })

//用户登录
router.post('/',function(req,res,next){
  var user = req.body.user
  // console.log(user)
  var encry = encryToken(user)
  var nuser = decodeToken(encry)
  nuser = {name:nuser.name,password:nuser.password}
  console.log(nuser)
  getStoreDB(function(storeDB){
    storeDB.collection('users').find(nuser).toArray(function(err,result){
      // console.log(result)
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
          token:encry,
          name:result[0].name,
          id:result[0]._id,
          lieb:result[0].lieb
        })
      }else{
        res.send({
          status:10002,
          msg:'请输入正确的昵称和密码，再次进行登录！！'
        })
      }
    })
  })
  
})

//用户注册
router.post('/register',function(req,res,next){
  var user = req.body.user
  console.log(user)
  getStoreDB(function(storeDB){
    storeDB.collection('users').insertOne(user,(err,result) => {
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

//获取用户信息
router.post('/getUser',function(req,res,next){
  var id = req.body.id
  getStoreDB(storeDB => {
    storeDB.collection('users').find({_id:new ObjectId(id)}).toArray((err,result) => {
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
          user:result[0]
        })
      }else{
        res.send({
          status:10002,
          msg:'未查找到此用户，请联系管理员'
        })
      }
    })
  })
})

//修改密码
router.post('/updatePassword',function(req,res,next){
  var password = req.body.password
  var id = req.body.id
  getStoreDB(storeDB => {
    storeDB.collection('users').updateOne({_id:new ObjectId(id)},{$set:{password:password}},err => {
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

//搜索 key  获取actsList
router.post('/search',function(req,res,next){
  var key = req.body.key
  getStoreDB(storeDB => {
    storeDB.collection('acts').find({}).toArray((err,result) => {
      if(err){
        res.send({
          status:10001,
          msg:'查询数据库出错，请联系管理员进行处理！！'
        })
        return
      }
      if(result.length !== 0){
        var actsList = result.filter(item => {
          if(item.actName.includes(key)){
            return item
          }
        })
        // console.log(actsList)
        res.send({
          status:10000,
          msg:'ok',
          actsList:actsList
        })
      }else{
        res.send({
          status:10002,
          msg:'未查找到此用户，请联系管理员'
        })
      }
    })
  })
})



module.exports = router;
