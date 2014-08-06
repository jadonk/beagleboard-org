#!/usr/bin/env node
console.log('Starting convert_db.js');
var xml2js = require('xml2js');
var fs = require('fs');

var parser = xml2js.Parser();
var filepath = __dirname + '/../../db/';
var db = {};

addElements('/', 0, onDone);

function addElements(path, id, callback) {
    fs.readFile(filepath + id + '.xml', onFile);

    function onFile(err, data) {
        if(err) console.log('Error: ' + err);
        parser.parseString(data, onParse);
    }

    function onParse(err, result) {
        console.log('parsed ' + id);
        //console.log(id + ':' + JSON.stringify(result, null, '\t'));
        var children = result.xmlroot.hopobject[0]['hop:child'];
        for(var i in children) {
            var cid = children[i]['$'].idref;
            console.log('adding ' + cid);
            addElements(path + i + '/', cid, testForDone);
        }
    }
}

function testForDone() {
}

function onDone() {
    console.log(JSON.stringify(db, null, '\t'));
}

