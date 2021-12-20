import React, { useState, useEffect } from 'react';
import Canvas from './Canvas';
import Header from './Header';
import Question from './Question';
import { QuestionObject } from '../Utils/Objects';

const AIDetection = () => {
	let [question, setQuestion] = useState({ riddle: '', answer: '' });
	useEffect(() => {
		const init = async () => {
			let data = await QuestionObject();
			console.log(data);
			setQuestion(data);
		};
		init();
	}, []);
	return (
		<>
			<Header />
			<Question question={question.riddle} />
			<Canvas question={question} />
		</>
	);
};

export default AIDetection;
