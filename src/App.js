import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import M from 'materialize-css'
import PatientPage from './components/PatientPage'
import RecordsPage from './components/RecordsPage'
import Login from './components/Login'
import Navbar from './components/Navbar'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
      patients: [],
      loggedIn: '',
      records: []
		}
	}

	componentDidMount() {
		M.AutoInit();
		Promise.all([
      fetch('http://localhost:3001/patients'),
      fetch('http://localhost:3001/records')
    ])
    .then(([resp1, resp2]) => Promise.all([resp1.json(), resp2.json()]))
    .then(([patientsData, recordsData]) => this.setState({
      patients: patientsData,
      records: recordsData
    }))
  }   
	

	render() {
    // console.log(this.state.records)
		return(
			<div>
        <BrowserRouter>
          <Navbar patients={this.state.patients} loggedIn={this.state.loggedIn} records={this.state.records}/>
          {/* <Route exact path='/login' component={Login}/> */}
          <Switch>
            <Route exact path='/login' render={() => <Login patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />          
            <Route exact path='/home' render={() => <PatientPage records={this.state.records} patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />          
            <Route exact path='/logout' render={() => <Login patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />          
            <Route exact path='/records' render={() => <RecordsPage records={this.state.records} patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />          
            <Route exact path='/' render={() => <PatientPage records={this.state.records} patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />          
            <Route exact path='' render={() => <PatientPage records={this.state.records} patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />          
            
             {/* <Route exact path='/medications' render={() => <Medications patients={this.state.patients} loggedIn={this.state.loggedIn}/>}/>
            <Route exact path='/insurance' render={() => <Insurance patients={this.state.patients} loggedIn={this.state.loggedIn}/>}/>
            <Route exact path='/contacts' render={() => <Contacts patients={this.state.patients} loggedIn={this.state.loggedIn}/>}/> */}
          </Switch>
        </BrowserRouter>
        
			</div>
		)
	}
}

export default App