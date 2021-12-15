import axios from 'axios';

/**
 *
 * @param {String} username
 * @param {String} password
 */
export const checkLogin = async (username, password) => {
	try {
		let { data } = await axios.post('http://localhost:8000/api/v1/login', {
			username,
			password,
		});
		if (data.status === 'Failed')
			alert('Login Failed Please check your credentials');
		if (data.status === 'ok') {
			window.sessionStorage.setItem('jwt', data.token);
			window.location.pathname = '/AI';
		}
	} catch (e) {
		console.log(e.message);
		alert(e.message);
	}
};

export const checkToken = async (token) => {
	//	console.log(token);
	if (!token) return false;

	let { data } = await axios.post('http://localhost:8000/api/v1/login/check', {
		jwt: token,
	});

	if (data.status === 'verified') return true;

	return false;
};
