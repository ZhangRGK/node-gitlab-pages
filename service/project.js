var fs = require("fs");

var config = "../config/config.json";


exports.add = function (p, callback) {
    fs.exists(config, function (exists) {
        if (exists) {
            fs.readJSONSync(config, function (err,data) {
                if(err || (!data)) {
                    callback(err ? err : "cannot read projects data in config.json.");
                } else {
                    data.projects.push(p);
                    fs.writeJSONSync(config, p, function (err) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null);
                        }
                    });
                }
            });
        } else {
            callback("cannot find ../config/config.json file.");
        }
    });
};

exports.update = function (projects, callback) {
    fs.exists(config,function(exists) {
        if(exists) {
            var data = {"projects":projects};
            fs.writeFileSync(config,data,function(err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        } else {
            callback("cannot find ../config/config.json file.");
        }
    });
};

exports.getAll = function(callback) {
    fs.exists(config,function(exists) {
        if(exists) {
            fs.readJsonSync(config,function(err,data) {
                if(err || (!data)) {
                    callback(err ? err : "cannot read projects data in config.json.",null);
                } else {
                    callback(null,data.projects);
                }
            });
        }
    });
};