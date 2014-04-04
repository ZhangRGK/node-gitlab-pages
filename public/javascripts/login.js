$(function() {
    $("#login").on("click",function() {
        $.post("/signIn",{"user": $("#signInMark").val(), "pwd": $("#pwd").val()})
            .done(function(data) {
                if(data == "success") {
                    window.location.href="/";
                } else {
                    $(".alert-warning").html(data).removeClass("hidden");
                }
            });
    });
});