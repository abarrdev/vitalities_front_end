import React from 'react'
import AppointmentContainer from './AppointmentContainer'

class PatientPage extends React.Component {

	//find appointments that match logged in patient's id
	//filter by appointments in the future


	// renderPatient = () => {
	// 	return this.props.patients.map(patient => {
	// 		if (patient.id === 1) {
	// 			return <AppointmentContainer ptFirstName={patient.first_name} />
	// 		}
	// 	})
	// }

	renderFutureRecord = () => {
		const now = new Date();
		return this.props.records.map(record => {
			if ((record.patient_id === 1) && (record.visit_date < now )) {
				return <AppointmentContainer key={record.id} record={record}/>
			}
		})
	}
	


	render() {
		return(
			<div className="container">
				<h3>Upcoming Appointments</h3>
			<table>
			<thead>
			  <tr>
				  <th>Visit Date</th>
				  <th>Doctor</th>
				  <th>Practice</th>
			  </tr>
			</thead>
			{this.renderFutureRecord()}
			
		  </table>
		  </div>		 
		)
	}
}

export default PatientPage

				// <div className="row">
				// 	<div className="col s7">
				// 		<ul className="collapsible col s7">
				// 		{/* {this.renderPatient()} */}
				// 		{this.renderRecord()}
				// 		</ul>
				// 	</div>
				// </div>