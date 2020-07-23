import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import moment from 'moment';
import TaskList from './TaskList.js';
import TimeHandler from './TimeHandler';
import "react-datepicker/dist/react-datepicker.css";

export default class TogglableTaskList extends TaskList {
  constructor(props) {
    super(props);
  }

  handleDesarchive(id){
    if(window.confirm('Retirer le projet de l\'archive')){
      const newStatus = {
        status_id: 1
      }
      axios({
        method:'put',
        url: `${config.url}projects/${id}.json`,
        auth: {
          username: localStorage.getItem('login'),
          password: localStorage.getItem('password')
        },
        data: newStatus
      })
      .then(res => {
        this.handleRefresh();
      });
    }
  }

  toggleTaskView(){
    if(this.state.isShown === 'table-cell'){
      this.setState({isShown: 'd-none'});
    }else{
      this.setState({isShown: 'table-cell'});
    }
  }



  render() {
    return (
      <>
      <tr key={this.props.task.id} className="tableauProjet">
      <td className="fw-800 align-left pl-5">{this.props.task.type.name}</td>
      <td className="fw-400"><img className="img_collab" alt='collaborateur' src={'/img/'+this.props.task.collaborateur.img} /><span className="pl-3">{this.props.task.collaborateur.firstname}</span></td>
      <TimeHandler statusList={this.props.statusList} onUpdateState={this.handleUpdateState.bind(this)} time={this.props.task.billed} elapsedtime={this.props.task.elapsedtime} task_id={this.props.task.task_id} statusActuel={this.props.task.status}/>
      <td className="iconProjet"><i className="btn btn-sm fas fa-trash-alt" onClick={this.handleDelete}></i></td>
      </tr>

      <tr>
      <td>
      <button className="btn bg-green-awam whiteText w-100 mt-2">Retirer le projet de l'archive</button>
      <button className="btn bg-dark-awam whiteText w-100 mt-2">Voir les tâches associées</button>
      </td>
      </tr>
      </>
    )
  }
}
