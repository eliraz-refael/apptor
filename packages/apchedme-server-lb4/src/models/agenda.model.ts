import {Entity, model, property} from '@loopback/repository';

interface ISettings {
	weekWorkingDays: { 0: boolean, 1: boolean, 2: boolean, 3: boolean, 4: boolean, 5: boolean, 6: boolean };
	defaultDuration: number;
	slug: string;
	appointmentTypes: { type: string, duration: number }[]
}

interface IAppointment {
	startAt: number;
	type: string;
	duration: number;
	clientId: string;
	clientName: string;
	approvedByUser: boolean;
	approvedByClient: boolean;
}

export class Appointment {
	@property()
	startAt: number;
	@property()
	type: string;
	@property()
	duration: number;
	@property()
	clientId: string;
	@property()
	clientName: string;
	@property()
	approvedByUser: boolean;
	@property()
	approvedByClient: boolean;
}

@model()
export class Agenda extends Entity {
	@property({
		type: 'string',
		id: true,
		required: true,
		generated: true,
	})
	id: string;

	@property({
		type: 'string',
		required: true,
	})
	userId: string;

	@property({
		required: true,
	})
	settings: ISettings;

	// @property({
	// 	type: 'array',
	// 	itemType: 'object',
	// 	required: true,
	// }
 // )
	@property({
		required: true,
		itemType: Appointment,
		type: 'array'
	})
	appointments: IAppointment[];


	constructor(data?: Partial<Agenda>) {
		super(data);
	}
}

export interface AgendaRelations {
	// describe navigational properties here
}

export type AgendaWithRelations = Agenda & AgendaRelations;
