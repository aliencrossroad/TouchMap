"use strict";

var fs = require('fs');

function SaveToJson(filepath, obj) {
  var json = JSON.stringify(obj);
  fs.writeFile(filepath, json);
}