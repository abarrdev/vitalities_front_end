import React from 'react'

class RecordContainer extends React.Component {


	render() {
		const { visit_date, doctor_first_name, doctor_last_name, practice_name, title, notes } = this.props.record

		return(
			<tbody>
			  <tr>
				<td>{ visit_date }</td>
				<td>{ doctor_last_name }, { doctor_first_name }</td>
				<td>{ practice_name }</td>
				<td>{ title }</td>
				<td>{ notes }</td>
			  </tr>
			</tbody>
		)
	}

}

export default RecordContainer; 