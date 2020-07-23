import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import moment from 'moment';
import RemoveTimeontask from './RemoveTimeontask';
import TimeontaskModale from './TimeontaskModale';

//voir await

export default class TimeontaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeontasks: [],
      isHidden: ' d-none'
    };
    this.handleRefresh = this.handleRefresh.bind(this);
  }


  componentDidMount() {
    this.handleRefresh();
  }


  handleRefresh(){
    axios({
      method:'get',
      url: `${config.url}timeontasks.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      this.setState({
        timeontasks: res.data.timeontasks,
        isHidden: ' d-none'
      });
    })
  }

  render() {
    return (
      <>
      <div className={"container mt-5"+(this.props.logged ? ' d-block' : ' d-none')}>
        <div className="row self-mb-40">
          <div className="col-5">
            <span className="bigTitle">Historique des tâches</span>
          </div>
        </div>


        <div className="row mb-3 align-list-title">
          <div className="col-2 listName align-list-title">
            Date
          </div>
          <div className="col-1 headProjet align-list-title">
            Temps passé
          </div>
          <div className="col-1 headProjet align-list-title">
            Nom de la tâche
          </div>
          <div className="col-1 headProjet align-list-title">
            Collaborateur
          </div>
        </div>
        {this.state.timeontasks.map(timeontask =>
          <div className="row" key={timeontask.id}>
            <div className="col-2 center-txt greyCell">
              {moment(timeontask.created).format("DD/MM/YYYY")}
            </div>
            <div className="col-1 center-txt greyCell">
              {timeontask.timespent}
            </div>
            <div className="col-1 center-txt greyCell">
              {timeontask.task.type.name}
            </div>
            <div className="col-1 center-txt greyCell">
              {timeontask.task.collaborateur.firstname}
            </div>
            <div className="col-1 center-txt">
              <TimeontaskModale timeontask={timeontask} id={timeontask.id} onRefresh={this.handleRefresh} />
            </div>
            <div className="col-1 center-txt">
              <RemoveTimeontask id={timeontask.id} onRefresh={this.handleRefresh} />
            </div>
          </div>
        )}

      </div>
      <div  className={'fw-800 container mt-5'+ (this.props.logged ? ' d-none' : ' d-block')}>
        <div className="row text-center loggedOut">
          <div  className="col-12 loggedOut">
            Veuillez vous connecter
          </div>
        </div>
      </div>
      </>
  )
}
}
