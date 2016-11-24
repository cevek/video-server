"use strict";
import request = require('request');
import {createWriteStream, accessSync, constants} from "fs";
import {exec as Exec, spawn as Spawn, ChildProcess} from "child_process";
export async function exec(exec: string, params?: {maxBuffer?: number, timeout?: number}) {
    if (!params) {
        params = {};
    }
    if (!params.maxBuffer) {
        params.maxBuffer = 10000000;
    }
    return await (new Promise<string>((resolve, reject) => {
        Exec(exec, params,
            (err: Error, stdout: string, stderr: string) =>
                err ? reject(exec + '\n' + err) : resolve(stdout.toString() + stderr.toString()));
    }));
}

export async function spawn(exec: string, callback?: (output: string, cp?: ChildProcess)=>void, timeout?: number) {
    return await (new Promise((resolve, reject) => {
        var parts = exec.split(' ');
        var cp = Spawn(parts.shift(), parts);
        var stdout = '';
        var handler = (data: Buffer) => {
            const str = data.toString();
            stdout += str;
            callback(str, cp);
        };
        cp.stdout.on('data', handler);
        cp.stderr.on('data', handler);
        cp.on('error', (err: Error) => reject(exec + '\n' + err));
        cp.on('close', (code: number) => {
            resolve(stdout);
        });
        if (timeout > 0) {
            setTimeout(() => {
                reject();
                cp.kill();
            }, timeout * 1000);
        }
    }));
}

export function genId() {
    return +(Math.random().toString().substr(2, 6) + Math.random().toString().substr(2, 6) + Math.random().toString().substr(2, 6));
}

export function toMap<T>(items: T[], key?: string) {
    if (!key) {
        key = 'id';
    }
    var map: {[key: string]: T} = {};
    for (var i = 0; i < items.length; i++) {
        var item = <any>items[i];
        map[item[key]] = item;
    }
    return map;
}

export function fileExists(filename: string) {
    try {
        accessSync(filename, constants.F_OK)
        return true;
    } catch (e) {
        return false;
    }
}

export function downloadFile(url: string, filename: string) {
    return new Promise((resolve, reject) => {
        const file = createWriteStream(filename);
        request(url).pipe(file);
        file.on('finish', resolve);
        file.on('error', reject);
    });
}