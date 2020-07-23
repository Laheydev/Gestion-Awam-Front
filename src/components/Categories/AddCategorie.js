import Form from '../Utils/Form';
import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';

export default class AddCategory extends Form {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(event) {
    event.preventDefault();
    const newCategory = {
      name: this.state.name
    };
    axios({
      method:'post',
      url: `${config.url}categories.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      },
      data: newCategory
    })
    .then(res => {
      this.props.onRefresh();
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
    return(
      <>
      <div className={"row w-25" + this.props.isHidden}>
        <form onSubmit={this.handleSubmit} className="form-group">
          <input required className="form-control m-2" name='name' placeholder="Nom de la catégorie" value={this.state.name} onChange={this.handleInputChange} />
          <input type="submit" value="Enregistrer" className="btn bg-dark-awam whiteText m-2" />
        </form>
      </div>
      </>
  )
}
}
