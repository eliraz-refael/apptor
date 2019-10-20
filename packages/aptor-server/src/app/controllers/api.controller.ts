import { Get, Post, HttpResponseOK, Context, ApiInfo, HttpResponseCreated } from '@foal/core';
import { Agenda, IAgenda } from '../models';

@ApiInfo({
	title: 'A Great API',
	version: '1.0.0'
})
export class ApiController {

	@Get('/agendas')
	async getAgenda() {
		const agendas = await Agenda.find();
		return new HttpResponseOK(agendas);
	}

	@Post('/agenda')
	async newAgenda(ctx: Context) {
		const agenda = new Agenda(ctx.request.body);
		return new HttpResponseCreated(agenda);
	}

}
