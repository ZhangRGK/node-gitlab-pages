var path = require('path');


exports.index = function(req, res) {
    res.render('index',{title:'gitlab-pages',scope:'所有文档'});
};

exports.blogs = function(req, res, next) {
    var urlPath = [
        'blogs/',
        req.params.user,
        '/',
        req.params.title,
        '.md'
    ].join('');
    var filePath = path.normalize('./' + urlPath);

    fs.exists(filePath, function  (exists) {
        if(!exists) {
            res.render("404");
        } else {
            res.render(urlPath, {layout: false});
        }
    });
};
