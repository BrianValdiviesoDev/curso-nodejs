import { IConfig } from "./config.interface";
import { Secrets } from "./secrets";

export class Config extends Secrets implements IConfig{
    retryLogin: number;
    constructor() {
        super()
        this.retryLogin = 3
    }
}