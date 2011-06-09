

module("Core");
test("Constructor", 2, function() {

  ok( snippets, "`snippets` exists")

  equal( typeof snippets, "function", "`snippets` is a function");
});

test("Instances", function() {

  var expects = 3, 
    count = 0, 
    context = document.getElementById("qunit-fixture"),
    typeables = context.querySelectorAll("input,textarea");

  expect(expects);

  function plus() { 
    if ( ++count === expects ) {
      start(); 
    }
  }

  stop();

  var ref = 	{
		"ca":"console.assert( ${0} );",
		"cc":"console.count( ${0} );",
		"cd":"console.debug( ${0} );",
		"ce":"console.error( ${0} );",
		"ci":"console.info( ${0} );",
		"cl":"console.log( ${0} );",
		"cr":"console.dir( ${0} );",
		"cw":"console.warn( ${0} );",

		"pr": "print( ${0} )",
		"fe": "function() {\n\t${0}\n}",
		"cf": "function ${0}() {\n\n}",
		"fc": "(function() {\n\t${0}\n})();",
		"mp": "WOOO!"
	};

  snippets("../data/snippets.json", typeables, function( snips ) {

    equal( this.constructor.name, "Snippets", "this.constructor.name is 'Snippets'" );
    plus();

    deepEqual( snips, ref, "'snips' argument matches 'ref'" );
    plus();
    
    deepEqual( this.data, ref, "'this.data' matches 'ref'" );
    plus();
  });
});

module("Execution");
test("Param List", 3, function() {

  var context = document.getElementById("qunit-fixture"),
  typeables = context.querySelectorAll("input,textarea");

  try {
    snippets();
  } catch( e ) {
    ok( true, "Missing all params. Caught: " + e.message );
  }

  try {
    snippets("../data/snippets.json");
    
  } catch( e ) {
    ok( true, "Missing inputs param. Caught: " + e.message );
  }

  try {
    snippets("../data/snippets.json", typeables );

    ok( true, "All required params. No exception thrown" );
    
  } catch( e ) {
    ok( false, "All required params. Caught an error, but should not have: " + e.message );
  }

});


test("Async Loading", function() {

  var expects = 1, 
    count = 0, 
    context = document.getElementById("qunit-fixture"),
    typeables = context.querySelectorAll("input,textarea");

  expect(expects);
  
  function plus() { 
    if ( ++count === expects ) {
      start(); 
    }
  }  
  
  stop();

  snippets("../data/snippets.json", typeables, function( snips ) {
    if ( !count ) {
      ok( snips, "loaded!" );
      plus();
    }
  });
});

test("Replacement Triggers", function() {

  var expects = 6, 
    count = 0, 
    context = document.getElementById("qunit-fixture"),
    typeables = context.querySelectorAll("input,textarea"),
    input = typeables[ 0 ],
    evt = document.createEvent( "Events" );

  expect(expects);
  
  function plus() { 
    if ( ++count === expects ) {
      start(); 
    }
  }  
  
  stop();

  snippets("../data/snippets.json", typeables, function( snips ) {

    evt.initEvent( "keydown", true, true, window, 1 );
    evt.which = 9;

    input.value = "cl";
    input.dispatchEvent( evt );

    equal( input.value, "console.log(   );", "'cl => console.log(   );'" );
    plus();

    //console.log( input.selectionStart, input.value.length );

    equal( input.selectionStart, 13, "13 chars from 0 index to position of cursor cue");
    plus();

    equal( input.value.length, 17, "17 chars total length");
    plus();

    // Add another snippet
    input.value = input.value + " mp";
    input.dispatchEvent( evt );

    equal( input.value, "console.log(   ); WOOO!", "'console.log(   ); mp' => 'console.log(   ); WOOO!'" );
    plus();

    equal( input.selectionStart, 23, "23 chars from 0 index to position of cursor cue");
    plus();

    equal( input.value.length, 23, "23 chars total length");
    plus();

  });
});
