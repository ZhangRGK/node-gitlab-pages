var projectService = require("../service/project");
var userService = require("../service/user");


exports.index = function(req, res) {
    projectService.getAll(function(err,projects) {
        res.render('index',{"title":'gitlab-pages',"scope":'所有文档',"projects":projects});
    });
};

exports.signIn = function(req,res) {
    var user = req.body.user;
    var pwd = req.body.pwd;
    userService.signIn(user,pwd,function(success,err) {
        if(err) {
            res.json(err);
        } else {
            res.cookie("user",user,{"maxAge":2592000000});
            req.session.user=user;
            res.json("success");
        }
    });
};

exports.login = function(req,res) {
    res.render('login',{title:"login"});
};

exports.signOut = function(req,res) {
    res.clearCookie("user",{"path":"/"});
    res.redirect("/");
};