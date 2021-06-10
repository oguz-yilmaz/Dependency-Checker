//todo
interface Arguments {
    repos: { repoName: string; repoUser: string; emails: string[] }[];
}

export interface Storage {
    getData(): object;
    persist(data: object): void;
}
