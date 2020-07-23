import React, { Component } from 'react';
import { BrowserRouter as Router,Redirect, Route, Link } from "react-router-dom";
import Dashboard from '../Dashboard/Dashboard.js';
import ClientList from '../Clients/ClientList';
import ArchiveList from '../Archive/ArchiveList';
import CollaborateurList from '../Collaborateurs/CollaborateurList';
import ProjectList from '../Projects/ProjectList';
import Login from '../Login/Login';
import CategorieList from '../Categories/CategorieList';
import TimeontaskList from '../Timeontasks/TimeontaskList';
import UserList from '../Users/UserList';
import TypeList from '../Types/TypeList';
import {NavDropdown } from 'react-bootstrap';


class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: localStorage.getItem('login'),
      userData: localStorage.getItem('currentUser')
    };

  }

  handleLoginChange(){
    this.setState({logged: localStorage.getItem('login')});
  }


  render() {
    return (
      <>
      <Router>
        <div className={"row" + (this.state.logged === null ? ' d-none' : ' ')}>
          <div id="main-sidebar" className="col-2 sidebar">
            <div className="navbar-brand w-100 logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-3295 24 131.787 25">
                <g id="Groupe_63" data-name="Groupe 63" transform="translate(-3375 -37)">
                  <path id="Tracé_1" data-name="Tracé 1" className="cls-1" d="M21.33,15.928c0,1.108.416,3.116,2.562,3.116,1.316,0,3.116-.762,4.086-3.74l2.147,2.978a1.366,1.366,0,0,1,.139.485c0,1.247-2.355,5.817-7.964,5.817-2.839,0-4.848-1.454-5.54-3.6-.069-.139-.069-.208-.139-.208s-.139.139-.139.139a8.612,8.612,0,0,1-7.618,4.017C.762,24.931,0,16.759,0,14.2,0,7.479,3.532,0,14.266,0A34.909,34.909,0,0,1,21.33.97ZM15.789,5.055a7.066,7.066,0,0,0-2.632-.346c-2.562,0-7.341,1.939-7.341,8.657,0,1.385.069,5.956,4.363,5.956a5.672,5.672,0,0,0,5.54-5.748V5.055Z" transform="translate(80 61.069)"/>
                  <path id="Tracé_2" data-name="Tracé 2" className="cls-1" d="M49.95,1.4h5.679s2.7,18.767,2.839,18.767c6.094-.485,7.341-9,7.341-13.573V5.9h-2.7V1.4h8.38c0,1.385-.069,3.532-.069,5.055,0,9.072-3.6,18.49-14.058,18.49a10.244,10.244,0,0,1-3.878-.623l-.554-3.255c-1.593,2.285-4.848,3.878-8.587,3.878a9.634,9.634,0,0,1-3.809-.623L37,1.4h5.679s2.7,18.767,2.839,18.767c3.186,0,6.094-3.047,6.44-5.679Z" transform="translate(68.623 60.639)"/>
                  <path id="Tracé_3" data-name="Tracé 3" className="cls-1" d="M110.6,15.9c0,1.108.416,3.116,2.562,3.116,1.316,0,3.116-.762,4.086-3.74l2.147,2.978a1.366,1.366,0,0,1,.139.485c0,1.247-2.355,5.817-7.964,5.817-2.839,0-4.848-1.454-5.54-3.6-.069-.139-.069-.208-.138-.208s-.139.139-.139.139A8.612,8.612,0,0,1,98.134,24.9c-8.172,0-8.934-8.241-8.934-10.8,0-6.717,3.532-14.2,14.266-14.2a34.909,34.909,0,0,1,7.064.97V15.9Zm-5.54-10.873a7.066,7.066,0,0,0-2.632-.346c-2.562,0-7.341,1.939-7.341,8.657,0,1.385.069,5.956,4.363,5.956a5.672,5.672,0,0,0,5.54-5.748V5.025Z" transform="translate(52.573 61.1)"/>
                  <path id="Tracé_4" data-name="Tracé 4" className="cls-1" d="M156.155,9.357a3.382,3.382,0,0,0-3.532-3.532c-3.186,0-4.986,2.839-4.986,6.094V24.176H142.1V9.357a3.24,3.24,0,0,0-3.324-3.532c-3.047,0-4.848,2.839-4.848,6.094V24.176h-5.609V5.894H126.1V1.185h7.825V3.4a7.993,7.993,0,0,1,6.3-2.7c2.632,0,5.055.762,6.3,3.186,0,0,0,.069.138.069.069,0,.139-.139.139-.139C146.945,3.539,148.815.7,154.078.7c4.086,0,7.548,2.216,7.548,7.2,0,0-.069,7.964-.069,8.449,0,1.177.485,2.978,2.632,2.978,1.316,0,3.116-.693,4.086-3.67l2.147,2.978a1.366,1.366,0,0,1,.138.485c0,1.247-2.355,5.817-8.033,5.817a6.234,6.234,0,0,1-6.51-6.44V9.357Z" transform="translate(41.227 60.854)"/>
                </g>
              </svg>
            </div>


            <Login
              logged={this.state.logged}
              onUpdate={this.handleLoginChange.bind(this)}
              />

            <div className="sidebar-scroll">

              <nav id="left-sidebar-nav" className="sidebar-nav">
                <ul id="main-menu" className="metismenu">
                  <li><Link to="/dashboard/"  className="nav-item nav-link"><i className="fas fa-tachometer-alt"></i>Dashboard</Link></li>
                  <li><Link to="/projects/"  className="nav-item nav-link"><i className="fas fa-folder"></i>Projets en cours</Link></li>
                  <li><Link to="/archive/"  className="nav-item nav-link"><i className="fas fa-star"></i>Projets terminés</Link></li>
                  <li><Link to="/clients/"  className="nav-item nav-link"><i className="fas fa-users"></i>Clients</Link></li>
                  <NavDropdown className='dropdown-toggle-no-carret' title={<><i className="fas fa-cogs"></i>Administration</>} id="basic-nav-dropdown" >
                    <Link to="/settings/collaborateurs">Collaborateurs</Link>
                    <Link to="/settings/categories">Catégories</Link>
                    <Link to="/settings/types">Types</Link>
                    <Link to="/settings/users">Users</Link>
                    <Link to="/settings/timeontasks">Time on tasks</Link>
                  </NavDropdown>
                </ul>
              </nav>
            </div>
          </div>
          <Route exact path="/">
    <Redirect to="/projects" />
</Route>
          <Route path="/clients/" exact component={()=><ClientList logged={this.state.logged}/>} />
          <Route path="/projects/" exact component={()=><ProjectList logged={this.state.logged}/>} />
          <Route path="/settings/collaborateurs/" exact component={()=><CollaborateurList logged={this.state.logged}/>} />
          <Route path="/settings/categories/" exact component={()=><CategorieList logged={this.state.logged}/>} />
          <Route path="/settings/types/" exact component={()=><TypeList logged={this.state.logged}/>} />
          <Route path="/settings/users/" exact component={()=><UserList logged={this.state.logged}/>} />
          <Route path="/settings/timeontasks" exact component={()=><TimeontaskList logged={this.state.logged}/>} />
          <Route path="/archive/" exact component={()=><ArchiveList logged={this.state.logged} />} />
          <Route path="/dashboard" exact component={()=><Dashboard logged={this.state.logged}/>} />
        </div>

      </Router>

      </>

  );
}
}

export default Sidebar;
