import Form from '../Utils/Form';
import React from 'react';
import config from '../../api/apiConfig.js';
import axios from 'axios';
import moment from 'moment';
import TaskList from '../Tasks/TaskList';
import ProjectModale from '../Projects/ProjectModale';
import RemoveProject from '../Projects/RemoveProject';


export default class ArchiveList extends Form {
  constructor(props) {
    super(props);
    this.state = {
      archiveList: [],
      archivedProjects: [],
      filteredList: [],
      statusList: [],
      search: '',
      isShown: 'd-none',
      isLoading: true
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRefresh = this.handleRefresh.bind(this);
  }

  componentDidMount() {
    this.handleRefresh();
  }


  handleRefresh(){
    axios({
      method:'get',
      url: `${config.url}projects/archived.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      }
    })
    .then(res => {
      this.setState({
        archivedProjects: res.data.archivedProjects,
        isLoading: false
      })
      this.filterArray(res.data.archivedProjects);
    });
  }

  filterArray(array){
    let nameArray = [];
    array.forEach(function(array){
      nameArray.push(array.name)
    });
    this.setState({
      archiveList: nameArray,
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
      original = this.state.archiveList;
      filtered = original.filter(item =>
        {
          const lc = item.toLowerCase();
          const filter = e.target.value.toLowerCase();
          return lc.includes(filter);
        })
      }else{
        filtered = this.state.archiveList;
      }

      this.setState({
        filteredList: filtered
      })
      this.setState({
        [name]: value
      });
    }

    handleDesarchive(id){
      if(window.confirm('Retirer le projet de l\'archive')){
        const newStatus = {
          status_id: 1
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

    toggleTaskView(event){
      if(this.state.isShown === 'table-cell'){
        this.setState({isShown: 'd-none'});
      }else{
        this.setState({isShown: 'table-cell'});
      }
    }


    render() {
      return(
        <>
        <div className={"container mt-5"+(this.props.logged ? ' d-block' : ' d-none')}>
          <div className="row self-mb-40">
            <span className="bigTitle col-4">L'archive</span>

            <div className="col-4 align-items-end d-flex">
              <div className="icon-search">
                <i className="fas fa-search"></i>
              </div>
              <input type="search" className='searchBar w-75' name="search" placeholder="Recherche" value={this.state.search} onChange={this.handleInputChange}  />
            </div>
          </div>

          {this.state.isLoading ? <div className="loading-spinner"><i className="fas fa-spinner fa-spin"></i></div> : ' '}
          {this.state.archivedProjects.map(project =>
            <table className={((this.state.filteredList.includes(project.name)) ? ' ' : ' d-none')} key={project.id}>
              <tbody>
                <tr>
                  <th></th>
                  <th className="headProjet text-center">Facture €</th>
                  <th className="headProjet text-center">Cout réel €</th>
                  <th className="headProjet text-center">Estimation de fin</th>
                  <th className="headProjet text-center">Client</th>
                  <th className="headProjet text-center">User</th>
                  <th className="headProjet text-center">Status</th>
                </tr>
              </tbody>

              <tbody>
                <tr>
                  <td className="projectName">{project.name}</td>
                  <td className="fw-400"><span className="pl-3">{project.quote}</span></td>
                  <td className="fw-400"><span className="pl-3">{project.bill}</span></td>
                  <td className="fw-400"><span className="pl-3">{moment(project.projectedend).format('DD/MM/YYYY')}</span></td>
                  <td className="fw-400"><span className="pl-3">{project.client.name}</span></td>
                  <td className="fw-400"><span className="pl-3">{project.user.username}</span></td>
                  <td className="fw-400"><span className="pl-3">{project.status.name}</span></td>
                  <td className="iconProjet"><ProjectModale project={project} onRefresh={this.handleRefresh} /></td>
                  <RemoveProject onRefresh={this.handleRefresh} id={project.id}/>
                </tr>
              </tbody>
              {project.tasks.map(task =>
                <tbody className={this.state.isShown} key={task.id}>
                  <TaskList task={task} key={task.id} onRefresh={this.handleRefresh} statusList={this.state.statusList} />
                </tbody>
              )}
              <tbody>
                <tr>


                  <td>
                    <button className="btn bg-green-awam whiteText w-100 mt-2" onClick={() => this.handleDesarchive(project.id)}>Retirer le projet de l'archive</button>
                    <button className="btn bg-dark-awam whiteText w-100 mt-2" onClick={this.toggleTaskView.bind(this)}>Voir les tâches associées</button>
                  </td>
                </tr>
              </tbody>
            </table>

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
