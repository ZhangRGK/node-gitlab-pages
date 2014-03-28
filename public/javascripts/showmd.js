$(function() {
    var codeprint = function() {
        $('code, pre').addClass('prettyprint');
        prettyPrint();
    }();

    var createnav = function() {
        var navtree = [];
        $("h2,h3").each(function(index) {
            var node = $(this);
            if(node[0].tagName == "H2") {
                navtree.push({"index":index,"html":node.html(),"children":[]});
            } else {
                if(navtree.length ==0 ){
                    navtree.push({"index":-1,"html":"root","children":[]})
                }
                navtree[navtree.length-1].children.push({"index":index,"html":node.html()});
            }
            $(this).after("<a name='"+index+"'></a>");
        });

        var navstr = "";
        for(var i in navtree) {
            var h2 = navtree[i];
            navstr += "<li><a href='#"+h2.index+"'>"+h2.html+"</a>";
            if(h2.children) {
                navstr += "<ul class='nav'>";
                for(var j in h2.children) {
                    var h3 = h2.children[j];
                    navstr += "<li><a href='#"+h3.index+"'>"+h3.html+"</a></li>"
                }
                navstr += "</ul>"
            }
            navstr += "</li>";
        }
        $("#tree").html(navstr);
    }();

    $("li>a").on("click",function() {
        $(".active").removeClass("active");
        $(this).addClass("active");
        $(".show").removeClass("show");
        $(this).next("ul").addClass("show");
    });
});
