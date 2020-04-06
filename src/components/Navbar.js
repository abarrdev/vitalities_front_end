import React from 'react'

const Navbar = () => {

	return (
		<div className="container">
		<nav className="nav-extended teal lighten-3">
			<div style={{paddingLeft:20}} className="nav-wrapper">
			<a href="/" className="brand-logo">Vitalities</a>
			{/* <a href="#"className="sidenav-trigger"><i className="material-icons">menu</i></a> */}
			<ul id="nav-mobile" className="right hide-on-med-and-down">
				<li><a href="/log-out">Log Out</a></li>
			</ul>
			</div>
			<div className="nav-content">
			<ul className="tabs tabs-transparent">
				<li className="tab"><a className="active" href="/my-records">My Records</a></li>
				<li className="tab disabled"><a href="/medication-manager">Medication Manager</a></li>
				<li className="tab disabled"><a href="/insurance-cards">Insurance Cards</a></li>
				<li className="tab disabled"><a href="/contacts">Contacts</a></li>
			</ul>
			</div>
		</nav>
		
	</div>
	)
}

export default Navbar;


