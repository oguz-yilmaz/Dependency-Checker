import { RepoParser, Argument } from '../RepoParser';
import { Registry } from '../../Registry/Registry';

export class PhpParser implements RepoParser {
  result: { [k: string]: any };
  confContent: {
    dependencies?: { [k: string]: any };
  };

  constructor() {
    this.confContent = {};
    this.result = {};
    this.result.outdatedPackages = {};
  }

  async parseConfig(args: Argument, registry: Registry) {
    const data = await registry.getConfigFile!(args);
    this.confContent = JSON.parse(data + '');
  }

  async parse() {
    //implement
    return {
      repoName: '',
      repoUser: '',
      outdatedPackages: {},
    };
  }

  async checkVersion(repoName: string): Promise<any> {
    //implement
    return new Promise(() => {});
  }
}
