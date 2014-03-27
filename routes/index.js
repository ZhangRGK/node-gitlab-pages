var path = require('path');
var markdown = require('markdown-js');
var fs = require('fs');


exports.index = function(req, res) {
    res.render('index',{title:'gitlab-pages',scope:'所有文档'});
};

exports.html = function(req, res) {
    var urlPath = [
        'blogs/',
        req.params.project,
        '/',
        req.params.title,
        '.html'
    ].join('');
    var filePath = path.normalize('./views/' + urlPath);
    fs.exists(filePath, function  (exists) {
        if(!exists) {
            res.render("404",{title:"gitlab-pages"});
        } else {
            var content = fs.readFileSync(filePath, "utf-8");
            res.render("showhtml",{content:content});
        }
    });
}

exports.blogs = function(req, res) {
    var urlPath = [
        'blogs/',
        req.params.project,
        '/',
        req.params.title,
        '.md'
    ].join('');
    var filePath = path.normalize('./views/' + urlPath);
    fs.exists(filePath, function  (exists) {
        if(!exists) {
            res.render("404",{title:"gitlab-pages"});
        } else {
            var content = fs.readFileSync(filePath, "utf-8");
            var html_content = markdown.parse(content);
            res.render("showmd", {title: req.params.title ,content:html_content,scope:req.params.project+"项目",type:"md"});
        }
    });
};
