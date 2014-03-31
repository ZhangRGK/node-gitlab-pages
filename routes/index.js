var projectService = require("../service/project");


exports.index = function(req, res) {
    projectService.getAll(function(err,projects) {
        res.render('index',{"title":'gitlab-pages',"scope":'所有文档',"projects":projects});
    });
};
