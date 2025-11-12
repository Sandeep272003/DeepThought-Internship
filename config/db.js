const mongoose = require('mongoose')
const uri = process.env.MONGO_URI||'mongodb://127.0.0.1:27017/nodebb_intern'
module.exports = async function(){await mongoose.connect(uri, {maxPoolSize: 10})}