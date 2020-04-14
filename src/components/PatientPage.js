import React from 'react'
import AppointmentContainer from './AppointmentContainer'

class PatientPage extends React.Component {

	renderFutureRecord = () => {
		return this.props.records.map(record => {
			if ((record.patient_id === 1) && (record.title === "") && (record.notes === "")) {
				return <AppointmentContainer key={record.id} record={record}/>
			}
		})
	}


	render() {
		return(
			<div className="container">
				<div class="row">
					<h3>Upcoming Appointments &nbsp;
					<a class="waves-effect waves-light btn-floating modal-trigger" data-target="appointment-modal">
						<i class="material-icons">add</i>
					</a>
					</h3>
				</div>
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

