import React from 'react';
import Modal from 'react-modal';
import moment from 'moment';
import axios from 'axios';
import DatePicker from "react-datepicker";
import config from '../../api/apiConfig.js';

export default class TimeontaskModale extends React.Component {
  constructor(props) {
    super(props);
    this.refInput = React.createRef();
    this.state = {
      modaleIsOpen: false,
      id: this.props.id,
      created: moment(this.props.timeontask.created),
      timespent: this.props.timeontask.timespent,
      task_id: this.props.timeontask.task_id
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleChange(date) {
   this.setState({
     created: date
   });
 }


  handleSubmit(event) {
    event.preventDefault();
    const editTimeontask = {
      id: this.props.id,
      created: this.state.created.format('YYYY-MM-DD'),
      timespent: this.state.billedspent,
      task_id: this.state.task_id
    }
    this.closeModal();
    axios({
      method:'put',
      url: `${config.url}timeontasks/${this.state.id}.json`,
      auth: {
        username: localStorage.getItem('login'),
        password: localStorage.getItem('password')
      },
      data: editTimeontask
    })
    .then(res => {
      this.props.onRefresh();
    })

  }

  render() {
    const cssModale = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        height                : '50%'
      }
    };
    return (
      <>
      <i className="btn btn-sm fas fa-edit" onClick={this.openModal}></i>
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={cssModale}
        contentLabel="Modale calendrier"
        >
        <form onSubmit={this.handleSubmit}>
          <h3 className="text-center fw-800 mb-3 col-12">Modifier le Tot</h3>
            <DatePicker
            dateFormat="LLL"
            timeCaption="created"
            selected={this.state.created}
            onChange={this.handleChange.bind(this)}
            /><br />
          <input type="text" className="newInputModale" name="task_id" value={this.state.task_id} onChange={this.handleInputChange} /><br />
            <div className='row'>
              <input className="btn bg-dark-awam whiteText btnModale mx-auto" type="submit" value='Enregistrer' />
            </div>
        </form>
      </Modal>
      </>
  )
}
}
