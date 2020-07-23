import React from 'react';
import Modal from 'react-modal';
import DatePicker from "react-datepicker";
import moment from 'moment';

export default class TaskModale extends React.Component {
  constructor(props) {
    super(props);
    this.refInput = React.createRef();
    this.state = {
      modaleIsOpen: false,
      startDate: moment()
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }


  handleSubmit(event) {
    event.preventDefault();
    const date = this.state.startDate.format('YYYY-MM-DD');
    const node = this.refInput.current;
    const field = event.target.name;
    const inputValue = node.value;


    this.props.onTimeAdd(inputValue, date);
    this.closeModal();
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
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
        height                : '35%'
      }
    };
    return (
      <>
      <td className="iconProjet"><i className="btn btn-sm fas fa-calendar-alt" onClick={this.openModal}></i></td>
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        style={cssModale}
        contentLabel="Modale calendrier"
        >

        <h4>Ajouter un timeontask a la tâche</h4>

        <form onSubmit={this.handleSubmit} className="form-group" name="elapsedtime">
          <DatePicker
            className="newInputModale"
            dateFormat="LLL"
            timeCaption="time"
            selected={this.state.startDate}
            onChange={this.handleChange.bind(this)}
            />
          <div>
            <input ref={this.refInput} type="text" className="newInputModale" name={this.props.field} defaultValue={this.props.content} onChange={this.props.onContentChange} />
            </div>
            <input className="btn bg-green-awam whiteText fw-400 mt-2" type="submit" value='Envoyer' />
          </form>

        </Modal>
        </>
    )
  }
}
