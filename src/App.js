import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import AI from './Components/AI-Detection';
import { checkToken } from './Utils/LoginHandler';
const App = () => {
	let [loginStat, setLoginStat] = useState(false);

	useEffect(() => {
		let init = async () => {
			let token = window.sessionStorage.getItem('jwt');
			let val = await checkToken(token);
			setLoginStat(val);
		};
		init();
	}, [loginStat]);

	if (loginStat) {
		return (
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />}></Route>
					<Route path="/AI" element={<AI />}></Route>
				</Routes>
			</BrowserRouter>
		);
	}
	return <Login />;
};

export default App;
