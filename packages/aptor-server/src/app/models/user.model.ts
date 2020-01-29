import { hashPassword } from '@foal/core';
import { Document, model, Model, models, Schema } from 'mongoose';

const userSchema: Schema = new Schema({
	email: {
		required: true,
		type: String,
		unique: true
	},
	password: {
		required: true,
		type: String,
	},
	firstName: {
		required: true,
		type: String
	},
	lastName: {
		required: true,
		type: String
	},
	phoneNumber: {
		required: true,
		type: Number
	},
	displayName: {
		type: String,
		required: true
	},
	description: {
		type: String
	},
	address: {
		required: true,
		type: String
	},
	city: {
		required: true,
		type: String
	},
	country: {
		required: true,
		type: String
	}
});

userSchema.methods.setPassword = async function(password: string) {
	this.password = await hashPassword(password);
};

export interface IUser extends Document {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	country: string;
	phoneNumber: number;
	displayName: string;
	description: string;
	setPassword: (password: string) => Promise<void>;
}

export const User: Model<IUser> = models.User || model<IUser>('User', userSchema);
