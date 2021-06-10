import axios from 'axios'
import { Registry, Argument } from '../Registry'

export class SubversionRegistry implements Registry {
    url: string
    protocol = 'https'
    host = 'test'
    headers = ['Accept: application/json']

    constructor() {
        this.url = this.protocol + '://' + this.host + '/repos/'
    }

    async getConfigFile(args: Argument, configFile = 'package.json') {
        return
    }
}
