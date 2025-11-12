const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Topic = require('../models/Topic')
const Post = require('../models/Post')
router.post('/',auth,async(req,res)=>{
const {title}=req.body
if(!title) return res.status(400).json({msg:'Missing title'})
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
const exists = await Topic.findOne({slug})
if(exists) return res.status(400).json({msg:'Topic exists'})
const topic = new Topic({title,slug,createdBy:req.user.id})
await topic.save()
res.json(topic)
})
router.get('/',async(req,res)=>{
const topics = await Topic.find().populate('createdBy','name email').sort({createdAt:-1})
res.json(topics)
})
router.get('/:slug',async(req,res)=>{
const topic = await Topic.findOne({slug:req.params.slug}).populate('createdBy','name email')
if(!topic) return res.status(404).json({msg:'Not found'})
topic.views = topic.views+1
await topic.save()
const posts = await Post.find({topic:topic.id}).populate('createdBy','name email').sort({createdAt:1})
res.json({topic,posts})
})
module.exports = router