import Form from '../../Utils/Form';
import React from 'react';


export default class MonthlyRevenue extends Form {
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
        {this.props.revenue} €
      </div>
    </div>
    </>
)
}
}
