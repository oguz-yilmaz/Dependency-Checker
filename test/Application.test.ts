import { FileStorage } from '../src/Storage/File/FileStorage'
import { TaskRegistrar } from '../src/Tasks/TaskRegistrar'
import { Application } from '../src/Application'
import { Cli } from '../src/IO/Input/Cli'
import { GitRegistry } from '../src/Registry/git/GitRegistry'
import { NodeParser } from '../src/RepoParser/NodeParser/NodeParser'

describe('Initializing Config Options', () => {
    const storage = new FileStorage()
    const taskRegistrar = new TaskRegistrar(storage)
    const app = new Application(taskRegistrar)

    app.setOptions({
        input: 'cli',
        registry: 'git',
        output: 'cli',
        config: 'package.json',
    })

    it('Gets IO/Input/Cli concrete class as input when set cli option', async () => {
        expect(app.input).toBeInstanceOf(Cli)
    })

    it('Gets Registry/git/GitRegistry concrete class as registry when set git option', async () => {
        expect(app.registry).toBeInstanceOf(GitRegistry)
    })

    it('Gets RepoParser/NodeParser/NodeParser concrete class as parser when set package.json option', async () => {
        expect(app.parser).toBeInstanceOf(NodeParser)
    })
})
