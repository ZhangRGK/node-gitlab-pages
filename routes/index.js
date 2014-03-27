var path = require('path');


exports.index = function(req, res) {
    res.render('index',{title:'gitlab-pages'});
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
    console.log(filePath);
    console.log(urlPath);
    path.exists(filePath, function  (exists) {
        if(!exists) {
            res.render('404',{title:"gitlab-pages"});
        } else {
            res.render(urlPath, {layout: false});
        }
    });
};
