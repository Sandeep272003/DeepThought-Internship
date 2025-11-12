const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({
topic:{type:mongoose.Schema.Types.ObjectId,ref:'Topic',required:true},
content:{type:String,required:true},
createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
createdAt:{type:Date,default:Date.now}
})
module.exports = mongoose.model('Post',PostSchema)