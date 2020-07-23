import Form from '../Utils/Form';
import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import WeeklyUrgent from './CurrentProjectsViews/WeeklyUrgent';
import WeeklyProfit from './CurrentProjectsViews/WeeklyProfit';
import WeeklyLoss from './CurrentProjectsViews/WeeklyLoss';



export default class WeeklySummary extends Form {
  constructor(props) {
    super(props);
    this.state = {
      currentprojects: null,
      isLoading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh(){
    axios({
      method:'get',
      url: `${config.url}projects/current.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      this.setState({
        currentprojects: res.data.currentProjects,
        WeeklyUrgent: <WeeklyUrgent currentprojects={res.data.currentProjects} />,
      WeeklyProfit: <WeeklyProfit currentprojects={res.data.currentProjects} />,
    WeeklyLoss: <WeeklyLoss currentprojects={res.data.currentProjects} />,
  isLoading: false
})
})
}

render() {
  return(
    <>
    {this.state.isLoading ? <div className="loading-spinner"><i className="fas fa-spinner fa-spin"></i></div> :
      <div className="row">
        <div className="col-12 bigTitle mb-5">
          En cours
        </div>
        <div className="col-12">
          <span className="titleDashboard">Les projets les plus rentables</span>
          {this.state.WeeklyProfit}
        </div>
        <div className="col-12 mt-5">
          <span className="titleDashboard">Les projets les moins rentables</span>
          {this.state.WeeklyLoss}
        </div>
        <div className="col-12 mt-5">
          <span className="titleDashboard">Les projets a finir rapidement</span><br />
          {this.state.WeeklyUrgent}
        </div>
      </div>
    }
    </>


)
}
}
