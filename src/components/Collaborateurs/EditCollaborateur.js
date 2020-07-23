import Form from '../Utils/Form';
import React from 'react';
import config from '../../api/apiConfig.js';
import axios from 'axios';

export default class EditCollaborateur extends Form {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      lastname: '',
      firstname: '',
      salary: '',
      quota: '',
      img: '',
      hidden: 'd-none'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const editCollaborateur = {
      id: this.state.id,
      lastname: this.state.lastname,
      firstname: this.state.firstname,
      salary: this.state.salary,
      quota: this.state.quota,
      img: this.state.img
    }
    if(editCollaborateur.lastname !== '' && editCollaborateur.firstname !== ''){
      axios({
        method:'put',
        url: `${config.url}collaborateurs/${this.state.id}.json`,
        auth: {
          username: localStorage.getItem('login'),
          password: localStorage.getItem('password')
        },
        data: editCollaborateur
      })
      .then(res => {
        this.props.onRefresh();
        this.setState({ hidden: 'd-none' });
      })
    }else{
      window.alert('Données invalides');
    }
  }

  handleEdit(){
    this.setState({hidden: 'd-block'});
    axios({
      method:'get',
      url: `${config.url}collaborateurs/${this.props.id}.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      this.setState({
        lastname: res.data.collaborateur.lastname,
        firstname: res.data.collaborateur.firstname,
        salary: res.data.collaborateur.salary,
        quota: res.data.collaborateur.quota,
        img: res.data.collaborateur.img
      })
    });
  }

  render() {
    return(
      <div className='col-3'>
      <i class="fas fa-edit" onClick={this.openModal}></i>
        <form className={this.state.hidden} onSubmit={this.handleSubmit}>
          <label>
            Lastname:
            <input required  name='lastname' value={this.state.lastname} onChange={this.handleInputChange} />
          </label>
          <label>
            Firstname:
            <input required  name='firstname' value={this.state.firstname} onChange={this.handleInputChange} />
          </label>
          <label>
            Salary:
            <input required  name='salary' value={this.state.salary} onChange={this.handleInputChange} />
          </label>
          <label>
            Quota:
            <input required  name='quota' value={this.state.quota} onChange={this.handleInputChange} />
          </label>
          <label>
            img:
            <input required name='img' value={this.state.img} onChange={this.handleInputChange} />
          </label>
          <input className="btn btn-primary" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
