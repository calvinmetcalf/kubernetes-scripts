var fs = require('fs');

var pack = require('./package.json');
pack.version = '0.0.0';
fs.writeFileSync('./package2.json', JSON.stringify(pack, false, 2));
