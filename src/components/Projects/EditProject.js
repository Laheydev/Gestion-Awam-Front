import Form from '../Utils/Form';
import React from 'react';
import config from '../../api/apiConfig.js';
import axios from 'axios';
import moment from 'moment';


export default class EditProject extends Form {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      name: '',
      quote: '',
      bill: '',
      created: '',
      projectedend: '',
      status: '',
      modified: '',
      client_id: '',
      user_id: '',
      hidden: 'd-none'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({hidden: 'd-none'})
    const editProject = {
      id: this.state.id,
      name: this.state.name,
      quote:  this.state.quote,
      bill: this.state.bill,
      created: this.state.created,
      projectedend: moment(this.state.projectedend).format('YYYY-MM-DD'),
      status: this.state.status,
      modified: this.state.modified,
      client_id: this.state.client_id,
      user_id: this.state.user_id
    }
    if(editProject.name !== '' && editProject.body !== '' && editProject.quote !== '' && editProject.bill !== '' && editProject.created !== ''){
      axios({
        method:'put',
        url: `${config.url}projects/${this.state.id}.json`,
        auth: {
          username: localStorage.getItem('login'),
          password: localStorage.getItem('password')
        },
        data: editProject
      })
      .then(res => {

        this.props.onRefresh();
      })
    }else{
      window.alert('Données invalides');
    }
  }

  handleEdit(){
    this.setState({hidden: 'd-block'});
    axios({
      method:'get',
      url: `${config.url}projects/${this.state.id}.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      this.setState({
        id: res.data.project.id,
        name: res.data.project.name,
        body: res.data.project.body,
        quote:  res.data.project.quote,
        bill: res.data.project.bill,
        created: moment(res.data.project.created).format('YYYY-MM-DD'),
        projectedend: moment(res.data.project.projectedend).format('YYYY-MM-DD'),
        status: res.data.project.status,
        modified: moment(res.data.project.modified).format('YYYY-MM-DD'),
        client_id: res.data.project.client_id,
        user_id: res.data.project.user_id
      })
    });
  }

  render() {
    return(
      <div>
        <button className="btn btn-sm btn-primary" onClick={this.handleEdit}>
          Modifier
        </button>
        <form className={this.state.hidden} onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input name='name' value={this.state.name} onChange={this.handleInputChange} />
          </label>
          <label>
            body:
            <input name='body' value={this.state.body} onChange={this.handleInputChange} />
          </label>
          <label>
            quote:
            <input name='quote' value={this.state.quote} onChange={this.handleInputChange} />
          </label>
          <label>
            bill:
            <input name='bill' value={this.state.bill} onChange={this.handleInputChange} />
          </label>
          <label>
            Projected end:
            <input name='projectedend' type="date" value={this.state.projectedend} onChange={this.handleInputChange} />
          </label>
          <label>
            Status:
            <input name='status' value={this.state.status} onChange={this.handleInputChange} />
          </label>
          <label>
            client_id:
            <input name='client_id' value={this.state.client_id} onChange={this.handleInputChange} />
          </label>
          <label>
            user_id:
            <input name='user_id' value={this.state.user_id} onChange={this.handleInputChange} />
          </label>
          <input className="btn btn-primary" type="submit" value="Submit" />
        </form>
      </div>


    )
  }
}
