import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import AddType from './AddType';
import TypeModale from './TypeModale';
import RemoveType from './RemoveType';


export default class TypeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      types: [],
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
      url: `${config.url}types.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      this.setState({
        types:  res.data.types,
        isHidden: ' d-none'
      });
      this.resetAllFields();
    })
  }
  
  resetAllFields(){
    this.setState({
      name: '',
      city: ''
    })
  }

  render() {
    return (
      <>
      <div className={"container mt-5"+(this.props.logged ? ' d-block' : ' d-none')}>
        <div className="container mr-5 ml-5">
          <div className="row self-mb-40">
            <div className="col-5">
              <span className="bigTitle">Les types</span>
            </div>
            <div className="ml-auto align-title">
              <input className="btn bg-green-awam whiteText fw-800" defaultValue="Ajouter une catégorie" onClick={() => {this.setState({isHidden: ' d-block'})}} />
            </div>
          </div>
          <AddType isHidden={this.state.isHidden} onRefresh={this.handleRefresh} />


          <div className="row mb-3 align-list-title">
            <div className="col-3 listName align-list-title">
              Tous les types de tâche
            </div>
          </div>
          {this.state.types.map(type =>
            <div className="row" key={type.id}>
              <div className="col-2 greyCell">
                {type.name}
              </div>
              <div className="col-1">
                <TypeModale id={type.id} name={type.name} onRefresh={this.handleRefresh} />
              </div>
              <div className="col-1">
                <RemoveType id={type.id} onRefresh={this.handleRefresh} />
              </div>
            </div>
          )}
        </div>
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
