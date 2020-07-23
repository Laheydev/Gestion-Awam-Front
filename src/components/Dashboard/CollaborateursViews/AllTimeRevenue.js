import Form from '../../Utils/Form';
import React from 'react';


export default class AllTimeRevenue extends Form {
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
        <div className="col-12 textDashboard">
          {(parseFloat(this.props.billed) + parseFloat(this.props.bonusmalus)).toFixed(2)} €
        </div>
      </div>
      </>
  )
}
}
