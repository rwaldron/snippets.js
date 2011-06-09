(function(g) {
  var f = function() {
		snippets( "https://raw.github.com/rwldrn/snippets.js/master/data/snippets.json", ins );
	}, 
	d = g.document, 
	$ = g.jQuery,
	u = "https://raw.github.com/rwldrn/snippets.js/master/src/snippets.js",
	h, s, ins;

  if ( $ ) {
		$.getScript(u, f);
  } else {
  
	h = d.head;
	s = d.createElement("script");
	ins = d.querySelectorAll("input,textarea");

	s.async = "async";
	s.src = u;
	s.onload = function() {
		h.removeChild( s );
		f();
	};
	h.insertBefore( s, h.firstChild );
  
  }
})(this);
