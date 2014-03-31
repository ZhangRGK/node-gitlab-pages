var path = require('path');
var markdown = require('markdown-js');
var fs = require('fs');
var clone = require("nodegit").Repo.clone;

var projectService = require('../service/project');

exports.html = function(req, res) {
    var urlPath = [
        req.params.ns,
        'repo/',
        req.params.project,
        '/proto/',
        req.params.title?req.params.title:"index",
        '.html'
    ].join('');
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

exports.blogs = function(req, res) {
    var urlPath = [
        'repo/',
        req.params.ns,
        '/',
        req.params.project,
        '/doc/',
        req.params.title?req.params.title:"index",
        '.md'
    ].join('');
    console.log("urlPath:"+urlPath);
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

exports.add = function(req, res) {
    var p = {
        "ns":req.body.ns,
        "project":req.body.project,
        "url":req.body.url,
        "doc":req.body.doc,
        "proto":req.body.proto
    };
    projectService.add(p,function(err) {
        if(err) {
            res.json(err);
        } else {
            if(p.doc) {
                clone(p.url,"../repo/"+ p.ns+"/"+ p.project+"/doc",{"checkout_branch": "doc"},function() {
                    console.log();
                });
            }
            if(p.proto) {
                clone(p.url,"../repo/"+ p.ns+"/"+ p.project+"/proto",{"checkout_branch": "proto"},function() {
                    console.log();
                });
            }
            res.json("添加新项目成功");
        }
    });
};

exports.update = function(req, res) {
    var projects = req.body.projects;
    projectService.update(projects,function(err) {
        if(err) {
            res.json(err);
        }
    })
};

exports.list = function(req, res) {
    projectService.getAll(function(err,projects) {
        if(err) {
            res.json({err:err,projects:null});
        } else {
            res.json({err:null,projects:projects});
        }
    });
};