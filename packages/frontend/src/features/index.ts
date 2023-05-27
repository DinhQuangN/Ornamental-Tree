import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth';
import cartReducer from './Cart';

const store = configureStore({
	reducer: {
		auth: authReducer,
		cart: cartReducer,
	},
	devTools: true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store
