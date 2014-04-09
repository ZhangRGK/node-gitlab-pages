var path = require('path');
var markdown = require('markdown-js');
var fs = require('fs');
var process = require('child_process');

var projectService = require('../service/project');

exports.html = function(req, res) {
    var title = req.params[0];
    var urlPath = [
        'repo/',
        req.params.ns,
        '/',
        req.params.project,
        '/proto/',
        title?title:"proto/index",
        '.html'
    ].join('');
    console.log("proto urlPath:"+urlPath);
    var filePath = path.normalize('./' + urlPath);
    fs.exists(filePath, function  (exists) {
        if(!exists) {
            res.render("404",{title:"gitlab-pages"});
        } else {
            var content = fs.readFileSync(filePath, "utf-8");
            res.render("showhtml",{content:content});
        }
    });
};

exports.doc = function(req, res) {
    var title = req.params[0];
    var urlPath = [
        'repo/',
        req.params.ns,
        '/',
        req.params.project,
        '/doc/',
        title?title:"readme",
        '.md'
    ].join('');
    console.log("doc urlPath:"+urlPath);
    var filePath = path.normalize('./' + urlPath);
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


exports.static = function(req, res) {
    var title = req.params[0];
    var urlPath;
    if(title.indexOf("proto")>=0) {
        urlPath = [
            'repo/',
            req.params.ns,
            '/',
            req.params.project,
            '/proto/',
            title
        ].join('');
    } else {
        var urlPath = [
            'repo/',
            req.params.ns,
            '/',
            req.params.project,
            '/doc/',
            title
        ].join('');
    }
    console.log("static urlPath:"+urlPath);
    var filePath = path.normalize('./' + urlPath);
    fs.exists(filePath, function  (exists) {
        if(!exists) {
            res.render("404",{title:"gitlab-pages"});
        } else {
            res.sendfile(filePath);
        }
    });
};

exports.add = function(req, res) {
    var p = {
        "ns":req.body.ns,
        "name":req.body.project,
        "project":req.body.url.substring(req.body.url.lastIndexOf("/")+1,req.body.url.indexOf(".git")),
        "url":req.body.url,
        "doc":req.body.doc,
        "proto":req.body.proto,
        "desc":req.body.desc
    };
    projectService.add(p,function(err) {
        if(err) {
            res.json(err);
        } else {
            fs.exists("repo/"+ p.ns+"/"+ p.project,function(exists) {
                if(!exists) {
                    if(p.doc) {
                        var cloneDoc = [
                            "git clone ",
                            p.url,
                            " repo/",
                            p.ns,
                            "/",
                            p.name,
                            "/doc -b ",
                            p.doc
                        ].join('');
                        process.exec(cloneDoc);
                        console.log("执行命令: "+cloneDoc);
                    }
                    if(p.proto) {
                        var cloneProto = [
                            "git clone ",
                            p.url,
                            " repo/",
                            p.ns,
                            "/",
                            p.name,
                            "/proto -b ",
                            p.proto
                        ].join('');
                        process.exec(cloneProto);
                        console.log("执行命令: "+cloneProto);
                    }
                    res.json("添加新项目成功");
                } else {
                    res.json("该项目已经存在");
                }
            });

        }
    });
};

exports.update = function(req, res) {
    var projects = req.body.projects;
    if(!projects) {
        projects = [];
    }
    projectService.update(projects,function(err) {
        if(err) {
            res.json(err);
        } else {
            res.json("success");
        }
    })
};

exports.list = function(req, res) {
    projectService.getAll(function(err,projects) {
        res.render('project',{"title":'gitlab-pages',"scope":'所有文档',"projects":projects});
    });
}