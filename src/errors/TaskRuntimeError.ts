import { BaseError } from './BaseError'

export class TaskRuntimeError extends BaseError {
    constructor(taskId?: string, data?: string) {
        super(`Error while running Task: ${taskId} with data: ${data} `)
    }
}
