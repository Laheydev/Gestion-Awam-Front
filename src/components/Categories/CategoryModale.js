import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import config from '../../api/apiConfig.js';

export default class CategoryModale extends React.Component {
  constructor(props) {
    super(props);
    this.refInput = React.createRef();
    this.state = {
      modaleIsOpen: false,
      id: this.props.id,
      name: this.props.name
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
    const editCategory = {
      id: this.state.id,
      name: this.state.name
    }
    this.closeModal();
    axios({
      method:'put',
      url: `${config.url}categories/${this.state.id}.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      },
      data: editCategory
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
      <i className="btn btn-sm far fa-edit" onClick={this.openModal}></i>
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={cssModale}
        contentLabel="Modale calendrier"
        >
        <form onSubmit={this.handleSubmit}>
            <h3 className="text-center fw-800 mb-3 col-12">Modifier la catégorie</h3>
          <input type="text" className="newInputModale" name="name" value={this.state.name} onChange={this.handleInputChange} /><br />
            <div className='row'>
              <input className="btn bg-dark-awam whiteText btnModale mx-auto" type="submit" value='Enregistrer' />
            </div>
        </form>
      </Modal>



      </>
  )
}
}
