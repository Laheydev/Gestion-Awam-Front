import Form from '../Utils/Form';
import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';


export default class RemoveProject extends Form {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id
    };
  }

  handleDelete(){
    if(window.confirm('sur?')){
      axios({
        method:'delete',
        url: `${config.url}projects/${this.state.id}.json`,
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
  <td className="iconProjet">
    <i className="btn btn-sm fas fa-trash-alt" onClick={this.handleDelete.bind(this)}></i>
  </td>
    )
  }
}
