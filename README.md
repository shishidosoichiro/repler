repler.js
======

This project is for learning node.js. Repler.js provides the interface like Unix CUI.

[![Build Status](https://travis-ci.org/shishidosoichiro/repler.svg?branch=master)](https://travis-ci.org/shishidosoichiro/repler)
[![Coverage Status](https://img.shields.io/coveralls/shishidosoichiro/repler.svg)](https://coveralls.io/r/shishidosoichiro/repler)

```javascript
var repler = require('repler')
  , dosomething = require('dosomething')

repler(function(args, done, input, output){
	dosomething(args, done)
})
```
