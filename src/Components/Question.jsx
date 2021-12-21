import React from 'react';

const Question = ({ question }) => {
	return (
		<div className="ui container segment" style={{ display: 'block' }}>
			<h3
				class="ui center aligned header"
				style={{
					color: '#00f752',
					backgroundColor: 'black',
					border: '2px solid black',
				}}
			>
				Q) {question}
			</h3>
		</div>
	);
};
export default Question;
