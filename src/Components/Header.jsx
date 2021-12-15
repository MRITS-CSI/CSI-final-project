import React from 'react';
import image from '../Images/artificial-intelligence.png';

const Header = () => {
	return (
		<div className="ui container segment">
			<h2 class="ui center aligned icon header">
				CSI
				<img
					src={image}
					width="30px"
					style={{ margin: '5px' }}
					height="30px"
					alt="AI"
				/>
				AI Detection Module
			</h2>
		</div>
	);
};

export default Header;
