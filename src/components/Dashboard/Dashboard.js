import Form from '../Utils/Form';
import React from 'react';
import AllTimeSummary from './AllTimeSummary';
import WeeklySummary from './WeeklySummary';
import CollaborateursSummary from './CollaborateursSummary';



export default class DashboardList extends Form {
  constructor(props) {
    super(props);
    this.state = {
      viewSelected: WeeklySummary,
      isLoading: false

    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleLoaded = this.handleLoaded.bind(this);
  }

  handleLoaded(){
    this.setState({
      isLoading: false
    });
  }



  render() {
    return(
      <>
      <div className={"container mt-5"+(this.props.logged ? ' d-block' : ' d-none')}>
        <div className="row">
          <div className="col-12 self-mb-40">
            <span className="bigTitle">La Dashboard</span>
            {this.state.isLoading ? <div className="loading-spinner"><i className="fas fa-spinner fa-spin"></i></div> : ' '}
          </div>
        </div>

          <div className="row mb-5">
            <div className="col-4">
              <button className="btn bg-dark-awam whiteText w-75" onClick={() => this.setState({viewSelected: WeeklySummary})}>Projets en cours</button>
            </div>
            <div className="col-4">
              <button className="btn bg-green-awam whiteText w-75" onClick={ () => this.setState({viewSelected: AllTimeSummary})}>Tout les projets</button>
            </div>
            <div className="col-4">
              <button className="btn bg-blue-awam whiteText w-75" onClick={ () => this.setState({viewSelected: CollaborateursSummary})}>Collaborateurs</button>
            </div>
          </div>

          <this.state.viewSelected />



        <div  className={'fw-800 container mt-5'+ (this.props.logged ? ' d-none' : ' d-block')}>

          <div className="row text-center loggedOut">
            <div  className="col-12 loggedOut">
              Veuillez vous connecter
            </div>
          </div>
        </div>
      </div>
      </>


  )
}
}
