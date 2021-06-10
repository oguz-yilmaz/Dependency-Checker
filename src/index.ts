import { Application } from './Application'
import { FileStorage } from './Storage/File/FileStorage'
import { TaskRegistrar } from './Tasks/TaskRegistrar'

const run = async () => {
    const storage = new FileStorage()
    const taskRegistrar = new TaskRegistrar(storage)

    const app = new Application(taskRegistrar, {
        input: 'cli',
        registry: 'git',
        output: 'cli',
        parser: 'package.json',
    })

    const res = await app.process()
    res.print()
}

try {
    run()
} catch (error) {
    console.log(error)
}
