import * as crypto from 'crypto'
import { Storage } from '../Storage/Storage'
import { getTime, isEmptyObject } from '../helpers/helper'

export class TaskRegistrar {
    storage: Storage
    tasks: { [k: string]: any } = {}

    constructor(storage: Storage) {
        this.storage = storage
        this.tasks = !isEmptyObject(this.tasks)
            ? this.tasks
            : this.storage.getData()
    }

    // timeToRun : Date.now()
    registerTask(type: string, timeToRun: number, data: object) {
        const key: string = crypto
            .createHash('md5')
            .update(getTime(timeToRun))
            .digest('hex')

        const task = {
            type,
            data: JSON.stringify(data),
        }

        if (!this.tasks[key]) {
            this.tasks[key] = []
        }

        this.tasks[key].push(task)
    }

    persist() {
        this.storage.persist(this.tasks)
    }
}
