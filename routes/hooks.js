
var taskqueue = require("../util/taskqueue");
var fs = require("fs-extra");

var config = "config/config.json";

exports.pullDoc = function(req,res) {
    var project = req.body.repository.name;
    fs.exists(config,function(exists) {
        if(exists) {
            var data = fs.readJSONSync(config);
            if(!data.projects) {
                res.json("cannot read projects data in config.json.");
            } else {
                for(var i in data.projects) {
                    if(data.projects[i].project == project) {
                        taskqueue.push({"ns":data.projects[i].ns,"name":data.projects[i].name,"url":data.projects[i].url,"branch":data.projects[i].doc});
                    }
                }
            }
        }
        res.json("done");
    });
};

exports.pullProto = function(req,res) {
    var project = req.body.repository.name;
    fs.exists(config,function(exists) {
        if(exists) {
            var data = fs.readJSONSync(config);
            if(!data.projects) {
                res.json("cannot read projects data in config.json.");
            } else {
                for(var i in data.projects) {
                    if(data.projects[i].project == project) {
                        taskqueue.push({"ns":data.projects[i].ns,"name":data.projects[i].name,"url":data.projects[i].url,"branch":data.projects[i].proto});
                    }
                }
            }
        }
        res.json("done");
    });
};