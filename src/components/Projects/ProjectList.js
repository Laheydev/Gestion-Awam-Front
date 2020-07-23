import React from 'react';
import axios from 'axios';
import config from '../../api/apiConfig.js';
import TaskList from '../Tasks/TaskList';
import AddProject from '../Projects/AddProject';
import ProjectModale from './ProjectModale';
import AddTask from '../Tasks/AddTask';

export default class ProjectList extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      projectList: [],
      projects: [],
      filteredList: [],
      statusList: [],
      search: '',
      isLoading: true
    };
    this.handleRefresh = this.handleRefresh.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleArchive = this.handleArchive.bind(this);
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

  getStatus(){
    axios({
      method:'get',
      url: `${config.url}status.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      this.setState({
        statusList: res.data.status
      })
    });
  }

  filterArray(array){
    let nameArray = [];
    array.forEach(function(array){
      nameArray.push(array.name)
    });
    this.setState({
      projectList: nameArray,
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
      original = this.state.projectList;
      filtered = original.filter(item =>
        {
          const lc = item.toLowerCase();
          const filter = e.target.value.toLowerCase();
          return lc.includes(filter);
        })
      }else{
        filtered = this.state.projectList;
      }

      this.setState({
        filteredList: filtered
      })
      this.setState({
        [name]: value
      });
    }

    handleArchive(id){
      if(window.confirm('Archiver le projet?')){
        const newStatus = {
          status_id: 2
        }
        axios({
          method:'put',
          url: `${config.url}projects/${id}.json`,
          auth: {
            username: localStorage.getItem('login'),
            password: localStorage.getItem('password')
          },
          data: newStatus
        })
        .then(res => {
          this.handleRefresh();
        });
      }
    }



    render() {
      return (
        <>
        <div className={"container mt-5"+(this.props.logged ? ' d-block' : ' d-none')}>

          <div className="row self-mb-40">
            <span className="col-12 col-md-4 bigTitle">Les projets</span>

            <div className="col-12 col-md-4 align-items-end d-flex">
              <div className="icon-search"><i className="fas fa-search"></i></div>
              <input type="search" className='searchBar w-100' name="search" placeholder="Recherche" value={this.state.search} onChange={this.handleInputChange}  />
            </div>
            <AddProject onRefresh={this.handleRefresh} />
          </div>

          {this.state.isLoading ? <div className="loading-spinner"><i className="fas fa-spinner fa-spin"></i></div> : ' '}

          {this.state.projects.map(project =>
            <div className={(this.state.filteredList.includes(project.name)) ? ' d-block' : ' d-none'} key={project.id}>
              <table className="tg w-100">
                <tbody>
                  <tr className="titleSpace">
                    <th className="projectName">{project.name} - {project.client.name}<ProjectModale project={project} onRefresh={this.handleRefresh} /></th>
                    <th className="headProjet text-center">Collaborateurs</th>
                    <th className="headProjet text-center">Facture (€) (J)</th>
                    <th className="headProjet text-center">Coût quotidien</th>
                    <th className="headProjet text-center">Ajouter un temps</th>
                    <th className="headProjet text-center">Temps passé (H)</th>
                    <th className="headProjet text-center">Temps restant</th>
                    <th className="headProjet text-center">Statut</th>
                  </tr>
                </tbody>
                <tbody>
                  {project.tasks.map(task =>
                    <TaskList task={task} key={task.id} onRefresh={this.handleRefresh} statusList={this.state.statusList} />
                  )}
                </tbody>
                <AddTask onRefresh={this.handleRefresh} projectid={project.id}  onLoad={() => this.setState({isLoading: true})} onLoaded={() => this.setState({isLoading: false})} />
                <tbody>
                  <tr>
                    <th>
                      <button
                        className="btn w-75 bg-green-awam whiteText mt-2"
                        onClick={() => this.handleArchive(project.id)}>Archiver le projet</button>
                    </th>
                  </tr>
                </tbody>
              </table>

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
