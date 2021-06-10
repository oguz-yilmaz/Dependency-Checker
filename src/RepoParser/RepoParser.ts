import { Registry } from '../Registry/Registry';

export interface Argument {
    repoName: string;
    repoUser: string;
}

interface ParsedArgument {
    repoName: string;
    repoUser: string;
    outdatedPackages: { [k: string]: any };
}

export interface RepoParser {
    parseConfig(args: Argument, registry: Registry): void;
    parse(): Promise<any>;
    checkVersion(repoName: string): Promise<any>;
}
