import React from 'react'
import RecordContainer from './RecordContainer'

class PatientPage extends React.Component {

	renderPastRecord = () => {
		// const now = new Date();
		return this.props.records.map(record => {
			if ((record.patient_id === 1) && (record.title !== "")) {
				return <RecordContainer key={record.id} record={record}/>
			}
		})
	}
	


	render() {
		return(
			<div className="container">
				<h3>Medical Records</h3>
			<table>
			<thead>
			  <tr>
				  <th>Visit Date</th>
				  <th>Doctor</th>
				  <th>Practice</th>
				  <th>Title</th>
				  <th>My Notes</th>
			  </tr>
			</thead>
			{this.renderPastRecord()}
			
		  </table>
		  </div>		 
		)
	}
}

export default PatientPage

