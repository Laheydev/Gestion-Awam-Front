import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import config from '../../api/apiConfig.js';

export default class ModaleUser extends React.Component {
  constructor(props) {
    super(props);
    this.refInput = React.createRef();
    this.state = {
      modaleIsOpen: false,
      id: this.props.id,

    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
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
    const editCollaborateur = {
      id: this.props.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      salary: this.state.salary,
      quota: this.state.quota,
      img: this.state.img
    }
    this.closeModal();
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
    })

  }

  render() {
    const cssModale = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        height                : '50%'
      }
    };
    return (
      <>
      <i className="btn btn-sm fas fa-edit" onClick={this.openModal}></i>
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={cssModale}
        contentLabel="Modale calendrier"
        >
        <form onSubmit={this.handleSubmit}>
          <span className="bigTitle">Modifier un collaborateur</span>
          <input type="text" className="w-100" name="firstname" value={this.state.firstname} onChange={this.handleInputChange} /><br />
          <input type="text" className="w-100" name="lastname" value={this.state.lastname} onChange={this.handleInputChange} /><br />
          <input type="text" className="w-100" name="salary" value={this.state.salary} onChange={this.handleInputChange} /><br />
          <input type="text" className="w-100" name="quota" value={this.state.quota} onChange={this.handleInputChange} /><br />
          <input type="text" className="w-100" name="img" value={this.state.img} onChange={this.handleInputChange} /><br />
          <input className="btn btn-success" type="submit" value='Editer' />
        </form>
      </Modal>
      </>
  )
}
}
