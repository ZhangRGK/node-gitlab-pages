var mysql = require('mysql');
var bcrypt = require('bcrypt');

var pool  = mysql.createPool({
    host     : '192.168.0.194',
    user     : 'git',
    password : 'git_123456',
    database : 'gitlabhq_production',
    port:3306
});


exports.signIn = function(user,pwd,callback) {
    console.log("userService");
    var sql = "select encrypted_password from users where email = '"+user+"' or username ='"+user+"'";
    console.log("sql:"+sql);
    console.log(bcrypt.compareSync(pwd,"$2a$10$6P9S/KZX7GRzgkF8vE5i2u9bdhJXrNdpb.80D5AS3xfBbzVtSaRFC"));
    console.log("bcrypt");
    pool.query(sql,function(err,rows,fields) {
        console.log("err:"+err);
        if(err) {
            callback(false,err);
        } else if(rows.length<=0) {
            callback(false,"用户名或密码错误.");
        } else if(bcrypt.compareSync(pwd,rows[0].encrypted_password)) {
            callback(true,null);
        }
    });
}
//$2a$10$6P9S/KZX7GRzgkF8vE5i2u9bdhJXrNdpb.80D5AS3xfBbzVtSaRFC
//$2a$10$HVBs8dIIN9550AODMP.6HeN7R6tYmVi6DR/pUDLKVHnSpBgcZNVHS