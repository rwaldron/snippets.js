(function(global) {
  var doc = global.document;
  head = doc.head || doc.getElementsByTagName("head")[0],
  script = doc.createElement("script"),
  typeables = doc.querySelectorAll("input,textarea");

  script.async = "async";
  script.src = "https://raw.github.com/rwldrn/snippets.js/master/src/snippets.js";
  script.onload = script.onreadystatechange = function() {
    if ( !script.readyState || /loaded|complete/.test( script.readyState ) ) {
      head.removeChild( script );
      snippets("https://raw.github.com/rwldrn/snippets.js/master/data/snippets.json", typeables );
    }
  };
  head.insertBefore( script, head.firstChild );
})(this);
