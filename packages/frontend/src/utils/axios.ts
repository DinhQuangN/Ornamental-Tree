import axios from 'axios';
axios.defaults.withCredentials = true

export const postAPI = async (url: string, post: object, token?: string) => {
	const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/${url}`, post, {
		headers: { Authorization: token }
	});
	return res;
};

export const getAPI = async (url: string, token?: string) => {
	const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/${url}`, {
		headers: { Authorization: token }

	},);
	return res;
};

export const patchAPI = async (url: string, post: object, token?: string) => {
	const res = await axios.patch(`${import.meta.env.VITE_BASE_URL}/${url}`, post, {
		headers: { Authorization: token }
	});
	return res;
};

export const deleteAPI = async (url: string, token?: string) => {
	const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}/${url}`, {
		headers: { Authorization: token }
	});
	return res;
};
