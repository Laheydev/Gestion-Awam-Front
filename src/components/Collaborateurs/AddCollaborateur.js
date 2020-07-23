import Form from '../Utils/Form';
import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import FileBase64 from 'react-file-base64';

export default class AddCollaborateur extends Form {
  constructor(props) {
    super(props);
    this.state = {
      lastname: '',
      firstname: '',
      quota: '',
      img: '',
      file: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    const newCollaborateur = {
      lastname: this.state.lastname,
      firstname: this.state.firstname,
      quota: this.state.quota,
      img: this.state.img
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

  getFiles(files){
    this.setState({
      files: files
    })
  }

  resetAllFields(){
    this.setState({
      lastname: '',
      firstname: '',
      quota: '',
      file: '',
      files: ''
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
            <input required className='form-control' placeholder="Entrez le pourcentage de charge du collaborateur" name='quota' value={this.state.quota} onChange={this.handleInputChange} />
          </div>
          <div className="form-group col-4">
              <input required className='form-control' placeholder="Entrez l'url de la photo du collaborateur" name='img' value={this.state.img} onChange={this.handleInputChange} />

          </div>
          <div className="form-group col-4">
            <input className="btn bg-dark-awam whiteText fw-800" type="submit" value="Enregistrer" />
          </div>
        </form>
      </div>
    )
  }
}
