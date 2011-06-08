

module("Core");
test("Snippets", 2, function() {

  ok( snippets, "`snippets` exists")

  equal( typeof snippets, "function", "`snippets` is a function");
});


test("Params list", 3, function() {

  var typeables = document.querySelectorAll("input,textarea");

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

module("Async")
test("Loading", function() {

  var expects = 1, 
    count = 0, 
    typeables = document.querySelectorAll("input,textarea");

  expect(expects);
  
  function plus() { 
    if ( ++count === expects ) {
      start(); 
    }
  }  
  
  stop();

  snippets("../data/snippets.json", typeables, function( snips ) {
    ok( snips, "loaded!" );
    plus();
  });
});
// loading async behaviour


