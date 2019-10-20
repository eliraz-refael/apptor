import { Document, model, Model, models, Schema  } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

const agendaSchema: Schema = new Schema({
	userId: ObjectId,
	settings: {
		weekWorkingDays: [Boolean],
		defaultDuration: Number,
		slug: String,
		appointmetTypes: [{ type: String, duration: Number }]
	},
	appointments: [{
		startAt: Number,
		type: String,
		duration: Number,
		clientId: ObjectId,
		approvedByUser: Boolean,
		approvedByClient: Boolean
	}]
});

export interface IAppointment {
	startAt: number;
	type: string;
	duration: number;
	clientId: string;
	approvedByUser: boolean;
	approvedByClient: boolean;
}

export interface IAgenda extends Document {
	userId: string;
	settings: {
		weekWorkingDays: boolean[];
		defaultDuration: number;
		slug: string;
		appointmentTypes: { type: string, duration: number }[];
	};
	appointments: IAppointment[];
}

export const Agenda: Model<IAgenda> = models.Agenda || model<IAgenda>('Agenda', agendaSchema);
