import { SampleService } from "../../services/sample.service"

const sampleService = new SampleService()
it('throw an error', () => {
    expect(()=>sampleService.test()).toThrow('Method not implemented')
})