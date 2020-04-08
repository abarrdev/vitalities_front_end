import React from 'react'
import RecordContainer from './RecordContainer'
import M from 'materialize-css'


class RecordsPage extends React.Component {
	constructor() {
		super()
		this.state = {
			formData: {
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

	renderPastRecord = () => {
		// const now = new Date();
		return this.props.records.map(record => {
			if ((record.patient_id === 1) && (record.title !== "")) {
				return <RecordContainer key={record.id} record={record}/>
			}
		})
	}
	
	componentDidMount = () => {
		const elems = document.querySelectorAll('.modal');
		 M.Modal.init(elems);
		const elems2 = document.querySelectorAll('.datepicker');
		 M.Datepicker.init(elems2);
		// const instances = M.Modal.init(elems, options);
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
		console.log(this.state)
		event.preventDefault()
		const visit_date = document.getElementById("visit_date").value
		this.setState({
			formData: {
				...this.state.formData,
				visit_date: visit_date
			}
		}, this.postRecord)

		
	}

	postRecord = () => {
		const reqObj = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state.formData)
		}

		fetch('http://localhost:3001/records', reqObj)
			.then(resp => resp.json())
			.then(newRecord => {
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


	render() {
		return(
			<div className="container">

			{/* BEGIN MODAL FORM */}
				<div id="record-modal" class="modal">
					<div class="modal-content">
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
					<div class="modal-footer">

						<a class="modal-close waves-effect waves-green btn-flat">Cancel</a>
						<input class="modal-close btn" type="submit" />

					</div>
					</form>
				</div>
				</div>
				
			{/* END MODAL FORM */}

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
			  </tr>
			</thead>
			{this.renderPastRecord()}
			
		  </table>
		  </div>		 
		)
	}
}

export default RecordsPage;

