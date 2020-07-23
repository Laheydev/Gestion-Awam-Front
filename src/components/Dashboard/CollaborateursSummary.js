import Form from '../Utils/Form';
import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import moment from 'moment';
import AllTimeRevenue from './CollaborateursViews/AllTimeRevenue';
import BonusMalus from './CollaborateursViews/BonusMalus';
import MonthlyRevenue from './CollaborateursViews/MonthlyRevenue';




export default class CollaborateursSummary extends Form {
  constructor(props) {
    super(props);
    this.state = {
      timeontasks: null,
      collab_id: 1,
      isLoading: true,
      bonusmalus: 0,
      revenue: 0,
      totalbilled: 0,
      month: 1
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onCollabChange = this.onCollabChange.bind(this);
    this.handleRevenue = this.handleRevenue.bind(this);
  }

  componentDidMount() {
    this.getCollaborateurs();
  }


  getCollaborateurs(){
    axios({
      method:'get',
      url: `${config.url}collaborateurs.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      const options = res.data.collaborateurs.map(collaborateur =>
        <option key={collaborateur.id} value={collaborateur.id}>{collaborateur.firstname}</option>
      )
      this.setState({
        collaborateursOptions: options,
        isLoading: false
      })
    });
  }

  getTotalbilled(collabid){
    axios({
      method:'get',
      url: `${config.url}tasks/viewByCollabId/${collabid}.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      this.handleRevenue(res.data.tasks, parseInt(this.state.month));
      this.handleBonusMalus(res.data.tasks, parseInt(this.state.month));
      this.getBilled(res.data.tasks, parseInt(this.state.month));
    });
  };

  handleRevenue(tasks, month){
    let revenue = 0;

    tasks.forEach(function(task){
      if(moment(task.created).month() === month){
        revenue += (task.elapsedtime * (task.dailycost/7.8));
      }
    });

    this.setState({
      revenue: revenue.toFixed(2)
    });
  }

  handleBonusMalus(tasks, month){
    let bonusmalus = 0;
    tasks.forEach(function(task){
      if((task.status_id === 2) && (moment(task.created).month() === month)){
        bonusmalus = task.billed - (task.elapsedtime * (task.dailycost/7.8))
      }
    });

    this.setState({
      bonusmalus: bonusmalus.toFixed(2)
    });
  }

  getBilled(tasks, month){
    let totalbilled = 0;

    tasks.forEach(function(task){
      if((moment(task.created).month() === month)){
        totalbilled = task.billed
      }
    });

    this.setState({
      totalbilled: totalbilled.toFixed(2)
    });

  }



  onCollabChange(event){
    let collabOptionsName = event.target.options[event.target.selectedIndex].text;
    let collabId = event.target.value;
    this.setState({
      collabName: collabOptionsName,
      collab_id: collabId
    });
    this.getTotalbilled(collabId);
  }

  onMonthChange(event){
    this.setState({
      month: event.target.value
    });
    this.getTotalbilled(this.state.collab_id);
  }

  render() {
    const monthNames = [
      {
        name:"Janvier",
        value: 1
      },
      {
        name: "Fevrier",
        value: 2
      },
      {
        name: "Mars",
        value: 3
      },
      {
        name: "Avril",
        value: 4
      },
      {
        name: "Mai",
        value: 5
      },
      {
        name:"Juin",
        value: 6
      },
      {
        name:"Juillet",
        value: 7
      },
      {
        name:"Aout",
        value: 8
      },
      {
        name: "Septembre",
        value: 9
      },
      {
        name: "Octobre",
        value: 10
      },
      {
        name: "Novembre",
        value: 11
      },
      {
        name: "Decembre",
        value: 12
      }
    ]

    return(
      <>
      {this.state.isLoading ? <div className="loading-spinner"><i className="fas fa-spinner fa-spin"></i></div> :
        <div className="row">
          <div className="col-6 bigTitle mb-5">
            {this.state.collabName}
          </div>
          <div className="col-3">
            <select className="newInputModale w-100" name="collab_id" selected="title" onChange={this.onCollabChange.bind(this)}>
              <option value='title' hidden>Choisir un collaborateur</option>
              {this.state.collaborateursOptions}
            </select>
          </div>
          <div className="col-3">
            <select className="newInputModale w-100" name="month" selected="title" onChange={this.onMonthChange.bind(this)}>
              <option value='title' hidden>Choisir un mois</option>
              { monthNames.map(month => <option key={month.value} value={month.value}>{month.name}</option>)}
            </select>
          </div>

          <div className="col-4">
            <span className="titleDashboard">Total du CA généré</span>
            <MonthlyRevenue revenue={this.state.totalbilled} />
          </div>
          <div className="col-4">
            <span className="titleDashboard">Bonus/Malus</span>
            <BonusMalus bonusmalus={this.state.bonusmalus} />
          </div>
          <div className="col-4">
            <span className="titleDashboard">Total CA réel</span><br />
            <AllTimeRevenue billed={this.state.totalbilled} bonusmalus={this.state.bonusmalus}/>
          </div>
        </div>
      }

      </>


  )
}
}
