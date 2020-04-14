import React from 'react'
import RecordContainer from './RecordContainer'
import axios from 'axios'
import M from 'materialize-css'


class RecordsPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			formData: {
				doctor_first_name: "",
				doctor_last_name: "",
				practice_name: "",
				visit_date: "",
				title: "",
				notes: "",
				patient_id: 1
			},
			editFormData: {
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
		const newRecordForm = document.querySelectorAll('.modal');
		M.Modal.init(newRecordForm);
		
		const newRecordDate = document.querySelectorAll('.datepicker');
		 M.Datepicker.init(newRecordDate);
		 // const instances = M.Modal.init(elems, options);
	}


	renderPastRecord = () => {
		return this.props.records.map(record => {
			if ((record.patient_id === 1) && (record.title !== "")) {
				return <RecordContainer handleEditButtonClick={this.handleEditButtonClick} key={record.id} record={record} handleDeleteClick={this.handleDeleteClick} formData={this.state.formData} updateAfterEdit={this.props.updateAfterEdit}/>
			}
		})
	}


	handleEnterText = (event) => {
		const input = event.target.value
		this.setState({
			formData: {
				...this.state.formData,
				[event.target.name]: input
			}
		})
	}


	handleSubmit = (event) => {
		event.preventDefault()
		const visit_date = document.getElementById("visit_date").value
		this.setState({
			formData: {
				...this.state.formData,
				visit_date: visit_date
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
			data: this.state.formData
		}
		axios(options)
			.then(newRecordResp => {
				const newRecord = newRecordResp.data
				this.props.updateState(newRecord)
				this.setState({
					formData: {
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
				console.log('Error with Posting New Record:', error)
			})
	}


	
	handleEditButtonClick = (clickedRecord) => {
		this.setState({
			editFormData: {
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
		console.log(this.state.editFormData, "cancelled")
		this.setState({
			editFormData: {
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
		const input = event.target.value
		this.setState({
			editFormData: {
				...this.state.editFormData,
				[event.target.name]: input
			}
		})
	}


	handleSave = (event, id) => {
		event.preventDefault()
		// debugger

		const visit_date = document.getElementById("visit_date").value
		this.setState({
			editFormData: {
				...this.state.editFormData,
				visit_date: visit_date
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
			data: this.state.editFormData
		}

		axios(options)
			.then(editedRecordResp => {
				const editedRecord = editedRecordResp.data
				this.props.updateAfterEdit(editedRecord)
				this.setState({
					editFormData: {
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
				console.log('Error with Saving Record:', error)
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
				<div id="record-modal" className="modal">
					<div className="modal-content">
						<form onSubmit={this.handleSubmit}>
							<h4>Add New Record</h4>

							<input id="doctor_last_name" name="doctor_last_name" type="text" onChange={this.handleEnterText} value={this.state.formData.doctor_last_name} />
							<label htmlFor="doctor_last_name">Doctor's Last Name</label>
							
							<input id="doctor_first_name" name="doctor_first_name" type="text" onChange={this.handleEnterText} value={this.state.formData.doctor_first_name} />
							<label htmlFor="doctor_first_name">Doctor's First Name</label>

							<input id="practice_name" name="practice_name" type="text" onChange={this.handleEnterText} value={this.state.formData.practice_name} />
							<label htmlFor="practice_name">Hospital or Practice Name</label>

							<input id="visit_date" type="text" className="datepicker" name="visit_date"/>
							<label htmlFor="visit_date">Date of Visit</label>
                                   
							<input id="title" name="title" type="text" onChange={this.handleEnterText} value={this.state.formData.title} />
							<label htmlFor="title">Title (e.g., "Routine PCP Checkup", "Wrist X-Ray", etc.)</label>

							<input id="notes" name="notes" type="text" onChange={this.handleEnterText} value={this.state.formData.notes} />
							<label htmlFor="notes">Notes</label><br /><br />
							{/* file submit below */}
							<form action="#">
							<div class="file-field input-field">
      							<div class="btn">
        							<span>FILE</span>
        							<input type="file" multiple />
     							</div>
      							<div class="file-path-wrapper">
        							<input class="file-path validate" type="text" placeholder="Upload one or more files" />
      							</div>
    						</div>
							</form>
						{/* submit or cancel footer below */}
						<div class="modal-footer">
							<a class="modal-close waves-effect waves-green btn-flat">Cancel</a>
							<input class="modal-close btn" type="submit" />
						</div>
					</form>
				</div>
				</div>	
			{/* END POST MODAL FORM */}

				<div class="row">
					<h3>Medical Records &nbsp;
						<a class="waves-effect waves-light btn-floating modal-trigger" data-target="record-modal">
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
				  <th>Title</th>
				  <th>My Notes</th>
				  <th>Edit</th>
				  <th>Delete</th>
			  </tr>
			</thead>
			{this.renderPastRecord()}
		  </table>


				{/* BEGIN EDIT MODAL FORM */}
				<div id="edit-modal" class="modal">
					<div class="modal-content">
						<form onSubmit={(event) => this.handleSave(event, this.state.editFormData.id)}>
							<h4>Edit Record</h4>
							<p>(type to edit)</p>

							<input id="doctor_last_name" name="doctor_last_name" type="text" onChange={this.handleEditText} value={this.state.editFormData.doctor_last_name} />
							{/* set values to state */}
							<label htmlFor="doctor_last_name">Doctor's Last Name</label>
							
							<input id="doctor_first_name" name="doctor_first_name" type="text" onChange={this.handleEditText} value={this.state.editFormData.doctor_first_name} />
							<label htmlFor="doctor_first_name">Doctor's First Name</label>

							<input id="practice_name" name="practice_name" type="text" onChange={this.handleEditText} value={ this.state.editFormData.practice_name } />
							<label htmlFor="practice_name">Hospital or Practice Name</label>

							<input id="visit_date" type="text" className="datepicker" name="visit_date" value={ this.state.editFormData.visit_date }/>
							<label htmlFor="visit_date">Date of Visit</label>
                                   
							<input id="title" name="title" type="text" onChange={this.handleEditText} value={ this.state.editFormData.title } />
							<label htmlFor="title">Title (e.g., "Routine PCP Checkup", "Wrist X-Ray", etc.)</label>

							<input id="notes" name="notes" type="text" onChange={this.handleEditText} value={ this.state.editFormData.notes } />
							<label htmlFor="notes">Notes</label><br /><br />
							{/* file submit below */}
							<form action="#">
							<div class="file-field input-field">
      							<div class="btn">
        							<span>FILE</span>
        							<input type="file" multiple />
     							</div>
      							<div class="file-path-wrapper">
        							<input class="file-path validate" type="text" placeholder="Upload one or more files" />
      							</div>
    						</div>
							</form>
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

export default RecordsPage;

