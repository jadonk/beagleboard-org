var fs = require('fs');
var http = require('http');
var b = require('bonescript');

var state = 'init';
var phase = 0;
var leds = ['USR0', 'USR1', 'USR2', 'USR3'];
for(var i in leds) {
    b.pinMode(leds[i], b.OUTPUT);
    b.digitalWrite(leds[i]. b.HIGH);
}
setInterval(updateLEDs, 100);

var verifyContents = {};
verifyContents.date = new Date();
verifyContents.platform = b.getPlatform();
verifyContents.mounts = fs.readFileSync('/proc/mounts');

var req = http.get("http://beagleboard.org/latest-images/", onGetLatestImages);
req.on('error', onGetLatestImagesError);

function onGetLatestImages(res) {
    console.log("Got response: " + res.statusCode);
    fs.writeFileSync('/tmp/verify-updater.json', JSON.stringify(verifyContents, null, 4));
}

function onGetLatestImagesError(e) {
    console.log("Got error: " + e.message);
}

function updateLEDs() {
    if(state == 'init') {
        phase++;
        phase = phase % 8;
        if(phase == 0) {
            for(var i in leds) {
                b.pinMode(leds[i], b.OUTPUT);
                b.digitalWrite(leds[i]. b.HIGH);
            }
        } else if(phase == 4) {
            for(var i in leds) {
                b.pinMode(leds[i], b.OUTPUT);
                b.digitalWrite(leds[i]. b.LOW);
            }
        }
    } else if(phase == 'waiting') {
    } else {
    }
}
