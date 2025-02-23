import { SampleService } from "../services/sample.service"

const sampleService = new SampleService()
export class SampleController{
    test() {
        return sampleService.test()
    }
}