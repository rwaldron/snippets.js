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
      throw new Error("Not enough arguments: Missing " + 
              ( ( !resource && "'resource'" ) || 
                ( !inputs && "'inputs'" ) ) );
    }

    this.data = {};

    this.initialize = function() {

      var triggers = this.data;

      [].forEach.call( inputs, function( input ) {

        input.addEventListener("keydown", function( event ) {

          var // declare reference to event target element
            target = event.target || event.srcElement, 
            // store trimmed copy of strng contents
            val = (target.value || "").trim(), 
            // slice the last two characters
            // TODO: use cursor position instead
            key = val.slice( val.length-2 ),
            // try to dereference the triggers object
            replacement = triggers[ key ];

          // If the tab key was pressed and a valid trigger was just typed
          if ( event.which === 9 && replacement ) {

            event.preventDefault();

            input.value = val.replace( new RegExp( key + "$" ), replacement );

            // TODO: add cursor position "placeholders" to snippets, 
            // find them here, replace with empty string, place cursor
            // --- For now, just hop inside the last parens --- 
            input.setSelectionRange( 
              input.value.lastIndexOf("(") + 1,
              input.value.lastIndexOf(")")
            );

          }
        }, false);
      });

    // Bind lexical scope to closure
    }.bind( this );

    this.load = function() {

      var head = doc.head || doc.getElementsByTagName("head")[0],
      script = doc.createElement("script");

      // Prime snippets resource to load asynchronously
      script.async = "async";

      // Setup handler
      // TODO: this will clobber existing __snippets callbacks
      //         make unique
      global["__snippets"] = function( snips ) {

        this.data = snips;

        // Init the snippet machine
        this.initialize();
        
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
          //delete global["__snippets"];
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
})( this );
