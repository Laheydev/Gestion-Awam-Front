import React from 'react';
import moment from 'moment';
import './css/DynamicCell.css'



export default class DynamicCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      html: null,
      id: this.props.id,
      field: this.props.field,
      editable: false
    };
  }

  componentDidMount(){
    this.showContent(this.props.content);
  }


  showContent(){
    return (<td
      className="fixedWidth fw-400"
      name='content'
      onClick={() => this.setState({editable: true})}>{this.props.content}</td>);
  }


  editCell(){
    return (
      <td className="fixedWidth">
        <input
          onBlur={this.cancelEdit.bind(this)}
          autoFocus className="fw-400 inputTableau"
          onKeyPress={this.sendEdittedValue.bind(this)}
          name={this.props.field}
          defaultValue={this.props.content}
          onChange={this.props.onContentChange} />
      </td>
    );
  }

  cancelEdit(){
    this.setState({
      editable: false
    });
    this.props.onCancel(this.props.field);
  }

  sendEdittedValue(event){
    if(event.key === "Enter"){
      this.props.onApiEdit(this.props.field, this.props.content, this.props.id, moment().format('YYYY-MM-DD'));
      this.setState({editable: false});
    }
  }

  render() {
    return (
      <>
      {this.state.editable ? this.editCell() : this.showContent()}
      </>
  )
}
}
