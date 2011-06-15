/**
 * jQuery Micro-Templating plugin
 * 
 * Copyright 2011, Stephen Smyth
 * Licensed under the MIT
 * 
 * source https://raw.github.com/gist/860240/cd98cacbdeee7eb2cfb2ca3ca76638dae2a5b1af/micro3.js
 * variant of http://ejohn.org/blog/javascript-micro-templating/
 */
(function($) {

    var micro = $.micro = function(str) {
        var value = "var out = ''; out+=" + "'"
            + str.replace(/[\r\t\n]/g, " ")
                .replace(/'(?=[^%]*%>)/g, "\t")
                .split("'").join("\\'")
                .split("\t").join("'")
                .replace(/<%=(.+?)%>/g, "'; out += $1; out += '")
                .split("<%").join("';")
                .split("%>").join("out+='")
            + "'; return out;";

        return new Function("data", value);
    };
    
    // properties for convenient access
    micro.dataType = "tmpl";

    // setup jquery ajax properties for micro template
    // set content type
    $.ajaxSetup({
        accepts: {
            tmpl: "text/x-micro-tmpl application/x-micro-tmpl"
        },
        contents: {
            tmpl: /tmpl/
        },
        converters: {
            "text tmpl": micro
        }
    });
    
    // override mime type
    $.ajaxPrefilter("tmpl", function(options, originalOptions, jqXHR) {
        jqXHR.overrideMimeType('text/x-micro-tmpl; charset=UTF-8');
    });

})(jQuery);
