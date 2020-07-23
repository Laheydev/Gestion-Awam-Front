import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Navbar.css';
import 'react-dropdown/style.css'

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: localStorage.getItem('login')
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }



  handleLogin(){
    this.setState({logged: localStorage.getItem('login')});
  }

  handleLogout(){
    localStorage.clear();
    this.setState({logged: localStorage.getItem('login')})
  }

  render() {

    return (
      <div className="col-12 col-lg-12 w-100">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <div className="navbar-header">
            <span className="navbar-brand">Awam</span>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false">
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          <ul className="nav navbar-nav">
            <li><Link to="/projects/"  className="nav-item nav-link"></Link></li>
            <li> <Link to="/clients/"  className="nav-item nav-link"></Link></li>
          </ul>

          <ul className="nav navbar-nav">
            <li><Link to="/settings/" className="nav-link"><i className="fas fa-cogs"></i></Link></li>
            <li><Link to="/projects/" className="nav-link"><i className={"fas fa-sign-in-alt" + (this.state.logged === null ? ' red' : ' green')}></i></Link></li>

          </ul>
        </nav>
      </div>
    );
  }
}

export default Navbar;
