import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import AddCategory from './AddCategorie';
import CategoryModale from './CategoryModale';
import RemoveCategory from './RemoveCategory';

//voir await

export default class CategorieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
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
      url: `${config.url}categories.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      this.setState({
        categories:  res.data.categorie,
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
            <span className="bigTitle">Les catégories</span>
          </div>
          <div className="ml-auto align-title">
            <input className="btn bg-green-awam whiteText fw-800" defaultValue="Ajouter une catégorie" onClick={() => {this.setState({isHidden: ' d-block'})}} />
          </div>
        </div>
        <AddCategory isHidden={this.state.isHidden} onRefresh={this.handleRefresh} />


        <div className="row mb-3 align-list-title">
          <div className="col-3 listName align-list-title">
            Toutes les catégories
          </div>
        </div>
        {this.state.categories.map(category =>
          <div className="row" key={category.id}>
            <div className="col-3 fw-800 ">
              {category.name}
            </div>
            <div className="col-1 ">
              <CategoryModale id={category.id} name={category.name} onRefresh={this.handleRefresh} />
            </div>
            <div className="col-1">
              <RemoveCategory id={category.id} onRefresh={this.handleRefresh} />
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
