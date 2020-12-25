class DVD {
    pos: Vector2;
    vel: Vector2;
    stats: Stats;

    constructor (stats: Stats) {
        this.pos = {
            x: 50,
            y: 50
        };

        this.vel = {
            x: 2/5,
            y: 2/7
        };

        this.stats = stats;
    }

    update() {
        let pos = this.pos;
        let vel = this.vel;
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
    }

    onCornerHit() {

    }

    onUpdate() {

    }

    save() {

    }
}

interface Vector2 {
    x: number;
    y: number;
}

interface Stats {
    c: number;
    w: number;
}

export = DVD;