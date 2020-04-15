import React from 'react'
import AppointmentContainer from './AppointmentContainer'
import axios from 'axios'
import M from 'materialize-css'


class PatientPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			appointmentFormData: {
				doctor_first_name: "",
				doctor_last_name: "",
				practice_name: "",
				visit_date: "",
				title: "",
				notes: "",
				patient_id: 1
			},
			editAppointmentFormData: {
				id: "",
				doctor_first_name: "",
				doctor_last_name: "",
				practice_name: "",
				visit_date: "",
				title: "",
				notes: "",
				patient_id: 1
			}
		}
	}

		
	componentDidMount = () => {
		const newAppointmentForm = document.querySelectorAll('.modal');
		M.Modal.init(newAppointmentForm);
		
		const newAppointmentDate = document.querySelectorAll('.datepicker');
		 M.Datepicker.init(newAppointmentDate);
	}


	renderFutureRecord = () => {		
		const sortedRecords = this.props.records.sort((a, b) => {
			if (a.visit_date > b.visit_date) {
			  return 1
			}
			if (a.visit_date < b.visit_date) {
			  return -1
			}
		  })
		  const futureRecords = sortedRecords.filter(record => new Date(record.visit_date) > new Date())
			return futureRecords.map(record => {
			  if (record.patient_id === 1) {
				return <AppointmentContainer handleEditButtonClick={this.handleEditButtonClick} key={record.id} record={record} handleDeleteClick={this.handleDeleteClick} appointmentFormData={this.state.appointmentFormData} updateAfterEdit={this.props.updateAfterEdit}/>
			}
		})
	}


	handleEnterText = (event) => {
		const input = event.target.value
		this.setState({
			appointmentFormData: {
				...this.state.appointmentFormData,
				[event.target.name]: input
			}
		})
	}


	handleSubmit = (event) => {
		event.preventDefault()
		const selected_visit_date = document.getElementById("appointment_visit_date").value
		this.setState({
			appointmentFormData: {
				...this.state.appointmentFormData,
				visit_date: selected_visit_date
			}
		}, this.postRecord)	
		//set state must be done before posting record, record only posted once state is set with visit_date
		//otherwise, post takes place without grabbing visit_date
		//ty MG for this tip!
	}


	postRecord = () => {
		const options = {
			url: 'http://localhost:3001/records',
			method: 'POST',
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json'
			},
			data: this.state.appointmentFormData
		}
		axios(options)
			.then(newRecordResp => {
				const newRecord = newRecordResp.data
				this.props.updateState(newRecord)
				this.setState({
					appointmentFormData: {
						doctor_first_name: "",
						doctor_last_name: "",
						practice_name: "",
						visit_date: "",
						title: "",
						notes: "",
						patient_id: 1
					}
				})
			})
			.catch(error => {
				console.log('Error with Posting New Appointment:', error)
			})
	}


	
	handleEditButtonClick = (clickedRecord) => {
		console.log('edit!')
		this.setState({
			editAppointmentFormData: {
				id: clickedRecord.id,
				doctor_first_name: clickedRecord.doctor_first_name,
				doctor_last_name: clickedRecord.doctor_last_name,
				practice_name: clickedRecord.practice_name,
				visit_date: clickedRecord.visit_date,
				title: clickedRecord.title,
				notes: clickedRecord.notes,
				patient_id: 1
			}
		})	
	}	


	cancelEdit = () => {
		console.log(this.state.editAppointmentFormData, "cancelled")
		this.setState({
			editAppointmentFormData: {
				id: "",
				doctor_first_name: "",
				doctor_last_name: "",
				practice_name: "",
				visit_date: "",
				title: "",
				notes: "",
				patient_id: 1
			}
		})
	}


	handleEditText = (event) => {
		console.log('edits be made')
		const input = event.target.value
		this.setState({
			editAppointmentFormData: {
				...this.state.editAppointmentFormData,
				[event.target.name]: input
			}
		})
	}


	handleSave = (event, id) => {
		event.preventDefault()

		const selected_visit_date = document.getElementById("appointment_visit_date").value
		this.setState({
			editAppointmentFormData: {
				...this.state.editAppointmentFormData,
				visit_date: selected_visit_date
			}
		}, this.patchRecord(id))			
	}


	patchRecord = (id) => {
		const instUrl = 'http://localhost:3001/records/' + `${id}`
		const options = {
			url: instUrl,
			method: 'PATCH',
			headers: {
				'Accept' : 'application/json',
				'Content-Type': 'application/json'
			},
			data: this.state.editAppointmentFormData
		}

		axios(options)
			.then(editedRecordResp => {
				const editedRecord = editedRecordResp.data
				this.props.updateAfterEdit(editedRecord)
				this.setState({
					editAppointmentFormData: {
						id: "",
						doctor_first_name: "",
						doctor_last_name: "",
						practice_name: "",
						visit_date: "",
						title: "",
						notes: "",
						patient_id: 1
					}
				})
			})
			.catch(error => {
				console.log('Error with Saving Appointment:', error)
			})
	}


	handleDeleteClick = (id, event) => {
		event.preventDefault()
		if (event.target.innerText === "delete") {
			this.deleteRecord(id)
		}
	}


	deleteRecord = (id) => {
		const instUrl = 'http://localhost:3001/records/' + `${id}`
		axios.delete(instUrl)
		.then(deletedRecordResp => {
			const deletedRecord = deletedRecordResp.data
			this.props.updateAfterDelete(deletedRecord)
		})
	}





	render() {
		return(
			<React.Fragment>
			<div className="container">
			
			{/* BEGIN POST MODAL FORM */}
				<div id="appointment-modal" class="modal">
					<div class="modal-content">
						<form onSubmit={(event) => this.handleSave(event, this.state.editAppointmentFormData.id)}>
							<h4>Add Appointment</h4>

							<input id="doctor_last_name" name="doctor_last_name" type="text" onChange={this.handleEditText} value={this.state.editAppointmentFormData.doctor_last_name} />
							{/* set values to state */}
							<label htmlFor="doctor_last_name">Doctor's Last Name</label>
							
							<input id="doctor_first_name" name="doctor_first_name" type="text" onChange={this.handleEditText} value={this.state.editAppointmentFormData.doctor_first_name} />
							<label htmlFor="doctor_first_name">Doctor's First Name</label>

							<input id="practice_name" name="practice_name" type="text" onChange={this.handleEditText} value={ this.state.editAppointmentFormData.practice_name } />
							<label htmlFor="practice_name">Hospital or Practice Name</label>

							<input id="appointment_visit_date" type="text" className="datepicker" name="visit_date" value={ this.state.editAppointmentFormData.visit_date }/>
							<label htmlFor="appointment_visit_date">Date of Visit</label>
                                   
							<input id="title" name="title" type="text" onChange={this.handleEditText} value={ this.state.editAppointmentFormData.title } />
							<label htmlFor="title">Reason for Visit (e.g., "Weekly PT Appointment", "CBC as ordered by Dr. Reynolds", etc.)</label>

						{/* submit or cancel footer below */}
						<div className="modal-footer">
							<a className="modal-close waves-effect waves-green btn-flat" onClick={this.cancelEdit}>Cancel</a>
							<input className="modal-close btn" type="submit" value="save"/>
						</div>
					</form>
				</div>
				</div>
			{/* END POST MODAL FORM */}

				<div className="row">
					<h3>Upcoming Appointments &nbsp;
						<a className="waves-effect waves-light btn-floating modal-trigger" data-target="appointment-modal">
							<i className="material-icons">add</i>
						</a>
					</h3>
				</div>
				
			<table>
			<thead>
			  <tr>
				  <th>Visit Date</th>
				  <th>Doctor</th>
				  <th>Practice</th>
				  <th>Edit</th>
				  <th>Delete</th>
			  </tr>
			</thead>
			{this.renderFutureRecord()}
		  </table>


				{/* BEGIN EDIT MODAL FORM */}
				<div id="edit-appointment-modal" class="modal">
					<div class="modal-content">
						<form onSubmit={(event) => this.handleSave(event, this.state.editAppointmentFormData.id)}>
							<h4>Edit Appointment</h4>
							<p>(type to edit)</p>

							<input id="doctor_last_name" name="doctor_last_name" type="text" onChange={this.handleEditText} value={this.state.editAppointmentFormData.doctor_last_name} />
							{/* set values to state */}
							<label htmlFor="doctor_last_name">Doctor's Last Name</label>
							
							<input id="doctor_first_name" name="doctor_first_name" type="text" onChange={this.handleEditText} value={this.state.editAppointmentFormData.doctor_first_name} />
							<label htmlFor="doctor_first_name">Doctor's First Name</label>

							<input id="practice_name" name="practice_name" type="text" onChange={this.handleEditText} value={ this.state.editAppointmentFormData.practice_name } />
							<label htmlFor="practice_name">Hospital or Practice Name</label>

							<input id="appointment_visit_date" type="text" className="datepicker" name="visit_date" value={ this.state.editAppointmentFormData.visit_date }/>
							<label htmlFor="appointment_visit_date">Date of Visit</label>

						{/* submit or cancel footer below */}
						<div class="modal-footer">
							<a class="modal-close waves-effect waves-green btn-flat" onClick={this.cancelEdit}>Cancel</a>
							<input class="modal-close btn" type="submit" value="save changes"/>
						</div>
					</form>
				</div>
				</div>
			{/* END EDIT MODAL FORM */}

		  </div>
		  </React.Fragment>		 
		)
	}
}

export default PatientPage;



