# Snippets.js

### Loads a set of frequently used snippets into the current document that insert on tab-triggers.

-------------------------
Contributions should follow these guidelines:
https://gist.github.com/793649


-------------------------

API:

	```javascript
		snippets( URI, NodeList [, callback ]);
		
	```

Usage:


	```javascript
		snippets("https://raw.github.com/rwldrn/snippets.js/master/data/snippets.json", document.querySelectorAll("input,textarea"), function( snips ) {
			// ready.

		});
	```
