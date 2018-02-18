#!/usr/bin/env node

var front = require('yaml-front-matter')
var fs = require('fs')
var glob = require('glob')
var xtend = require('xtend')

var state = fs.readFileSync(process.argv[2], 'utf8')
var content = []
var match = process.argv[3]
glob(match, {absolute: true}, function (err, files) {
  if (err) return console.error(err)
  var newstate
  files.forEach(function (file, a, b) {
    content.push(front.loadFront(file))
    if (content.length === files.length) {
      newstate = (xtend(JSON.parse(state), {content: content}))
      newstate = JSON.stringify(newstate)
      process.stdout.write(newstate)
    }
  })
})
