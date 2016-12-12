var mongoose = require('mongoose');

//用户的表结构
module.exports = new mongoose.Schema({
    //用户名
    username:'string',
    //密码
    password:'string',
    //是否是管理员
    isAdmin:{
        type:Boolean,
        default:false
    }
});