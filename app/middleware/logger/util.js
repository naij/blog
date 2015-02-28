var path  = require('path');
var fmt   = require('util').format;
var chalk = require('chalk');

module.exports = {
    format: function (args) {
        var styles = chalk.styles;
        var msg = fmt.apply(null, args);

        msg = msg.replace(/\{\{([#\/])([^}]+)\}\}/g, function($0, $1, $2) {
            if (!styles.hasOwnProperty($2)) return $0;

            if ($1=='#') return styles[$2].open;
            if ($1=='/') return styles[$2].close;
        });
        return msg;
    },
    static: function (p) {
        var reg = /(.css)|(.gif)|(.html)|(.ico)|(.jpeg)|(.jpg)|(.js)|(.json)|(.pdf)|(.png)|(.svg)|(.swf)|(.tiff)|(.txt)|(.wav)|(.wma)|(.wmv)|(.xml)/;
        var extname = path.extname(p);

        return reg.test(extname);
    },
    time: function (start) {
        var delta = new Date - start;
        delta = delta < 10000
            ? delta + 'ms'
            : Math.round(delta / 1000) + 's';
        return delta;
    }
}