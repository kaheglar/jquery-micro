#jQuery Micro Templating plugin 

#Description
jQuery Micro Template
    
##Usage
    var render = $.micro("<h1><%=data.title%></h1>");
    $("body").html(render({ title: "Template Loaded" }));
