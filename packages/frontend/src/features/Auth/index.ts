import { FormData as FormDataLogin } from "@/components/Login";
import { getAPI } from "@/utils/axios";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface IUser extends FormDataLogin {
	_id: string;
	name: string;
	avatar: string;
	role: string;
	createdAt: string;
	updatedAt: string;
}

interface IAuthType {
	message?: string
	access_token?: string;
	user?: IUser;
}

interface ILoginType {
	loading: boolean;
	error: null | string;
	data: null | IAuthType;
}
const initialState = {
	loading: false,
	error: null,
	data: null
} as ILoginType;

export const refreshToken = createAsyncThunk(
	'auths/refreshToken',
	async (data, thunkApi) => {
		try {
			const response = await getAPI('refresh_token');
			return response.data;
		} catch (error: any) {
			return thunkApi.rejectWithValue(error.message);
		}
	}
);

const authSlice = createSlice({
	name: 'auths',
	initialState,
	reducers: {
		addToken: (state, action: PayloadAction<any>) => {
			state.data = action.payload
		}
	},
	extraReducers(builder) {
		builder.addCase(refreshToken.pending, (state, action) => {
			state.loading = true;
		})
			.addCase(
				refreshToken.fulfilled,
				(state, action: PayloadAction<IAuthType>) => {
					state.loading = false;
					state.data = action.payload;
				}
			)
			.addCase(refreshToken.rejected, (state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
})

export const { addToken } = authSlice.actions

export default authSlice.reducer