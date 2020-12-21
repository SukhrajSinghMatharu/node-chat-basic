
    const io = require('socket.io')(3002);
    const cfg = require('./config.json');
    const tw = require('node-tweet-stream')(cfg);
    tw.track('socket.io');
    tw.track('javascript');
    tw.on('tweet', (tweet) => {
      io.emit('tweet', tweet);
    });

