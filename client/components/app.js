import React from 'react';
import ReactDOM from 'react-dom';

import NavBar from './navBar';
import About from './about';


class App extends React.Component {
	render(){
		return (
			<div>
				<h1>Hello Datafiniti!</h1>
				<NavBar />
				<About />
			</div>
		)
	}
}

ReactDOM.render(<App/>, document.getElementById('app'));