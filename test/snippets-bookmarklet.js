(function(g, $) {
  var f = function() {
        snippets( p + "data/"+c+"on", ins );
    }, 
    d = g.document,
    r = $ && $.getScript,
    c = "snippets.js",
    p = "https://raw.github.com/rwldrn/"+c+"/master/",
    u = p + "src/"+c,
    ins = d.querySelectorAll("input,textarea"),
    h, s;

    if ( !r || !r(u, f) ) {
      h = d.head;
      s = d.createElement("script")

      s.async = "async";
      s.src = u;
      s.onload = function() {
          h.removeChild( s );
          f();
      }, 
      h.insertBefore( s, h.firstChild );
    }

})(this, this.jQuery);
