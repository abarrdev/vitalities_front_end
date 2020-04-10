import React from 'react'
// import M from 'materialize-css'


class RecordContainer extends React.Component {

	componentDidMount() {

	}
	//create a button for delete action
	//add click listener
	//hook listener up to fetch-delete fn

	render() {
		const { visit_date, doctor_first_name, doctor_last_name, practice_name, title, notes, id } = this.props.record
		// console.log('heeeeey', this.props.record)
	   
		return(

			<tbody>
			  <tr>
				<td>{ visit_date }</td>
				<td>{ doctor_last_name }, { doctor_first_name }</td>
				<td>{ practice_name }</td>
				<td>{ title }</td>
				<td>{ notes }</td>
				<td>
					<a class="waves-effect waves-light btn-floating btn-small" onClick={(event) => {this.props.handleClick(id, event)}}><i class="material-icons">edit</i></a>
				</td>
				<td>
					<a class="waves-effect waves-light btn-floating btn-small" onClick={(event) => {this.props.handleClick(id, event)}}><i class="material-icons">delete</i></a>
				</td>
			  </tr>
			</tbody>
		)
	}

}

export default RecordContainer; 