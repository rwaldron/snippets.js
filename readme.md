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
