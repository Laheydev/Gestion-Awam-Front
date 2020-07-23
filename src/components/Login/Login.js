import Form from '../Utils/Form';
import React from 'react';
import '../../api/apiConfig.js';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import Modal from 'react-modal';

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

export default class Login extends Form {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      isValid: '',
      password: '',
      isConnected: this.props.logged,
      modalIsOpen: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount(){
    if(!this.state.isConnected){
      this.openModal();
    }


  }

  openModal() {

    this.setState({modalIsOpen: true});
  }

  closeModal() {
      this.setState({modalIsOpen: false});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method:'get',
      url: `${config.url}users/viewByUsername/${this.state.login}.json`,
      auth: {
        username: this.state.login,
        password: this.state.password
      }
    })
    .then(res => {
      if(res.status === 200){
        localStorage.setItem('login', this.state.login);
        localStorage.setItem('password', this.state.password);
        localStorage.setItem('img', res.data.currentUser.img);
        localStorage.setItem('id', res.data.currentUser.id);
        this.setState({isValid: ''});
        this.closeModal();
        this.props.onUpdate();
      }else{
    
       
        localStorage.clear();
      }
    }).catch(err =>  this.setState({isValid: <span style={{color: "red"}}><br />Identifiants incorrects<br /></span>}))

  }

  handleLogout(){
    localStorage.clear();
    this.props.onUpdate();
    this.openModal();

  }

  renderConnected(){
    return(
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={cssModale}
        shouldCloseOnOverlayClick={false}
        contentLabel="Modale connexion">
        <div className="p-5">
          <span className="bigTitle row justify-content-center">Déconnexion</span>
          <div className="m-2 form-group text-center row">
            <button className="btn bg-dark-awam whiteText newInputModale mt-5" onClick={this.handleLogout.bind(this)}>Déconnexion</button>
          </div>
        </div>
      </Modal>
    )
  }

  renderDisconnected(){
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={cssModale}
        shouldCloseOnOverlayClick={false}
        contentLabel="Modale deco">
        <div className="p-5">
          <span className="bigTitle row justify-content-center">Connexion</span>
          <div className="m-2 form-group text-center row">
            <form onSubmit={this.handleSubmit}>
            <br />
            For the purpose of testing: login "admin" password "admin"

            <br /><br />
              <label>
                Username:
                <input required name='login' placeholder='Username' className="form-control newInputModale"
                  value={this.state.login}
                  onChange={this.handleInputChange} />
              </label><br />
              <label>
                Password:
                <input required autoComplete='current-password' placeholder='Mot de passe' name='password' type="password" className="form-control newInputModale"
                  value={this.state.password}
                  onChange={this.handleInputChange} />
              </label>

              {this.state.isValid}
            
              
              <input type="submit" value="Connexion" className="btn bg-dark-awam w-25 whiteText mt-4"/><br />
            </form>
          </div>
        </div>
      </Modal>
    )
  }


  render() {
    return(
      <>
      {this.props.logged ? this.renderConnected() : this.renderDisconnected()}
      <div className="user-account">
        <div className="user_div mt-2 btn" onClick={this.openModal}>
          <img src={(localStorage.getItem('img') ? localStorage.getItem('img') : 'login-img.jpg')} className="user-photo" alt="profil" />
        </div>
        <div className="dropdown">
          <span>Bonjour</span><br />
          <span>{localStorage.getItem('login')}</span>
        </div>
      </div>
      </>
  )
}
}
