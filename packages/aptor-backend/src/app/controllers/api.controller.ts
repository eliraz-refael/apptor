import { Get, HttpResponseOK } from '@foal/core';

export class ApiController {

  @Get('/')
  index(ctx) {
    return new HttpResponseOK('Hello world!');
  }
	
	@Get('/test')
	test() {
		return new HttpResponseOK('hi there you1');
	}

}
