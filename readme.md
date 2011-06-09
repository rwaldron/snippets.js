# Snippets.js

### Loads a set of frequently used snippets into the current document that insert on tab-triggers.

-------------------------
Contributions should follow these guidelines:
https://gist.github.com/793649


-------------------------

1. API:

	```javascript
	
	snippets( URI, NodeList [, callback (opt) ]);
	
	```

2. Usage:


	```javascript
	snippets(
		"https://raw.github.com/rwldrn/snippets.js/master/data/snippets.json", 
		document.querySelectorAll("input,textarea"), 
		function( snips ) {

			// ready.

			// |this| is the current snippets instance

		}
	);
	```


3. Snippets

	- `ca` => `console.assert( ${0} );`
	- `cc` => `console.count( ${0} );`
	- `cd` => `console.debug( ${0} );`
	- `ce` => `console.error( ${0} );`
	- `ci` => `console.info( ${0} );`
	- `cl` => `console.log( ${0} );`
	- `cm` => `console.memory( ${0} );`
	- `cp` => `console.profiles( ${0} );`
	- `cr` => `console.dir( ${0} );`
	- `cw` => `console.warn( ${0} );`

	- `pr` => `print( ${0} );`
	- `if` => `function() {\n\t${0}\n}`
	- `cr` => `function ${0}() {\n\n}`


