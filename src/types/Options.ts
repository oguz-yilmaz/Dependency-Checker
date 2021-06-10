import {Input} from "../IO/Input";
import {Registry} from "../Registry/Registry";
import {RepoParser} from "../RepoParser/RepoParser";
import {Output} from "../IO/Output";

export interface OptionsArguments {
    input: string;
    registry: string;
    parser: string;
    output: string;
}

export interface Options {
    input: Input;
    registry: Registry;
    parser: RepoParser;
    output: Output;
}