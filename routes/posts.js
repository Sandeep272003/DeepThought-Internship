const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Post = require('../models/Post')
const Topic = require('../models/Topic')
router.post('/:topicId',auth,async(req,res)=>{
const {content} = req.body
if(!content) return res.status(400).json({msg:'Missing content'})
const topic = await Topic.findById(req.params.topicId)
if(!topic) return res.status(404).json({msg:'Topic not found'})
const post = new Post({topic:topic.id,content,createdBy:req.user.id})
await post.save()
res.json(post)
})
router.get('/by/:userId',async(req,res)=>{
const posts = await Post.find({createdBy:req.params.userId}).populate('topic','title slug').sort({createdAt:-1})
res.json(posts)
})
module.exports = router