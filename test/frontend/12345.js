"use strict";

const tscPath = require.resolve('typescript/lib/tsc');
const tsc = require('fs').readFileSync(tscPath).toString();
var walk = require('esprima-walk').walkAddParent;
var escodegen = require('escodegen');
var esprima = require('esprima');




const tscAst = esprima.parse(tsc);
const ast = esprima.parse('function findConfigFile(){}')
walk(ast, function (node) {
    if (node.type == 'FunctionDeclaration') {
        if (node.id.name == 'findConfigFile') {
            console.log(node);
            node.parent[node.parentKey] = esprima.parse('function findConfigFile(){return 123;}');
        }
    }
})

console.log(escodegen.generate(ast));
// console.log(escodegen.generate(esprima.parse(tsc)));


// const ts = require('typescript/lib/tsc');


/*const orig = ts.findConfigFile;
 ts.findConfigFile = function(searchPath, exist) {
 ts.emitFiles = eval('('+ts.emitFiles.toString()+')');
 const path = orig(searchPath, exist);
 try {
 const json = JSON.parse(fs.readFileSync(path).toString());
 if (json.plugins) {
 for (var i = 0; i < json.plugins.length; i++) {
 var plugin = json.plugins[i];
 require(plugin)(ts);
 }
 }
 }
 catch (e) {}
 return path;
 };

 // var searchPath = ts.normalizePath(ts.sys.getCurrentDirectory());
 // const configFileName = ts.findConfigFile(searchPath, ts.sys.fileExists);
 // console.log(configFileName);

 module.exports = ts;*/

