import logo from './logo.svg';
import './App.css';
import Signup from "./signup";
import Signin from "./Signin";
import ToDoList from './ToDoList';
import { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";

class App extends Component {
  render(){
    
    const login = localStorage.getItem("isLoggedIn");
  return (
    <div className="App">
       
          <Router>
            <Route exact path="/" component={Signup}></Route>
            <Route path="/sign-in" component={Signin}></Route>
            <Route path="/home" component={ToDoList}></Route>
          </Router>
      </div>
  )}
}

export default App;
