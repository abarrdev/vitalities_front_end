import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import M from 'materialize-css'
import PatientPage from './components/PatientPage'
import RecordsPage from './components/RecordsPage'
// import Login from './components/Login'
import Navbar from './components/Navbar'
import axios from 'axios'
import { xray_hand } from './images/xray_hand.jpg'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
      patients: [],
      isLoggedIn: false,
      loggedInPatient: {},
      records: []
		}
	}

	componentDidMount() {
    M.AutoInit();
    axios.all([
      axios.get('http://localhost:3001/patients'),
      axios.get('http://localhost:3001/records')
    ])
      .then(axios.spread((patientsResp, recordsResp) => {
        const patientsData = patientsResp.data
        const recordsData = recordsResp.data
        this.setState({
          patients: patientsData,
          records: recordsData
        })
      }))
  }  

  handleLogin = (credentials) => {
    this.setState({
      isLoggedIn: true,
      loggedInPatient: credentials.loggedInPatient
    })
  }

  handleLogout = () => {
    this.setState({
      isLoggedIn: false,
      loggedInPatient: {}
    })
  }
  
  updateState = (recordsData) => {
    this.setState({
      records: [...this.state.records, recordsData]
    })
  }

  updateAfterDelete = (deletedRecord) => {
    const updated = this.state.records.filter(record => record.id !== deletedRecord.id);
    this.setState({records: updated})
  }

  updateAfterEdit = (editedRecord) => {
    const updated = this.state.records.filter(record => record.id !== editedRecord.id);
    this.setState({
      records: [...updated, editedRecord]
    })
  }

	render() {
		return(
      <div>
      {/* // <div style={{backgroundColor:'#b2ebf2', display:'table', position:'absolute', height:'100%', width:'100%'}}> */}
        <Navbar patients={this.state.patients} loggedIn={this.state.loggedIn} records={this.state.records}/>
		
        <BrowserRouter>
          <Switch>
            {/* <Route exact path='/login' render={() => <Login patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />           */}
            {/* <Route exact path='/logout' render={() => <Login patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />      */}
            {/* <Route exact path='/signup' render={() => <Login patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />           */}
            <Route exact path='/home' render={() => <PatientPage updateAfterEdit={this.updateAfterEdit} updateAfterDelete={this.updateAfterDelete} updateState={this.updateState} records={this.state.records} patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />          
            <Route exact path='/records' render={() => <RecordsPage updateAfterEdit={this.updateAfterEdit} updateAfterDelete={this.updateAfterDelete} updateState={this.updateState} records={this.state.records} patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />                
            <Route exact path='/' render={() => <PatientPage updateAfterEdit={this.updateAfterEdit} updateAfterDelete={this.updateAfterDelete} updateState={this.updateState} records={this.state.records} patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />          
            <Route exact path='' render={() => <PatientPage updateAfterEdit={this.updateAfterEdit} updateAfterDelete={this.updateAfterDelete} updateState={this.updateState} records={this.state.records} patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />          
            {/* <Route exact path='/medications' render={() => <Medications patients={this.state.patients} loggedIn={this.state.loggedIn}/>}/> */}
            {/* <Route exact path='/insurance' render={() => <Insurance patients={this.state.patients} loggedIn={this.state.loggedIn}/>}/> */}
            {/* <Route exact path='/contacts' render={() => <Contacts patients={this.state.patients} loggedIn={this.state.loggedIn}/>}/> */}
          </Switch>
        </BrowserRouter>
			</div>
      
		)
	}
}

export default App