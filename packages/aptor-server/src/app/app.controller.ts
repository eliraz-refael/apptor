import { controller, HttpResponseOK, Get } from '@foal/core';

import { ApiController } from './controllers';

export class AppController {
	subControllers = [
		controller('/api', ApiController),
	];

	@Get('/test')
	getTest() {
		return new HttpResponseOK('HI there');
	}
}
