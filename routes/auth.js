const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
router.post('/register',async(req,res)=>{
const {name,email,password} = req.body
if(!name||!email||!password) return res.status(400).json({msg:'Missing fields'})
let user = await User.findOne({email})
if(user) return res.status(400).json({msg:'User exists'})
const salt = await bcrypt.genSalt(10)
const hashed = await bcrypt.hash(password,salt)
user = new User({name,email,password:hashed})
await user.save()
const payload = {user:{id:user.id}}
const token = jwt.sign(payload,process.env.JWT_SECRET||'changeme',{expiresIn:'7d'})
res.json({token})
})
router.post('/login',async(req,res)=>{
const {email,password} = req.body
if(!email||!password) return res.status(400).json({msg:'Missing fields'})
const user = await User.findOne({email})
if(!user) return res.status(400).json({msg:'Invalid credentials'})
const ok = await bcrypt.compare(password,user.password)
if(!ok) return res.status(400).json({msg:'Invalid credentials'})
const payload = {user:{id:user.id}}
const token = jwt.sign(payload,process.env.JWT_SECRET||'changeme',{expiresIn:'7d'})
res.json({token})
})
router.get('/me',async(req,res)=>{
const token = req.header('Authorization')&&req.header('Authorization').split(' ')[1]
if(!token) return res.status(401).json({msg:'No token'})
try{
const decoded = jwt.verify(token,process.env.JWT_SECRET||'changeme')
const user = await User.findById(decoded.user.id).select('-password')
res.json(user)
}catch(e){res.status(401).json({msg:'Token invalid'})}
})
module.exports = router