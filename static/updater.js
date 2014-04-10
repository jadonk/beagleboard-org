var fs = require('fs');
var net = require('net');
var b = require('bonescript');
var socketio = require('bonescript/node_modules/socket.io');

// Setup LED indicators
var state = 'init';
var phase = 0;
var leds = ['USR0', 'USR1', 'USR2', 'USR3'];
for(var i in leds) {
    b.pinMode(leds[i], b.OUTPUT);
    b.digitalWrite(leds[i], b.HIGH);
}
setInterval(updateLEDs, 100);

// Setup connection listener
var port = 4999;
getPort();

// Timeout on no connect for 2 minutes
var timeout = setTimeout(onDisconnect, 2*60*1000);

function onConnection(socket) {
    clearTimeout(timeout);
    state = 'connected';
    var connectDate = new Date();
    socket.emit('connect', { date: connectDate, port: port });
    socket.on('mounts', onMounts);
    socket.on('download', onDownload);
    socket.on('disconnect', onDisconnect);

    function onMounts(data) {
        fs.readFile('/proc/mounts', 'ascii', onMountsFile);
    }
    
    function onMountsFile(error, data) {
        socket.emit('mounts', {error: error, data: data});
    }

    function onDownload(data) {
        state = 'download';
    }
}
    
function onDisconnect() {
    state = 'disconnected';
    restoreLEDs();
    fs.unlinkSync(__filename);
    process.exit(0);
}

function updateLEDs() {
    phase = (phase + 1) % 8;
    if(state == 'init') {
        if(phase == 0) {
            setLEDs(b.HIGH);
        } else if(phase == 6) {
            setLEDs(b.LOW);
        }
    } else if(state == 'connected') {
        if(phase == 0) {
            setLEDs(b.HIGH);
        } else if(phase == 1) {
            setLEDs(b.LOW);
        }
    } else if(state == 'download') {
        b.digitalWrite('USR0', (phase == 0 || phase == 7) ? b.HIGH : b.LOW);
        b.digitalWrite('USR1', (phase == 1 || phase == 6) ? b.HIGH : b.LOW);
        b.digitalWrite('USR2', (phase == 2 || phase == 5) ? b.HIGH : b.LOW);
        b.digitalWrite('USR3', (phase == 3 || phase == 4) ? b.HIGH : b.LOW);
    }
}

function setLEDs(level) {
    for(var i in leds) {
        b.digitalWrite(leds[i], level);
    }
}

function restoreLEDs() {
    var p = '/sys/class/leds/beaglebone:green:usr';
    b.digitalWrite('USR0', b.LOW);
    b.digitalWrite('USR1', b.LOW);
    b.digitalWrite('USR2', b.LOW);
    b.digitalWrite('USR3', b.LOW);
    b.writeTextFile(p+'0/trigger', 'heartbeat');
    b.writeTextFile(p+'1/trigger', 'mmc0');
    b.writeTextFile(p+'2/trigger', 'cpu0');
    b.writeTextFile(p+'3/trigger', 'mmc1');
}

function getPort() {
    port++;
    console.log('Trying port ' + port);
    var io = socketio.listen(port);
    io.on('error', getPort);
    io.sockets.on('connection', onConnection);
}
