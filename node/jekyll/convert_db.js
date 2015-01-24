#!/usr/bin/env node
console.log('Starting convert_db.js');
var xml2js = require('xml2js');
var fs = require('fs');
var mkdirp = require('mkdirp');
var path = require('path');

var parser = xml2js.Parser();
var filepath = __dirname + '/../../db/';
var dstpath = __dirname + '/src';
var db = {};

addElements('/', 0);
process.on('exit', onDone);

function addElements(epath, id) {
    console.log('adding ' + epath + id);
    fs.readFile(filepath + id + '.xml', onFile);

    function onFile(err, data) {
        if(err) console.log('Error: ' + err);
        parser.parseString(data, onParse);
    }

    function onParse(err, result) {
        var uri = result.xmlroot.hopobject[0]['uri'];
        if(!uri) uri = id;
        var newpath = epath + uri + '/';
        db[newpath] = result;
        console.log('parsed ' + id + ':' + newpath);
        var body = result.xmlroot.hopobject[0]['body'];
        if(body) {
            var layout = result.xmlroot.hopobject[0]['render_skin'];
            var yaml = '' +
                '---\n' +
                'layout: ' + layout + '\n' +
                'title: ' + uri + '\n' +
                '---\n' +
                body[0];
            writeFile(dstpath + newpath + 'index.html', yaml, onWrite);
        }
        //console.log(id + ':' + JSON.stringify(result, null, '\t'));
        var children = result.xmlroot.hopobject[0]['hop:child'];
        for(var i in children) {
            var cid = children[i]['$'].idref;
            addElements(newpath, cid);
        }
    }

    function onWrite(err) {
        console.log('write err (' + id + '): ' + err);
    }
}

function onDone() {
    console.log(JSON.stringify(db, null, '\t'));
}

function writeFile(filename, contents, callback) {
    var mypath = path.dirname(filename);
    mkdirp(mypath, onMkdir);

    function onMkdir(err) {
        if(err) return callback(err);
        fs.writeFile(filename, contents, callback);
    }
}

