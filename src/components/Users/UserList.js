import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import RemoveUser from './RemoveUser';
import AddUser from './AddUser';

//voir await

export default class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
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
      url: `${config.url}users.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      this.setState({
        users: res.data.users,
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
            <span className="bigTitle">Les users</span>
          </div>
          <div className="ml-auto align-title">
            <input className="btn bg-green-awam whiteText" defaultValue="Ajouter un user" onClick={() => {this.setState({isHidden: ' d-block'})}} />
          </div>
        </div>
        <AddUser isHidden={this.state.isHidden} onRefresh={this.handleRefresh} />



        <div className="row mb-3 align-list-title">
          <div className="col-1 listName align-list-title">
            Users
          </div>
        </div>

        {this.state.users.map(user =>
          <div className="row" key={user.id}>
            <div className="col-1 center-txt greyCell">
              {user.username}
            </div>
            <div className="col-1 center-txt">
              <RemoveUser id={user.id} onRefresh={this.handleRefresh} />
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
