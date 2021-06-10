import {Output} from "../Output";

export class Cli implements Output {
    print(message: string): void {
        console.log(message)
    }
}