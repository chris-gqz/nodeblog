
//应用程序启动（入口）文件

var express = require('express');
var swig = require('swig');
var mongoose = require('mongoose');
var Cookies = require('cookies');
var bodyParser = require('body-parser');
var app = express();
var User = require('./models/User')


app.use('/public',express.static(__dirname+'/public'));



//配置应用模板
app.engine('html',swig.renderFile);
//设置模板文件存放的目录
app.set('views','./views');
//将模板引擎app.engine 配置到app 的应用中。
app.set('view engine','html');

swig.setDefaults({cache:false});

app.use(bodyParser.urlencoded({extended:true}))

app.use(function(req,res,next){
     req.cookies = new Cookies(req,res);
    req.userInfo = {};
    if(req.cookies.get('userInfo')){
        try{
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
        User.findById(req.userInfo._id).then(function(userInfo){
            req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
            next();
        })
        }catch(e){
            next();
        }
    } else{
        next();
    }
});


//根据不同的功能划分模块
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

//连接数据库
mongoose.connect('mongodb://localhost:27018/blog',function(err){
    if(err){
        console.log(err);
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        app.listen(8888);
    }
});


