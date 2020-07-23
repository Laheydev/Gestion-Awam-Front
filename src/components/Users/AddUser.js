import Form from '../Utils/Form';
import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import FileBase64 from 'react-file-base64';

export default class AddUser extends Form {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      role: 0,
      password:'',
      img: ''

    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    const newUser = {
      username: this.state.username,
      role: this.state.role,
      password: this.state.password,
      img: this.state.img
    }
    axios({
      method:'post',
      url: `${config.url}users.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      },
      data: newUser
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


  getFiles(files){
    this.setState({
      files: files
    })
  }

  render() {
    return(
      <div className={"row" + this.props.isHidden}>
        <form onSubmit={this.handleSubmit} className='form-row'>
          <div className="form-group col-4">
            <input required className='form-control' placeholder="Entrez l'username" name='username' value={this.state.username} onChange={this.handleInputChange} />
          </div>
          <div className="form-group col-4">
            <input required className='form-control' placeholder="Entrez le password" name='password' value={this.state.password} onChange={this.handleInputChange} />
          </div>
          <div className="form-group col-4">
          <input required className='form-control' placeholder="Entrez l'url de la photo de l'user" name='img' value={this.state.img} onChange={this.handleInputChange} />
          </div>
          <div className="form-group col-4">
            <input className="btn bg-dark-awam whiteText fw-800" type="submit" value="Enregistrer" />
          </div>
        </form>
      </div>
    )
  }
}
