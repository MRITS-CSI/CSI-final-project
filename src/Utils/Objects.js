import axios from 'axios';
export const Objects = ['potted plant'];

export const QuestionObject = async () => {
	try {
		if (
			window.localStorage.getItem('rid') &&
			window.localStorage.getItem('ans')
		) {
			return {
				riddle: window.localStorage.getItem('rid'),
				answer: window.localStorage.getItem('ans'),
			};
		}
		//	let token = window.sessionStorage.getItem('jwt');
		let { data } = await axios.get(
			'https://csimrits.tech/api/v1/riddle/randomRiddle'
		);
		window.localStorage.setItem('rid', data.riddle);
		window.localStorage.setItem('ans', data.answer);

		await axios.patch(`https://csimrits.tech/api/v1/riddle/${data._id}`, {
			picked: true,
		});
		return data;
	} catch (err) {
		alert(err.message);
	}
};
