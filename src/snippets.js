/*!
 * Snippets.js
 * Copyright 2011, Rick Waldron
 * MIT License
 *
 */

(function( global ) {

  var // localize references
  doc = global.document;

  function Snippets( resource, inputs, callback ) {

    if ( !resource || !inputs ) {

      console.log( resource, inputs );
      throw new Error("Not enough arguments: Missing " + 
              ( ( !resource && "`resource`" ) || 
                ( !inputs && "`inputs`" ) ) );
    }

    this.data = {};

    this.load = function() {

      var head = doc.head || doc.getElementsByTagName("head")[0],
      script = doc.createElement("script");

      // Prime snippets resource to load asynchronously
      script.async = "async";

      // Setup handler
      global["__snippets"] = function( snips ) {

        this.data = snips;

        // Init the snippet machine
        this.initialize
        
        // Execute user callback if defined
        if ( callback ) {
          callback.call( null, snips );
        }

      }.bind(this);

      // Set resource location
      script.src = resource;

      script.onload = script.onreadystatechange = function() {

        // When complete, garbage collect the DOM
        if ( !script.readyState || /loaded|complete/.test( script.readyState ) ) {
          head.removeChild( script );
          delete global["__snippets"];
        }
      };

      // Append script element, import resource
      head.insertBefore( script, head.firstChild );

    // Bind lexical scope to closure
    // Immediately execute
    }.bind( this )();

    return this;
  }

  global.snippets = function( resource, inputs, callback ) {
    return new Snippets( resource, inputs, callback );
  };

  document.addEventListener("DOMContentLoaded", function() {

    var typables = doc.querySelectorAll("input,textarea");

    snippets("../data/snippets.json", typables, function( snips ) {
    
    });


  }, false);
  
})( this );
