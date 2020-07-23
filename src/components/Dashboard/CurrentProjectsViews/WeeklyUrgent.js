import Form from '../../Utils/Form';
import React from 'react';

export default class WeeklyUrgent extends Form {
  constructor(props) {
    super(props);
    this.state = {
      projects: this.props.currentprojects,
      urgentProjects: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    this.getProjectsTime();
  }

  getProjectsTime(){
    const projects = this.props.currentprojects;
    const tabProjects = [];


    projects.forEach(function(project, i){
      tabProjects[i] = {
        name: project.name,
        time: 0,
        elapsedtime: 0,
        isShown: 'd-none'
      };

      project.tasks.forEach(function(task){
        tabProjects[i].time += ((task.billed/task.dailycost)*7.8);
        tabProjects[i].elapsedtime += task.elapsedtime;
        tabProjects[i].billeddiff = Math.round((tabProjects[i].time - tabProjects[i].elapsedtime));
        if(tabProjects[i].billeddiff < (tabProjects[i].time/100)*10){
          tabProjects[i].isShown = ''
        }
      })
    })



    this.setState({
      urgentProjects: tabProjects
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
          Temps restant sur le projet
        </div>
      </div>
      {this.state.urgentProjects.map(project =>
        <div className={"row " + project.isShown} key={project.name}>

          <div className="col-6 textDashboard">
            {project.name}
          </div>
          <div className="col-6 textDashboard">
            {project.billeddiff != null ? project.billeddiff.toFixed(2)+' H' : 'Le projet ne possède pas de tâches'}
          </div>
        </div>
      )}
      </>
  )
}
}
