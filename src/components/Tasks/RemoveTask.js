import Form from '../Utils/Form';
import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';


export default class RemoveTask extends Form {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id
    };
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove(){
  if(window.confirm('Supprimer?')){
      axios({
        method:'delete',
        url: `${config.url}tasks/${this.state.id}.json`,
        auth: {
          username: localStorage.getItem('login'),
          password: localStorage.getItem('password')
        }
      })
      .then(res => {
        this.props.onRefresh();
      })
    }

  }

  render() {
    return(
      <button className="btn btn-sm btn-warning" onClick={this.handleRemove}>
      Supprimer
      </button>
    )
  }
}
