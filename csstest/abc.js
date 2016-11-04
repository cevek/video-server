const fs = require('fs');
const postcss = require('postcss');
let gonzales = require('gonzales-pe');
const filename = __dirname + '/bootstrap.css';
const css = fs.readFileSync(filename, 'utf-8');
console.time('postcss');
postcss().process(css, {from: 'src/app.css', to: 'app.css'}).then((result) => {
    // console.log(result);
    console.timeEnd('postcss');
});


/*

setTimeout(()=>{
    console.time('gonzales');
    let parseTree = gonzales.parse(css);
    console.timeEnd('gonzales');
}, 200)*/
