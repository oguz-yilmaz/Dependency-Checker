import { TaskRegistrar } from './Tasks/TaskRegistrar'
import { GitRegistry } from './Registry/git/GitRegistry'
import {Options, OptionsArguments} from "./types/Options"
import {Factory} from "./Factories/Factory"
import {Input} from "./IO/Input"
import {Registry} from "./Registry/Registry"
import {RepoParser} from "./RepoParser/RepoParser"
import {Output} from "./IO/Output"

const registry = new GitRegistry()

export class Application {
    input: Input
    registry: Registry
    parser: RepoParser
    output: Output
    arguments: any
    result: any[] = []

    constructor(private registrar: TaskRegistrar, private readonly options: OptionsArguments) {
        ({
            input: this.input,
            registry: this.registry,
            parser: this.parser,
            output: this.output,
        } = this.parseOptions())

        this.arguments = this.input.parseInput()
    }

    print = (): () => void => (): void => this.output.print(this.result.join('\n'))

    parseOptions(): Options {
        return Factory.fromOptions(this.options)
    }

    async process() {
        for (const args of this.arguments.repos) {
            this.result.push(await this.processSingle(args))

            this.registrar.registerTask('email', Date.now(), this.result)
            this.registrar.persist()
        }

        return this
    }

    async processSingle(args: any) {
        await this.parser.parseConfig(
            {
                repoName: args.repoName,
                repoUser: args.repoUser,
            },
            registry
        )

        const outdatedPackages = await this.parser.parse()

        return {
            emails: args.emails,
            repoUser: args.repoUser,
            repoName: args.repoName,
            outdatedPackages: outdatedPackages,
        }
    }
}
