
var taskqueue = require("../util/taskqueue");
var fs = require("fs");

var config = "../config.json";

exports.pullDoc = function(req,res) {
    var ns = req.body.ns;
    var project = req.body.project;

    fs.exists(config,function(exists) {
        if(exists) {
            fs.readJSONSync(config,function(err,data) {
                if(err || (!data)) {
                    res.json(err ? err : "cannot read projects data in config.json.",null);
                } else {
                    data.projects.each(function() {
                        if(this.ns == ns && this.project == project) {
                            taskqueue.push({ns:ns,project:project,url:this.url,branch:'doc'});
                            res.json("pull success.");
                        } else {
                            res.json("cannot find project : "+ns+"/"+project);
                        }
                    });
                }
            })
        }
    });
};

exports.pullProto = function(req,res) {
    var ns = req.body.ns;
    var project = req.body.project;

    fs.exists(config,function(exists) {
        if(exists) {
            fs.readJSONSync(config,function(err,data) {
                if(err || (!data)) {
                    res.json(err ? err : "cannot read projects data in config.json.",null);
                } else {
                    data.projects.each(function() {
                        if(this.ns == ns && this.project == project) {
                            taskqueue.push({ns:ns,project:project,url:this.url,branch:'proto'});
                            res.json("pull success.");
                        } else {
                            res.json("cannot find project : "+ns+"/"+project);
                        }
                    });
                }
            })
        }
    });
};