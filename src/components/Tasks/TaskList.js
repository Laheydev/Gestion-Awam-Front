import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import moment from 'moment';
import TimeHandler from './TimeHandler';
import "react-datepicker/dist/react-datepicker.css";

export default class TasksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task,
      billed: this.props.task.billed,
      elapsedtime: this.props.task.elapsedtime,
      status: this.props.task.status,
      task_id: this.props.task.id,
      dailycost: this.props.task.dailycost
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleDelete(){
    if(window.confirm('Supprimer la tâche?')){
      axios({
        method:'delete',
        url: `${config.url}tasks/${this.state.task_id}.json`,
        auth: {
          username: localStorage.getItem('login'),
          password: localStorage.getItem('password')
        }
      })
      .then(res => {
        this.props.onRefresh();
      })
    }
  }



  handleCompute(val){
    let beforeChange = this.state.elapsedtime;
    let name = Object.keys(val)[0];
    let afterchange = val[name];
    this.setState({
      [name]: afterchange
    });

    if((name === 'elapsedtime') && (afterchange - beforeChange > 0)){
      let newtimeontask = {
        timespent: (afterchange - beforeChange),
        task_id: this.state.task_id,
        created: moment().format('YYYY-MM-DD')
      }
      axios({
        method:'post',
        url: `${config.url}timeontasks.json`,
        auth: {
          username: localStorage.getItem('login'),
          password: localStorage.getItem('password')
        },
        data: newtimeontask
      })
      .then(res => {
      });
    }else{
      this.setState({
        [name]: val[name]
      });
    }
  }


  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if(target.name === 'status'){
      const newStatut = {
        status: target.value
      };
      axios({
        method:'put',
        url: `${config.url}tasks/${this.state.task_id}.json`,
        auth: {
          username: localStorage.getItem('login'),
          password: localStorage.getItem('password')
        },
        data: newStatut
      })
      .then(res => {
      });
    }else{
    }
    this.setState({
      [name]: value
    });
  }

  handleUpdateState(newelapsedtime){
    this.setState({
      elapsedtime: newelapsedtime
    });
  }

  render() {
    return (
      <tr key={this.state.task.id} className="tableauProjet">
        <td className="fw-800 align-left pl-5">{this.state.task.type.name}</td>
        <td className="fw-400"><img className="img_collab" alt='collaborateur' src={this.state.task.collaborateur.img} /><span>{this.state.task.collaborateur.firstname}</span></td>
        <TimeHandler
          statusList={this.props.statusList}
          onUpdateState={this.handleUpdateState.bind(this)}
          billed={this.state.billed}
          elapsedtime={this.state.elapsedtime}
          task_id={this.state.task_id}
          statusActuel={this.state.status}
          dailycost={this.state.dailycost}/>
        
        <td className="iconProjet"><i className="btn btn-sm fas fa-trash-alt" onClick={this.handleDelete}></i></td>
      </tr>
    )
  }
}
