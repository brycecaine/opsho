var game = new Phaser.Game(640, 480, Phaser.AUTO, 'game');

var PhaserGame = function () {
    this.bmd = null;
    this.alien = null;
    this.points = {
        'x': [ 32, 128, 256],
        'y': [ 240, 240, 240]
    };
    this.pi = 0;
    this.path = [];
};

PhaserGame.prototype = {
    init: function () {
        this.game.renderer.renderSession.roundPixels = true;
        this.stage.backgroundColor = '#204090';
    },

    preload: function () {
        //  We need this because the assets are on Amazon S3
        //  Remove the next 2 lines if running locally
        this.load.baseURL = 'http://files.phaser.io.s3.amazonaws.com/codingtips/issue008/';
        this.load.crossOrigin = 'anonymous';
        this.load.image('alien', 'assets/ufo.png');
        this.load.bitmapFont('shmupfont', 'assets/shmupfont.png', 'assets/shmupfont.xml');
        //  Note: Graphics are not for use in any commercial project
    },

    create: function () {
        this.bmd = this.add.bitmapData(this.game.width, this.game.height);
        this.bmd.addToWorld();
        this.alien = this.add.sprite(0, 0, 'alien');
        this.alien.anchor.set(0.5);
        var py = this.points.y;

        for (var i = 0; i < py.length; i++)
        {
            py[i] = this.rnd.between(32, 432);
        }

        this.hint = this.add.bitmapText(8, 444, 'shmupfont', "Linear", 24);
        this.plot();
    },

    plot: function () {
        this.bmd.clear();
        this.path = [];
        var x = 1 / game.width;
        console.log(game.width);

        for (var i = 0; i <= 1; i += x)
        {
            var px = this.math.linearInterpolation(this.points.x, i);
            var py = this.math.linearInterpolation(this.points.y, i);

            this.path.push( { x: px, y: py });
            this.bmd.rect(px, py, 1, 1, 'rgba(0, 255, 0, 1)');
        }

        for (var p = 0; p < this.points.x.length; p++)
        {
            this.bmd.rect(this.points.x[p], this.points.y[p], 6, 6, 'rgba(0, 255, 0, 1)');
        }
    },

    update: function () {
        this.alien.x = this.path[this.pi].x;
        this.alien.y = this.path[this.pi].y;
        this.pi++;

        if (this.pi >= this.path.length)
        {
            this.pi = 0;
        }
    }
};

game.state.add('Game', PhaserGame, true);