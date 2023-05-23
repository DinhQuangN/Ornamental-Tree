import mongoose from 'mongoose';
import { IUser } from '../config/interface';
const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			require: true
		},
		account: {
			type: String,
			require: true
		},
		password: {
			type: String,
			require: true
		},
		avatar: {
			type: String,
			default:
				'data:image/jpeg;base64,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'
		},
		role: {
			type: String,
			default: 'user'
		},
		rf_token: {
			type: String,
			select: false
		}
	},
	{ timestamps: true }
);
const User = mongoose.model<IUser>('user', userSchema);
export default User;