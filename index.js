require('dotenv').config();

const Client = require('mpp-client-xt');
const fs = require('fs');

var prefix = "dvd!";
var client = new Client(process.env.URI);
var name = `deeveedee [${prefix}stats]`;
var cmds = [];

class Command {
    constructor (cmd, minargs, func) {
        this.cmd = cmd;
        this.minargs = minargs;
        this.func = func;
    }
}

function addcmd(cmd, minargs, func) {
    cmds.push(new Command(cmd, minargs, func));
}

client.start();

try {
    stats = require('./stats.json');
} catch(err) {
    if (err) {
        stats = {};
    }
}

const DVD = require('./lib');
var dvd = new DVD(stats)

save = () => {
    fs.writeFile('./stats.json', JSON.stringify(stats), () => {});
}

client.on('hi', () => {
    client.setChannel("✧𝓡𝓟 𝓡𝓸𝓸𝓶✧");
    if (client.getOwnParticipant().name !== name) {
        client.sendArray([{m:'userset', set:{name:name}}])
    }
});

cursor = setInterval(() => {dvd.update()}, 25);

chat = (str) => {client.sendArray([{m:'a', message:`\u034f`+str}])};

addcmd('help', 0, msg => {
    let str = "Commands:";
    cmds.forEach(cmd => {
        str = str + ` ${prefix}${cmd.cmd}, `;
    });

    str = str.substring(0, str.length - 2);
    chat(str);
});

addcmd('stats', 0, msg => {
    chat(`┐ Corner hits: ${dvd.stats.c} | Wall hits: ${dvd.stats.w}`);
});

addcmd('about', 0, msg => {
    chat(`Conception and programming Hri7566. Hosting provided by Integer/Fishi.`);
});

client.on('a', msg => {
    msg.args = msg.a.split(' ');
    msg.cmd = msg.args[0].split(prefix).join("").toLowerCase();
    msg.argcat = msg.a.substring(prefix.length + msg.cmd.length).trim();

    if (!msg.a.startsWith(prefix)) return;
    cmds.forEach(cmd => {
        if (msg.cmd == cmd.cmd) {
            if (msg.args.length - 1 >= cmd.minargs) {
                cmd.func(msg);
            } else {
                chat("Not enough arguments.");
            }
        }
    });
});

dvd.onUpdate = () => {
    client.sendArray([{m:'m', x: dvd.pos.x, y: dvd.pos.y}]);
}

dvd.onCornerHit = () => {
    client.sendArray([{m:'a', message:`Corner hit!`}]);
}

dvd.save = () => {
    fs.writeFile(__dirname+"/stats.json", JSON.stringify(dvd.stats), (err) => {
        if (err) {
            console.error(err);
        }
    });
}

cursorOn = () => {
    if (cursor) return false;
    cursor = setInterval(cursorfunc, 25);
    return true;
}

cursorOff = () => {
    if (!cursor) return false;
    clearInterval(cursor);
    return true;
}

/*
cursorCollide = client.on('m', p => {
    if (p._id == client.getOwnParticipant()._id) return;
    if ((pos.x > p.x - 5 && vel.x > 0) || (pos.x < p.x + 5 && vel.x < 0)) {
        vel.x = -vel.x;
    }

    if ((pos.y > p.y - 5 && vel.y > 0) || (pos.y < p.y + 5 && vel.y < 0)) {
        vel.y = -vel.y;
    }
});
*/

let enableLog = false;

client.on("hi", () => {
    setTimeout(() => {
        enableLog = true;
    }, 1000);
});

client.on("participant added", p => {
    if (!enableLog) return;
    fs.appendFile(__dirname+"/joins.log", `(${new Date(Date.now()).toLocaleDateString()} ${new Date(Date.now()).toLocaleTimeString()}) [${p._id}] ${p.name} joined the room.\n`, () => {});
});

client.on("participant removed", p => {
    if (!enableLog) return;
    fs.appendFile(__dirname+"/joins.log", `(${new Date(Date.now()).toLocaleDateString()} ${new Date(Date.now()).toLocaleTimeString()}) [${p._id}] ${p.name} left the room.\n`, () => {});
});
