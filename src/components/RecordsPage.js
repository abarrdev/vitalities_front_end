import React from 'react'
import RecordContainer from './RecordContainer'
import M from 'materialize-css'


class PatientPage extends React.Component {
	constructor() {
		super()
		this.state = {
			formData: {
				doctor_first_name: "",
				doctor_last_name: "",
				practice_name: "",
				visit_date: "",
				title: "",
				notes: ""
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


	render() {
		return(
			<div className="container">

			{/* BEGIN MODAL FORM */}
				<div id="record-modal" class="modal">
					<div class="modal-content">
						<form onSubmit={this.handleSubmit}>
							<input id="doctor_last_name" name="doctor_last_name" type="text" onChange={this.handleEnterText} value={this.state.formData.doctor_last_name} />
							<label htmlFor="doctor_last_name">Doctor's Last Name</label>
							
							<input id="doctor_first_name" name="doctor_first_name" type="text" onChange={this.handleEnterText} value={this.state.formData.doctor_first_name} />
							<label htmlFor="doctor_first_name">Doctor's First Name</label>

							<input id="practice_name" name="practice_name" type="text" onChange={this.handleEnterText} value={this.state.formData.practice_name} />
							<label htmlFor="practice_name">Hospital or Practice Name</label>

							<input id="visit_date" type="date" className="datepicker" name="visit_date" style={{maxWidth:'150'}}/>
							<label htmlFor="visit_date">Date of Visit:</label>
                                   

						</form>
					</div>
					<div class="modal-footer">
						{/* <a href="/records" class="modal-close waves-effect waves-green btn-flat">Add Record</a> */}
						<a class="modal-close waves-effect waves-green btn-flat">Cancel</a>
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

export default PatientPage

