var fs = require('fs');
var http = require('http');
var b = require('bonescript');
var crypto = require('crypto');
var child_process = require('child_process');
var socketio = require('bonescript/node_modules/socket.io');

// Setup LED indicators
var state = 'init';
var phase = 0;
var leds = ['USR0', 'USR1', 'USR2', 'USR3'];
for(var i in leds) {
    b.pinMode(leds[i], b.OUTPUT);
    b.digitalWrite(leds[i], b.HIGH);
}
var ledTimer = setInterval(updateLEDs, 100);

if(false) {
    doDownload('http://debian.beagleboard.org/images/bone-debian-7.4-2014-04-14-2gb.img.xz');
    //doDownload('http://beagleboard.org/static/test.txt.xz');
} else if(process.argv.length > 2) {
    doDownload(process.argv[2]);
} else {
    // Try to figure out rootfs media
    var rootfs;
    fs.readdir("/sys/bus/mmc/devices/mmc1:0001/block", onReadDir);

    // Timeout on no connect for 3 minutes
    var timeout = setTimeout(onDisconnect, 3*60*1000);
}

function onReadDir(error, files) {
    if(error) {
        onDisconnect();
    } else {
        if((typeof files == typeof []) && (files[0] == 'mmcblk0')) {
            rootfs = 'eMMC';
        } else {
            rootfs = 'uSD';
        }
        startServer();
    }
}

var port = 4999;
function startServer() {
    // Setup connection listener
    getPort();
}

function getPort() {
    port++;
    console.log('Trying port ' + port);
    var io = socketio.listen(port);
    io.set('log level', 1);
    io.on('error', getPort);
    io.sockets.on('connection', onConnection);
}

var client;
var waitForCurl = false;
function onConnection(socket) {
    client = socket;

    clearTimeout(timeout);
    state = 'connected';
    var connectDate = new Date();
    socket.emit('start', { date: connectDate, port: port, rootfs: rootfs });
    socket.on('mounts', onMounts);
    socket.on('download', onDownload);
    socket.on('disconnect', onDisconnect);

    function onMounts(data) {
        fs.readFile('/proc/mounts', 'ascii', onMountsFile);
    }

    function onMountsFile(error, data) {
        socket.emit('mounts', {error: error, data: data});
    }

    function onDownload(msg) {
        doDownload(msg.file);
    }
}

function doDownload(file) {
    state = 'download';

    console.log('downloading: ' + file);
    var umount = child_process.spawn('bash', ['-c', "for n in /dev/mmcblk1*;do umount $n;done"]);
    umount.stdout.pipe(process.stdout);
    umount.stderr.pipe(process.stderr);
    umount.on('close', startCurl);

    function startCurl() {
        //var curl = child_process.spawn('bash', ['-c', "curl -# " + file + " | xzcat | tee >(dd of=/dev/null) | md5sum"]);
        var curl = child_process.spawn('bash', ['-c', "curl -# " + file + " | tee >(xzcat | dd of=/dev/mmcblk1) | md5sum"]);
        curl.on('error', onError);
        curl.on('close', onCurlExit);
        curl.stdout.on('data', onCurlData);
        curl.stdout.setEncoding('ascii');
        curl.stderr.on('data', onCurlUpdate);
        curl.stderr.setEncoding('ascii');
    }

    function onCurlExit() {
        console.log('curl exited');
        doExit();
    }

    function onCurlData(data) {
        console.log('md5sum: ' + data.substring(0,32));
        if(client) client.emit('done', { md5sum: data.substring(0,32) });
    }
    
    var lastProgress = 0;
    function onCurlUpdate(data) {
        var progress;
        var x = data.match(/\d+\.+\d*\%/);
        if(x) progress = parseFloat(x[0]);
        if(progress > 99) waitForCurl = true;
        if(progress && lastProgress < progress) {
            lastProgress = progress;
            if(client) client.emit('progress', { progress: progress.toFixed(1) });
            else console.log('progress: ' + progress + '%');
        }        
    }

    function onError(error) {
        console.log('Error: ' + error);
        if(client) client.emit('error', { error: error });
        doExit();
    }
}

function doExit() {
    restoreLEDs();
    var shutdown = child_process.spawn('shutdown', ['-r', '-t', '5', 'now']);
    shutdown.stdout.pipe(process.stdout);
    shutdown.stderr.pipe(process.stderr);
    shutdown.on('close', onShutdown);
}

function onShutdown() {
    fs.unlinkSync(__filename);
    process.exit(0);
}

function onDisconnect() {
    state = 'disconnected';
    if(!waitForCurl) {
    	doExit();
    }
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
    } else if(state == 'done') {
        if(phase % 1) {
            setLEDs(b.HIGH);
        } else {
            setLEDs(b.LOW);
        }
    }
}

function setLEDs(level) {
    for(var i in leds) {
        b.digitalWrite(leds[i], level);
    }
}

function restoreLEDs() {
    clearInterval(ledTimer);
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
