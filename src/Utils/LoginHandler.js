import axios from 'axios';

/**
 *
 * @param {String} username
 * @param {String} password
 */
export const checkLogin = async (username, password) => {
	try {
		let { data } = await axios.post('https://csimrits.tech/api/v1/login', {
			username,
			password,
		});
		if (data.status === 'Failed')
			alert('Login Failed Please check your credentials');
		if (data.status === 'ok' && data.user.secondRound === true) {
			window.sessionStorage.setItem('jwt', data.token);
			window.location.pathname = '/AI';
		} else {
			alert('Login Failed !!! Please contact CSI Team');
		}
	} catch (e) {
		console.log(e.message);
		alert(e.message);
	}
};

export const checkToken = async (token) => {
	//	console.log(token);
	if (!token) return false;

	let { data } = await axios.post('https://csimrits.tech/api/v1/login/check', {
		jwt: token,
	});

	if (data.status === 'verified') return true;

	return false;
};
