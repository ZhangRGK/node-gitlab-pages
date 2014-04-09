$(function() {
    $("#add").on("click",function() {
        $(".panel").removeClass("hidden");
        $("#edit").attr("disabled","disabled");
    });

    $("#submit").on("click",function() {
        var project = {
            "ns":$("#f_ns").val(),
            "project":$("#f_project").val(),
            "url":$("#f_url").val(),
            "doc":$("#f_doc").val(),
            "proto":$("#f_proto").val(),
            "desc":$("#f_desc").val()
        };
        $.post("/project",project)
            .done(function() {
                $(".panel").addClass("hidden");
                $("#edit").removeAttr("disabled");
                window.location.reload();
            })
            .fail(function(data) {
                showMessage(JSON.stringify(data),"danger",null);
            });
        return false;
    });

    $("#cancel").on("click",function() {
        $(".panel").addClass("hidden");
        $("#edit").removeAttr("disabled");
        return false;
    });

    $("#edit").on("click",function() {
        $("table input").css("border","1px solid").removeAttr("readonly");
        $("table .glyphicon").removeClass("hidden");
        $("#save").removeClass("hidden");
        $(this).addClass("hidden");
        $("#add").attr("disabled","disabled");
    });

    $("#save").on("click",function() {
        var projects = [];
        $("tbody > tr").each(function() {
            var project = {
                "ns":$(this).find("td > .t_ns").val(),
                "project":$(this).find("td > .t_project").val(),
                "url":$(this).find("td > .t_url").val(),
                "doc":$(this).find("td > .t_doc").val(),
                "proto":$(this).find("td > .t_proto").val()
            }
            projects.push(project);
        });
        console.log(projects);
        $.ajax("/project",{"data":{"projects":projects},"type":"put"})
            .done(function(data) {
                if(data == "success") {
                    $("table input").css("border","0px").attr("readonly","true");
                    $("table .glyphicon").addClass("hidden");
                    $("#save").addClass("hidden");
                    $("#edit").removeClass("hidden");
                    $("#add").removeAttr("disabled");
                    window.location.reload();
                } else {
                    showMessage(data,"danger",null);
                }
            }).fail(function(data) {
                showMessage(data.responseText.substring(0,data.responseText.indexOf("\n")),"danger",null);
            });
    });

    $(".glyphicon-minus-sign").on("click",function() {
        $(this).parents("tr").remove();
    });
});