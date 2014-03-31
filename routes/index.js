var config = require("../config/config.json");


exports.index = function(req, res) {
    res.render('index',{title:'gitlab-pages',scope:'所有文档',projects:config.projects});
};
