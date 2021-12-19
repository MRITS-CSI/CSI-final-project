import axios from 'axios';
export const Objects = ['potted plant'];

export const QuestionObject = async () => {
	try {
		//	let token = window.sessionStorage.getItem('jwt');
		let { data } = await axios.get(
			'https://csimrits.tech/api/v1/riddle/randomRiddle'
		);
		return data;
	} catch (err) {
		alert(err.message);
	}
};
