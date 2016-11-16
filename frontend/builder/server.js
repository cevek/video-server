require('ts-node/register');
const Koa = require('koa');
const packer = require('./packer.config.ts').default;
const serve = require('koa-static');
const app = new Koa();
packer.watch().then(() => {
    app.use(serve(packer.options.dest));
    app.listen(3000);
    console.log('Listen http://localhost:3000/');
})
