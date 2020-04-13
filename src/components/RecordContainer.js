import React from 'react'
import M from 'materialize-css'


class RecordContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			editFormData: {
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
		const editForm = document.querySelectorAll('.modal');
		M.Modal.init(editForm);

		const newRecordDate = document.querySelectorAll('.datepicker');
		 M.Datepicker.init(newRecordDate);
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

	handleSave = (event) => {
		event.preventDefault()
		const visit_date = document.getElementById("visit_date").value
		this.setState({
			editFormData: {
				...this.state.editFormData,
				visit_date: visit_date
			}
		}, this.postRecord)	
		//set state must be done before posting record, record only posted once state is set with visit_date
		//otherwise, post takes place without grabbing visit_date
		//ty MG for this tip!
	}

	render() {
		const { visit_date, doctor_first_name, doctor_last_name, practice_name, title, notes, id } = this.props.record
	   
		return(
			<React.Fragment>
			
				{/* BEGIN MODAL FORM */}
				<div id="edit-modal" class="modal">
					<div class="modal-content">
						<form onSubmit={this.handleSave}>
							<h4>Edit Record</h4>
							<p>(type to edit)</p>

							<input id="doctor_last_name" name="doctor_last_name" type="text" onChange={this.handleEditText} placeholder={ doctor_last_name }/>
							<label htmlFor="doctor_last_name">Doctor's Last Name</label>
							
							<input id="doctor_first_name" name="doctor_first_name" type="text" onChange={this.handleEditText} placeholder={ doctor_first_name } />
							<label htmlFor="doctor_first_name">Doctor's First Name</label>

							<input id="practice_name" name="practice_name" type="text" onChange={this.handleEditText} placeholder={ practice_name } />
							<label htmlFor="practice_name">Hospital or Practice Name</label>

							<input id="visit_date" type="text" className="datepicker" name="visit_date" placeholder= { visit_date }/>
							<label htmlFor="visit_date">Date of Visit</label>
                                   
							<input id="title" name="title" type="text" onChange={this.handleEditText} placeholder={ title} />
							<label htmlFor="title">Title (e.g., "Routine PCP Checkup", "Wrist X-Ray", etc.)</label>

							<input id="notes" name="notes" type="text" onChange={this.handleEditText} placeholder={ notes} />
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
							<input class="modal-close btn" type="submit" value="save changes"/>
						</div>
					</form>
				</div>
				</div>
					
			{/* END MODAL FORM */}
			<tbody>
			  <tr>
				<td>{ visit_date }</td>
				<td>{ doctor_last_name }, { doctor_first_name }</td>
				<td>{ practice_name }</td>
				<td>{ title }</td>
				<td>{ notes }</td>
				<td>
					<a class="waves-effect waves-light btn-floating btn-small modal-trigger" data-target="edit-modal"><i class="material-icons">edit</i></a>

				</td>
				<td>
					<a class="waves-effect waves-light btn-floating btn-small" onClick={(event) => {this.props.handleClick(id, event)}}><i class="material-icons">delete</i></a>
				</td>
			  </tr>
			</tbody>
			</React.Fragment>
		)
	}

}

export default RecordContainer; 