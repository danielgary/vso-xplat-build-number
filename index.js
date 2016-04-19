#!/usr/bin/env node

require('shelljs/global');

const fs = require('fs');
const yargs = require('yargs');

const argv = yargs
    .usage('Usage: $0 -b "buildNumber" -i "inputFile"')
    .demand(['b', 'i'])
    .argv;


//Does the input file exist?
if (!fs.existsSync(argv.i)) {
    console.log("File does not exist: " + argv.i);
}

//Try to sed it
try {

    sed('-i', 'BUILD_NUMBER.*', `BUILD_NUMBER = ${argv.b}`, argv.i);
    sed('-i', 'versionCode [0-9]+', `versionCode ${argv.b}`, argv.i);

} catch (err) {
    console.error(err);
}