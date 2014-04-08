$(function() {
    $("#login").on("click",function() {
        $.post("/signIn",{"user": $("#signInMark").val(), "pwd": $("#pwd").val()})
            .done(function(data) {
                console.log(data);
                if(data == "success") {
                    window.location.href="/";
                } else {
                    showMessage(data,"danger",null);
                }
            });
    });
});

var showMessage = function (message, type, millisecond) {
    if (type == 'success') {
        $(".alert-bar").append("<div class='alert alert-success alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"+message+"</div>")
    } else if (type == 'info') {
        $(".alert-bar").append("<div class='alert alert-info alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"+message+"</div>")
    } else if (type == 'warning') {
        $(".alert-bar").append("<div class='alert alert-warning alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"+message+"</div>")
    } else if (type == 'danger') {
        $(".alert-bar").append("<div class='alert alert-danger alert-dismissable'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button>"+message+"</div>")
    }
};