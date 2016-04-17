var fs = require('fs')
var path = require('path')

 module.exports = function (arg1,arg2,callback) { 

fs.readdir(arg1, function (err, list) {
  list.forEach(function (file) {
    if (path.extname(file) === '.' + arg2)
      console.log(file)
  })
})

callback()
  }  

