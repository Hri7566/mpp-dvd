const Client = require('mpp-client-xt');
const fs = require('fs');

var client = new Client("wss://www.multiplayerpiano.com:443");

client.start();

stats = require('./stats.json');

const DVD = require('./lib');
var dvd = new DVD(stats)

save = () => {
    fs.writeFile('./stats.json', JSON.stringify(stats), () => {});
}

client.on('hi', () => {
    console.log("Hi!");
    client.setChannel("✧𝓡𝓟 𝓡𝓸𝓸𝓶✧");
});

cursor = setInterval(() => {dvd.update()}, 25);

client.on('a', msg => {
    let args = msg.a.split(' ');
    let cmd = args[0].toLowerCase();
    let argcat = msg.a.substring(cmd.length).trim();
    if (cmd == "dvd!stats") {
        client.sendArray([{m:'a', message:`┐ Corner hits: ${dvd.stats.c} | Wall hits: ${dvd.stats.w}`}]);
    }
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