const mongoose = require('mongoose')
const TopicSchema = new mongoose.Schema({
title:{type:String,required:true},
slug:{type:String,required:true,unique:true},
createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
createdAt:{type:Date,default:Date.now},
views:{type:Number,default:0}
})
module.exports = mongoose.model('Topic',TopicSchema)