import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import RemoveCollaborateur from './RemoveCollaborateur';
import CollaborateurModale from './CollaborateurModale';
import AddCollaborateur from './AddCollaborateur';


export default class CollaborateurList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collaborateurs: [],
      isHidden: ' d-none'
    };
    this.handleRefresh = this.handleRefresh.bind(this);
  }


  componentDidMount() {
    this.handleRefresh();
  }


  handleRefresh(){
    axios({
      method:'get',
      url: `${config.url}collaborateurs/pictures.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      this.setState({
        collaborateurs: res.data.collaborateurs,
        isHidden: ' d-none'
      });
    })
  }

  render() {
    return (
      <>
      <div className={"container mt-5"+(this.props.logged ? ' d-block' : ' d-none')}>
        <div className="row self-mb-40">
          <div className="col-5">
            <span className="bigTitle">Les collaborateurs</span>
          </div>
          <div className="col-2 align-title">
            <input className="btn bg-green-awam whiteText fw-800" defaultValue="Ajouter un collaborateur" onClick={() => {this.setState({isHidden: ' d-block'})}} />
          </div>
        </div>
        <AddCollaborateur isHidden={this.state.isHidden} onRefresh={this.handleRefresh} />


        <div className="row mb-3 align-list-title">
          <div className="col-2 listName align-list-title">
            Collaborateurs
          </div>
          <div className="col-1 headProjet align-list-title">
            %Charge
          </div>
          <div className="col-1 headProjet align-list-title">
            Photo
          </div>
        </div>
        {this.state.collaborateurs.map(collaborateur =>
          <div className="row" key={collaborateur.id}>
            <div className="col-1 center-txt greyCell">
              {collaborateur.firstname}
            </div>
            <div className="col-1 center-txt greyCell">
              {collaborateur.lastname}
            </div>
            <div className="col-1 center-txt greyCell">
              {collaborateur.quota}%
            </div>
            <div className="col-1 ">
              <img className="img_collab" alt='collaborateur' src={collaborateur.img} />
            </div>
            <div className="col-1 center-txt">
              <CollaborateurModale collaborateur={collaborateur} id={collaborateur.id} onRefresh={this.handleRefresh} />
            </div>
            <div className="col-1 center-txt">
              <RemoveCollaborateur id={collaborateur.id} onRefresh={this.handleRefresh} />
            </div>
          </div>
        )}
      </div>
      <div  className={'fw-800 container mt-5'+ (this.props.logged ? ' d-none' : ' d-block')}>
        <div className="row text-center loggedOut">
          <div  className="col-12 loggedOut">
            Veuillez vous connecter
          </div>
        </div>
      </div>
      </>
  )
}
}
