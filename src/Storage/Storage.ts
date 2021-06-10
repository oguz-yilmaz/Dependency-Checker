type Repo = { repoName: string repoUser: string emails: string[] }

interface Arguments {
    repos: Repo[]
}

export interface Storage {
    getData(): object
    persist(data: object): void
}
