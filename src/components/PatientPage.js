import React from 'react'

class PatientPage extends React.Component {

	//find appointments that match logged in patient's id
	//filter by appointments in the future


	renderAppointments = () => {
		return this.props.patients.map(patient => {
			if (patient.id === 12) {
				return patient.first_name
			}
		})
	}

	render() {
		return(
			<div>
			<div className="row">
				<div className="col s7">
					{this.renderAppointments()}
				</div>
			</div>
			</div>
		)
	}
}

export default PatientPage