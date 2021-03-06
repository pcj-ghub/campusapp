const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const dbUrl = 'mongodb://localhost:27017'

let storeDB

function getStoreDB(callback){
  if(storeDB){
    callback(storeDB)
    return
  }
  MongoClient.connect(dbUrl,{useUnifiedTopology:true},function(err,client){
    if(err){
      console.log(err)
      return
    }
    console.log('链接成功！！！')
    storeDB = client.db('campusdb')
    callback(storeDB)
  })
}



module.exports = {
  getStoreDB
}