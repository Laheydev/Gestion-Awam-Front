import Form from '../Utils/Form';
import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import AllTimeProfit from './AllTimeProjectsViews/AllTimeProfit';
import AllTimeLoss from './AllTimeProjectsViews/AllTimeLoss';



export default class AllTimeSummary extends Form {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      isLoading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh(){
    axios({
      method:'get',
      url: `${config.url}projects.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      this.setState({
        projects: res.data.projects,
        AllTimeProfit: <AllTimeProfit projects={res.data.projects} />,
      AllTimeLoss: <AllTimeLoss projects={res.data.projects} />,
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
          Tout les projets
        </div>
        <div className="col-12 mb-5">
          <span className="titleDashboard">Les projets les plus rentables</span>
          {this.state.AllTimeProfit}
        </div>
        <div className="col-12">
          <span className="titleDashboard">Les projets les moins rentables</span>
          {this.state.AllTimeLoss}
        </div>
      </div>
    }
    </>



)
}
}
