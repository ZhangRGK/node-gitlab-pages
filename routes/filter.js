exports.permission = function(req,res,next) {
    var user = req.session.user;
    if(!user) {
        user = req.cookies.user;
    }
    if(!user) {
        res.redirect("/login");
    } else {
        next();
    }
};