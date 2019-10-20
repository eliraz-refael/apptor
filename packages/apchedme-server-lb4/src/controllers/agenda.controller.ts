import {Count, CountSchema, Filter, repository, Where,} from '@loopback/repository';
import {post, param, get, getFilterSchemaFor, getModelSchemaRef, getWhereSchemaFor, patch, put, del, requestBody,} from '@loopback/rest';
import {Agenda} from '../models';
import {AgendaRepository} from '../repositories';

export class AgendaController {
	constructor(@repository(AgendaRepository) public agendaRepository : AgendaRepository) {}

	@post('/agenda', {
		responses: {
			'200': {
				description: 'Agenda model instance',
				content: {'application/json': {schema: getModelSchemaRef(Agenda)}},
			},
		},
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Agenda, {
						title: 'NewAgenda',
						exclude: ['id'],
					}),
				},
			},
		})
		agenda: Omit<Agenda, 'id'>,
	): Promise<Agenda> {
		return this.agendaRepository.create(agenda);
	}

	@get('/agenda/count', {
		responses: {
			'200': {
				description: 'Agenda model count',
				content: {'application/json': {schema: CountSchema}},
			},
		},
	})

	async count(@param.query.object('where', getWhereSchemaFor(Agenda)) where?: Where<Agenda>): Promise<Count> {
		return this.agendaRepository.count(where);
	}

	@get('/agenda', {
		responses: {
			'200': {
				description: 'Array of Agenda model instances',
				content: {
					'application/json': {
						schema: {type: 'array', items: getModelSchemaRef(Agenda)},
					},
				},
			},
		},
	})
	async find(
		@param.query.object('filter', getFilterSchemaFor(Agenda)) filter?: Filter<Agenda>,
	): Promise<Agenda[]> {
		return this.agendaRepository.find(filter);
	}

	@patch('/agenda', {
		responses: {
			'200': {
				description: 'Agenda PATCH success count',
				content: {'application/json': {schema: CountSchema}},
			},
		},
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Agenda, {partial: true}),
				},
			},
		})
		agenda: Agenda,
		@param.query.object('where', getWhereSchemaFor(Agenda)) where?: Where<Agenda>,
	): Promise<Count> {
		return this.agendaRepository.updateAll(agenda, where);
	}

	@get('/agenda/{id}', {
		responses: {
			'200': {
				description: 'Agenda model instance',
				content: {'application/json': {schema: getModelSchemaRef(Agenda)}},
			},
		},
	})
	async findById(@param.path.string('id') id: string): Promise<Agenda> {
		return this.agendaRepository.findById(id);
	}

	@patch('/agenda/{id}', {
		responses: {
			'204': {
				description: 'Agenda PATCH success',
			},
		},
	})
	async updateById(
		@param.path.string('id') id: string,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Agenda, {partial: true}),
				},
			},
		})
		agenda: Agenda,
	): Promise<void> {
		await this.agendaRepository.updateById(id, agenda);
	}

	@put('/agenda/{id}', {
		responses: {
			'204': {
				description: 'Agenda PUT success',
			},
		},
	})
	async replaceById(
		@param.path.string('id') id: string,
		@requestBody() agenda: Agenda,
	): Promise<void> {
		await this.agendaRepository.replaceById(id, agenda);
	}

	@del('/agenda/{id}', {
		responses: {
			'204': {
				description: 'Agenda DELETE success',
			},
		},
	})
	async deleteById(@param.path.string('id') id: string): Promise<void> {
		await this.agendaRepository.deleteById(id);
	}
}
