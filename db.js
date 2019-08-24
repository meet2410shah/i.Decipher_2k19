const {MongoClient}=require('mongodb');

// const mongo_url='mongodb://localhost:27018';
const mongo_url='mongodb+srv://hit:idecipher2019@ifest19-i5wtu.mongodb.net/test?retryWrites=true&w=majority'

// for connecting to cloud cluster mongodb atlas



module.exports.connectdb=(dbName)=>{
    return MongoClient.connect(mongo_url,{ useNewUrlParser: true }).then(client=> client.db(dbName))
 }


