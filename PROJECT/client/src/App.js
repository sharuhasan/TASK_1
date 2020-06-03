import React,{Component} from 'react';
import RegisterForm from './form/register';
import LoginForm from "./form/login"
import Home from './form/home'
import './App.css'
import {Switch,Route} from "react-router-dom"
import Protectedrouter from './form/protected'


class App extends Component { 

    render() {
      return (
      <div className="App" >
            <Switch>
                  <Route exact path="/" component={RegisterForm} />
                  <Protectedrouter exact path="/home" component={Home} />
                  <Route exact path="/register" component={RegisterForm} />
                  <Route exact path="/login" component={LoginForm} />
            </Switch>
            
      </div>
      );
   }
}


export default App;
