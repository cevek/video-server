var co = require('co');
var fs = require('fs');
var request = require('request');

var get = url => new Promise((resolve, reject) => request(url, (err, res, body)=>err ? reject(err) : resolve(body)));
var post = (url, data) => new Promise((resolve, reject) => request.post({url: url, formData: data}, (err, res, body)=>err ? reject(err) : resolve(body)));

var file = fs.createReadStream(__filename);

var baseUrl = 'http://localhost:1335';
co(function *() {
    var data = JSON.parse(yield get(baseUrl + '/getsession'));
    var res = yield post(`${baseUrl}/uploadpart?usid=${data.usid}&type=video&from=0&filesize=1559190185&makefile=1&getmediainfo=1`, {
        data: file
    });
    console.log(res);
}).catch(console.error);
