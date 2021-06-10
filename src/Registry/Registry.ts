export interface Argument {
    repoName: string;
    repoUser: string;
}

export interface Registry {
    readonly version?: number;
    protocol?: string;
    host: string;
    headers: string[];

    getConfigFile?: (args: Argument, configFile?: string) => object;
}
