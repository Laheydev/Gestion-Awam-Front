import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import RemoveClient from './RemoveClient';
import AddClient from './AddClient';
import ClientModale from './ClientModale';


export default class ClientList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clientList: [],
      filteredList: [],
      clients: [],
      isHidden: ' d-none'
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }


  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh(){
    axios({
      method:'get',
      url: `${config.url}clients.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      this.setState({
        clients:  res.data.clients,
        isHidden: ' d-none'
      });
      this.filterArray(res.data.clients);
    })
  }

  filterArray(array){
    let nameArray = [];
    array.forEach(function(array){
      nameArray.push(array.name)
    });
    this.setState({
      clientList: nameArray,
      filteredList: nameArray
    });
  }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    let original = [];
    let filtered = [];

    if(e.target.value !== ''){
      original = this.state.clientList;
      filtered = original.filter(item =>
        {
          const lc = item.toLowerCase();
          const filter = e.target.value.toLowerCase();
          return lc.includes(filter);
        })
      }else{
        filtered = this.state.clientList;
      }

      this.setState({
        filteredList: filtered
      })
      this.setState({
        [name]: value
      });
    }





    render() {
      return (
        <>
        <div className={"container mt-5"+(this.props.logged ? ' d-block' : ' d-none')}>
          <div className="row self-mb-40">
            <div className="col-4 bigTitle">
              Les clients
            </div>
            <div className="col-4 align-items-end d-flex">
              <div className="icon-search"><i className="fas fa-search"></i></div>
              <input type="search" className='searchBar w-100' name="search" placeholder="Recherche" value={this.state.search} onChange={this.handleInputChange}  />
            </div>
            <div className="col-4 align-title">
              <input className="btn bg-green-awam whiteText fw-800" type="button" defaultValue="Ajouter un client" onClick={() => {this.setState({isHidden: ' d-block'})}} />
            </div>
          </div>
          <AddClient onRefresh={this.handleRefresh} isHidden={this.state.isHidden} />


          <div className="row mb-3 align-list-title">
            <div className="col-2 listName align-list-title">
              Tous les clients
            </div>
            <div className="col-2 headProjet align-list-title">
              Ville
            </div>
          </div>
          {this.state.clients.map(client =>
            <div className={((this.state.filteredList.includes(client.name)) ? ' ' : ' d-none') + ' row'} key={client.id}>
              <div className="col-2 fw-800 greyCell">
                {client.name}
              </div>

              <div className="col-2 fw-400 greyCell">
                {client.city}
              </div>
              <div className="col-1">
                <ClientModale id={client.id} name={client.name} city={client.city} onRefresh={this.handleRefresh} />
              </div>
              <div className="col-1">
                <RemoveClient id={client.id} onRefresh={this.handleRefresh} />
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
