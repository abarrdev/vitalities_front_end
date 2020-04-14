import React from 'react'

class Navbar extends React.Component {

	render() {
	return (
		

		// <div className="container">
		// <nav className="red accent-1" style={{height: '200px'}}>
		// <div className="container" style={{height:200}}>
		<nav className="nav-extended red accent-1" style={{height:140}}>

		<div className="nav-wrapper">
		<a href="#!" style={{paddingTop:10, paddingLeft:20}} className="brand-logo left"><h1>Vitalities</h1></a>
			<div className="row">

				<ul className="right tabs-transparent" style={{paddingTop:75, paddingRight:10}}>
				<li><a href="/home">Home</a></li>
					<li><a href="/records">Records</a></li>
					<li><a className="disabled">Medication Manager</a></li>
					<li><a className="disabled">Insurance Cards</a></li>
					<li><a className="disabled">Contacts</a></li>
					<li><a className="disabled">Log Out</a></li>
				</ul>
		  </div>
		  </div>
	  	</nav>
		// </div>


	// 	<nav className="nav-extended teal lighten-3">
	// 		<div style={{paddingLeft:20}} className="nav-wrapper">
	// 		<a href="/" className="brand-logo">Vitalities</a>
	// 		{/* <a href="#"className="sidenav-trigger"><i className="material-icons">menu</i></a> */}
	// 		<ul id="nav-mobile" className="right hide-on-med-and-down">
	// 			<li><a href="/log-out">Log Out</a></li>
	// 		</ul>
	// 		</div>
	// 		<div className="nav-content">
	// 		<ul className="tabs tabs-transparent">
	// 			<li className="tab"><a className="active waves-effect" target="_self" href="/home">Home</a></li>
	// 			<li className="tab"><a className="active waves-effect" target="_self" href="/records">My Records</a></li>
	// 			<li className="tab disabled"><a href="/medication-manager">Medication Manager</a></li>
	// 			<li className="tab disabled"><a href="/insurance-cards">Insurance Cards</a></li>
	// 			<li className="tab disabled"><a href="/contacts">Contacts</a></li>
	// 		</ul>
	// 		</div>
	// 	</nav>
		
	// // </div>
	)
	}
}

export default Navbar;


