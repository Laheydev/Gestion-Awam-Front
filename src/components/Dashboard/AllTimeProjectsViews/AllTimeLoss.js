import Form from '../../Utils/Form';
import React from 'react';

export default class AllTimeLoss extends Form {
  constructor(props) {
    super(props);
    this.state = {
      projects: this.props.projects,
      profitableProjects: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.getProjectsByProfit();
  }

  getProjectsByProfit(){
    const projects = this.props.projects;
    let projectsArray = [];


    projects.forEach(function(project, i){
      projectsArray[i] = {
        name: project.name,
        bill: 0,
        totalcost: 0,
        isShown: 'd-none'
      };

      project.tasks.forEach(function(task){
        projectsArray[i].totalcost += ((task.dailycost/7.8) * task.elapsedtime);
        projectsArray[i].bill += task.billed;
        projectsArray[i].margin = (projectsArray[i].bill - projectsArray[i].totalcost)
      })
    })


    projectsArray.sort(function(a, b){
        return a.margin-b.margin
    })

    projectsArray = projectsArray.slice(0,4);

    this.setState({
       profitableProjects: projectsArray
     })

  }

  render() {
    return(
      <>
      <div className="row">
        <div className="col-6 headDashboard">
          Nom du projet
        </div>
        <div className="col-6 headDashboard">
          Perte
        </div>
      </div>
      {this.state.profitableProjects.map(project =>
        <div className="row " key={project.name}>
          <div className="col-6 textDashboard">
            {project.name}
          </div>
          <div className="col-6 textDashboard">
            {project.margin.toFixed(2)} €
          </div>
        </div>
      )}
      </>
  )
}
}
