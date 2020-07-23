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
      id: this.props.project.id,
      name: this.props.project.name,
      quote: this.props.project.quote,
      bill: this.props.project.bill,
      projectedend: moment(this.props.project.projectedend),
      client_id: this.props.project.client_id,
      user_id: this.props.project.user_id,
      status_id: this.props.project.status_id,
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
    this.getUsers();
    this.getStatus();
  }

  closeModal() {
    this.setState({modalIsOpen: false});
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
    const editProject = {
      id: this.state.id,
      name: this.state.name,
      quote: this.state.quote,
      bill: this.state.bill,
      projectedend: this.state.projectedend.format('YYYY-MM-DD'),
      client_id: this.state.client_id,
      user_id: this.state.user_id,
      status_id: this.state.status_id
    }

    this.closeModal();
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

  getUsers(){
    axios({
      method:'get',
      url: `${config.url}users.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      const options = res.data.users.map(user =>
        <option key={user.id} value={user.id}>{user.username}</option>
      )
      this.setState({usersOptions: options})
    });
  }

  getStatus(){
    axios({
      method:'get',
      url: `${config.url}status.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      const options = res.data.status.map(status =>
        <option key={status.id} value={status.id}>{status.name}</option>
      )
      this.setState({statusOptions: options})
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
      <i className="btn btn-sm fas fa-edit" onClick={this.openModal}></i>
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={cssModale}
        contentLabel="Modale projets"
        >
        <form onSubmit={this.handleSubmit}>
          <h3 className="text-center fw-800 mb-3 col-12">Modifier le projet</h3>
          <input type="text" className="newInputModale" name="name" value={this.state.name} onChange={this.handleInputChange} /><br />
          <input type="text" className="newInputModale" name="quote" value={this.state.quote} onChange={this.handleInputChange} /><br />
          <input type="text" className="newInputModale" name="bill" value={this.state.bill} onChange={this.handleInputChange} /><br />
          <DatePicker
            className="newInputModale"
            dateFormat="DD/MM/YYYY"
            timeCaption="time"
            selected={this.state.projectedend}
            onChange={this.handleChange.bind(this)}
            />

          <select defaultValue='' className={"form-group newInputModale"+(this.state.showInputClient ? ' d-none' : ' d-block')} name='type_id' onChange={this.handleInputChange}>
            <optgroup label="Client">
              <option value='' disabled hidden>Client</option>
              {this.state.clientsOptions}
            </optgroup>
          </select>

          <select defaultValue='' className={"form-group newInputModale"+(this.state.showInputUsers ? ' d-none' : ' d-block')} name='type_id' onChange={this.handleInputChange}>
            <optgroup label="Users">
              <option value='' disabled hidden>Users</option>
              {this.state.usersOptions}
            </optgroup>
          </select>

          <select defaultValue={this.state.status_id} className={"form-group newInputModale"+(this.state.showInputStatus ? ' d-none' : ' d-block')} name='type_id' onChange={this.handleInputChange}>
            <optgroup label="Status">
              <option value='' disabled hidden>Status</option>
              {this.state.statusOptions}
            </optgroup>
          </select>
          <div className='row'>
            <input className="btn bg-dark-awam whiteText btnModale mx-auto" type="submit" value='Enregistrer' />
          </div>
        </form>
      </Modal>
      </>
  )
}
}
