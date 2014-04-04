var mysql = require('mysql');
var bcrypt = require('bcrypt');

var pool  = mysql.createPool({
    host     : '127.0.0.1',
    user     : 'git',
    password : 'xl_123456',
    database : 'gitlabhq_production'
});


exports.signIn = function(user,pwd,callback) {
    var sql = "select encrypted_password from users where email = '"+user+"' or username ='"+user+"'";
    pool.query(sql,function(err,rows,fields) {
        if(err) {
            callback(false,err);
        } else if(rows.length<=0) {
            callback(false,"用户名或密码错误.");
        } else if(bcrypt.compareSync(pwd,rows[0].encrypted_password)) {
            callback(true,null);
        }
    });
}