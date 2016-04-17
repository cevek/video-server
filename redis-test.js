"use strict";

var net = require('net');
var client = net.createConnection("/tmp/redis.sock");


client.on("connect", function () {
    console.log('connected');
    console.time('perf');
    // send();
});


var state = {resolve: null, count: 0};
var buff = new Buffer('*2\r\n$3\r\nGET\r\n$3\r\nfoo\r\n', 'utf8');
function send(callback) {
    // state.resolve = callback;
    client.write(buff);
}

function onData(data) {
    // state.resolve(data);
    state.count++;
    if (state.count < 31000) {
        send();
    } else {
        console.timeEnd('perf');
    }
}

client.on("data", onData);

var createClient = require('then-redis').createClient;
const db = createClient('/tmp/redis.sock')

var Redis = require('ioredis');
var redis = new Redis('/tmp/redis.sock');
const co = require('co');
co(function*(){
    console.time('ioredis');
    for (var i = 0; i < 31000; i++) {
        // yield redis.get('foo');
        yield db.get('foo');
    }
    console.timeEnd('ioredis');
});


/*
 const p = new Promise((resolve, reject)=> {
 send(resolve);
 });

 p.then((data)=> {
 console.log('done');
 });*/
