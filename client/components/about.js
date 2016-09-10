import React, { Component } from 'react';

	export default class about extends Component{
	render(){
		return(
			<div>
				<br/>
				<div>This was built using:</div>
					<ul>
						<li> React </li>										
						<li> Node/Express </li>
						<li> Knex/SQLite3 </li>
					</ul>
			</div>
			)
	}
}