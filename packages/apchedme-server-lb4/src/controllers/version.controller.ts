import { get } from '@loopback/rest';
const packageJson = require('../../package.json');
// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class VersionController {
	constructor() {}

	@get('/version')
	version() {
		return {
			version: packageJson.version
		}
	}
}
