import { Storage } from '../Storage';
import fs from 'fs';
import { resolve } from 'path';

export class FileStorage implements Storage {
    path: string;

    constructor(path?: string) {
        this.path = path ? path : __dirname + '/_data/data.cache';
        this.path = resolve(this.path);
    }

    getData() {
        let data = fs.readFileSync(this.path, {
            encoding: 'utf8',
            flag: 'r',
        });

        if (!data) data = '{}';

        return JSON.parse(data);
    }

    persist(data: object) {
        fs.writeFileSync(this.path, JSON.stringify(data));
    }
}
