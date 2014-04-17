//require('v8-profiler');
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
setInterval(updateLEDs, 100);

if(false) {
    doDownload('http://debian.beagleboard.org/images/bone-debian-7.4-2014-04-14-2gb.img.xz');
} else if(process.argv.length > 2) {
    doDownload(process.argv[2]);
} else {
    // Try to figure out rootfs media
    var rootfs;
    fs.readdir("/sys/bus/mmc/devices/mmc1:0001/block", onReadDir);

    // Timeout on no connect for 2 minutes
    var timeout = setTimeout(onDisconnect, 2*60*1000);
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
var offset = 0;
var md5sum;
var xz;
var dd;
function onConnection(socket) {
    client = socket;

    clearTimeout(timeout);
    state = 'connected';
    var connectDate = new Date();
    socket.emit('start', { date: connectDate, port: port, rootfs: rootfs });
    socket.on('mounts', onMounts);
    socket.on('download', onDownload);
    socket.on('proxy', onProxy);
    socket.on('done', onDone);
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

    function onProxy(msg) {
        if(typeof msg == typeof {}) {
            if(msg.offset == offset) {
                md5sum.update(msg.data, 'binary');
                offset += msg.size;
                socket.emit('download', { offset: offset, size: 524288 });
            } else {
                socket.emit('error', { offset: offset });
            }
        } else {
            offset = 0;
            md5sum = crypto.createHash('md5');
            socket.emit('download', { offset: offset });
        }
    }

    function onDone(msg) {
        socket.emit('done', { offset: offset, md5sum: md5sum.digest('hex') });
    }
}

function doDownload(file) {
    state = 'download';
    md5sum = crypto.createHash('md5');
    xz = child_process.spawn('xzcat');
    dd = child_process.spawn('dd', ['of=/dev/null']);
    //dd = child_process.spawn('dd', ['of=/dev/mmcblk1']);
    xz.stdout.pipe(dd.stdin);
    xz.stderr.pipe(process.stderr);
    dd.stderr.pipe(process.stderr)
    xz.on('exit', onXZExit);
    //dd.on('close', onDDExit);
    dd.on('exit', onDDExit);

    var request = http.get(file, onResponse);
    request.on('error', onError);

    function onXZExit() {
        console.log('xzcat exited');
        dd.stdin.end();
    }

    function onDDExit() {
        console.log('dd exited');
        if(client) client.emit('done', { md5sum: md5sum.digest('hex') });
    }
        
    function onResponse(response) {
        console.log('downloading ' + file);
        response.setEncoding('binary');
        response.on('error', onError);
        response.on('data', onData);
        response.on('end', onEnd);
        response.pipe(md5sum);
        response.pipe(xz.stdin);

        function onData(data) {
            //md5sum.update(data, 'binary');
            //xz.stdin.write(data, 'binary');
            offset += data.length;
            var progress = Math.ceil(offset/10000000);
            if(client) client.emit('download', { progress: progress });
        }

        function onEnd() {
            console.log('download completed');
            state = 'done';
            if(client) client.emit('download', { progress: 100 });
            //xz.stdin.end();
        }
    }

    function onError(error) {
        if(client) client.emit('error', { error: error });
        onDisconnect();
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

