import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import M from 'materialize-css'
import PatientPage from './components/PatientPage'
import Login from './components/Login'
import Navbar from './components/Navbar'

class App extends React.Component {
	constructor() {
		super()
		this.state = {
      patients: [],
      loggedIn: ''
		}
	}

	componentDidMount() {
		M.AutoInit();
		fetch('http://localhost:3001/patients')
			.then(resp => resp.json())
			.then(patientsData => {
				this.setState({
          patients: patientsData
        })
      })
      .catch(error => {
        console.log(error)
      })
	}

	render() {
		return(
			<div>
        <BrowserRouter>
          <Navbar patients={this.state.patients} loggedIn={this.state.loggedIn}/>
          {/* <Route exact path='/login' component={Login}/> */}
          <Switch>
            <Route exact path='/login' render={() => <Login patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />          
            <Route exact path='/home' render={() => <PatientPage patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />          
            <Route exact path='/logout' render={() => <Login patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />          
            <Route exact path='/' render={() => <PatientPage patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />          
            <Route exact path='' render={() => <PatientPage patients={this.state.patients} loggedIn={this.state.loggedIn}/>} />          
            
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