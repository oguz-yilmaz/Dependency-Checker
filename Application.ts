import { Cli } from './IO/Input/Cli';
import { File } from './IO/Input/File';
import { TaskRegistrer } from './Tasks/TaskRegistrar';
import { NodeParser } from './RepoParser/NodeParser/NodeParser';
import { GitRegistry } from './Registry/git/GitRegistry';
import { PhpParser } from './RepoParser/PhpParser/PhpParser';
import { SubversionRegistry } from './Registry/subversion/SubversionRegistry';

const registry = new GitRegistry();

export class Application {
  input: any;
  registry: any;
  parser: any;
  arguments: any;
  registrar: any;
  result: any[] = [];
  options: { [k: string]: any } = {};

  constructor(registrar: TaskRegistrer, options?: object) {
    this.factoryInput();
    this.factoryParser();
    this.factoryRegistry();
    this.arguments = this.input.parseInput();
    this.registrar = registrar;
  }

  setOptions(options: object) {
    this.options = options;
  }

  async process() {
    for (const args of this.arguments.repos) {
      this.result.push(await this.processSingle(args));

      this.registrar.registerTask('email', Date.now(), this.result);
      this.registrar.persist();
    }

    this.formatOutput();
  }

  async processSingle(args: any) {
    await this.parser.parseConfig(
      {
        repoName: args.repoName,
        repoUser: args.repoUser,
      },
      registry
    );

    const outdatedPackages = await this.parser.parse();

    return {
      emails: args.emails,
      repoUser: args.repoUser,
      repoName: args.repoName,
      outdatedPackages: outdatedPackages,
    };
  }

  factoryInput() {
    switch (this.options.input) {
      case 'file':
        this.input = new File();
        break;
      default:
        this.input = new Cli();
    }
  }

  factoryParser() {
    switch (this.options.config) {
      case 'composer.json':
        this.parser = new PhpParser();
        break;
      default:
        this.parser = new NodeParser();
    }
  }

  factoryRegistry() {
    switch (this.options.registery) {
      case 'subversion':
        this.registry = new SubversionRegistry();
        break;
      default:
        this.registry = new GitRegistry();
    }
  }

  formatOutput(platform?: string) {
    switch (this.options.output) {
      case 'cli':
        console.log(JSON.stringify(this.result));
        break;
      default:
      //
    }
  }
}
