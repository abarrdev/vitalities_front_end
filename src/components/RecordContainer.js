import React from 'react'
import M from 'materialize-css'
// import axios from 'axios'



class RecordContainer extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			
		}
	}
	

	componentDidMount = () => {
		const editForm = document.querySelectorAll('.modal');
		M.Modal.init(editForm);

		const newRecordDate = document.querySelectorAll('.datepicker');
		 M.Datepicker.init(newRecordDate);
	}









	render() {
		const { visit_date, doctor_first_name, doctor_last_name, practice_name, title, notes, id } = this.props.record

		return(
			<React.Fragment>
			

			<tbody>
			  <tr>
				<td>{ visit_date }</td>
				<td>{ doctor_last_name }, { doctor_first_name }</td>
				<td>{ practice_name }</td>
				<td>{ title }</td>
				<td>{ notes }</td>
				<td>
					<a class="waves-effect waves-light btn-floating btn-small modal-trigger" data-target="edit-modal" onClick={(event) => {this.props.handleEditButtonClick(this.props.record)}}><i class="material-icons">edit</i></a>

				</td>
				<td>
					<a class="waves-effect waves-light btn-floating btn-small" onClick={(event) => {this.props.handleDeleteClick(id, event)}}><i class="material-icons">delete</i></a>
				</td>
			  </tr>
			</tbody>
			</React.Fragment>
		)
	}

}


export default RecordContainer; 