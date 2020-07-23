import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import DynamicCell from "../Utils/DynamicCell";
import TaskModale from "./TaskModale";
import "react-datepicker/dist/react-datepicker.css";
import TaskBilled from "./TasksCells/Taskbilled.js";
import AddTime from "./TasksCells/AddTime.js";

export default class TimeHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      billed: props.billed,
      elapsedtime: props.elapsedtime,
      task_id: props.task_id,
      status: this.props.statusActuel,
      statusList: this.props.statusList,
      status_id: this.props.statusActuel.id,
      dailycost: this.props.dailycost,
      addTime: 0
    };
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    if(target.name === 'status_id'){
      const newStatut = {
        status_id: target.value
      };
      axios({
        method:'put',
        url: `${config.url}tasks/${this.props.task_id}.json`,
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

  apiEdit(field, content, taskid, date){
    const newData = {
      [field]: content
    };
    this.setState({
      [field]: content
    })
    axios({
      method:'put',
      url: `${config.url}tasks/${taskid}.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      },
      data: newData
    })
    .then(res => {
      this.logElapsedTime(field, content, taskid, date);
    });
  }

  logElapsedTime(field, content, taskid, date){
    if((field === 'elapsedtime') && (content - this.props.elapsedtime > 0)){
      let newtimeontask = {
        timespent: (content - this.props.elapsedtime),
        task_id: taskid,
        created: date
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
      this.props.onUpdateState(content);
    }
  }

  handleContentChange(event){
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleCancel(name){
    this.setState({
      [name]: this.props[name]
    });
  }

  handleTimeAdd(value, date){
    value = parseFloat(value);
    const elapsedtime = parseFloat(this.state.elapsedtime);

    const addingValue = value+elapsedtime;

    this.setState({
      elapsedtime: addingValue
    });

    this.apiEdit('elapsedtime', addingValue, this.state.task_id, date);
  }




  render() {
    const statusCss =
    {
      "1": {
        css: 'bg-dark-awam'
      },
      '2':{
        css: 'bg-green-awam'
      },
      '3':{
        css: 'bg-yellow-awam'
      },
      '4':{
        css: 'bg-blue-awam'
      }
    };
    return (
      <>
      <TaskBilled
        onCancel={this.handleCancel.bind(this)}
        content={this.state.billed}
        id={this.state.task_id}
        dailycost={this.state.dailycost}
        onApiEdit={this.apiEdit.bind(this)}
        onContentChange={this.handleContentChange.bind(this)}
        field='billed' />


      <DynamicCell
        onCancel={this.handleCancel.bind(this)}
        content={this.state.dailycost}
        id={this.state.task_id}
        onApiEdit={this.apiEdit.bind(this)}
        onContentChange={this.handleContentChange.bind(this)}
        field='dailycost' />

      <AddTime
        onCancel={this.handleCancel.bind(this)}
        content={this.state.addTime}
        id={this.state.addTime}
        onTimeAdd={this.handleTimeAdd.bind(this)}
        onContentChange={this.handleContentChange.bind(this)}
        field='addTime' />

      <DynamicCell
        onCancel={this.handleCancel.bind(this)}
        content={this.state.elapsedtime}
        id={this.state.task_id}
        onApiEdit={this.apiEdit.bind(this)}
        onContentChange={this.handleContentChange.bind(this)}
        field='elapsedtime'
        hasDate={true}/>

      <td className={"fw-400"+((((this.state.billed/this.state.dailycost) - ((this.state.elapsedtime/7.8)))*7.8).toFixed(1) > 0 ? ' ': ' bg-red-awam whiteText')}>
        {((this.state.billed/this.state.dailycost*7.8) - (this.state.elapsedtime)).toFixed(1)}(H)
      </td>
      <td className={statusCss[this.state.status_id].css}>
        <select className={'b-none whiteText ' + statusCss[this.state.status_id].css} defaultValue='' name="status_id" onChange={this.handleInputChange}>
          <optgroup label="Statut de la tâche">
            <option className="optionCustom" value='' disabled hidden>{this.state.status.name}</option>
            <option className="optionCustom" value='1' name="status_id" onChange={this.handleInputChange}>A faire</option>
            <option className="optionCustom" value='4' name="status_id" onChange={this.handleInputChange}>En cours</option>
            <option className="optionCustom" value='3' name="status_id" onChange={this.handleInputChange}>En attente</option>
            <option className="optionCustom" value='2' name="status_id" onChange={this.handleInputChange}>Terminé</option>
          </optgroup>
        </select>
      </td>
      <TaskModale content={this.state.addTime} task_id={this.state.task_id} onTimeAdd={this.handleTimeAdd.bind(this)} onContentChange={this.handleContentChange.bind(this)} field='addTime' />
      </>
  )
}
}
