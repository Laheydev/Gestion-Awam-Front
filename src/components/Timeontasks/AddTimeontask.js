import Form from '../Utils/Form';
import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';

export default class AddTimeontask extends Form {
  constructor(props) {
    super(props);
    this.state = {
      lastname: '',
      firstname: '',
      salary: '',
      quota: '',
      img: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    const newCollaborateur = {
      created:
    }
    axios({
      method:'post',
      url: `${config.url}collaborateurs.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      },
      data: newCollaborateur
    })
    .then(res => {
      this.props.onRefresh();
      this.resetAllFields();
    })
  }

  resetAllFields(){
    this.setState({
      name: '',
      city: ''
    })
  }

  render() {
    return(
      <div className={"row" + this.props.isHidden}>
        <form onSubmit={this.handleSubmit} className='form-row'>
          <div className="form-group col-4">
            <input required className='form-control' placeholder="Entrez le nom du collaborateur" name='lastname' value={this.state.lastname} onChange={this.handleInputChange} />
          </div>
          <div className="form-group col-4">
            <input required className='form-control' placeholder="Entrez le prénom du collaborateur" name='firstname' value={this.state.firstname} onChange={this.handleInputChange} />
          </div>
          <div className="form-group col-4">
            <input required className='form-control' placeholder="Entre le cout horaire du collaborateur" name='salary' value={this.state.salary} onChange={this.handleInputChange} />
          </div>
          <div className="form-group col-4">
            <input className="btn bg-dark-awam whiteText fw-800" type="submit" value="Enregistrer" />
          </div>
        </form>
      </div>
    )
  }
}
