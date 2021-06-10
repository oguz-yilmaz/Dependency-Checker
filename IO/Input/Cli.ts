import { Input } from '../Input';

export class Cli implements Input {
    parseInput() {
        var myArgs = process.argv.slice(2);

        return {
            repos: [
                {
                    repoName: myArgs[1] ?? null,
                    repoUser: myArgs[0] ?? null,
                    emails: myArgs.slice(2, 4) ?? null,
                },
            ],
        };
    }
}
