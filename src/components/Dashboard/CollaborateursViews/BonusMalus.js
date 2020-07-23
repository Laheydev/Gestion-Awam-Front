import Form from '../../Utils/Form';
import React from 'react';


export default class BonusMalus extends Form {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }





  render() {
    return(
      <>

      <div className="row">
        <div className={"col-12 fw-400 whiteText " +( this.props.bonusmalus >= 0 ? 'bg-green-awam ' : 'bg-red-awam')}>
          {this.props.bonusmalus} €
        </div>
      </div>

      </>
  )
}
}
