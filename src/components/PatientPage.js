import React from 'react'

class PatientPage extends React.Component {
	constructor() {
		super()
		this.state = {
			patients: []
		}
	}

	componentDidMount() {
		fetch('http://localhost:3000/patients')
			.then(resp => resp.json())
			.then(patientsData => {
				this.setState({
					patients: patientsData
				})
			})
	}

	render() {
		return(
			<div> </div>
		)
	}
}

export default PatientPage