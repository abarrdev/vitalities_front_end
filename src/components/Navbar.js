import React from 'react'

const Navbar = () => {

	return (
		<div className="container">
		<nav class="nav-extended teal lighten-3">
			<div style={{paddingLeft:20}} class="nav-wrapper">
			<a href="/" class="brand-logo">Vitalities</a>
			{/* <a href="#"class="sidenav-trigger"><i class="material-icons">menu</i></a> */}
			<ul id="nav-mobile" class="right hide-on-med-and-down">
				<li><a href="/log-out">Log Out</a></li>
			</ul>
			</div>
			<div class="nav-content">
			<ul class="tabs tabs-transparent">
				<li class="tab"><a class="active" href="/my-records">My Records</a></li>
				<li class="tab disabled"><a href="/medication-manager">Medication Manager</a></li>
				<li class="tab disabled"><a href="/insurance-cards">Insurance Cards</a></li>
				<li class="tab disabled"><a href="/contacts">Contacts</a></li>
			</ul>
			</div>
		</nav>
		
	</div>
	)
}

export default Navbar;


