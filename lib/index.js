"use strict";
var DVD = /** @class */ (function () {
    function DVD(stats) {
        this.pos = {
            x: 50,
            y: 50
        };
        this.vel = {
            x: 2 / 5,
            y: 2 / 7
        };
        this.stats = stats;
    }
    DVD.prototype.update = function () {
        var pos = this.pos;
        var vel = this.vel;
        pos.x += vel.x;
        pos.y += vel.y;
        if ((pos.x >= 100 && vel.x > 0) || (pos.x <= 0 && vel.x < 0)) {
            vel.x = -vel.x;
            this.stats.w += 1;
            this.save();
        }
        if ((pos.y >= 100 && vel.y > 0) || (pos.y <= 0 && vel.y < 0)) {
            vel.y = -vel.y;
            this.stats.w += 1;
            this.save();
        }
        if ((pos.x <= 0 && pos.y <= 0) || (pos.x >= 100 && pos.y <= 0) || (pos.x >= 100 && pos.y >= 100) || (pos.x <= 0 && pos.y >= 100)) {
            this.stats.c += 1;
            this.onCornerHit();
            this.save();
        }
        this.onUpdate();
    };
    DVD.prototype.onCornerHit = function () {
    };
    DVD.prototype.onUpdate = function () {
    };
    DVD.prototype.save = function () {
    };
    return DVD;
}());
module.exports = DVD;
