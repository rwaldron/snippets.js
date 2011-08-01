/*!
 * Snippets.js
 * Copyright 2011, Rick Waldron
 * Dual licensed under MIT or GPLv2
 *
 */

(function( global ) {

  var // localize references
  doc = global.document;

  function Snippets( resource, inputs, callback ) {

    // If no resource or no inputs, then there is no point.
    if ( !resource || !inputs ) {
      throw new Error("Not enough arguments: Missing " +
              ( ( !resource && "'resource'" ) ||
                ( !inputs && "'inputs'" ) ) );
    }

    // If a string selector was provided, get matching elements
    if ( typeof inputs === "string" ) {
      inputs = doc.querySelectorAll( inputs );
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

            // Get cursor position
            cursorAt = input.selectionStart,
            start = cursorAt - 2,
            end = cursorAt,

            // Store leading & trailing
            leading = val.slice( 0, start ) || "",
            trailing = val.slice( end, val.length ) || "",

            // Fragment lengths
            leadingLen = leading.length,

            // Take the two characters to the left of the cursor and create a key
            key = val.slice( start, end ),

            // try to dereference the triggers object
            replacement = triggers[ key ],

            // Cursor repositioning vars
            cursorCues, cursorToA, cursorToB;

          // If the tab key was pressed and a valid trigger was just typed
          if ( event.which === 9 && replacement ) {

            // A valid tab-trigger was typed, then tabbed.
            // Do not "tab" to next element in DOM tabIndex
            event.preventDefault();

            // Determine if a cursor cue was defined in the snippet
            // TODO: modify these to actually have variable replacement behaviour
            cursorCues = /(\$\{)([0-9]+)(\})/g.exec( replacement );

            if ( cursorCues && cursorCues.length ) {

              // Calculate the correct position of the
              // cursor cue, relative to the entire body
              // of text content.
              cursorToA = replacement.indexOf( cursorCues[0] );
              cursorToA += leadingLen;

              cursorToB = cursorToA + 1;

              // Remove the cursor cue from replacement
              // TODO: allow custom text swap into cursor cues
              replacement = replacement.replace( cursorCues[0], " " );

            } else {

              // No cursor cue was defined, set
              // cursor to end of snippet text
              cursorToA = leadingLen + replacement.length;
              cursorToB = cursorToA;
            }

            // Update input to reflect new value with
            // snippet injected into text bodt
            input.value = [ leading, replacement, trailing ].join("");

            // Update cursor position with either:
            //  - cursor cues position
            //  - end of replacement position
            input.setSelectionRange(
              cursorToA,
              cursorToB
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
      global.__snippets = function( snips ) {

        this.data = snips;

        // Init the snippet machine
        this.initialize();

        // Execute user callback if defined
        if ( callback ) {
          callback.call( this, snips );
        }

      }.bind(this);

      // Set resource location
      script.src = resource;

      script.onload = function() {
        head.removeChild( script );
        //delete global.__snippets;
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
