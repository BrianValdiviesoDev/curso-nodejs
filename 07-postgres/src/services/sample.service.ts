import { ServiceUnavailable } from "../errors/errorFactory";

export class SampleService{
    test() {
        throw new ServiceUnavailable('Method not implemented')
    }
}