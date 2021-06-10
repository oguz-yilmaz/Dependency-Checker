import { Input } from '../Input';

export class File implements Input {
    parseInput(path?: string) {
        return {
            repos: [
                { repoName: 'test', repoUser: 'user', emails: ['test@test.com'] },
            ],
        };
    }
}
