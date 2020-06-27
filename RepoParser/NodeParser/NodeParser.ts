import { RepoParser, Argument } from '../RepoParser';
import { Registry } from '../../Registry/Registry';
import latestVersion from 'latest-version';

export class NodeParser implements RepoParser {
  outdatedPackages: { [k: string]: any };
  confContent: {
    dependencies?: { [k: string]: any };
  };

  constructor() {
    this.confContent = {};
    this.outdatedPackages = {};
  }

  async parseConfig(args: Argument, registry: Registry) {
    const data = await registry.getConfigFile!(args);
    this.confContent = JSON.parse(data + '');
  }

  async parse() {
    let current;
    for (const dep of Object.keys(this.confContent.dependencies!)) {
      current = this.confContent.dependencies!;
      this.outdatedPackages[dep] = {
        currentVersion: current ? current[dep] : [dep],
        latestVersion: await this.checkVersion(dep),
      };
    }
    return this.outdatedPackages;
  }

  async checkVersion(repoName: string): Promise<any> {
    return await latestVersion(repoName);
  }
}
