import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import config from '../../api/apiConfig.js';

export default class CollaborateurModale extends React.Component {
  constructor(props) {
    super(props);
    this.refInput = React.createRef();
    this.state = {
      modaleIsOpen: false,
      id: this.props.id,
      firstname: this.props.collaborateur.firstname,
      lastname: this.props.collaborateur.lastname,
      salary: this.props.collaborateur.salary,
      quota: this.props.collaborateur.quota,
      img: this.props.collaborateur.img
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
        contentLabel="Modale calendrier"
        >
        <form onSubmit={this.handleSubmit}>
          <h3 className="text-center fw-800 mb-3 col-12">Modifier le Collaborateur</h3>
          <input type="text" className="fieldsModal" name="firstname" value={this.state.firstname} onChange={this.handleInputChange} /><br />
          <input type="text" className="fieldsModal" name="lastname" value={this.state.lastname} onChange={this.handleInputChange} /><br />
          <input type="text" className="fieldsModal" name="salary" value={this.state.salary} onChange={this.handleInputChange} /><br />
          <input type="text" className="fieldsModal" name="quota" value={this.state.quota} onChange={this.handleInputChange} /><br />
          <input type="text" className="fieldsModal" name="img" value={this.state.img} onChange={this.handleInputChange} /><br />
          <div className='row'>
            <input className="btn bg-dark-awam whiteText btnModale mx-auto" type="submit" value='Enregistrer' />
          </div>
        </form>
      </Modal>
      </>
  )
}
}
