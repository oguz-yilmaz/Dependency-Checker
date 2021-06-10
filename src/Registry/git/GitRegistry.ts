import axios from 'axios'
import { Registry, Argument } from '../Registry'

export class GitRegistry implements Registry {
    url: string
    protocol = 'https'
    host = 'api.github.com'
    headers = ['Accept: application/json']

    constructor() {
        this.url = this.protocol + '://' + this.host + '/repos/'
    }

    async getConfigFile(args: Argument, configFile = 'package.json') {
        const res = await axios.get(
            `${this.url}${args.repoUser}/${args.repoName}/contents/${configFile}`
        )
        if (!res.data || !res.data.content) return '{}'
        return Buffer.from(res.data.content, 'base64').toString('ascii')
    }
}
