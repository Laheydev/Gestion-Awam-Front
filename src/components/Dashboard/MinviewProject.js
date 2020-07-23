import Form from '../Utils/Form';
import React from 'react';



export default class DashboardList extends Form {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh(){
    axios({
      method:'get',
      url: `${config.url}projects/current.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      this.setState({
        projects: res.data.currentProjects,
        isLoading: false
      })
      this.getStatus();
      this.filterArray(res.data.currentProjects);
    })
  }


  render() {
    return(
      <>

      </>


    )
  }
}
