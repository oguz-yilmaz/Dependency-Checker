import {File} from "../IO/Input/File"
import {Cli} from "../IO/Input/Cli"
import {Cli as OutputCli} from "../IO/Output/Cli"
import {PhpParser} from "../RepoParser/PhpParser/PhpParser"
import {NodeParser} from "../RepoParser/NodeParser/NodeParser"
import {SubversionRegistry} from "../Registry/subversion/SubversionRegistry"
import {GitRegistry} from "../Registry/git/GitRegistry"
import {Registry} from "../Registry/Registry"
import {RepoParser} from "../RepoParser/RepoParser"
import {Input} from "../IO/Input"
import {Options} from "../types/Options"

export class Factory {
    static fromOptions(options: { [key in keyof Options]: string} ): Options {
        return {
            input: this.createInput(options.input),
            registry: this.createRegistry(options.registry),
            parser: this.createParser(options.parser),
            output: this.createOutput(options.output),
        }
    }

    private static createInput(input: string): Input {
        switch (input) {
            case 'file':
                return new File()
            default:
                return new Cli()
        }
    }

    private static createParser(parser: string): RepoParser {
        switch (parser) {
            case 'composer.json':
                return new PhpParser()
            default:
                return new NodeParser()
        }
    }

    private static createRegistry(registry: string): Registry {
        switch (registry) {
            case 'subversion':
                return new SubversionRegistry()
            default:
                return new GitRegistry()
        }
    }

    private static createOutput(output: string): OutputCli {
        return new OutputCli()
    }
}