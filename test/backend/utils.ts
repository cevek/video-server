"use strict";

import {exec as Exec, spawn as Spawn, ChildProcess} from 'child_process';
export function exec(exec:string, params?:{timeout?: number}) {
    return new Promise((resolve, reject) => {
        Exec(exec, params,
            (err:Error, stdout:Buffer, stderr:Buffer) =>
                err ? reject(err) : resolve(stdout.toString() + stderr.toString()));
    });
}

export function spawn(exec:string, callback?:(output:string, cp?:ChildProcess)=>void, timeout?:number) {
    return new Promise((resolve, reject)=> {
        var parts = exec.split(' ');
        var cp = Spawn(parts.shift(), parts);
        var stdout = '';
        var handler = (data:Buffer) => {
            const str = data.toString();
            stdout += str;
            callback(str, cp);
        };
        cp.stdout.on('data', handler);
        cp.stderr.on('data', handler);
        cp.on('error', reject);
        cp.on('close', (code:number) => {
            resolve(stdout);
        });
        if (timeout > 0) {
            setTimeout(()=> {
                reject();
                cp.kill();
            }, timeout * 1000);
        }
    });
}