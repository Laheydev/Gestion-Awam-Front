import Form from '../Utils/Form';
import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';

export default class AddClient extends Form {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      city: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    const newClient = {
      name: this.state.name,
      city: this.state.city
    };
    axios({
      method:'post',
      url: `${config.url}clients.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      },
      data: newClient
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
      <>
      <div className={"row"+ this.props.isHidden}>
        <form onSubmit={this.handleSubmit} className="form-row">
          <div className="form-group col-4">
            <input required className='form-control' placeholder="Nom du client" name='name' value={this.state.name} onChange={this.handleInputChange} />
          </div>
          <div className="form-group col-4">
            <input required className='form-control' placeholder="Ville du client" name='city' value={this.state.city} onChange={this.handleInputChange} />
          </div>
          <div className="form-group col-4">
            <input className="btn bg-dark-awam whiteText fw-800" type="submit" value="Enregistrer" />
          </div>
        </form>
      </div>
      </>
  )
}
}
