import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import DatePicker from "react-datepicker";
import axios from 'axios';
import config from '../../api/apiConfig.js';

export default class ProjectModale extends React.Component {
  constructor(props) {
    super(props);
    this.refInput = React.createRef();
    this.state = {
      modaleIsOpen: false,
      name: '',
      projectedend: moment(),
      client_id: '',
      clientsOptions: '',
      usersOptions: '',
      statusOptions: ''
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
    this.getClients();
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      name: '',
      projectedend: moment(),
      client_id: '',
      clientsOptions: '',
      usersOptions: '',
      statusOptions: ''
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  handleSubmit(event) {
    event.preventDefault();
    const newProject = {
      name: this.state.name,
      quote: this.state.quote,
      bill: 0,
      client_id: this.state.client_id,
      user_id: localStorage.getItem('id'),
      status_id: 1,
      projectedend: this.state.projectedend.format('YYYY-MM-DD')
    }

    this.closeModal();
    axios({
      method:'post',
      url: `${config.url}projects.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      },
      data: newProject
    })
    .then(res => {
      this.props.onRefresh();
    })
  }

  getClients(){
    axios({
      method:'get',
      url: `${config.url}clients.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      const options = res.data.clients.map(client =>
        <option key={client.id} value={client.id}>{client.name}</option>
      )
      this.setState({clientsOptions: options})
    });
  }



  handleChange(date) {
    this.setState({
      projectedend: date
    });
  }


  render(){
    const cssModale = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        height                : '75%%'
      }
    };
    return (
      <>
      <div className="col-12 col-md-2 offset-md-2 align-items-end d-flex">
        <button className="btn bg-green-awam whiteText btnAddProjet" onClick={this.openModal.bind(this)}>Ajouter un projet</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={cssModale}
          contentLabel="Modale projets"
          >
          <form onSubmit={this.handleSubmit}>
            <h3 className="text-center fw-800 mb-3 col-12">Ajouter le projet</h3>
            <input type="text" placeholder='Nom du projet' className="newInputModale" name="name" value={this.state.name} onChange={this.handleInputChange} /><br />
            <input type="text" placeholder='Total facturé (optionnel)' className="newInputModale" name="quote" value={this.state.quote} onChange={this.handleInputChange} /><br />
            <DatePicker
              className="newInputModale"
              dateFormat="DD/MM/YYYY"
              timeCaption="time"
              selected={this.state.projectedend}
              onChange={this.handleChange.bind(this)}
              />

            <select defaultValue='' className={"form-group newInputModale"+(this.state.showInputClient ? ' d-none' : ' d-block')} name='client_id' onChange={this.handleInputChange}>
              <optgroup label="Client">
                <option value='' disabled hidden>Client</option>
                {this.state.clientsOptions}
              </optgroup>
            </select>

            <div className='row'>
              <input className="btn bg-dark-awam whiteText btnModale mx-auto" type="submit" value='Enregistrer' />
            </div>
          </form>
        </Modal>
      </div>
      </>
  )
}
}
