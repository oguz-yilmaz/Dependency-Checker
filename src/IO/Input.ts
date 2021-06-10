interface Arguments {
    repos: { repoName: string repoUser: string emails: string[] }[]
}

export interface Input {
    parseInput(): Arguments
}
