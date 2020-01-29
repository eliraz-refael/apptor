import { Get, Post, HttpResponseOK, Context, ApiInfo, HttpResponseCreated, HttpResponseNotFound, HttpResponseBadRequest, Hook } from '@foal/core';
import { Agenda, User } from '../models';

@ApiInfo({
	title: 'A Great API',
	version: '1.0.0'
})
@Hook(() => response => {
  // Every response of this controller and its sub-controllers will be added this header.
  response.setHeader('Access-Control-Allow-Origin', '*');
})
export class ApiController {

	@Get('/agendas')
	async getAgenda() {
		const agendas = await Agenda.find();
		return new HttpResponseOK(agendas);
	}

	@Get('/agenda/:id')
	async getAgendaById(ctx: Context) {
		const agenda = await Agenda.findById(ctx.request.params.id);
		if (agenda) {
			return new HttpResponseOK(agenda)
		}
		return new HttpResponseNotFound();
	}

	@Post('/agenda')
	async newAgenda(ctx: Context) {
		try {
			const agenda = new Agenda(ctx.request.body);
			await agenda.save();
			return new HttpResponseCreated(agenda);
		} catch (error) {
			return new HttpResponseBadRequest(error);
		}
	}

	@Get('/users')
	async allUsers() {
		const users = await User.find({});
		return new HttpResponseOK(users);
	}

	@Post('/register')
	async newUser(ctx: Context) {
		try {
			const user = new User(ctx.request.body);
			await user.save();
			return new HttpResponseCreated(user);
		} catch (error) {
			return new HttpResponseBadRequest(error);
		}
	}

}
