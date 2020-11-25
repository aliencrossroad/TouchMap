const fs = require('fs')

function SaveToJson(filepath, obj) {
    let json = JSON.stringify(obj);
    fs.writeFile(filepath, json);
}