import React from 'react'
import AppointmentContainer from './AppointmentContainer'

class PatientPage extends React.Component {

	renderFutureRecord = () => {
		// const now = new Date();
		return this.props.records.map(record => {
			if ((record.patient_id === 1) && (record.title === "") && (record.notes === "")) {
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

